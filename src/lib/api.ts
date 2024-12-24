import { Page } from "@/interfaces/page";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

export function getSlugs(directory: string) {
  return fs.readdirSync(directory);
}

export function getBySlug(directory: string, slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(process.cwd(), directory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Page;
}

export function getAll(directory: string): Page[] {
  const slugs = getSlugs(join(process.cwd(), directory));
  const ideas = slugs
    .map((slug) => getBySlug(directory, slug))
    .sort((idea1, idea2) => (idea1.date > idea2.date ? -1 : 1));
  return ideas;
}
