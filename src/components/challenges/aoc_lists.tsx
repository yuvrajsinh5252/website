"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CategoryCard } from "./category_card";
import { CategoryListMeta } from "@/types/challenge";
import { useState, useMemo } from "react";
import { HiMagnifyingGlass, HiFunnel } from "react-icons/hi2";

const headerVariants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
};

interface FilterState {
  search: string;
  year: string;
  sortBy: "day" | "title" | "year";
  sortOrder: "asc" | "desc";
}

export function AocList({ categories }: { categories: CategoryListMeta[] }) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    year: "all",
    sortBy: "day",
    sortOrder: "asc",
  });

  const [filtersEnabled, setFiltersEnabled] = useState(false);

  const availableYears = useMemo(() => {
    const yearCounts = categories.reduce((acc, cat) => {
      if (cat.year) {
        acc[cat.year] = (acc[cat.year] || 0) + 1;
      }
      return acc;
    }, {} as Record<number, number>);

    const years = Object.keys(yearCounts)
      .map(Number)
      .sort((a, b) => b - a)
      .map((year) => ({ year, count: yearCounts[year] }));

    return years;
  }, [categories]);

  const filteredCategories = useMemo(() => {
    let filtered = categories.filter((category) => {
      const searchMatch =
        filters.search === "" ||
        category.title.toLowerCase().includes(filters.search.toLowerCase());

      const yearMatch =
        !filtersEnabled ||
        filters.year === "all" ||
        category.year?.toString() === filters.year;

      return searchMatch && yearMatch;
    });

    if (filtersEnabled) {
      filtered.sort((a, b) => {
        let comparison = 0;

        switch (filters.sortBy) {
          case "day":
            comparison = (a.day || 0) - (b.day || 0);
            break;
          case "title":
            comparison = a.title.localeCompare(b.title);
            break;
          case "year":
            comparison = (a.year || 0) - (b.year || 0);
            break;
        }

        return filters.sortOrder === "desc" ? -comparison : comparison;
      });
    }

    return filtered;
  }, [categories, filters, filtersEnabled]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ search: "", year: "all", sortBy: "day", sortOrder: "asc" });
  };

  return (
    <motion.div
      className="space-y-4 mt-12 sm:mt-14 md:mt-16"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="w-full pl-9 pr-16 py-2 text-sm bg-gray-800/40 border border-gray-700/50 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs text-gray-400 bg-gray-700/50 rounded border border-gray-600/50">
              {filteredCategories.length}/{categories.length}
            </div>
          </div>

          <button
            onClick={() => setFiltersEnabled(!filtersEnabled)}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-md transition-all ${
              filtersEnabled
                ? "bg-blue-600/80 text-white hover:bg-blue-600"
                : "bg-gray-700/50 text-gray-400 hover:bg-gray-700"
            }`}
          >
            <HiFunnel className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        <AnimatePresence>
          {filtersEnabled && (
            <motion.div
              className="flex items-center gap-2 p-3 bg-gray-800/25 border border-gray-700/40 rounded-md overflow-hidden"
              initial={{ opacity: 0, scaleY: 0, transformOrigin: "top" }}
              animate={{
                opacity: 1,
                scaleY: 1,
                transition: {
                  duration: 0.3,
                  ease: [0.04, 0.62, 0.23, 0.98],
                },
              }}
              exit={{
                opacity: 0,
                scaleY: 0,
                transition: {
                  duration: 0.2,
                  ease: [0.04, 0.62, 0.23, 0.98],
                },
              }}
            >
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-400 whitespace-nowrap">
                  Year:
                </label>
                <select
                  value={filters.year}
                  onChange={(e) => updateFilter("year", e.target.value)}
                  className="px-2 py-1 text-xs bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  {availableYears.map(({ year, count }) => (
                    <option key={year} value={year.toString()}>
                      {year} ({count})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-400 whitespace-nowrap">
                  Sort:
                </label>
                <div className="flex gap-1">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => updateFilter("sortBy", e.target.value)}
                    className="px-2 py-1 text-xs bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="day">Day</option>
                    <option value="title">Title</option>
                    <option value="year">Year</option>
                  </select>
                  <button
                    onClick={() =>
                      updateFilter(
                        "sortOrder",
                        filters.sortOrder === "asc" ? "desc" : "asc"
                      )
                    }
                    className="px-2 py-1 text-xs bg-gray-700 border border-gray-600 rounded text-white hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  >
                    {filters.sortOrder === "asc" ? "↑" : "↓"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        layout
        transition={{
          layout: {
            duration: 0.4,
            ease: [0.04, 0.62, 0.23, 0.98],
          },
        }}
      >
        {filteredCategories.length > 0 ? (
          <motion.div
            variants={sectionVariants}
            whileHover={{
              scale: 1.002,
              transition: { duration: 0.2 },
            }}
          >
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, staggerChildren: 0.05 }}
            >
              {filteredCategories.map((category, index) => {
                return (
                  <motion.div
                    key={`${category.year}-${category.day}-${category.slug}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + index * 0.03, duration: 0.15 }}
                  >
                    <CategoryCard
                      title={category.title}
                      href={`/challenges/aoc/${category.year}/${category.slug}`}
                      index={index}
                      year={category.year}
                      day={category.day}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-gray-400 text-sm mb-3">
              {filters.search || (filtersEnabled && filters.year !== "all")
                ? "No problems match your criteria."
                : "No problems available."}
            </p>
            {(filters.search || (filtersEnabled && filters.year !== "all")) && (
              <button
                onClick={resetFilters}
                className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
              >
                Clear Filters
              </button>
            )}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
