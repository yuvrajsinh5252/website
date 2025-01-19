import Link from "next/link";
import { SiGmail, SiLinkedin, SiGithub } from "react-icons/si";
import { motion } from "framer-motion";

export function ContactUs({ activeSection }: { activeSection: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={activeSection === "contact" ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col gap-8 items-center justify-center p-5 max-w-4xl mx-auto"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl max-sm:text-3xl font-bold text-center"
      >
        Let&lsquo;s build something amazing together!
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg max-sm:text-[16px] text-center mb-8"
      >
        <p className="mb-2">
          I&lsquo;m always open to new projects, collaborations, and
          opportunities.
        </p>
        <p>
          Feel free to reach out if you have any questions or just want to say
          hi!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap gap-6 justify-center mb-8"
      >
        {[
          {
            icon: SiGmail,
            href: "mailto:yuvrajsinh476@gmail.com",
          },
          {
            icon: SiLinkedin,
            href: "https://linkedin.com/in/yuvrajsinh099",
          },
          {
            icon: SiGithub,
            href: "https://github.com/YourUsername",
          },
        ].map((social, index) => (
          <Link
            key={index}
            href={social.href}
            className="flex flex-col items-center gap-2 group"
          >
            <social.icon className="w-8 h-8 text-blue-500 group-hover:text-blue-600 transition-colors" />
          </Link>
        ))}
      </motion.div>
    </motion.div>
  );
}
