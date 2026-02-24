import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    name: 'unit',
    environment: 'jsdom',
    globals: true,
    include: ['./__tests__/**/*.test.{ts,tsx}'],
    setupFiles: ['./__tests__/vitest.setup.ts'],
    coverage: { provider: 'v8' },
  },
});
