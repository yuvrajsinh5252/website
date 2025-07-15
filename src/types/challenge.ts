// Individual metadata for each challenge in challenges list
export interface CategoryItem {
  title: string;
  date: string;
  content: string;
  year?: number;
  day?: number;
}

// Individual metadata for each item in category list
export interface CategoryListMeta {
  slug: string;
  title: string;
  category: string;
  year?: number;
  day?: number;
  coverImage?: string;
}

// List of all challenges with its category
export interface ChallengesList {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  coverImage?: string;
}
