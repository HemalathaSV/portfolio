import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import type { Project } from "@shared/schema";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col h-full bg-card/50 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors duration-300"
    >
      {/* Image / Gradient Placeholder */}
      <div className="h-48 overflow-hidden bg-muted relative">
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-8">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
              <span className="text-3xl">🚀</span>
            </div>
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-foreground mb-2 flex items-center justify-between">
          {project.title}
          <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </h3>
        
        <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">
          {project.description}
        </p>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies?.map((tech) => (
              <span 
                key={tech} 
                className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/5 text-primary/80 border border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>

          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors"
            >
              View Project <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
