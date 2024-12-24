import Container from "@/app/_components/container";
import { HeroIdea } from "@/app/_components/hero-idea";
import { PageTitle } from "@/app/_components/page-title";
import { MoreIdeas } from "@/app/_components/more-ideas";
import { getAll } from "@/lib/api";
import { IDEAS_DIRECTORY } from "@/lib/constants";
import { Metadata } from "next";

export default function Index() {
  const allIdeas = getAll(IDEAS_DIRECTORY).filter((idea) => !idea.preview);
  const heroIdea = allIdeas[0];
  const moreIdeas = allIdeas.slice(1);

  return (
    <main>
      <Container>
        <PageTitle>Ideas</PageTitle>
        <HeroIdea
          title={heroIdea.title}
          coverImage={heroIdea.coverImage}
          date={heroIdea.date}
          author={heroIdea.author}
          slug={heroIdea.slug}
          excerpt={heroIdea.excerpt}
        />
        {moreIdeas.length > 0 && (
          <MoreIdeas ideas={moreIdeas} heroIdea={true} />
        )}
      </Container>
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Ideas | Don Coleman";

  return {
    title,
    openGraph: {
      title,
      images: ["/assets/ideas/cover.webp"],
    },
  };
}
