import CoverImage from "./cover-image";
import { PageTitle } from "./page-title";

type Props = {
  title: string;
  coverImage: string;
};

export function PageHeader({ title, coverImage }: Props) {
  return (
    <>
      <PageTitle>{title}</PageTitle>
      <div className="hidden md:block md:mb-12">
        <div className="mb-8 md:mb-16 sm:mx-0">
          <CoverImage title={title} src={coverImage} />
        </div>
      </div>
    </>
  );
}
