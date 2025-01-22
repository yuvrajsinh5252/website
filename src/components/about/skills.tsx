import { motion } from "framer-motion";
import {
  FaCode,
  FaTerminal,
  FaLightbulb,
  FaDatabase,
  FaCloud,
  FaMobile,
} from "react-icons/fa";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export function Skills({
  activeSection,
  fadeIn,
}: {
  activeSection: string;
  fadeIn: any;
}) {
  const skills = [
    {
      icon: <FaCode />,
      title: "Frontend",
      description: "Creating beautiful & responsive web applications",
      tags: ["React", "Next.js", "TypeScript", "TailwindCSS"],
      color: "from-cyan-400 to-blue-500",
      shadowColor: "cyan",
    },
    {
      icon: <FaDatabase />,
      title: "Backend",
      description: "Building robust & scalable server solutions",
      tags: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
      color: "from-green-400 to-emerald-500",
      shadowColor: "green",
    },
    {
      icon: <FaCloud />,
      title: "DevOps",
      description: "Managing cloud infrastructure & deployment",
      tags: ["AWS", "Docker", "CI/CD", "Kubernetes"],
      color: "from-purple-400 to-indigo-500",
      shadowColor: "purple",
    },
    {
      icon: <FaMobile />,
      title: "Mobile",
      description: "Developing cross-platform mobile apps",
      tags: ["React Native", "Flutter", "iOS", "Android"],
      color: "from-pink-400 to-rose-500",
      shadowColor: "pink",
    },
    {
      icon: <FaTerminal />,
      title: "Tools",
      description: "Utilizing modern development tools",
      tags: ["Git", "VS Code", "Figma", "Postman"],
      color: "from-amber-400 to-orange-500",
      shadowColor: "amber",
    },
    {
      icon: <FaLightbulb />,
      title: "Soft Skills",
      description: "Bringing ideas to life with collaboration",
      tags: ["Leadership", "Communication", "Agile", "Problem Solving"],
      color: "from-red-400 to-rose-500",
      shadowColor: "red",
    },
  ];

  return (
    <motion.div
      {...fadeIn}
      initial="hidden"
      animate={activeSection === "skills" ? "visible" : "hidden"}
      className="max-w-7xl mx-auto px-4 py-16"
    >
      <motion.h2
        {...fadeInUp}
        className="text-4xl font-bold text-center mb-16 tracking-tight"
      >
        Skills & Expertise
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -5 }}
            className={`
              relative p-6 rounded-xl
              bg-gray-800/10 dark:bg-gray-800/30 backdrop-blur-sm
              border border-gray-800/50
              hover:border-${skill.shadowColor}-500/50
              group
              hover:shadow-lg hover:shadow-${skill.shadowColor}-500/20
            `}
          >
            {/* Glow Effect */}
            <div
              className={`
              absolute inset-0 rounded-xl opacity-0
              group-hover:opacity-20 transition-opacity duration-500
              bg-gradient-to-r ${skill.color}
              blur-xl
            `}
            />

            <div className="relative flex flex-col gap-4">
              {/* Icon */}
              <div className="flex justify-between items-center">
                <h3
                  className={`
                  text-xl font-semibold mb-2
                  bg-gradient-to-r ${skill.color}
                  bg-clip-text text-transparent
                `}
                >
                  {skill.title}
                </h3>
                <div
                  className={`
                w-12 h-12 flex items-center justify-center
                rounded-lg text-2xl
                bg-gradient-to-r ${skill.color}
                group-hover:scale-110 transition-transform
              `}
                >
                  {skill.icon}
                </div>
              </div>

              {/* Content */}
              <div>
                <p className="text-sm mb-4">{skill.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`
                        px-3 py-1 text-xs rounded-full
                        backdrop-blur-sm bg-gray-400/10
                        group-hover:border-${skill.shadowColor}-500/30
                        group-hover:text-${skill.shadowColor}-400
                      `}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
