import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: process.env.CI
    ? [['blob'], ['html', { open: 'never' }]]
    : [['html', { open: 'on-failure' }]],
  use: {
    baseURL: process.env.E2E_TEST_BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    permissions: ['geolocation', 'camera', 'microphone'],
    geolocation: { latitude: 40.7128, longitude: -74.006 },
  },
  expect: {
    timeout: 10000,
  },
  timeout: 30000,
  projects: [
    {
      // NOTE: WebKit crashes on this machine (Bus error 10) even after a clean reinstall —
      // a local environment issue, not a suite issue. Falls back to Chromium with the same
      // iPhone 14 Pro Max device metrics (viewport/UA/touch) for mobile emulation. Switch
      // `browserName` back to the device default (webkit) once WebKit runs cleanly again.
      name: 'mobile-safari',
      use: { ...devices['iPhone 14 Pro Max'], browserName: 'chromium' },
    },
  ],
});
