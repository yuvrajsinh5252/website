import { SKILLS, type Skill } from "@/config/skills";

export function SkillsGrid({ skills = SKILLS }: { skills?: Skill[] }) {
  return (
    <ul className="flex flex-wrap gap-2.5" aria-label="Skills">
      {skills.map((skill) => {
        const Icon = skill.icon;

        return (
          <li key={skill.name}>
            <a
              href={skill.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-gray-300 transition-colors duration-150 hover:border-white/20 hover:bg-white/10 hover:text-white"
              aria-label={`Learn more about ${skill.name}`}
            >
              {Icon && (
                <Icon
                  className="h-4 w-4 text-blue-300 transition-colors duration-150 group-hover:text-blue-200"
                  aria-hidden="true"
                />
              )}
              {skill.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
