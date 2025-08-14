"use client";

import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import { SiGithub, SiLinkedin, SiX, SiDiscord } from "react-icons/si";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SOCIAL_LINKS } from "@/config/social-links";
import { IconType } from "react-icons";

const iconMap: { [key: string]: IconType } = {
  FaGithub: SiGithub,
  FaLinkedin: SiLinkedin,
  FaTwitter: SiX,
  FaDiscord: SiDiscord,
};

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const email = "yuvrajsinh476@gmail.com";

  const socials = SOCIAL_LINKS.filter((link) => link.name !== "Email");

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-16 relative"
      id="contact"
    >
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-center space-y-16"
        >
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Get in touch
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
              I&apos;m always excited to connect with fellow developers,
              collaborate on interesting projects, or just have a chat.
            </p>
          </div>

          <div className="flex justify-center">
            <motion.a
              href={`mailto:${email}`}
              className="group relative"
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative px-6 sm:px-8 py-4 sm:py-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-150">
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(59, 130, 246, 0.1), transparent 70%)",
                  }}
                />

                <div className="relative flex items-center gap-3 sm:gap-4">
                  <FaEnvelope className="text-xl sm:text-2xl text-blue-400" />
                  <div className="text-left">
                    <p className="text-xs sm:text-sm text-gray-400 mb-1">
                      Email me at
                    </p>
                    <p className="text-sm sm:text-lg font-medium text-white break-all">
                      {email}
                    </p>
                  </div>
                </div>
              </div>
            </motion.a>
          </div>

          <div className="space-y-8">
            <h3 className="text-lg sm:text-xl font-medium text-gray-300">
              Or connect with me on
            </h3>

            <div
              className="flex justify-center gap-4 sm:gap-6 items-center flex-wrap"
              style={{ minHeight: "80px" }}
            >
              {socials.map((social, index) => {
                const Icon = iconMap[social.icon];
                return (
                  <motion.div
                    key={social.name}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ delay: 0.5 + index * 0.05 }}
                  >
                    <motion.a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block relative w-14 sm:w-16"
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-150 flex items-center justify-center z-20">
                        <motion.div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                          style={{
                            background: `radial-gradient(circle at center, ${social.color}20, transparent)`,
                          }}
                        />

                        {Icon && (
                          <Icon
                            className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 text-gray-300 group-hover:text-white transition-colors duration-150"
                            style={{
                              filter: `drop-shadow(0 0 10px ${social.color}60)`,
                            }}
                          />
                        )}
                      </div>
                    </motion.a>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.2 }}
            className="pt-8"
          >
            <p className="text-gray-400">
              Looking forward to hearing from you!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
