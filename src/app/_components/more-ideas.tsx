import { Idea } from "@/interfaces/idea";
import { IdeaPreview } from "./idea-preview";
import Link from "next/link";

type Props = {
  ideas: Idea[];
  heroIdea?: boolean | true;
};

export function MoreIdeas({ ideas, heroIdea }: Props) {
  return (
    <section>
      {heroIdea ? (
        <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
          More Ideas
        </h2>
      ) : (
        <Link href="/ideas" className="hover:underline">
          <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
            Ideas
          </h2>
        </Link>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {ideas.map((idea) => (
          <IdeaPreview
            key={idea.slug}
            title={idea.title}
            coverImage={idea.coverImage}
            date={idea.date}
            author={idea.author}
            slug={idea.slug}
            excerpt={idea.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
