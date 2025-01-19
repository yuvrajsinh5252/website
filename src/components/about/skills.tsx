import { motion } from "framer-motion";
import { FaCode, FaMicrochip, FaTerminal } from "react-icons/fa";

export function Skills({
  activeSection,
  fadeIn,
}: {
  activeSection: string;
  fadeIn: any;
}) {
  const skills = [
    {
      icon: <FaCode className="text-4xl text-blue-400" />,
      title: "Software Development",
      description: "Full-stack development with React, Next.js, and Node.js",
    },
    {
      icon: <FaMicrochip className="text-4xl text-green-400" />,
      title: "PCB Design",
      description: "Designing and implementing PCB circuits",
    },
    {
      icon: <FaTerminal className="text-4xl text-purple-400" />,
      title: "Programming Languages",
      description: "TypeScript, Python, C, C++, Java, Rust, Go",
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
    >
      <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-12 sm:mb-16 bg-clip-text bg-gradient-to-r from-white to-gray-400">
        Skills & Expertise
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
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
            className="p-6 sm:p-8 rounded-xl border border-gray-800 hover:border-gray-600 transition-all duration-300 backdrop-blur-sm bg-white/5 hover:bg-white/10 group"
          >
            <div className="flex flex-col items-center text-center space-y-4 sm:space-y-5">
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                {skill.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold">
                {skill.title}
              </h3>
              <p className="text-base sm:text-lg">{skill.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
