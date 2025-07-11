import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const categories = ['tips', 'ui/ux', 'data_base', 'ai', 'tools'] as const;
export type Category = (typeof categories)[number];

export const postsTable = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("user_id").notNull(),
  title: text("title").notNull(),
  subtitle_pt: text("subtitle_pt").notNull(),
  subtitle_en: text("subtitle_en").notNull(),
  category: varchar("category", { length: 20 }).notNull(),
  description_pt: text("description_pt").notNull(),
  description_en: text("description_en").notNull(),
  link: text("link").notNull(),
  img_link: text("img_link"),
});