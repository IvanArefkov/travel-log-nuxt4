// Types moved to /types/global.d.ts for global availability
import type { User } from 'better-auth';
import type { DrizzleError } from 'drizzle-orm';

declare module 'h3' {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface H3EventContext {
    user?: Omit<User, 'id'> & {
      id: number;
    };
  }
}

// eslint-disable-next-line ts/consistent-type-definitions
export interface CustomCauseError extends DrizzleError {
  cause: {
    cause: {
      proto: {
        message: string;
      };
    };
  };
}
