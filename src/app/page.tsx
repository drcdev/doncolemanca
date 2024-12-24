import Container from "@/app/_components/container";
import { PageTitle } from "@/app/_components/page-title";
import { MoreIdeas } from "@/app/_components/more-ideas";
import { getAll } from "@/lib/api";
import { IDEAS_DIRECTORY } from "@/lib/constants";

export default function Index() {
  const allIdeas = getAll(IDEAS_DIRECTORY);

  return (
    <main>
      <Container>
        <PageTitle />
        {allIdeas.length > 0 && <MoreIdeas ideas={allIdeas} heroIdea={false} />}
      </Container>
    </main>
  );
}
