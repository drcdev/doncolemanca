import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { MoreIdeas } from "@/app/_components/more-ideas";
import { getAllIdeas } from "@/lib/api";

export default function Index() {
  const allIdeas = getAllIdeas();

  return (
    <main>
      <Container>
        <Intro />
        {allIdeas.length > 0 && <MoreIdeas ideas={allIdeas} heroIdea={false} />}
      </Container>
    </main>
  );
}
