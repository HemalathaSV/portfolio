import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type insertMessageSchema } from "@shared/routes";
import { z } from "zod";

// Skills
export function useSkills() {
  return useQuery({
    queryKey: [api.skills.list.path],
    queryFn: async () => {
      const res = await fetch(api.skills.list.path);
      if (!res.ok) throw new Error("Failed to fetch skills");
      return api.skills.list.responses[200].parse(await res.json());
    },
  });
}

// Projects
export function useProjects() {
  return useQuery({
    queryKey: [api.projects.list.path],
    queryFn: async () => {
      const res = await fetch(api.projects.list.path);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return api.projects.list.responses[200].parse(await res.json());
    },
  });
}

// Education
export function useEducation() {
  return useQuery({
    queryKey: [api.education.list.path],
    queryFn: async () => {
      const res = await fetch(api.education.list.path);
      if (!res.ok) throw new Error("Failed to fetch education");
      return api.education.list.responses[200].parse(await res.json());
    },
  });
}

// Certifications
export function useCertifications() {
  return useQuery({
    queryKey: [api.certifications.list.path],
    queryFn: async () => {
      const res = await fetch(api.certifications.list.path);
      if (!res.ok) throw new Error("Failed to fetch certifications");
      return api.certifications.list.responses[200].parse(await res.json());
    },
  });
}

// Publications
export function usePublications() {
  return useQuery({
    queryKey: [api.publications.list.path],
    queryFn: async () => {
      const res = await fetch(api.publications.list.path);
      if (!res.ok) throw new Error("Failed to fetch publications");
      return api.publications.list.responses[200].parse(await res.json());
    },
  });
}

// Contact Form Mutation
type ContactFormInput = z.infer<typeof api.contact.submit.input>;

export function useSubmitContact() {
  return useMutation({
    mutationFn: async (data: ContactFormInput) => {
      // Validate locally first (optional but good practice)
      const validated = api.contact.submit.input.parse(data);

      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.contact.submit.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to send message");
      }

      return api.contact.submit.responses[201].parse(await res.json());
    },
  });
}
