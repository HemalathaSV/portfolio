import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Content Tables
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // 'Languages', 'AI/ML', 'Backend', 'Cloud', 'Tools'
  proficiency: integer("proficiency").default(100), // 0-100
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  technologies: text("technologies").array(),
  link: text("link"),
  imageUrl: text("image_url"),
});

export const publications = pgTable("publications", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  publisher: text("publisher").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  link: text("link"),
});

export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  degree: text("degree").notNull(),
  institution: text("institution").notNull(),
  year: text("year").notNull(),
  description: text("description"),
});

export const certifications = pgTable("certifications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  issuer: text("issuer").notNull(),
  date: text("date").notNull(),
});

// Contact Form
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schemas
export const insertSkillSchema = createInsertSchema(skills).omit({ id: true });
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const insertPublicationSchema = createInsertSchema(publications).omit({ id: true });
export const insertEducationSchema = createInsertSchema(education).omit({ id: true });
export const insertCertificationSchema = createInsertSchema(certifications).omit({ id: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });

// Types
export type Skill = typeof skills.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Publication = typeof publications.$inferSelect;
export type InsertPublication = z.infer<typeof insertPublicationSchema>;
export type Education = typeof education.$inferSelect;
export type InsertEducation = z.infer<typeof insertEducationSchema>;
export type Certification = typeof certifications.$inferSelect;
export type InsertCertification = z.infer<typeof insertCertificationSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

