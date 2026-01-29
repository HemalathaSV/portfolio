import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { useProjects } from "@/hooks/use-portfolio";
import { Search } from "lucide-react";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();
  const [filter, setFilter] = useState("");

  const filteredProjects = projects?.filter(p =>
    p.title.toLowerCase().includes(filter.toLowerCase()) ||
    p.description.toLowerCase().includes(filter.toLowerCase()) ||
    p.technologies?.some(t => t.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="min-h-screen pt-32 pb-20 container mx-auto px-4">
      <SectionHeader title="My Projects" subtitle="Building the Future" />

      {/* Search Filter */}
      <div className="mb-12 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects by tech or name..."
            className="w-full bg-card/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="h-96 rounded-2xl bg-muted/20 animate-pulse" />
          ))}
        </div>
      ) : (
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects?.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}

          {filteredProjects?.length === 0 && (
            <div className="col-span-full text-center py-20 text-muted-foreground">
              No projects found matching your search.
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
