import { Environment } from 'vitest';

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    return {
      teardown() {},
    };
  },
};
