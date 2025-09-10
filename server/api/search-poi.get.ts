import { z } from 'zod';

import { defineAuthenticatedEventHandler } from '@/utils/define-authenticated-user';
import sendZodError from '@/utils/send-zod-error';

const searchSchema = z.object({
  q: z.string().min(1),
});

export default defineAuthenticatedEventHandler(defineCachedEventHandler(async (event) => {
  const query = await getValidatedQuery(event, searchSchema.safeParse);
  if (!query.success) {
    return sendZodError(query.error, event);
  }
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query.data.q}&format=json`, {
      method: 'get',
      signal: AbortSignal.timeout(5000),
      headers: {
        'User-Agent': 'nuxt-travel-log | ivanarefkov@gmail.com',
      },
    });
    if (!response.ok) {
      return createError({
        statusCode: 504,
        statusMessage: 'unable to reach search api',
      });
    }
    return response.json();
  }
  catch (e) {
    return createError({
      statusCode: 504,
      statusMessage: `unable to reach search api: ${e}`,
    });
  }
}, {
  maxAge: 60 * 60 * 24,
  name: 'search-nominatim',
  getKey: (event) => {
    const query = getQuery(event);
    return query.q?.toString() || '';
  },
}));
