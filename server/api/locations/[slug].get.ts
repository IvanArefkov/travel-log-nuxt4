import { getLocation } from '@/lib/db/queries/location';
import { defineAuthenticatedEventHandler } from '@/utils/define-authenticated-user';

export default defineAuthenticatedEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') as string;
  const location = await getLocation(slug, event.context.user.id);
  return location;
});
