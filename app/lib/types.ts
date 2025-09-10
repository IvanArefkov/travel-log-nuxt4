import type { DrizzleError } from 'drizzle-orm';

// Types moved to /types/global.d.ts for global availability
import type { UserWithId } from '@/lib/auth';

declare module 'h3' {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface H3EventContext {
    user?: UserWithId;
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
export type LatLongItem = {
  lat: number;
  long: number;
};

export type MapPoint = {
  id: number;
  description: string | null;
  name: string;
  slug?: string;
} & LatLongItem; ;

export type SearchResultType = {
  addresstype: string;
  boundingbox: [number, number, number, number];
  class: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  name: string;
  osm_id: number;
  osm_type: string;
  place_id: number;
  place_rank: number;
  type: string;
};
