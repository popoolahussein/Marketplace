import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. 
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    AUTH_GITHUB_ID: z.string(),
    AUTH_GITHUB_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_URL: process.env.NODE_ENV === "production"
      ? z.string().url().default("https://marketplace-omega-olive.vercel.app")  // Production URL
      : z.string().url().default("http://localhost:3001"),  // Local development URL
  },

  /**
   * Specify your client-side environment variables schema here. 
   * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
  //  NEXT_PUBLIC_CLIENT_VAR: z.string().optional(),
  },

  /**
   * You can't destruct `process.env` as a regular object in Next.js edge runtimes 
   * or client-side, so we manually destruct here.
   */
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },

  /**
   * Skip environment validation for cases like Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Treat empty strings as undefined to prevent invalid configurations.
   */
  emptyStringAsUndefined: true,
});
