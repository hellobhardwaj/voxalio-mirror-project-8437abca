import { motion } from "framer-motion";
import { Phone, FileText, Headphones, CheckCircle, Calendar, Layers } from "lucide-react";

const useCases = [
  { icon: Phone, title: "Front-Desk", description: "Our AI assistant handles incoming calls and seamlessly transfers them to the right team members when needed." },
  { icon: FileText, title: "Transcription", description: "Our AI captures customer inquiries, transcribes them, and sends them straight to your inbox when you're unavailable." },
  { icon: Headphones, title: "Customer Service", description: "Let our AI handle customer inquiries 24/7. Through our platform, you can precisely configure the AI's responses." },
  { icon: CheckCircle, title: "Order Processing", description: "Provide fast service with automated 24/7 request processing." },
  { icon: Calendar, title: "Appointment Scheduling", description: "Our AI schedules appointments during calls — compatible with all calendars supported by cal.com." },
  { icon: Layers, title: "100+ More Use Cases", description: "Explore our full library of use cases tailored to every industry and workflow." },
];

const UseCasesSection = () => (
  <section className="vox-section-dark py-24" id="use-cases">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Use Cases for AI Calls with Voxalio
          </h2>
          <p className="mt-4 text-sm leading-relaxed opacity-70">
            Our AI call assistant adapts flexibly to your needs and integrates seamlessly with your systems like calendars and CRMs. AI calls that truly make sense!
          </p>
        </motion.div>
        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          href="#start"
          className="vox-gradient-bg text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity self-start"
        >
          Sign up now
        </motion.a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
        {useCases.map((uc, i) => (
          <motion.div
            key={uc.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <uc.icon className="w-5 h-5 opacity-70" />
              <h3 className="font-semibold">{uc.title}</h3>
            </div>
            <p className="text-sm opacity-60 leading-relaxed">{uc.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default UseCasesSection;
