import { defineConfig } from '@playwright/test';

// 설치된 Chrome을 쓴다. 브라우저를 따로 내려받지 않는다.
// 배포된 주소를 검사하려면 BASE_URL=https://... npm run test:e2e
export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  fullyParallel: true,
  reporter: [['list']],
  use: { baseURL: process.env.BASE_URL ?? 'http://localhost:4321', channel: 'chrome', viewport: { width: 1360, height: 880 } },
  webServer: { command: 'npm run preview', url: 'http://localhost:4321', reuseExistingServer: true, timeout: 60_000 },
});
