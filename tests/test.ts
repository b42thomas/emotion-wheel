import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('h1')).toBe('Emotion Wheel');
});

test('wheel has six emotions slices and labels', async ({ page }) => {
	await page.goto('/');
	expect(await page.locator('circle').count()).toBe(6);
	expect(await page.locator('text').count()).toBe(6);
});