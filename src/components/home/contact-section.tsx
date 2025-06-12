"use client";

import { motion } from "motion/react";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaDiscord,
} from "react-icons/fa";
import { useState } from "react";
import { useInView } from "motion/react";
import { useRef } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const socialLinks = [
  {
    name: "GitHub",
    icon: <FaGithub className="text-2xl" />,
    url: "https://github.com/yuvrajsinh5252",
    color: "#8a8a8a",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin className="text-2xl" />,
    url: "https://www.linkedin.com/in/yuvrajsinh099",
    color: "#63b3e5",
  },
  {
    name: "Twitter",
    icon: <FaTwitter className="text-2xl" />,
    url: "https://x.com/Yuvrajsinh_099",
    color: "#4dc6ff",
  },
  {
    name: "Discord",
    icon: <FaDiscord className="text-2xl" />,
    url: "https://discord.com/users/1035138685689139311",
    color: "#9eb3ea",
  },
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const email = "yuvrajsinh476@gmail.com";

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col justify-center px-4 py-16"
      id="contact"
    >
      <motion.div
        {...fadeIn}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto py-16 relative"
      >
        <motion.div className="text-center mb-16 relative">
          <motion.h2
            {...fadeInUp}
            className="text-5xl font-bold mb-6 bg-clip-text"
          >
            Let&apos;s Connect
          </motion.h2>
          <motion.p
            {...fadeInUp}
            className="text-lg text-gray-400/90 max-w-2xl mx-auto leading-relaxed"
          >
            I&apos;m always open to new opportunities, collaborations, and
            interesting conversations. Feel free to reach out!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="relative group flex justify-center"
          >
            <a href={`mailto:${email}`} className="block w-full">
              <div
                className={`
                  p-8 max-sm:p-4 rounded-2xl h-full w-full
                  bg-gray-600/20 backdrop-blur-lg
                  border border-white/10
                  transition-colors duraiton-200
                  group-hover:border-white/20
                  group-hover:shadow-lg group-hover:shadow-blue-500/10
                  overflow-hidden
                  relative
                `}
              >
                <div
                  className={`
                    absolute inset-0 rounded-xl opacity-0
                    group-hover:opacity-20 transition-opacity
                    bg-gradient-to-r from-blue-400 to-sky-500
                    blur-xl
                  `}
                />

                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <FaEnvelope className="text-2xl text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Send me an email
                  </h3>
                  <p className="text-gray-300 mb-4">{email}</p>
                  <p className="text-sm text-gray-400">
                    Click to open your email client
                  </p>
                </div>
              </div>
            </a>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="relative group flex justify-center items-center"
          >
            <div
              className={`
                flex justify-center items-center w-full
                rounded-2xl h-full max-sm:py-4
                bg-gray-600/20 backdrop-blur-lg
                transition-colors duraiton-200
                border border-white/10
                hover:border-white/20
                hover:shadow-lg hover:shadow-purple-500/10
                overflow-hidden
              `}
            >
              <div
                className={`
                absolute inset-0 rounded-xl opacity-0
                group-hover:opacity-20
                bg-gradient-to-r from-purple-400 to-pink-500
                blur-xl
              `}
              />

              <div className="relative z-10 grid grid-cols-2 gap-4 p-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredCard(social.name)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="group/social flex flex-col gap-2 p-3 rounded-xl hover:bg-white/[0.05]
                      relative overflow-hidden text-center"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className="transition-transform group-hover/social:scale-110"
                        style={{
                          color:
                            hoveredCard === social.name
                              ? social.color
                              : "currentColor",
                        }}
                      >
                        {social.icon}
                      </div>
                      <div
                        className="text-sm font-medium transition-colors"
                        style={{
                          color:
                            hoveredCard === social.name
                              ? social.color
                              : "currentColor",
                        }}
                      >
                        {social.name}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
