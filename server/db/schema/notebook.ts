import { user } from "./user";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const notebook = pgTable("notebook", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  authorName: text("author_name").notNull(),
  pdfUrl: text("pdf_url").notNull(),
  coverImageUrl: text("cover_image_url"),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date()),
});

export const notebookRelations = relations(notebook, ({ one }) => ({
  user: one(user, {
    fields: [notebook.userId],
    references: [user.id],
  }),
}));
