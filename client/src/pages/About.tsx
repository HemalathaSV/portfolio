import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { useEducation, useCertifications } from "@/hooks/use-portfolio";
import { Calendar, Award, GraduationCap } from "lucide-react";

export default function About() {
  const { data: education, isLoading: eduLoading } = useEducation();
  const { data: certifications, isLoading: certLoading } = useCertifications();

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
            I am a passionate <span className="text-foreground font-semibold">AI & ML Engineer</span> with a strong background in building scalable data pipelines and intelligent systems.
          </p>
          <p className="leading-relaxed">
            My journey began with a fascination for data and patterns. Over the years, I've honed my skills in Python, TensorFlow, and cloud architectures to solve real-world problems. Whether it's optimizing a recommendation engine or deploying a computer vision model to the edge, I thrive on the challenge.
          </p>
          <p className="leading-relaxed">
            When I'm not coding, I'm exploring new research papers, contributing to open source, or mentoring aspiring developers in the community.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
            <div className="p-4 rounded-xl bg-card border border-white/5">
              <div className="text-3xl font-bold text-primary mb-1">50+</div>
              <div className="text-sm">Projects Completed</div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-white/5">
              <div className="text-3xl font-bold text-secondary mb-1">10+</div>
              <div className="text-sm">Certifications</div>
            </div>
          </div>
        </motion.div>

        {/* Timeline / Education */}
        <div className="space-y-12">
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
