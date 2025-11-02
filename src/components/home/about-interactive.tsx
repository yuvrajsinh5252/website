"use client";

import { useState } from "react";
import Image from "next/image";
import { FaExternalLinkAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";

interface WorkExperience {
  title: string;
  company: string;
  companyUrl: string;
  location: string;
  dates: string;
  logo?: string;
}

interface Education {
  institution: string;
  institutionUrl: string;
  degree: string;
  location: string;
  dates: string;
  status: string;
  logo?: string;
}

interface AboutInteractiveProps {
  workExperience: WorkExperience[];
  education: Education[];
}

export function AboutInteractive({
  workExperience,
  education,
}: AboutInteractiveProps) {
  const [expandedWork, setExpandedWork] = useState(false);
  const [expandedEducation, setExpandedEducation] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-lg">
          <h3 className="text-lg font-semibold mb-4 ml-2 text-white">
            Work Experience
          </h3>
          <div className="space-y-3">
            {workExperience
              .slice(0, expandedWork ? workExperience.length : 1)
              .map((work, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 transition-all"
                >
                  <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden">
                    {work.logo ? (
                      <Image
                        src={work.logo}
                        alt={work.company}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-blue-400 text-xs font-semibold">
                        {work.company.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="text-base font-semibold text-white">
                        {work.title}
                      </h4>
                      <span className="px-1.5 py-0.5 text-xs font-medium text-blue-200 bg-blue-500/20 rounded-full">
                        {work.location}
                      </span>
                    </div>
                    <a
                      href={work.companyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm transition-colors inline-flex items-center gap-1 mb-1"
                    >
                      {work.company}
                      <FaExternalLinkAlt className="text-[10px]" />
                    </a>
                    <p className="text-gray-500 text-xs">{work.dates}</p>
                  </div>
                </div>
              ))}
            {workExperience.length > 1 && (
              <button
                onClick={() => setExpandedWork(!expandedWork)}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs text-gray-400 hover:text-blue-400 transition-colors"
              >
                {expandedWork ? (
                  <>
                    <FaChevronUp className="text-[10px]" />
                    <span>Show Less</span>
                  </>
                ) : (
                  <>
                    <FaChevronDown className="text-[10px]" />
                    <span>Show {workExperience.length - 1} More</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-full max-w-lg">
          <div className="flex gap-2 mb-4 ml-2">
            <svg
              className="w-5 h-5 text-purple-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 01.787 1.838l-4 1.714a1 1 0 01-.788 0l-4-1.714a1 1 0 01.788-1.838l1.94-.831-1.94-.831a1 1 0 01-.788-1.838l4-1.714a1 1 0 01.394-.257l7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            <h3 className="text-lg font-semibold text-white">Education</h3>
          </div>
          <div className="space-y-3">
            {education
              .slice(0, expandedEducation ? education.length : 1)
              .map((edu, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 transition-all"
                >
                  <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden">
                    {edu.logo ? (
                      <Image
                        src={edu.logo}
                        alt={edu.institution || edu.degree}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-purple-400 text-xs font-semibold">
                        {edu.institution
                          ? edu.institution.charAt(0)
                          : edu.degree.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {edu.institution ? (
                        <a
                          href={edu.institutionUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-base font-semibold text-white hover:text-purple-300 transition-colors inline-flex items-center gap-1"
                        >
                          {edu.institution}
                          <FaExternalLinkAlt className="text-[10px]" />
                        </a>
                      ) : (
                        <span className="text-base font-semibold text-white">
                          {edu.degree}
                        </span>
                      )}
                      <span
                        className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${
                          edu.status === "Current"
                            ? "text-green-200 bg-green-500/20"
                            : "text-blue-200 bg-blue-500/20"
                        }`}
                      >
                        {edu.status}
                      </span>
                    </div>
                    {edu.institution && (
                      <p className="text-gray-400 text-sm">{edu.degree}</p>
                    )}
                    <p className="text-gray-400 text-sm">{edu.location}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{edu.dates}</p>
                  </div>
                </div>
              ))}
            {education.length > 1 && (
              <button
                onClick={() => setExpandedEducation(!expandedEducation)}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs text-gray-400 hover:text-purple-400 transition-colors"
              >
                {expandedEducation ? (
                  <>
                    <FaChevronUp className="text-[10px]" />
                    <span>Show Less</span>
                  </>
                ) : (
                  <>
                    <FaChevronDown className="text-[10px]" />
                    <span>Show {education.length - 1} More</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
