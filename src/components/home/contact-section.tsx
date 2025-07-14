"use client";

import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import { SiGithub, SiLinkedin, SiX, SiDiscord } from "react-icons/si";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";
import { ColorSwingBox } from "@/components/effects/color-swing-box";
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

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 relative"
      id="contact"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/4 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-blue-500/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-purple-500/5 blur-2xl"
          animate={{
            scale: [1, 0.8, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8">
            Let&apos;s Connect
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
            I&apos;m always open to new opportunities, collaborations, and
            interesting conversations. Feel free to reach out!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch"
        >
          <div className="min-h-[240px] sm:min-h-[280px] flex items-center">
            <ColorSwingBox>
              <div className="space-y-4 sm:space-y-6 w-full">
                <div className="flex items-center gap-3 sm:gap-4">
                  <motion.div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 flex items-center justify-center"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: {
                        type: "spring",
                        stiffness: 500,
                        damping: 18,
                      },
                    }}
                  >
                    <FaEnvelope
                      size={18}
                      className="text-blue-400 sm:text-[20px]"
                    />
                  </motion.div>
                  <div className="text-left">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">
                      Email Me
                    </h3>
                    <p className="text-gray-400 text-sm">Drop me a message</p>
                  </div>
                </div>

                <motion.div
                  className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
                  onClick={copyToClipboard}
                  whileHover={{
                    x: 5,
                    transition: { type: "spring", stiffness: 500, damping: 18 },
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { type: "spring", stiffness: 500, damping: 18 },
                  }}
                >
                  <span className="text-base sm:text-lg text-blue-300 font-medium group-hover:text-blue-200 transition-colors truncate">
                    {email}
                  </span>
                  <motion.div
                    animate={
                      copied
                        ? {
                            scale: [1, 1.3, 1],
                            rotate: [0, 360, 0],
                          }
                        : {}
                    }
                    transition={{ duration: 0.5 }}
                    className="flex-shrink-0"
                  >
                    {copied ? (
                      <FaCheck className="text-green-400 text-sm" />
                    ) : (
                      <motion.div
                        whileHover={{
                          scale: 1.2,
                          transition: {
                            type: "spring",
                            stiffness: 500,
                            damping: 18,
                          },
                        }}
                      >
                        <FaCopy className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
                <motion.p
                  className="text-sm text-gray-500"
                  animate={
                    copied
                      ? {
                          color: "#10b981",
                          scale: [1, 1.05, 1],
                        }
                      : {}
                  }
                  transition={{ duration: 0.3 }}
                >
                  {copied ? "Copied to clipboard!" : "Click to copy email"}
                </motion.p>
              </div>
            </ColorSwingBox>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 h-full">
              {SOCIAL_LINKS.filter((link) => link.name !== "Email").map(
                (social, index) => {
                  const Icon = iconMap[social.icon];
                  return (
                    <motion.div
                      key={social.name}
                      className="min-h-[100px] sm:min-h-[120px]"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={
                        isInView
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.8 }
                      }
                      transition={{
                        delay: 0.3 + index * 0.06,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                    >
                      <ColorSwingBox>
                        <motion.a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col items-center justify-center w-full h-full text-center"
                          whileHover={{
                            scale: 1.05,
                            transition: {
                              type: "spring",
                              stiffness: 500,
                              damping: 18,
                            },
                          }}
                        >
                          <motion.div
                            className="text-gray-400 group-hover:text-white transition-colors duration-200 mb-2 sm:mb-3"
                            whileHover={{
                              scale: 1.2,
                              rotate: 5,
                              transition: {
                                type: "spring",
                                stiffness: 500,
                                damping: 18,
                              },
                            }}
                          >
                            <motion.div
                              className="flex items-center gap-1"
                              whileHover={{
                                scale: 1.1,
                                transition: {
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 18,
                                },
                              }}
                            >
                              {Icon && <Icon className="text-xl" />}
                            </motion.div>
                          </motion.div>
                          <div className="text-center space-y-0.5 sm:space-y-1">
                            <p className="font-medium text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors duration-200">
                              {social.name}
                            </p>
                            <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-200">
                              {social.username}
                            </p>
                          </div>
                        </motion.a>
                      </ColorSwingBox>
                    </motion.div>
                  );
                }
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
