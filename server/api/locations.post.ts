import slugify from 'slug';

import type { CustomCauseError } from '~/lib/types';

import { checkSlug, existingLocationName } from '@/lib/db/queries/location';
import db from '~/lib/db/index';
import { InsertLocation, location } from '~/lib/db/schema';

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    }));
  }
  const result = await readValidatedBody(event, InsertLocation.safeParse);

  // If validation errors
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

  //  else  find a location check if it already exists for the user

  const existingName = await existingLocationName(result.data, event.context.user.id);
  if (existingName) {
    return createError({
      statusMessage: 'A location with this name already exists',
      statusCode: 409,
    });
  }

  const slug = await checkSlug(slugify(result.data.name));

  try {
    const [created] = await db.insert(location).values({
      ...result.data,
      userId: event.context.user.id,
      slug,
    }).returning();
    return created;
  }

  catch (e) {
    const error = e as CustomCauseError;
    const errorMessage = error.cause.cause.proto.message;
    if (errorMessage.includes('UNIQUE constraint failed:')) {
      return sendError(event, createError({
        statusCode: 409,
        statusMessage: 'Slug must be unique (Location name is used to generate slug)',
      }));
    }
    throw errorMessage;
    return createError({
      statusCode: 500,
      statusMessage: errorMessage,
    });
  }
});
