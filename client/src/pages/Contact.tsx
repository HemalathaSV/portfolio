import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { useSubmitContact } from "@/hooks/use-portfolio";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, Mail, MapPin, Phone } from "lucide-react";

const formSchema = api.contact.submit.input;
type FormSchema = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { mutate: submitMessage, isPending } = useSubmitContact();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: FormSchema) => {
    submitMessage(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
          variant: "default",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-20 container mx-auto px-4">
      <SectionHeader title="Get In Touch" subtitle="Contact" />

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="prose prose-invert">
            <p className="text-xl text-muted-foreground leading-relaxed">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Email Me</h4>
                <a href="mailto:heamalathasv@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                  heamalathasv@gmail.com
                </a>
              </div>
            </div>


          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card/50 p-8 rounded-2xl border border-white/5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">Name</label>
              <input
                {...form.register("name")}
                className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                placeholder="John Doe"
              />
              {form.formState.errors.name && (
                <p className="mt-1 text-sm text-red-400">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
              <input
                {...form.register("email")}
                type="email"
                className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                placeholder="john@example.com"
              />
              {form.formState.errors.email && (
                <p className="mt-1 text-sm text-red-400">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">Message</label>
              <textarea
                {...form.register("message")}
                rows={5}
                className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                placeholder="Tell me about your project..."
              />
              {form.formState.errors.message && (
                <p className="mt-1 text-sm text-red-400">{form.formState.errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white font-bold text-lg hover:shadow-[0_0_20px_rgba(0,207,255,0.3)] hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
