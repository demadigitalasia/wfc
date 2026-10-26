import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { stoneStudies } from "@/lib/stone-studies";

export function StoneStudiesPreview() {
  return (
    <section className="stone-studies-preview">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Material stories / Indonesia</p>
          <h2>Stone, shaped by hand.</h2>
        </div>
        <Link href="/collections/indonesian-stones" className="text-link">
          Explore the stone studies <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="stone-study-preview-grid">
        {stoneStudies.map((stone, index) => (
          <Link
            className="stone-study-preview-card"
            href={`/collections/indonesian-stones#${stone.slug}`}
            key={stone.slug}
          >
            <div className="stone-study-preview-image">
              <img src={stone.image} alt={stone.alt} loading="lazy" />
            </div>
            <div className="stone-study-preview-copy">
              <div>
                <span className="eyebrow">
                  {String(index + 1).padStart(2, "0")} / Stone study
                </span>
                <h3>{stone.name}</h3>
              </div>
              <ArrowRight size={18} aria-hidden="true" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function StoneStudiesPage() {
  return (
    <>
      <div className="page-intro stone-studies-intro">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/collections">Collections</Link>
          <span>/</span>
          <span>Stone studies</span>
        </nav>
        <p className="eyebrow">Material stories / Indonesia</p>
        <h1>
          Distinctive stones.
          <br />
          <em>Considered in silver.</em>
        </h1>
        <p className="intro-description">
          A study in color, natural pattern, and hand-finished silver. Each
          stone brings its own character to the design.
        </p>
      </div>
      <section
        className="stone-study-page-grid"
        aria-label="Jewelry designs inspired by Indonesian stones"
      >
        {stoneStudies.map((stone, index) => (
          <article
            className="stone-study-page-card"
            id={stone.slug}
            key={stone.slug}
          >
            <div className="stone-study-page-image">
              <img src={stone.image} alt={stone.alt} loading="lazy" />
              <span className="stone-study-number">
                {String(index + 1).padStart(2, "0")} / 04
              </span>
            </div>
            <div className="stone-study-page-copy">
              <p className="eyebrow">{stone.piece}</p>
              <h2>{stone.name}</h2>
              <p>{stone.description}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="stone-study-contact">
        <div>
          <p className="eyebrow">A piece with a story of its own</p>
          <h2>Have a stone in mind?</h2>
          <p>Tell us about the piece you would like to wear.</p>
        </div>
        <Link className="button dark" href="/contact">
          Ask about a custom piece <ArrowUpRight size={16} />
        </Link>
      </section>
    </>
  );
}
