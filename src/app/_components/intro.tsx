import { NAME, SLOGAN } from "@/lib/constants";
import Link from "next/link";

type Props = {
  title?: string;
};

export function Intro({ title }: Props) {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        {title ?? NAME}.
      </h1>
      <Link href="/" className="hover:underline">
        <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
          {SLOGAN}
        </h4>
      </Link>
    </section>
  );
}
