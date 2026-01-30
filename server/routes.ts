import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { projects } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { log } from "./index";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.skills.list.path, async (_req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.get(api.projects.list.path, async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.publications.list.path, async (_req, res) => {
    const publications = await storage.getPublications();
    res.json(publications);
  });

  app.get(api.education.list.path, async (_req, res) => {
    const education = await storage.getEducation();
    res.json(education);
  });

  app.get(api.certifications.list.path, async (_req, res) => {
    const certifications = await storage.getCertifications();
    res.json(certifications);
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  });

  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  try {
    log("Starting health check and seeding process...", "db-seed");

    // 1. Skills
    const existingSkills = await storage.getSkills();
    if (existingSkills.length === 0) {
      log("Seeding skills...", "db-seed");
      const skillList = [
        { name: "Python", category: "Languages", proficiency: 90 },
        { name: "C", category: "Languages", proficiency: 80 },
        { name: "Agentic AI", category: "AI/ML", proficiency: 85 },
        { name: "Machine Learning", category: "AI/ML", proficiency: 85 },
        { name: "Multi-Agent Systems", category: "AI/ML", proficiency: 80 },
        { name: "FastAPI", category: "Backend", proficiency: 85 },
        { name: "SQLite", category: "Backend", proficiency: 80 },
        { name: "SQL", category: "Backend", proficiency: 80 },
        { name: "AWS (Foundations)", category: "Cloud", proficiency: 70 },
        { name: "Microsoft Azure (Basics)", category: "Cloud", proficiency: 60 },
        { name: "IBM Cloud", category: "Cloud", proficiency: 60 },
      ];
      for (const s of skillList) await storage.createSkill(s);
      log(`Seeded ${skillList.length} skills.`, "db-seed");
    } else {
      log(`${existingSkills.length} skills already exist.`, "db-seed");
    }

    // 2. Projects
    const existingProjects = await storage.getProjects();
    if (existingProjects.length === 0) {
      log("Seeding projects...", "db-seed");
      const projectList = [
        {
          title: "Agentic AI–Based Tournament Management System",
          description: "Designed and developed an automated system for scheduling, team registration, and result tracking using autonomous multi-agent systems. Built a scalable backend with FastAPI and SQLite. Integrated NLP query assistant. Published in IJCRT.",
          technologies: ["FastAPI", "SQLite", "Agentic AI", "Multi-Agent Systems", "Python"],
          link: "https://github.com/HemalathaSV/EVO_MIND_77",
        },
        {
          title: "Diet Recommendation System",
          description: "A machine learning based recommendation system that suggests personalized diet plans based on user health metrics.",
          technologies: ["Python", "Machine Learning", "Streamlit", "Scikit-learn"],
          link: "https://github.com/HemalathaSV/diet-recommendation",
        }
      ];
      for (const p of projectList) await storage.createProject(p);
      log(`Seeded ${projectList.length} projects.`, "db-seed");
    } else {
      log(`${existingProjects.length} projects already exist.`, "db-seed");
      // Maintenance: Update specific links if needed
      const agenticAI = existingProjects.find(p => p.title.includes("Agentic AI"));
      if (agenticAI && agenticAI.link !== "https://github.com/HemalathaSV/EVO_MIND_77" && db) {
        log("Updating Agentic AI project link...", "db-seed");
        await db.update(projects)
          .set({ link: "https://github.com/HemalathaSV/EVO_MIND_77" })
          .where(eq(projects.id, agenticAI.id));
      }
    }

    // 3. Publications
    const existingPubs = await storage.getPublications();
    if (existingPubs.length === 0) {
      log("Seeding publications...", "db-seed");
      await storage.createPublication({
        title: "Agentic AI-Based Tournament Management System",
        publisher: "International Journal of Creative Research and Development (IJCRT)",
        description: "Research work peer-reviewed and published in IJCRT, demonstrating applied AI, system design, and automation.",
        date: "2025",
        link: "https://ijcrt.org/",
      });
      log("Seeded publications.", "db-seed");
    } else {
      log(`${existingPubs.length} publications already exist.`, "db-seed");
    }

    // 4. Education
    const existingEdu = await storage.getEducation();
    if (existingEdu.length === 0) {
      log("Seeding education...", "db-seed");
      const eduList = [
        {
          degree: "B.E. in Computer Science & Engineering (AI & ML)",
          institution: "Maharaja Institute of Technology, Mysuru",
          year: "2023 – 2027",
          description: "Specializing in Artificial Intelligence and Machine Learning."
        },
        {
          degree: "Pre-University Course (Science - PCMB)",
          institution: "Jyothi Nivas PU College, Srirangapatna",
          year: "2023",
        },
        {
          degree: "SSLC",
          institution: "Jyothi Nivas School, Srirangapatna",
          year: "2021",
        }
      ];
      for (const e of eduList) await storage.createEducation(e);
      log(`Seeded ${eduList.length} education entries.`, "db-seed");
    } else {
      log(`${existingEdu.length} education entries already exist.`, "db-seed");
    }

    // 5. Certifications
    const existingCerts = await storage.getCertifications();
    if (existingCerts.length === 0) {
      log("Seeding certifications...", "db-seed");
      const certs = [
        { name: "Solutions Architecture Job Simulation", issuer: "AWS APAC - Forage", date: "Mar 2025" },
        { name: "Tools for Data Science", issuer: "IBM", date: "Oct 2025" },
        { name: "3 Day Agentic Ai Mini Project", issuer: "Nov 2025", date: "Nov 2025" },
        { name: "Crash Course on Python", issuer: "Google", date: "Oct 2025" },
        { name: "Software Engineering Job Simulation", issuer: "Wells Fargo", date: "Jul 2025" },
        { name: "Gen AI powered Data Analytics Job Simulation", issuer: "Tata", date: "Sep 2025" },
        { name: "Introduction to Cloud Computing", issuer: "IBM", date: "Oct 2025" },
        { name: "Introduction to Microsoft Azure Cloud Services", issuer: "Microsoft", date: "Dec 2025" },
      ];
      for (const c of certs) await storage.createCertification(c);
      log(`Seeded ${certs.length} certifications.`, "db-seed");
    } else {
      log(`${existingCerts.length} certifications already exist.`, "db-seed");
    }

    log("Database health check complete.", "db-seed");
  } catch (error) {
    console.error("Database health check/seeding failed:", error);
  }
}
