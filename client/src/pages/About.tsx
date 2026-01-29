import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { useEducation, useCertifications, usePublications } from "@/hooks/use-portfolio";
import { Calendar, Award, GraduationCap, BookOpen, ExternalLink } from "lucide-react";

export default function About() {
  const { data: education, isLoading: eduLoading } = useEducation();
  const { data: certifications, isLoading: certLoading } = useCertifications();
  const { data: publications, isLoading: pubLoading } = usePublications();

  return (
    <div className="min-h-screen pt-32 pb-20 container mx-auto px-4">
      <SectionHeader title="About Me" subtitle="My Journey" />

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Bio Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6 text-lg text-muted-foreground"
        >
          <p className="leading-relaxed">
            I am a motivated <span className="text-foreground font-semibold">Computer Science student</span> specializing in Artificial Intelligence and Machine Learning. I am passionate about solving complex problems through technology and eager to apply my skills in real-world projects.
          </p>
          <p className="leading-relaxed">
            My focus is on build intelligent systems, working on projects ranging from diet recommendation systems to tournament management applications. I am constantly learning and looking for collaborative opportunities.
          </p>


        </motion.div>

        {/* Timeline / Education / Publications */}
        <div className="space-y-12">
          {/* Publications Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <BookOpen className="text-blue-400" /> Publications
            </h3>
            <div className="space-y-6">
              {pubLoading ? (
                <div className="h-24 bg-muted/20 rounded animate-pulse" />
              ) : publications?.map((pub, index) => (
                <motion.a
                  key={pub.id}
                  href={pub.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="block p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                >
                  <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2">
                    {pub.title} <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <div className="text-sm font-mono text-primary mt-1 mb-2">{pub.publisher} • {pub.date}</div>
                  <p className="text-muted-foreground">{pub.description}</p>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <GraduationCap className="text-primary" /> Education
            </h3>
            <div className="space-y-8 pl-4 border-l-2 border-white/10">
              {eduLoading ? (
                <div className="h-24 bg-muted/20 rounded animate-pulse" />
              ) : education?.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8 group"
                >
                  <div className="absolute left-[-9px] top-2 w-4 h-4 rounded-full bg-background border-2 border-muted-foreground group-hover:border-primary transition-colors" />
                  <div className="text-sm font-mono text-primary mb-1">{edu.year}</div>
                  <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                  <p className="text-muted-foreground">{edu.institution}</p>
                  {edu.description && (
                    <p className="mt-2 text-sm text-muted-foreground/80">{edu.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Award className="text-secondary" /> Certifications
            </h3>
            <div className="grid gap-4">
              {certLoading ? (
                <div className="h-16 bg-muted/20 rounded animate-pulse" />
              ) : certifications?.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors flex items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="font-semibold text-white">{cert.name}</h4>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                  <div className="text-xs font-mono px-2 py-1 rounded bg-black/20 text-muted-foreground whitespace-nowrap">
                    {cert.date}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
