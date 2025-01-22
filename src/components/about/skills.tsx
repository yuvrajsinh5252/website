import { motion } from "framer-motion";
import { FaCode, FaTerminal, FaLightbulb } from "react-icons/fa";

export function Skills({
  activeSection,
  fadeIn,
}: {
  activeSection: string;
  fadeIn: any;
}) {
  const skills = [
    {
      icon: <FaCode className="text-5xl text-blue-400/90" />,
      title: "Software Development",
      description: "I love to build web applications, APIs, and CLI/TUI tools",
      type: "description",
    },
    {
      icon: <FaLightbulb className="text-4xl text-yellow-400" />,
      title: "Areas of Interest",
      tags: ["Web Development", "System Design", "Open Source", "IoT"],
      type: "tags",
    },
    {
      icon: <FaTerminal className="text-4xl text-purple-400" />,
      title: "Programming Languages",
      tags: ["TypeScript", "Python", "C++", "Rust", "Go"],
      type: "tags",
    },
  ];

  return (
    <motion.div
      {...fadeIn}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={activeSection === "skills" ? "visible" : "hidden"}
      className="max-w-5xl mx-auto px-4"
    >
      <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">
        Skills & Expertise
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={
              activeSection === "skills"
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ delay: index * 0.2 }}
            className="relative p-6 rounded-lg border border-gray-800/30 hover:border-gray-700/50
                 backdrop-blur-md dark:bg-gray-500/5 bg-black/10 transition-all duration-300 ease-out hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="p-3 rounded-full
                bg-gradient-to-br from-gray-100/90 to-gray-50/90
                dark:from-gray-800/90 dark:to-gray-900/90
                shadow-inner shadow-gray-500/10 dark:shadow-black/20
                group-hover:shadow-gray-500/20 dark:group-hover:shadow-black/30
                transition duration-300"
              >
                {skill.icon}
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3">{skill.title}</h3>
                {skill.type === "description" ? (
                  <p className="dark:text-gray-400 text-gray-500 text-sm leading-relaxed">
                    {skill.description}
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {skill.tags?.map((tag, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
                          backgroundColor: "rgba(59, 130, 246, 0.2)",
                          borderColor: "rgba(59, 130, 246, 0.8)",
                        }}
                        className="px-3 skill-tag py-1 text-xs rounded-full bg-gray-800/30 backdrop-blur-sm text-gray-200 border border-gray-700/30 transition-all duration-300 ease-in-out dark:hover:text-blue-300 hover:text-blue-500 cursor-default"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
