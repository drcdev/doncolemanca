import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAll, getBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { IdeaBody } from "@/app/_components/idea-body";
import { IdeaHeader } from "@/app/_components/idea-header";
import { PAGES_DIRECTORY } from "@/lib/constants";

export default async function Idea(props: Params) {
  const params = await props.params;
  const page = getBySlug(PAGES_DIRECTORY, params.slug);

  if (!page) {
    return notFound();
  }

  const content = await markdownToHtml(page.content || "");

  return (
    <main>
      <Alert preview={page.preview} />
      <Container>
        <Header title="Ideas" href="/ideas" />
        <article className="mb-32">
          <IdeaHeader
            title={page.title}
            coverImage={page.coverImage}
            date={page.date}
            author={page.author}
          />
          <IdeaBody content={content} />
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const page = getBySlug(PAGES_DIRECTORY, params.slug);

  if (!page) {
    return notFound();
  }

  const title = `${page.title} | Don Coleman`;

  return {
    title,
    openGraph: {
      title,
      images: [page.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const pages = getAll(PAGES_DIRECTORY);

  return pages.map((page) => ({
    slug: page.slug,
  }));
}
