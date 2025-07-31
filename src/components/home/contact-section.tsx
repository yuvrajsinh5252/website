"use client";

import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import { SiGithub, SiLinkedin, SiX, SiDiscord } from "react-icons/si";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";
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
  const [copied, setCopied] = useState(false);
  const email = "yuvrajsinh476@gmail.com";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
          <div className="space-y-6">
            <h2 className="text-5xl lg:text-6xl font-bold text-white">
              Get in touch
            </h2>
            <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
              I'm always excited to connect with fellow developers, collaborate
              on interesting projects, or just have a chat.
            </p>
          </div>

          <div className="flex justify-center">
            <motion.button
              onClick={copyToClipboard}
              className="group relative"
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative px-8 py-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-150">
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(59, 130, 246, 0.1), transparent 70%)",
                  }}
                />

                <div className="relative flex items-center gap-4">
                  <FaEnvelope className="text-2xl text-blue-400" />
                  <div className="text-left">
                    <p className="text-sm text-gray-400 mb-1">Email me at</p>
                    <p className="text-lg font-medium text-white">{email}</p>
                  </div>
                  <div className="ml-4">
                    {copied ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <FaCheck className="text-green-400" />
                      </motion.div>
                    ) : (
                      <FaCopy className="text-gray-400 group-hover:text-white transition-colors duration-150" />
                    )}
                  </div>
                </div>
              </div>

              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-400 pointer-events-none"
                initial={{ opacity: 0, y: -10 }}
                animate={copied ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                {copied && "Copied to clipboard!"}
              </motion.div>
            </motion.button>
          </div>

          <div className="space-y-8">
            <h3 className="text-xl font-medium text-gray-300">
              Or connect with me on
            </h3>

            <div
              className="flex justify-center gap-6 items-center"
              style={{ minHeight: "100px" }}
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
                      className="group block relative w-16"
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="relative w-16 h-16 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-150 flex items-center justify-center z-20">
                        <motion.div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                          style={{
                            background: `radial-gradient(circle at center, ${social.color}20, transparent)`,
                          }}
                        />

                        {Icon && (
                          <Icon
                            className="relative z-10 w-7 h-7 text-gray-300 group-hover:text-white transition-colors duration-150"
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
