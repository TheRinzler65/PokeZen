export interface GameGuide {
  id: string;
  title: string;
  description: string;
  generation: number;
  coverImage?: string;
  mainLinks?: {
    text: string;
    video?: string;
  };
  categories?: {
    title: string;
    icon: string;
    links: { title: string; slug: string }[];
  }[];
  chapters: {
    slug: string;
    title: string;
    component: any;
  }[];
}
