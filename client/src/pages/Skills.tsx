import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { useSkills } from "@/hooks/use-portfolio";
import { Code, Database, Globe, Brain, Terminal, Server } from "lucide-react";

export default function Skills() {
  const { data: skills, isLoading } = useSkills();

  // Group skills by category
  const categories = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>) || {};

  // Icons mapping for categories
  const categoryIcons: Record<string, any> = {
    "Languages": Code,
    "AI/ML": Brain,
    "Backend": Server,
    "Cloud": Globe,
    "Tools": Terminal,
    "Databases": Database
  };

  return (
    <div className="min-h-screen pt-32 pb-20 container mx-auto px-4">
      <SectionHeader title="Technical Expertise" subtitle="My Stack" />

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-64 bg-muted/20 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.entries(categories).map(([category, items], i) => {
            const Icon = categoryIcons[category] || Code;
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card/50 border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all hover:bg-card/80"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category}</h3>
                </div>

                <div className="space-y-4">
                  {items.map((skill) => (
                    <div key={skill.id} className="group">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-primary to-blue-600 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
