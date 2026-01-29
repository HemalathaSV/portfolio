import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Terminal, Database, Cloud, Brain, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { useProjects, usePublications } from "@/hooks/use-portfolio";

export default function Home() {
  const { data: projects, isLoading } = useProjects();
  const { data: publications, isLoading: isPublicationsLoading } = usePublications();

  // Featured projects (take first 3)
  const featuredProjects = projects?.slice(0, 3) || [];

  return (
    <div className="w-full">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticlesBackground />

        {/* Abstract Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-10 text-primary/10"
          >
            <Brain size={120} />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 40, 0],
              rotate: [0, -10, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/3 right-10 text-secondary/10"
          >
            <Cloud size={100} />
          </motion.div>

          <motion.div
            animate={{
              x: [0, 30, 0],
              rotate: [0, 15, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-20 right-1/4 text-emerald-500/10"
          >
            <Terminal size={80} />
          </motion.div>
        </div>

        <div className="container px-4 z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.8
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:border-primary/50 transition-colors cursor-default"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-mono font-medium tracking-tight text-emerald-400">Open for Opportunities</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500 pb-4">
                Hemalatha SV
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-2 animate-text-shimmer bg-[linear-gradient(110deg,#9333ea,45%,#00CFFF,55%,#9333ea)] bg-[length:250%_100%] bg-clip-text text-transparent">
                AI & ML Engineer
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed"
            >
              Future AI & ML Innovator | CSE Undergrad | Executive Coordinator | Enthusiastic Learner
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
            >
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-primary to-blue-600 text-white font-bold shadow-[0_0_20px_rgba(0,207,255,0.3)] hover:shadow-[0_0_40px_rgba(0,207,255,0.5)] transition-shadow flex items-center justify-center gap-2 group"
                >
                  View Projects <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 backdrop-blur-sm transition-colors"
                >
                  Contact Me
                </motion.button>
              </Link>

              <motion.a
                href="https://www.linkedin.com/in/hemalatha-sv-bb0345310"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 font-medium hover:bg-blue-600/30 backdrop-blur-sm transition-colors flex items-center justify-center gap-2"
              >
                View Courses <ExternalLink className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="/resume.pdf"
                download="Resume_Hemalatha.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 backdrop-blur-sm transition-colors flex items-center justify-center gap-2"
              >
                <Cloud className="w-5 h-5" /> Resume
              </motion.a>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted-foreground/50"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-24 md:py-32 container mx-auto px-4">
        <SectionHeader title="Selected Work" subtitle="Projects" />

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 rounded-2xl bg-muted/20 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/projects" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors">
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Selected Publications */}
      <section className="py-24 container mx-auto px-4 bg-white/5 border-y border-white/5 backdrop-blur-sm">
        <SectionHeader title="Research & Publications" subtitle="Academic Work" />

        <div className="max-w-4xl mx-auto space-y-6">
          {isPublicationsLoading ? (
            <div className="h-40 bg-muted/20 rounded animate-pulse" />
          ) : publications?.map((pub, i) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-black/40 border border-white/10 hover:border-emerald-500/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Brain className="w-24 h-24 text-primary" />
              </div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {pub.title}
                  </h3>
                  <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-mono border border-primary/20">
                    {pub.publisher}
                  </span>
                </div>

                <p className="text-muted-foreground text-lg mb-6 max-w-2xl">
                  {pub.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground/60 font-mono">
                  <span>{pub.date}</span>
                  <span>•</span>
                  <a href={pub.link || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                    Read Paper <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
