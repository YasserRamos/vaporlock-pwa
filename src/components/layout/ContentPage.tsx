import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

type ContentPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: { title: string; description: string; number: string }[];
};

export default function ContentPage({
  eyebrow,
  title,
  description,
  items,
}: ContentPageProps) {
  return (
    <main className="min-h-[75vh] bg-[#11131a] px-5 py-14 text-[#f4e8cf] sm:px-8 sm:py-20 lg:px-14">
      <div className="mx-auto max-w-[1200px]">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#b8b1a3] hover:text-[#e38a42]"
        >
          <ArrowLeft size={16} /> Volver al inicio
        </Link>

        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#e38a42]">
            {eyebrow}
          </p>
          <h1 className="comic-heading text-4xl sm:text-5xl md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-[#b8b1a3] sm:text-base">
            {description}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.number}
              className="comic-panel pixel-texture p-5 sm:p-6"
            >
              <span className="comic-heading text-5xl text-[#bd4034]">
                {item.number}
              </span>
              <h2 className="mt-5 text-xl font-black uppercase">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#b8b1a3]">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <Link
          to="/personajes"
          className="comic-button mt-10 inline-flex bg-[#f4e8cf] text-[#11131a]"
        >
          Consultar personajes <ArrowRight size={17} />
        </Link>
      </div>
    </main>
  );
}
