import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const VIEWPORTS = [
  { name: "mobile-360", width: 360, height: 800 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-portrait", width: 768, height: 1024 },
  { name: "tablet-landscape", width: 1024, height: 768 },
  { name: "laptop-short", width: 1280, height: 720 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "desktop-large", width: 1920, height: 1080 },
] as const;

for (const viewport of VIEWPORTS) {
  test(`layout remains stable at ${viewport.name}`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize(viewport);
    await page.goto("/?lang=en#about");
    await page.locator("h1").waitFor();
    await page.waitForLoadState("networkidle");
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        Array.from(document.images)
          .filter((image) => image.loading !== "lazy")
          .map((image) => image.decode().catch(() => {})),
      );
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });
    });
    await expect(page.locator("body")).not.toHaveCSS("overflow-x", "scroll");
    await expect(page).toHaveScreenshot(
      `${testInfo.project.name}-${viewport.name}.png`,
      { fullPage: viewport.width < 1025, animations: "disabled" },
    );
  });
}

test("keyboard navigation, locale, and dialogs work", async ({ page }) => {
  await page.goto("/?lang=en#about");
  // Browser focus starts on the URL fragment target after navigation, so set
  // the entry point explicitly before exercising the link with the keyboard.
  await page.locator(".skip-link").focus();
  await expect(page.getByText("Skip to main content")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.locator("#mobile-header-menu")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});

test("mobile header artwork remains stable when the menu opens", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const viewport of [
    { width: 390, height: 844 },
    { width: 844, height: 390 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/?lang=en#about");

    const closedHeader = await page.evaluate(() => {
      function geometry(selector: string) {
        const element = document.querySelector<HTMLElement>(selector);
        if (!element) throw new Error(`Missing element: ${selector}`);
        const bounds = element.getBoundingClientRect();
        const style = getComputedStyle(element);

        return {
          x: bounds.x,
          y: bounds.y,
          width: bounds.width,
          height: bounds.height,
          backgroundPosition: style.backgroundPosition,
          backgroundSize: style.backgroundSize,
        };
      }

      return {
        brand: geometry(".site-header .header-brand"),
        sky: geometry(".site-header .header-scene__sky"),
        ufo: geometry(".site-header .header-scene__ufo"),
      };
    });

    await page.getByRole("button", { name: "Open menu" }).click();

    const openHeader = await page.evaluate(() => {
      function geometry(selector: string) {
        const element = document.querySelector<HTMLElement>(selector);
        if (!element) throw new Error(`Missing element: ${selector}`);
        const bounds = element.getBoundingClientRect();
        const style = getComputedStyle(element);

        return {
          x: bounds.x,
          y: bounds.y,
          width: bounds.width,
          height: bounds.height,
          backgroundPosition: style.backgroundPosition,
          backgroundSize: style.backgroundSize,
        };
      }

      return {
        brand: geometry(".mobile-menu-header .header-brand"),
        sky: geometry(".mobile-menu-header .header-scene__sky"),
        ufo: geometry(".mobile-menu-header .header-scene__ufo"),
      };
    });

    expect(openHeader).toEqual(closedHeader);
    const skyWidth = Number.parseFloat(openHeader.sky.backgroundSize);
    const skyOffset = Number.parseFloat(openHeader.sky.backgroundPosition);
    expect(skyWidth).toBeGreaterThanOrEqual(viewport.width * 2);
    expect(Math.abs(skyOffset + skyWidth / 2 - viewport.width)).toBeLessThan(
      0.75,
    );
    await expect(
      page.locator("#mobile-header-menu .header-scene__ufo"),
    ).toHaveCount(1);
    await expect(
      page.locator(".mobile-menu-footer-scene .header-scene__ufo"),
    ).toHaveCount(0);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth === window.innerWidth,
      ),
    ).toBe(true);
    await page
      .locator("#mobile-header-menu")
      .getByRole("button", { name: "Close menu" })
      .click();
  }
});

test("short desktop hero remains single-line and collision-free", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/?lang=en#about");

  const toolkitHeading = page.locator(".hero-info__toolkit-heading");
  await expect(toolkitHeading).toHaveText("MY CORE ENGINEERING TOOLKIT:");
  await expect(toolkitHeading).toHaveCSS("white-space", "nowrap");

  const layout = await page.evaluate(() => {
    const heading = document.querySelector<HTMLElement>(
      ".hero-info__toolkit-heading",
    );
    const firstTag = document.querySelector<HTMLElement>(".skill-tag");
    if (!heading || !firstTag) throw new Error("Hero toolkit is incomplete");

    const headingRange = document.createRange();
    headingRange.selectNodeContents(heading);
    const lineTops = Array.from(headingRange.getClientRects(), (rect) =>
      Math.round(rect.top),
    );
    const headingBounds = heading.getBoundingClientRect();
    const tagBounds = firstTag.getBoundingClientRect();

    return {
      lineCount: new Set(lineTops).size,
      gap: tagBounds.top - headingBounds.bottom,
    };
  });

  expect(layout.lineCount).toBe(1);
  expect(layout.gap).toBeGreaterThanOrEqual(0);
});

test("locale metadata and high zoom remain usable", async ({ page }) => {
  await page.goto("/?lang=en#about");
  await page.getByRole("button", { name: "EN" }).click();
  await page.getByRole("option", { name: "DE" }).click();
  await expect(page).toHaveURL(/\?lang=de/);
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page).toHaveTitle(/Full-Stack-Softwareentwickler/);

  await page.evaluate(() => {
    document.body.style.zoom = "2";
  });
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("body")).not.toHaveCSS("overflow-x", "scroll");
});

test("print layout exposes every section without decorative UI", async ({
  page,
}) => {
  await page.goto("/?lang=en#about");
  await page.emulateMedia({ media: "print" });
  const panels = page.locator(".section-carousel__panel");
  await expect(panels).toHaveCount(4);
  for (let index = 0; index < 4; index += 1) {
    await expect(panels.nth(index)).toHaveCSS("position", "static");
  }
  await expect(page.locator(".night-sky")).toBeHidden();
  await expect(page.locator(".project-gallery")).toBeHidden();
});

test("has no automatically detectable serious accessibility violations", async ({
  page,
}) => {
  await page.goto("/?lang=en#about");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    ),
  ).toEqual([]);
});
