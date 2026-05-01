import { expect, test } from '@playwright/test';

test('homepage is the canonical production portfolio', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Esteban Chirinos/);
  await expect(
    page.getByRole('heading', { name: 'Esteban Chirinos', level: 1 })
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'View proof' })).toHaveAttribute(
    'href',
    '/work'
  );
  await expect(page.locator('a[href="/goggles"]').first()).toHaveAttribute(
    'href',
    '/goggles'
  );
});

test('legacy modern route redirects to canonical homepage', async ({ page }) => {
  await page.goto('/modern');
  await expect(page).toHaveURL('/');
});

test('ai lab leads with a working portfolio chat UI', async ({ page }) => {
  await page.route('/api/ask-esteban', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        answer: 'Esteban has AI product proof points, Coinbase experience, and technical depth.',
        provider: 'smoke',
        sources: ['Smoke test'],
      }),
    });
  });

  await page.goto('/ai-lab');

  await expect(
    page.getByRole('heading', { name: 'Ask Esteban OS', level: 1 })
  ).toBeVisible();
  await expect(page.getByText('Live portfolio chat', { exact: true })).toBeVisible();

  const input = page.getByRole('textbox', { name: 'Ask Esteban a question' });

  await expect(input).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ask' })).toBeVisible();

  await input.fill('What AI product proof points matter?');
  await page.getByRole('button', { name: 'Ask' }).click();

  await expect(page.getByText('What AI product proof points matter?')).toBeVisible();
  await expect(
    page.getByText(
      'Esteban has AI product proof points, Coinbase experience, and technical depth.'
    )
  ).toBeVisible();
});

test('immersive goggles route remains available', async ({ page }) => {
  await page.goto('/goggles');

  const gogglesButton = page.getByRole('button', { name: 'Put on goggles.' });

  await expect(gogglesButton).toBeVisible({
    timeout: 20_000,
  });
  await expect(page.getByRole('link', { name: /View portfolio/i })).toHaveAttribute(
    'href',
    '/'
  );
  await expect(page.getByRole('contentinfo')).toHaveCount(0);

  await gogglesButton.click();
  await expect(page.getByLabel('World selector')).toBeVisible({ timeout: 20_000 });
  await expect(page.getByRole('navigation', { name: 'Goggles navigation' })).toBeVisible();
  await expect(page.getByText('Macintosh HD: Esteban Field Notes')).toBeVisible();
});

test('contact page exposes a conversion path', async ({ page }) => {
  await page.goto('/contact');

  await expect(
    page.getByRole('heading', { name: 'Contact Esteban', level: 1 })
  ).toBeVisible();
  await expect(page.getByLabel('Name')).toBeVisible();
  await expect(page.getByLabel('Email')).toBeVisible();
  await expect(page.getByLabel('Message')).toBeVisible();
});

test('mobile homepage has no horizontal overflow', async ({ page }) => {
  await page.goto('/');

  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));

  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
});
