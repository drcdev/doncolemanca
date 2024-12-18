import Container from "@/app/_components/container";
import { HeroIdea } from "@/app/_components/hero-idea";
import { Intro } from "@/app/_components/intro";
import { MoreIdeas } from "@/app/_components/more-ideas";
import { getAllIdeas } from "@/lib/api";

export default function Index() {
  const allIdeas = getAllIdeas();

  const heroIdea = allIdeas[0];

  const moreIdeas = allIdeas.slice(1);

  return (
    <main>
      <Container>
        <Intro title="Ideas" />
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
