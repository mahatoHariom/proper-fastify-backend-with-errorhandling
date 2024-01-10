import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['dev', 'test', 'production'], {
      errorMap: () => ({
        message: 'NODE_ENV must be dev, test or production',
      }),
    })
    .default('dev'),
  PORT: z
    .number({
      coerce: true,
      invalid_type_error: 'PORT has an invalid type',
      required_error: 'PORT is required',
    })
    .default(3333),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format());

  throw new Error('Invalid environment variables.');
}

export const env = _env.data;
