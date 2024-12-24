import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAll, getBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PageBody } from "@/app/_components/page-body";
import { PageHeader } from "@/app/_components/page-header";
import { PAGES_DIRECTORY } from "@/lib/constants";

export default async function Page(props: Params) {
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
        <Header title="Don Coleman" href="/" />{" "}
        <article className="mb-32">
          <PageHeader title={page.title} coverImage={page.coverImage} />
          <PageBody content={content} />
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
