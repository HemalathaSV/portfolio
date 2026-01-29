import { 
  skills, projects, publications, education, certifications, messages,
  type InsertSkill, type InsertProject, type InsertPublication, type InsertEducation, type InsertCertification, type InsertMessage,
  type Skill, type Project, type Publication, type Education, type Certification, type Message
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getSkills(): Promise<Skill[]>;
  getProjects(): Promise<Project[]>;
  getPublications(): Promise<Publication[]>;
  getEducation(): Promise<Education[]>;
  getCertifications(): Promise<Certification[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  
  // Seed methods
  createSkill(skill: InsertSkill): Promise<Skill>;
  createProject(project: InsertProject): Promise<Project>;
  createPublication(pub: InsertPublication): Promise<Publication>;
  createEducation(edu: InsertEducation): Promise<Education>;
  createCertification(cert: InsertCertification): Promise<Certification>;
}

export class DatabaseStorage implements IStorage {
  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getPublications(): Promise<Publication[]> {
    return await db.select().from(publications);
  }

  async getEducation(): Promise<Education[]> {
    return await db.select().from(education);
  }

  async getCertifications(): Promise<Certification[]> {
    return await db.select().from(certifications);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const [newSkill] = await db.insert(skills).values(skill).returning();
    return newSkill;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async createPublication(pub: InsertPublication): Promise<Publication> {
    const [newPub] = await db.insert(publications).values(pub).returning();
    return newPub;
  }

  async createEducation(edu: InsertEducation): Promise<Education> {
    const [newEdu] = await db.insert(education).values(edu).returning();
    return newEdu;
  }

  async createCertification(cert: InsertCertification): Promise<Certification> {
    const [newCert] = await db.insert(certifications).values(cert).returning();
    return newCert;
  }
}

export const storage = new DatabaseStorage();
