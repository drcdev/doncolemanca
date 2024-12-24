import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAll, getBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import { IdeaBody } from "@/app/_components/idea-body";
import { IdeaHeader } from "@/app/_components/idea-header";
import { IDEAS_DIRECTORY } from "@/lib/constants";
import { PageTitleSmall } from "@/app/_components/page-title-small";

export default async function Idea(props: Params) {
  const params = await props.params;
  const idea = getBySlug(IDEAS_DIRECTORY, params.slug);

  if (!idea) {
    return notFound();
  }

  const content = await markdownToHtml(idea.content || "");

  return (
    <main>
      <Alert preview={idea.preview} />
      <Container>
        <PageTitleSmall>Ideas</PageTitleSmall>
        <article className="mb-32">
          <IdeaHeader
            title={idea.title}
            coverImage={idea.coverImage}
            date={idea.date}
            author={idea.author}
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
  const idea = getBySlug(IDEAS_DIRECTORY, params.slug);

  if (!idea) {
    return notFound();
  }

  const title = `${idea.title} | Don Coleman`;

  return {
    title,
    openGraph: {
      title,
      images: [idea.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const ideas = getAll(IDEAS_DIRECTORY);

  return ideas.map((idea) => ({
    slug: idea.slug,
  }));
}
