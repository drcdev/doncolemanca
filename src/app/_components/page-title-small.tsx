import { getAll } from "@/lib/api";
import { NAME, PAGES_DIRECTORY } from "@/lib/constants";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function PageTitleSmall({ children }: Props) {
  const pages = getAll(PAGES_DIRECTORY);
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-8 mb-16 md:mb-12">
      <h1 className="text-2xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-8">
        {children ?? NAME}.
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        <Link href={"/"}>Home</Link>
        {" | "}
        <Link href={"/ideas"}>Ideas</Link>
        {" | "}
        {pages.map((page, index) => (
          <span key={page.slug}>
            <Link href={`/${page.slug}`}>{page.title}</Link>
            {index < pages.length - 1 && " | "}
          </span>
        ))}
      </h4>
    </section>
  );
}
