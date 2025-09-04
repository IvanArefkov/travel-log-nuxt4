import { getAllLocations } from '@/lib/db/queries/location';
import { defineAuthenticatedEventHandler } from '@/utils/define-authenticated-user';

export default defineAuthenticatedEventHandler(async (event) => {
  const locations = await getAllLocations(event.context.user.id);
  return locations;
});
