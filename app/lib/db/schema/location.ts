import { relations } from 'drizzle-orm';
import { int, real, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

import { user } from './auth';
import { locationLog } from './location-log';

export const location = sqliteTable('location', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  lat: real().notNull(),
  long: real().notNull(),
  userId: int().notNull().references(() => user.id),
  createAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
}, t => [
  unique().on(t.name, t.userId),
]);

export const locationRelations = relations(location, ({ many }) => ({
  locationLogs: many(locationLog),
}));

type Issue = {
  [x: string]: unknown;
  readonly input: unknown;
  readonly code: 'invalid_type';
  readonly expected: z.core.$ZodType['_zod']['def']['type'];
  readonly message?: string | undefined;
  readonly path?: PropertyKey[] | undefined;
  readonly inst?: (z.core.$ZodType | z.core.$ZodCheck) | undefined;
  readonly continue?: boolean | undefined | undefined;
};
const errorRequired = {
  error: (issue: Issue) => issue.input === undefined ? 'Required' : issue.message,
};

export const InsertLocation = createInsertSchema(location, {
  name: () => z.string(errorRequired).min(1).max(100),
  description: field => field.max(1000, { error: '1000 characters max' }),
  lat: () => z.number(errorRequired).min(-90, { error: 'Minimun value: -90' }).max(90, { error: 'Maximum value: 90' }),
  long: () => z.number(errorRequired).min(-180, { error: 'Minimun value: -180' }).max(180, { error: 'Maximum value: 180' }),
}).omit({
  id: true,
  slug: true,
  userId: true,
  createAt: true,
  updatedAt: true,
});

export type InsertLocation = z.infer<typeof InsertLocation>;
