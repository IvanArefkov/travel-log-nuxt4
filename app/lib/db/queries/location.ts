import { and, eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import slugify from 'slug';

import type { InsertLocation } from '@/lib/db/schema';

import db from '@/lib/db/index';
import { location } from '@/lib/db/schema';

export async function existingLocationName(insertedLocation: InsertLocation, userId: number) {
  const existing = !!(await db.query.location.findFirst({
    where: and(eq(location.name, insertedLocation.name), eq(location.userId, userId)),
  }));
  return existing;
}

export async function checkSlug(slug: string) {
  let existingSlug = !!(await db.query.location.findFirst({
    where: eq(location.slug, slug),
  }));
  while (existingSlug) {
    const uniqCode = nanoid().slice(0, 5);
    const idSlug = slugify(`${slug}-${uniqCode}`);
    existingSlug = !!(await checkSlug(slug));
    if (!existingSlug) {
      return idSlug;
    }
  };
  return slug;
}
