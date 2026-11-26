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
    await expect(page.locator("body")).not.toHaveCSS("overflow-x", "scroll");
    await expect(page).toHaveScreenshot(
      `${testInfo.project.name}-${viewport.name}.png`,
      { fullPage: viewport.width < 1025, animations: "disabled" },
    );
  });
}

test("keyboard navigation, locale, and dialogs work", async ({
  page,
}) => {
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
