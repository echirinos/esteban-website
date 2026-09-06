import { expect, test } from "@playwright/test";

test("homepage is the canonical production portfolio", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Esteban Chirinos/);
  await expect(
    page.getByRole("heading", {
      name: "Good software. Real people. A little curiosity.",
      level: 1,
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "View proof" })).toHaveAttribute(
    "href",
    "/work",
  );
  await expect(page.locator('a[href="/goggles"]').first()).toHaveAttribute(
    "href",
    "/goggles",
  );
});

test("legacy modern route redirects to canonical homepage", async ({
  page,
}) => {
  await page.goto("/modern");
  await expect(page).toHaveURL("/");
});

test("ai lab leads with a working portfolio chat UI", async ({ page }) => {
  await page.route("/api/ask-esteban", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        answer:
          "Esteban has AI product proof points, Coinbase experience, and technical depth.",
        provider: "smoke",
        sources: ["Smoke test"],
      }),
    });
  });

  await page.goto("/ai-lab");

  await expect(
    page.getByRole("heading", { name: "Ask the portfolio.", level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByText("Portfolio AI chat", { exact: true }),
  ).toBeVisible();

  const input = page.getByRole("textbox", { name: "Ask Esteban a question" });

  await expect(input).toBeVisible();
  await expect(page.getByRole("button", { name: "Ask AI" })).toBeVisible();

  await input.fill("What AI product proof points matter?");
  await page.getByRole("button", { name: "Ask AI" }).click();

  await expect(
    page.getByText("What AI product proof points matter?"),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Esteban has AI product proof points, Coinbase experience, and technical depth.",
    ),
  ).toBeVisible();
});

test("immersive goggles route remains available", async ({ page }) => {
  await page.goto("/goggles");

  const gogglesButton = page.getByRole("button", { name: "Put on goggles" });

  await expect(gogglesButton).toBeVisible({
    timeout: 20_000,
  });
  await expect(
    page.getByRole("link", { name: /View portfolio/i }),
  ).toHaveAttribute("href", "/");
  await expect(page.getByRole("contentinfo")).toHaveCount(0);

  await gogglesButton.click();
  await expect(page.getByLabel("World selector")).toBeVisible({
    timeout: 20_000,
  });
  await expect(
    page.getByRole("navigation", { name: "Lens navigation" }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Portfolio explorer" }),
  ).toBeVisible();
});

test("contact page exposes a conversion path", async ({ page }) => {
  await page.goto("/contact");

  await expect(
    page.getByRole("heading", { name: "Reach out on LinkedIn.", level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Reach out to Esteban on LinkedIn" }),
  ).toBeVisible();
  await expect(page.getByLabel("Name")).toHaveCount(0);
  await expect(page.getByLabel("Email")).toHaveCount(0);
  await expect(page.getByLabel("Message")).toHaveCount(0);
});

test("blog route redirects to the external writing archive", async ({
  page,
}) => {
  const response = await page.request.get("/blog", { maxRedirects: 0 });

  expect(response.status()).toBe(307);
  expect(response.headers().location).toBe("https://world.hey.com/echi/");
});

test("mobile homepage has no horizontal overflow", async ({ page }) => {
  await page.goto("/");

  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));

  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
});

test("mobile menu opens, reports state, and closes on Escape", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "hamburger menu only exists below md");

  await page.goto("/");

  const trigger = page.getByRole("button", { name: "Open navigation" });

  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#mobile-nav-menu")).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#mobile-nav-menu")).toHaveCount(0);
});

test.describe("draft reveals without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("homepage sections are visible when JS never runs", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: "Good company. Interesting problems.",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Less slide deck. More shipped product.",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Make it useful. Make it human." }),
    ).toBeVisible();
  });
});

test("goggles render a scene, switch worlds, and keep the desk optional", async ({
  page,
}) => {
  await page.goto("/goggles");
  const scene = page.locator(".lens-experience");
  await expect(scene).toHaveAttribute("data-renderer", "ready", {
    timeout: 20_000,
  });
  await page.getByRole("button", { name: "Put on goggles" }).click();
  await page.getByRole("button", { name: "Enjoy the view" }).click();
  await expect(
    page.getByRole("region", { name: "Portfolio explorer" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Change", exact: true }).click();
  await page.getByRole("button", { name: "Space Earthrise ridge" }).click();
  await expect(
    page.getByText("Orbital Horizon", { exact: true }),
  ).toBeVisible();
  await expect(scene).toHaveAttribute("data-renderer", "ready");
  await page.getByRole("button", { name: "Open my desk" }).click();
  await page
    .getByRole("button", { name: "Platform Work", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Platform Work", exact: true }).last(),
  ).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: "Put on goggles" }).click();
  await expect(
    page.getByText("Orbital Horizon", { exact: true }),
  ).toBeVisible();
});

test("goggles keep working when browser storage is unavailable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new DOMException("Storage blocked", "SecurityError");
    };
    Storage.prototype.setItem = () => {
      throw new DOMException("Storage blocked", "SecurityError");
    };
  });
  await page.goto("/goggles");
  await page.getByRole("button", { name: "Put on goggles" }).click();
  await page.getByRole("button", { name: "Change", exact: true }).click();
  await page.getByRole("button", { name: "Alpine lake and peaks" }).click();
  await expect(page.getByText("Alpine Glass", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Portfolio explorer" }),
  ).toBeVisible();
});

test("goggles recover to a usable scenic fallback after WebGL context loss", async ({
  page,
}) => {
  await page.goto("/goggles");
  await expect(page.locator(".lens-experience")).toHaveAttribute(
    "data-renderer",
    "ready",
    { timeout: 20_000 },
  );
  await page.locator("canvas").evaluate((canvas) => {
    canvas.dispatchEvent(new Event("webglcontextlost", { cancelable: true }));
  });
  await expect(page.locator(".lens-experience")).toHaveAttribute(
    "data-renderer",
    "fallback",
  );
  await page.getByRole("button", { name: "Put on goggles" }).click();
  await expect(
    page.getByRole("region", { name: "Portfolio explorer" }),
  ).toBeVisible();
  await expect(
    page.getByText("Scenic image mode · You can still explore every world."),
  ).toBeVisible();
});

test("goggles honor reduced motion and keep mobile controls inside the viewport", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/goggles");
  await page.getByRole("button", { name: "Put on goggles" }).click();
  await expect(page.locator(".lens-experience")).toHaveAttribute(
    "data-motion",
    "off",
  );
  await expect(
    page.getByRole("button", { name: "Motion paused" }),
  ).toBeDisabled();
  const nav = await page
    .getByRole("navigation", { name: "Lens navigation" })
    .boundingBox();
  const viewport = page.viewportSize()!;
  expect(nav!.x).toBeGreaterThanOrEqual(0);
  expect(nav!.x + nav!.width).toBeLessThanOrEqual(viewport.width);
  expect(nav!.y + nav!.height).toBeLessThanOrEqual(viewport.height);
});
