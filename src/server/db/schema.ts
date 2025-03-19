// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { backgrounds } from "@/lib/backgrounds";
import {
  bigserial,
  index,
  jsonb,
  pgEnum,
  pgTableCreator,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `class_hq_${name}`);

export const backgroundEnum = pgEnum("background", backgrounds);

export const PlansTable = createTable(
  "plans",
  {
    id: bigserial("id", { mode: "bigint" }).primaryKey(),
    userId: text("user_id").notNull(),
    name: varchar("name", { length: 256 }),
    background: backgroundEnum("background"),
    content: jsonb("content"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (idx) => ({
    idIndex: index("id_index").on(idx.id),
  }),
);
