import { motion, Variants } from "framer-motion";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaDiscord,
  FaArrowRight,
  FaCopy,
  FaCheck,
} from "react-icons/fa";
import { useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, type: "spring", stiffness: 100, damping: 20 },
};

const socialLinks = [
  {
    name: "GitHub",
    icon: <FaGithub className="text-2xl" />,
    url: "https://github.com/yuvrajsinh5252",
    color: "#6366f1",
    description: "Open source projects",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin className="text-2xl" />,
    url: "https://www.linkedin.com/in/yuvrajsinh099",
    color: "#0ea5e9",
    description: "Professional network",
  },
  {
    name: "Twitter",
    icon: <FaTwitter className="text-2xl" />,
    url: "https://x.com/Yuvrajsinh_099",
    color: "#06b6d4",
    description: "Tech thoughts & updates",
  },
  {
    name: "Discord",
    icon: <FaDiscord className="text-2xl" />,
    url: "https://discord.com/users/1035138685689139311",
    color: "#8b5cf6",
    description: "Gaming & community",
  },
];

export function ContactUs({
  activeSection,
  fadeIn,
}: {
  activeSection: string;
  fadeIn: any;
}) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const email = "yuvrajsinh476@gmail.com";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
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

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Enhanced animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotateX: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const orbVariants: Variants = {
    float: {
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      scale: [1, 1.1, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      {...fadeIn}
      initial="hidden"
      animate={activeSection === "contact" ? "visible" : "hidden"}
      className="max-w-7xl mx-auto py-16 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced floating background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={orbVariants}
          animate="float"
          className="absolute top-20 left-20 w-64 h-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <motion.div
          variants={orbVariants}
          animate="float"
          transition={{ delay: 2 }}
          className="absolute bottom-20 right-20 w-48 h-48 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)",
            filter: "blur(35px)",
          }}
        />
        <motion.div
          variants={orbVariants}
          animate="float"
          transition={{ delay: 4 }}
          className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)",
            filter: "blur(25px)",
          }}
        />

        {/* Interactive cursor effect */}
        <motion.div
          className="absolute w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 50%)",
            filter: "blur(30px)",
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header with enhanced animations */}
      <motion.div
        className="text-center mb-20 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={activeSection === "contact" ? "visible" : "hidden"}
      >
        <motion.div variants={cardVariants} className="relative inline-block">
          <motion.h2
            className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
            style={{
              filter: "drop-shadow(0 0 30px rgba(99, 102, 241, 0.3))",
            }}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
          >
            Let&apos;s Connect
          </motion.h2>

          {/* Animated underline */}
          <motion.div
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </motion.div>

        <motion.p
          variants={cardVariants}
          className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          whileHover={{
            y: -5,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
        >
          I&apos;m always open to new opportunities, collaborations, and
          interesting conversations. Feel free to reach out!
        </motion.p>
      </motion.div>

      {/* Enhanced cards container */}
      <motion.div
        variants={containerVariants}
        className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10"
      >
        {/* Enhanced email card */}
        <motion.div
          variants={cardVariants}
          className="relative group"
          whileHover={{
            y: -10,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

          <motion.div
            className="relative p-8 rounded-3xl backdrop-blur-xl border border-white/10 group-hover:border-white/30 transition-all duration-500 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)",
            }}
            whileHover={{
              scale: 1.02,
              rotateY: 5,
              transition: { type: "spring", stiffness: 200, damping: 20 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"
              animate={{
                background: [
                  "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.1) 100%)",
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)",
                  "linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(99, 102, 241, 0.1) 100%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10 flex items-center gap-6">
              <motion.div
                className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { type: "spring", stiffness: 400, damping: 20 },
                }}
              >
                <FaEnvelope className="text-4xl text-blue-400" />
              </motion.div>

              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-3 text-white">Email Me</h3>
                <motion.div
                  className="flex items-center gap-3 group/email cursor-pointer"
                  onClick={copyToClipboard}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg font-medium text-blue-300 group-hover/email:text-blue-200 transition-colors">
                    {email}
                  </span>
                  <motion.div
                    animate={copied ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {copied ? (
                      <FaCheck className="text-green-400 text-sm" />
                    ) : (
                      <FaCopy className="text-blue-400 text-sm opacity-0 group-hover/email:opacity-100 transition-all duration-300" />
                    )}
                  </motion.div>
                </motion.div>
                <p className="text-sm text-gray-400 mt-2">
                  {copied ? "Copied to clipboard!" : "Click to copy email"}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced social links card */}
        <motion.div
          variants={cardVariants}
          className="relative group"
          whileHover={{
            y: -10,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

          <motion.div
            className="relative p-8 rounded-3xl backdrop-blur-xl border border-white/10 group-hover:border-white/30 transition-all duration-500 overflow-hidden h-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)",
            }}
            whileHover={{
              scale: 1.02,
              rotateY: -5,
              transition: { type: "spring", stiffness: 200, damping: 20 },
            }}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-indigo-500/5"
              animate={{
                background: [
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(236, 72, 153, 0.1) 100%)",
                  "linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(79, 70, 229, 0.05) 100%)",
                  "linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(139, 92, 246, 0.1) 100%)",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10 h-full flex flex-col">
              <motion.h3
                className="text-2xl font-bold mb-6 text-white text-center"
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                Find Me On
              </motion.h3>

              <div className="grid grid-cols-2 gap-4 flex-grow">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social relative p-4 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${social.color}10 0%, transparent 100%)`,
                    }}
                    initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{
                      delay: 0.6 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      rotateZ: 2,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      },
                    }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setHoveredCard(social.name)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at center, ${social.color}20 0%, transparent 70%)`,
                        filter: "blur(10px)",
                      }}
                    />

                    <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                      <motion.div
                        className="text-gray-300 group-hover/social:text-white transition-colors duration-300"
                        style={{
                          color:
                            hoveredCard === social.name
                              ? social.color
                              : undefined,
                        }}
                        whileHover={{
                          scale: 1.2,
                          rotate: 10,
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 20,
                          },
                        }}
                      >
                        {social.icon}
                      </motion.div>
                      <div className="space-y-1">
                        <p
                          className="font-semibold transition-colors duration-300"
                          style={{
                            color:
                              hoveredCard === social.name
                                ? social.color
                                : "white",
                          }}
                        >
                          {social.name}
                        </p>
                        <motion.p
                          className="text-xs text-gray-400 group-hover/social:text-gray-300 transition-colors duration-300"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{
                            opacity: hoveredCard === social.name ? 1 : 0,
                            y: hoveredCard === social.name ? 0 : 10,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {social.description}
                        </motion.p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced decorative elements */}
      <motion.div
        className="absolute top-1/4 right-10 w-2 h-2 bg-blue-400 rounded-full opacity-60"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-10 w-1 h-1 bg-purple-400 rounded-full opacity-80"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.8, 0.4, 0.8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </motion.div>
  );
}
