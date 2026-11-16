import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

let server;
let startTypingSequence;
let App;
let sections;
let items;
let translations;
let ScreenshotPreview;
let I18nContext;

before(async () => {
  server = await createServer({
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: "custom",
  });
  ({ startTypingSequence } = await server.ssrLoadModule(
    "/src/utils/typingSequence.ts",
  ));
  ({ default: App } = await server.ssrLoadModule("/src/App.tsx"));
  ({ ScreenshotPreview } = await server.ssrLoadModule(
    "/src/components/ScreenshotPreview.tsx",
  ));
  ({ I18nContext } = await server.ssrLoadModule("/src/i18n/I18nContext.ts"));
  sections = await server.ssrLoadModule("/src/constants/sections.ts");
  const experience = await server.ssrLoadModule("/src/constants/experience.ts");
  const education = await server.ssrLoadModule("/src/constants/education.ts");
  const projects = await server.ssrLoadModule("/src/constants/projects.ts");
  items = [
    ...experience.EXPERIENCE_TIMELINE_ITEMS,
    ...education.EDUCATION_TIMELINE_ITEMS,
    ...projects.PROJECT_TIMELINE_ITEMS,
  ];
  ({ TRANSLATIONS: translations } = await server.ssrLoadModule(
    "/src/i18n/translations.ts",
  ));
});

after(async () => {
  await server?.close();
});

function createClock() {
  let now = 0;
  const pending = new Set();
  return {
    schedule(callback, delay) {
      const task = { callback, at: now + delay };
      pending.add(task);
      return () => pending.delete(task);
    },
    advance(milliseconds) {
      const end = now + milliseconds;
      for (;;) {
        const next = [...pending].sort((left, right) => left.at - right.at)[0];
        if (!next || next.at > end) break;
        pending.delete(next);
        now = next.at;
        next.callback();
      }
      now = end;
    },
    get pendingCount() {
      return pending.size;
    },
  };
}

test("typing preserves step delays, character increments and completion order", () => {
  const clock = createClock();
  let current;
  let completed = 0;
  startTypingSequence(
    [
      { length: 3, intervalMs: 10, charsPerTick: 2 },
      { length: 2, intervalMs: 20, delayMs: 30 },
    ],
    (value) => {
      current = value;
    },
    () => {
      completed++;
    },
    clock.schedule,
  );

  clock.advance(10);
  assert.deepEqual(current, { stepIndex: 0, visibleChars: 2, isStarted: true });
  clock.advance(10);
  assert.deepEqual(current, {
    stepIndex: 1,
    visibleChars: 0,
    isStarted: false,
  });
  clock.advance(29);
  assert.equal(current.isStarted, false);
  clock.advance(1);
  assert.equal(current.isStarted, true);
  clock.advance(20);
  assert.equal(current.visibleChars, 1);
  clock.advance(20);
  assert.equal(current.stepIndex, 2);
  assert.equal(completed, 1);
  assert.equal(clock.pendingCount, 0);
});

test("cancelling during a delay or a tick stops future updates", () => {
  for (const delayMs of [0, 30]) {
    const clock = createClock();
    const updates = [];
    const cancel = startTypingSequence(
      [{ length: 5, intervalMs: 10, delayMs }],
      (value) => updates.push(value),
      () => assert.fail("cancelled sequence completed"),
      clock.schedule,
    );
    const count = updates.length;
    cancel();
    clock.advance(1000);
    assert.equal(updates.length, count);
    assert.equal(clock.pendingCount, 0);
  }
});

test("empty steps and an empty sequence complete without hanging", () => {
  for (const steps of [[], [{ length: 0, intervalMs: 10 }]]) {
    const clock = createClock();
    let completed = 0;
    startTypingSequence(
      steps,
      () => {},
      () => {
        completed++;
      },
      clock.schedule,
    );
    assert.equal(completed, 1);
    assert.equal(clock.pendingCount, 0);
  }
});

test("every timeline item provides translated names and details directly", () => {
  assert.equal(new Set(items.map((item) => item.id)).size, items.length);
  for (const dictionary of Object.values(translations)) {
    for (const item of items) {
      assert.ok(dictionary[item.textKeys.name], item.id);
      for (const key of item.textKeys.highlights)
        assert.ok(dictionary[key], key);
    }
  }
  assert.deepEqual(
    sections.VALID_HASHES,
    sections.SECTION_NAV_ITEMS.map(({ id }) => `#${id}`),
  );
});

test("prerendered markup is stable at every viewport and contains one instance of each section", () => {
  const previousWindow = globalThis.window;
  try {
    for (const locale of Object.keys(translations)) {
      delete globalThis.window;
      const serverHtml = renderToStaticMarkup(
        createElement(App, { initialLocale: locale }),
      );
      assert.equal((serverHtml.match(/<h1\b/g) ?? []).length, 1);
      assert.equal((serverHtml.match(/class="about-panel"/g) ?? []).length, 1);
      for (const item of items)
        assert.equal(
          serverHtml.split(`data-timeline-item-id="${item.id}"`).length - 1,
          1,
        );
      for (const width of [320, 640, 768, 1024, 1025, 1366, 1920]) {
        globalThis.window = {
          matchMedia: (query) => ({
            matches:
              width >= Number(query.match(/min-width: (\d+)px/)?.[1] ?? 0),
          }),
          location: { hash: "#about" },
        };
        assert.equal(
          renderToStaticMarkup(createElement(App, { initialLocale: locale })),
          serverHtml,
          `${locale} at ${width}px`,
        );
      }
    }
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test("screenshot viewer exposes the selected image and localized controls", () => {
  const screenshots = items.find((item) => item.screenshots)?.screenshots;
  assert.ok(screenshots?.length > 1);
  for (const [locale, dictionary] of Object.entries(translations)) {
    const value = {
      locale,
      t: (key) => dictionary[key],
      setLocale() {},
      languageOptions: Object.keys(translations),
    };
    for (const currentIndex of [0, screenshots.length - 1]) {
      const html = renderToStaticMarkup(
        createElement(
          I18nContext.Provider,
          { value },
          createElement(ScreenshotPreview, {
            screenshots,
            currentIndex,
            projectName: "Project",
            onNavigate() {},
            onClose() {},
          }),
        ),
      );
      const selected = screenshots[currentIndex];
      assert.ok(html.includes(`src="${selected.src}" alt="Project — `));
      assert.ok(html.includes(dictionary["projects.closePreview"]));
      assert.ok(html.includes(dictionary["projects.zoomScreenshot"]));
      assert.ok(html.includes(dictionary["projects.previousScreenshot"]));
      assert.ok(html.includes(dictionary["projects.nextScreenshot"]));
      assert.equal((html.match(/aria-current="true"/g) ?? []).length, 1);
      assert.equal(
        (
          html.match(/class="subtle-border screenshot-preview__thumbnail"/g) ??
          []
        ).length,
        screenshots.length,
      );
    }
    const singleHtml = renderToStaticMarkup(
      createElement(
        I18nContext.Provider,
        { value },
        createElement(ScreenshotPreview, {
          screenshots: screenshots.slice(0, 1),
          currentIndex: 0,
          projectName: "Project",
          onNavigate() {},
          onClose() {},
        }),
      ),
    );
    assert.equal(singleHtml.includes("screenshot-preview__rail"), false);
    assert.equal(
      singleHtml.includes(dictionary["projects.nextScreenshot"]),
      false,
    );
  }
});
