import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, PostMeta } from "@/types/post";
import {
  ChallengesList,
  CategoryListMeta,
  CategoryItem,
} from "@/types/challenge";

interface ChallengesContent {
  categories: { data: any; content: string }[];
  categoryDetails: { data: any };
}

const contentDirectory = path.join(process.cwd(), "src/content");

export function getPosts(): PostMeta[] {
  const postsDirectory = path.join(contentDirectory, "posts");

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(postsDirectory);
  const posts: PostMeta[] = [];

  for (const file of files) {
    if (file.endsWith(".mdx")) {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(contentDirectory, "posts", `${slug}.mdx`);

      if (!fs.existsSync(filePath)) {
        continue;
      }

      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      try {
        posts.push({
          slug,
          title: data.title,
          description: data.description,
          date: data.date,
          readingTime: data.readingTime,
          tags: data.tags,
          coverImage: data.coverImage,
        });
      } catch (error) {
        console.error(`Error reading post for ${slug}:`, error);
        continue;
      }
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPost(slug: string): Post | null {
  try {
    const filePath = path.join(contentDirectory, "posts", `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      content,
    };
  } catch (error) {
    console.error(`Error reading post for ${slug}:`, error);
    return null;
  }
}

// Get the list of all the challenges on the /challenges page
export function getChallenges(): ChallengesList[] {
  const challengesData = getChallengesContent();
  const challenges: ChallengesList[] = [];

  for (const challenge of challengesData) {
    const data = challenge.categoryDetails.data;

    challenges.push({
      slug: data.slug,
      title: data.title,
      description: data.description,
      category: data.category,
      date: data.date,
      coverImage: data.coverImage,
    });
  }

  return challenges;
}

// Get the list of all the subcategory challenges
export function getCategoryList(): CategoryListMeta[] {
  const challengesData = getChallengesContent();
  const categoryList: CategoryListMeta[] = [];

  for (const challenge of challengesData) {
    for (const category of challenge.categories) {
      const data = category.data;

      categoryList.push({
        slug: data.slug,
        title: data.title,
        category: data.category,
        coverImage: data.coverImage,
        year: data.year,
        day: data.day,
      });
    }
  }

  return categoryList;
}

export function getCategoryListContent(
  slug: string,
  year: string
): CategoryItem | null {
  const challengesData = getChallengesContent();

  for (const challenge of challengesData) {
    for (const category of challenge.categories) {
      const categoryYear = category.data.year?.toString();
      if (category.data.slug === slug && categoryYear === year) {
        return {
          title: category.data.title,
          date: category.data.date,
          content: category.content,
          year: category.data.year,
          day: category.data.day,
        };
      }
    }
  }

  return null;
}

function getChallengesContent(): ChallengesContent[] {
  const challengesDirectory = path.join(contentDirectory, "challenges");
  const challengesContent: ChallengesContent[] = [];

  const categoriesList = fs.readdirSync(challengesDirectory);
  for (const category of categoriesList) {
    const categoryDir = path.join(challengesDirectory, category);
    const categoryFiles = fs.readdirSync(categoryDir);

    var categoryData: any = null;

    const categoriesMetaData: { data: any; content: string }[] = [];

    for (const dir of categoryFiles) {
      if (dir.endsWith(".mdx")) {
        const categoryDetailsPath = path.join(categoryDir, dir);

        if (!fs.existsSync(categoryDetailsPath)) {
          continue;
        }

        const fileContents = fs.readFileSync(categoryDetailsPath, "utf8");
        const { data } = matter(fileContents);
        categoryData = data;
      } else {
        const dirFiles = fs.readdirSync(path.join(categoryDir, dir));

        for (const file of dirFiles) {
          if (file.endsWith(".mdx")) {
            const slug = file.replace(/\.mdx$/, "");

            const filePath = path.join(categoryDir, dir, `${slug}.mdx`);

            if (!fs.existsSync(filePath)) {
              continue;
            }

            const fileContents = fs.readFileSync(filePath, "utf8");
            const { data, content } = matter(fileContents);

            const fileSlug = file.replace(/\.mdx$/, "");
            data.slug = fileSlug;

            try {
              categoriesMetaData.push({ data, content });
            } catch (error) {
              console.error(`Error reading challenge for ${slug}:`, error);
              continue;
            }
          }
        }
      }
    }

    challengesContent.push({
      categories: categoriesMetaData,
      categoryDetails: { data: categoryData },
    });
  }

  return challengesContent;
}
