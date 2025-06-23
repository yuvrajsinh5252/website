"use client";

import { motion } from "motion/react";
import { Mail } from "lucide-react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { useInView } from "motion/react";
import { useRef } from "react";

const socialLinks = [
  {
    name: "GitHub",
    icon: <SiGithub className="text-lg" />,
    url: "https://github.com/yuvrajsinh5252",
    username: "@yuvrajsinh5252",
  },
  {
    name: "LinkedIn",
    icon: <SiLinkedin className="text-lg" />,
    url: "https://www.linkedin.com/in/yuvrajsinh099",
    username: "yuvrajsinh099",
  },
  {
    name: "Twitter",
    icon: <SiX className="text-lg" />,
    url: "https://x.com/Yuvrajsinh_099",
    username: "@Yuvrajsinh_099",
  },
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const email = "yuvrajsinh476@gmail.com";

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col justify-center px-4 py-24"
      id="contact"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-16 h-0.5 bg-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            I'm always open to discussing new opportunities and interesting
            projects.
          </p>
        </motion.div>

        {/* Contact content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          {/* Email section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Mail size={20} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Email</h3>
                <p className="text-gray-400 text-sm">Drop me a message</p>
              </div>
            </div>
            <a
              href={`mailto:${email}`}
              className="inline-block text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
            >
              {email}
            </a>
          </div>

          {/* Social links */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-white mb-4">
              Find me on
            </h3>
            <div className="flex justify-center md:justify-end gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + index * 0.1,
                    ease: "easeOut",
                  }}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors duration-300 group"
                >
                  <div className="text-gray-400 group-hover:text-white transition-colors duration-300">
                    {social.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                      {social.name}
                    </p>
                    <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                      {social.username}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
