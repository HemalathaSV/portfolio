import {
  skills, projects, publications, education, certifications, messages,
  type InsertSkill, type InsertProject, type InsertPublication, type InsertEducation, type InsertCertification, type InsertMessage,
  type Skill, type Project, type Publication, type Education, type Certification, type Message
} from "@shared/schema";
// import { db } from "./db";
// import { eq } from "drizzle-orm";

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

export class MemStorage implements IStorage {
  private skills: Skill[] = [];
  private projects: Project[] = [];
  private publications: Publication[] = [];
  private education: Education[] = [];
  private certifications: Certification[] = [];
  private messages: Message[] = [];

  private skillId = 1;
  private projectId = 1;
  private pubId = 1;
  private eduId = 1;
  private certId = 1;
  private messageId = 1;

  async getSkills(): Promise<Skill[]> {
    return this.skills;
  }

  async getProjects(): Promise<Project[]> {
    return this.projects;
  }

  async getPublications(): Promise<Publication[]> {
    return this.publications;
  }

  async getEducation(): Promise<Education[]> {
    return this.education;
  }

  async getCertifications(): Promise<Certification[]> {
    return this.certifications;
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const newMessage: Message = { ...message, id: this.messageId++ };
    this.messages.push(newMessage);
    return newMessage;
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const newSkill: Skill = { ...skill, id: this.skillId++ };
    this.skills.push(newSkill);
    return newSkill;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const newProject: Project = { ...project, id: this.projectId++ };
    this.projects.push(newProject);
    return newProject;
  }

  async createPublication(pub: InsertPublication): Promise<Publication> {
    const newPub: Publication = { ...pub, id: this.pubId++ };
    this.publications.push(newPub);
    return newPub;
  }

  async createEducation(edu: InsertEducation): Promise<Education> {
    const newEdu: Education = { ...edu, id: this.eduId++ };
    this.education.push(newEdu);
    return newEdu;
  }

  async createCertification(cert: InsertCertification): Promise<Certification> {
    const newCert: Certification = { ...cert, id: this.certId++ };
    this.certifications.push(newCert);
    return newCert;
  }
}

export const storage = new MemStorage();
