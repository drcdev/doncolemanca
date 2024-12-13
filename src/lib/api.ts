import { Idea } from "@/interfaces/idea";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const ideasDirectory = join(process.cwd(), "_ideas");

export function getIdeaSlugs() {
  return fs.readdirSync(ideasDirectory);
}

export function getIdeaBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(ideasDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Idea;
}

export function getAllIdeas(): Idea[] {
  const slugs = getIdeaSlugs();
  const ideas = slugs
    .map((slug) => getIdeaBySlug(slug))
    // sort ideas by date in descending order
    .sort((idea1, idea2) => (idea1.date > idea2.date ? -1 : 1));
  return ideas;
}
