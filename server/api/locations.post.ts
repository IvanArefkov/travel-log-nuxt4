import db from '~/lib/db/index';
import { InsertLocation } from '~/lib/db/schema';
import { location } from '~/lib/db/schema/index';

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    }));
  }
  const result = await readValidatedBody(event, InsertLocation.safeParse);

  if (!result.success) {
    const statusMessage = result
      .error
      .issues
      .map(issue => `${issue.path.join('')}: ${issue.message}`)
      .join('; ');

    const data = result
      .error
      .issues
      .reduce((errors, issue) => {
        errors[issue.path.join('')] = issue.message;
        return errors;
      }, {} as Record<string, string>);

    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }
  const created = await db.insert(location).values({
    ...result.data,
    userId: event.context.user.id,
    slug: result.data.name.replaceAll(' ', '-').toLocaleLowerCase(),
  }).returning();
  return created;
});
