"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  MoveDown,
  Gem,
  Package,
  Globe,
} from "lucide-react";
import { useStore } from "./store-provider";
import { ProductCard, SectionHead } from "./product-card";
import { FeatherMark } from "./site-shell";
import { collections, faqs } from "@/lib/data";

const collectionNotes = [
  "Sculptural sterling silver",
  "Fine lines, considered layers",
  "Small pieces for everyday",
];

const heroCollectionVisuals: Record<
  string,
  { src: string; alt: string; objectPosition?: string }
> = {
  "silver-studies": {
    src: "/images/editorial/wfc-hero-02-chrysocolla.jpg",
    alt: "Handmade sterling-silver pendant and matching drop earrings set with vivid chrysocolla cabochons",
  },
  "line-and-form": {
    src: "/images/editorial/wfc-hero-02-clown-doublet.jpg",
    alt: "Sterling-silver necklace with a blue-and-cream Clown Doublet cabochon set into its sculptural pendant",
    objectPosition: "center bottom",
  },
  "small-rituals": {
    src: "/images/editorial/wfc-hero-02-bumble-bee-jasper.jpg",
    alt: "Sterling-silver huggie earring with a yellow-and-black Bumble Bee Jasper cabochon",
  },
};

export function Home() {
  const { products } = useStore();
  const railRef = useRef<HTMLElement>(null);
  const railTrackRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const featureLayerRef = useRef<HTMLDivElement>(null);
  const [railPaused, setRailPaused] = useState(false);
  const railPausedRef = useRef(false);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const [activeCollection, setActiveCollection] = useState(0);

  useEffect(() => {
    const transition = transitionRef.current;
    const featureLayer = featureLayerRef.current;
    if (!transition || !featureLayer) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactScreen = window.matchMedia("(max-width: 600px)");
    let frame = 0;
    let featureActive = false;
    let observedCollection = -1;
    const panel = transition.querySelector<HTMLElement>(".hero-panel");
    const slides = transition.querySelectorAll<HTMLElement>(
      ".hero-collection-slide",
    );
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const smooth = (value: number) => {
      const t = clamp(value);
      return t * t * (3 - 2 * t);
    };

    const setStaticLayout = (isStatic: boolean) => {
      transition.dataset.motion = isStatic ? "static" : "scroll";
      featureActive = isStatic;
      if (panel) {
        panel.inert = false;
        panel.removeAttribute("aria-hidden");
      }
      slides.forEach((slide) => {
        slide.style.removeProperty("--slide-reveal");
        slide.style.removeProperty("--slide-lift");
      });
      if (isStatic) {
        featureLayer.inert = false;
        featureLayer.style.pointerEvents = "auto";
        featureLayer.setAttribute("aria-hidden", "false");
      } else {
        featureLayer.inert = true;
        featureLayer.style.pointerEvents = "none";
        featureLayer.setAttribute("aria-hidden", "true");
      }
    };

    const updateProgress = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (transition.dataset.motion === "static") return;

        const bounds = transition.getBoundingClientRect();
        const travel = Math.max(
          transition.offsetHeight - window.innerHeight,
          1,
        );
        const progress = Math.min(1, Math.max(0, -bounds.top / travel));
        if (compactScreen.matches) {
          const shrink = smooth(progress / 0.35);
          const reveal = clamp((progress - 0.4) / 0.43);
          transition.style.setProperty("--hero-scale", `${1 - shrink * 0.09}`);
          transition.style.setProperty("--hero-shift", `${-shrink * 14}px`);
          transition.style.setProperty(
            "--hero-detail-opacity",
            `${1 - smooth(progress / 0.35)}`,
          );
          transition.style.setProperty(
            "--collection-content-opacity",
            `${smooth((reveal - 0.65) / 0.35)}`,
          );
          transition.style.setProperty(
            "--reveal-x",
            `${reveal * window.innerWidth * 3}px`,
          );
          transition.style.setProperty(
            "--reveal-y",
            `${reveal * window.innerHeight * 1.6}px`,
          );
          const visible = reveal >= 0.95;
          featureLayer.inert = !visible;
          featureLayer.style.pointerEvents = visible ? "auto" : "none";
          featureLayer.setAttribute("aria-hidden", String(!visible));
          if (panel) {
            panel.inert = shrink > 0.3;
            panel.setAttribute("aria-hidden", String(visible));
          }
          return;
        }
        const cardProgress = Math.min(1, Math.max(0, progress / 0.27));
        const revealProgress = Math.min(
          1,
          Math.max(0, (progress - 0.35) / 0.23),
        );
        const collectionProgress = Math.min(
          1,
          Math.max(0, (progress - 0.6) / 0.36),
        );

        const revealRadius = Math.max(
          window.innerWidth * 3,
          window.innerHeight * 1.1,
        );
        const collectionIndex = Math.min(
          collections.length - 1,
          Math.floor(collectionProgress * collections.length),
        );

        transition.style.setProperty("--hero-progress", `${cardProgress}`);
        transition.style.setProperty(
          "--hero-scale",
          `${1 - smooth(cardProgress) * 0.5}`,
        );
        transition.style.setProperty("--hero-radius", `${cardProgress * 3}px`);
        transition.style.setProperty(
          "--hero-shift",
          `${Math.max(0, (progress - 0.32) / 0.26) * -window.innerHeight * 0.45}px`,
        );
        transition.style.setProperty("--hero-shadow", `${cardProgress * 0.24}`);
        transition.style.setProperty("--hero-opacity", "1");
        transition.style.setProperty("--feature-progress", `${revealProgress}`);
        transition.style.setProperty(
          "--feature-lift",
          `${(1 - revealProgress) * 34}px`,
        );
        transition.style.setProperty(
          "--reveal-x",
          `${revealProgress * revealRadius}px`,
        );
        transition.style.setProperty(
          "--reveal-y",
          `${revealProgress * window.innerHeight * 1.6}px`,
        );
        if (collectionIndex !== observedCollection) {
          observedCollection = collectionIndex;
          setActiveCollection(collectionIndex);
        }

        transition.style.setProperty(
          "--hero-detail-opacity",
          `${1 - smooth(cardProgress / 0.65)}`,
        );
        transition.style.setProperty(
          "--collection-content-opacity",
          `${smooth((revealProgress - 0.72) / 0.28)}`,
        );
        const slidePosition = collectionProgress * collections.length;
        slides.forEach((slide, index) => {
          const reveal =
            index === 0 ? 1 : smooth((slidePosition - index + 0.25) / 0.5);
          slide.style.setProperty("--slide-reveal", `${reveal * 100}%`);
          slide.style.setProperty("--slide-lift", `${(1 - reveal) * 65}px`);
          slide.style.zIndex = `${index + 1}`;
        });
        if (panel) {
          panel.inert = cardProgress > 0.3;
          panel.setAttribute("aria-hidden", String(progress >= 0.58));
        }
        const featureIsVisible = progress >= 0.58;
        if (featureIsVisible !== featureActive) {
          featureActive = featureIsVisible;
          featureLayer.inert = !featureIsVisible;
          featureLayer.style.pointerEvents = featureIsVisible ? "auto" : "none";
          featureLayer.setAttribute("aria-hidden", String(!featureIsVisible));
        }
      });
    };

    const syncMotionMode = () => {
      const isStatic = reducedMotion.matches;
      transition.dataset.compact = String(compactScreen.matches);
      setStaticLayout(isStatic);
      if (isStatic) {
        window.cancelAnimationFrame(frame);
        transition.style.removeProperty("--hero-progress");
        transition.style.removeProperty("--hero-scale");
        transition.style.removeProperty("--hero-radius");
        transition.style.removeProperty("--hero-shift");
        transition.style.removeProperty("--hero-shadow");
        transition.style.removeProperty("--hero-opacity");
        transition.style.removeProperty("--feature-progress");
        transition.style.removeProperty("--feature-lift");
        transition.style.removeProperty("--reveal-x");
        transition.style.removeProperty("--reveal-y");
        transition.style.removeProperty("--hero-detail-opacity");
        transition.style.removeProperty("--collection-content-opacity");
      } else {
        updateProgress();
      }
    };

    syncMotionMode();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", syncMotionMode, { passive: true });
    reducedMotion.addEventListener("change", syncMotionMode);
    compactScreen.addEventListener("change", syncMotionMode);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", syncMotionMode);
      reducedMotion.removeEventListener("change", syncMotionMode);
      compactScreen.removeEventListener("change", syncMotionMode);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = document.querySelectorAll<HTMLElement>(".journey-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    railPausedRef.current = railPaused;
  }, [railPaused]);

  useEffect(() => {
    const track = railTrackRef.current;
    if (!track) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0,
      previous = 0,
      direction = 1;
    let position = track.scrollLeft;
    let visible = false,
      hovering = false,
      touching = false,
      focused = false;
    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.1 },
    );
    visibility.observe(track);
    const enter = () => {
      hovering = true;
    };
    const leave = () => {
      hovering = false;
    };
    const down = () => {
      touching = true;
    };
    const up = () => {
      touching = false;
    };
    const focus = () => {
      focused = true;
    };
    const blur = (event: FocusEvent) => {
      focused =
        event.relatedTarget instanceof Node &&
        track.contains(event.relatedTarget);
    };
    const tick = (now: number) => {
      const dt = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      if (
        visible &&
        !document.hidden &&
        !media.matches &&
        !railPausedRef.current &&
        !hovering &&
        !touching &&
        !focused
      ) {
        const max = track.scrollWidth - track.clientWidth;
        if (max > 0) {
          position = Math.max(0, Math.min(max, position + direction * dt * 30));
          track.scrollLeft = position;
          if (track.scrollLeft >= max - 1) direction = -1;
          if (track.scrollLeft <= 0) direction = 1;
        }
      }
      if (hovering || touching || focused || railPausedRef.current)
        position = track.scrollLeft;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    track.addEventListener("mouseenter", enter);
    track.addEventListener("mouseleave", leave);
    track.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    track.addEventListener("focusin", focus);
    track.addEventListener("focusout", blur);
    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
      track.removeEventListener("mouseenter", enter);
      track.removeEventListener("mouseleave", leave);
      track.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      track.removeEventListener("focusin", focus);
      track.removeEventListener("focusout", blur);
    };
  }, []);

  const selectCollection = (index: number) => {
    const transition = transitionRef.current;
    if (
      !transition ||
      transition.dataset.motion === "static" ||
      transition.dataset.compact === "true"
    ) {
      setActiveCollection(index);
      return;
    }

    const bounds = transition.getBoundingClientRect();
    const travel = Math.max(transition.offsetHeight - window.innerHeight, 1);
    const collectionProgress =
      0.6 + 0.36 * ((index + 0.5) / collections.length);
    window.scrollTo({
      top: window.scrollY + bounds.top + collectionProgress * travel,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="wfc-home">
        <div
          ref={transitionRef}
          className="hero-transition"
          data-motion="scroll"
        >
          <div className="hero-scene">
            <div className="hero-transition-backdrop" aria-hidden="true">
              <img src="/images/editorial/silver-studies.jpg" alt="" />
              <img src="/images/editorial/line-and-form.jpg" alt="" />
              <img src="/images/editorial/small-rituals.jpg" alt="" />
              <img src="/images/editorial/craft-process.jpg" alt="" />
            </div>
            <section className="hero hero-panel">
              <div className="hero-image">
                <img
                  src="/images/editorial/wfc-hero.webp"
                  width={1024}
                  height={1536}
                  alt="A sculptural sterling-silver ring set with a red-orange carnelian agate cabochon"
                  fetchPriority="high"
                />
                <div className="hero-image-caption">
                  <span>WFC — AN INDEPENDENT STUDIO</span>
                  <span>01 / CARNELIAN STUDY</span>
                </div>
                <span className="hero-vertical">
                  THE BEAUTY IS IN THE DETAILS
                </span>
              </div>
              <div className="hero-copy">
                <p className="eyebrow">
                  <span className="tiny-line" /> Jewelry with a point of view
                </p>
                <h1>
                  A little wild.
                  <br />
                  <em>
                    Entirely
                    <br />
                    your own.
                  </em>
                </h1>
                <p className="hero-description">
                  Considered forms. An individual spirit.
                  <br />
                  Handmade jewelry for the stories you carry.
                </p>
                <Link href="/shop" className="button dark">
                  Explore the collection <ArrowRight size={17} />
                </Link>
                <div className="hero-foot">
                  <span>READY TO SHIP & MADE TO ORDER</span>
                  <MoveDown size={20} />
                </div>
              </div>
            </section>
            <div
              ref={featureLayerRef}
              className="hero-feature-layer"
              aria-hidden="true"
              inert
            >
              <div className="hero-feature-content">
                <div className="hero-collection-heading">
                  <p className="eyebrow">THE WFC COLLECTIONS</p>
                  <h2>Find your own kind of wild.</h2>
                </div>
                <div className="hero-collection-layout">
                  <nav
                    className="hero-collection-nav"
                    aria-label="Browse collections"
                  >
                    {collections.map((collection, index) => (
                      <button
                        type="button"
                        className={`hero-collection-option${activeCollection === index ? " is-active" : ""}`}
                        aria-pressed={activeCollection === index}
                        onClick={() => selectCollection(index)}
                        key={collection.slug}
                      >
                        <span className="hero-collection-index">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="hero-collection-option-copy">
                          <strong>{collection.name}</strong>
                          <small>
                            {collectionNotes[index] ?? collection.description}
                          </small>
                        </span>
                      </button>
                    ))}
                  </nav>
                  <div
                    className="hero-collection-visual"
                    aria-live="polite"
                    onPointerDown={(event) => {
                      if (
                        !window.matchMedia("(max-width: 600px)").matches ||
                        event.pointerType === "mouse"
                      )
                        return;
                      swipeStart.current = {
                        x: event.clientX,
                        y: event.clientY,
                      };
                    }}
                    onPointerCancel={() => {
                      swipeStart.current = null;
                    }}
                    onPointerUp={(event) => {
                      const start = swipeStart.current;
                      swipeStart.current = null;
                      if (!start) return;
                      const dx = event.clientX - start.x,
                        dy = event.clientY - start.y;
                      if (
                        Math.abs(dx) < 45 ||
                        Math.abs(dx) < Math.abs(dy) * 1.3
                      )
                        return;
                      setActiveCollection((current) =>
                        Math.max(
                          0,
                          Math.min(
                            collections.length - 1,
                            current + (dx < 0 ? 1 : -1),
                          ),
                        ),
                      );
                    }}
                  >
                    {collections.map((collection, index) => {
                      const heroVisual = heroCollectionVisuals[collection.slug];

                      return (
                        <article
                          className={`hero-collection-slide${activeCollection === index ? " is-active" : ""}`}
                          style={
                            {
                              "--stack-offset": `${Math.max(0, index - activeCollection) * -22}px`,
                              zIndex: collections.length - index,
                            } as React.CSSProperties
                          }
                          aria-hidden={activeCollection !== index}
                          inert={activeCollection !== index}
                          key={collection.slug}
                        >
                          <img
                            src={heroVisual?.src ?? collection.image}
                            style={
                              heroVisual?.objectPosition
                                ? { objectPosition: heroVisual.objectPosition }
                                : undefined
                            }
                            alt={
                              heroVisual?.alt ??
                              `Handmade jewelry from the ${collection.name} collection`
                            }
                          />
                          <div className="hero-collection-caption">
                            <div>
                              <p className="eyebrow">{collection.eyebrow}</p>
                              <h3>{collection.name}</h3>
                            </div>
                            <Link
                              href={`/collections/${collection.slug}`}
                              className="button dark"
                              tabIndex={
                                activeCollection === index ? undefined : -1
                              }
                            >
                              Explore collection <ArrowRight size={16} />
                            </Link>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="journey-benefits journey-reveal">
          <p className="eyebrow">THE WFC DIFFERENCE</p>
          <h2>
            Small details.
            <br />A lasting feeling.
          </h2>
          <div className="journey-benefit-grid">
            <article>
              <Gem />
              <h3>A considered craft</h3>
              <p>
                Thoughtful materials. Sculptural silver. Details worth a closer
                look.
              </p>
            </article>
            <article>
              <Package />
              <h3>Made at your pace</h3>
              <p>Ready-to-ship favorites and pieces made especially for you.</p>
            </article>
            <article>
              <Globe />
              <h3>From here, to you</h3>
              <p>
                Based in the US. An independent spirit with an international
                point of view.
              </p>
            </article>
          </div>
        </section>
        <section className="journey-horizontal" ref={railRef}>
          <div className="journey-horizontal-scene">
            <div className="journey-rail-intro">
              <p className="eyebrow">MATERIAL STORIES / INDONESIA</p>
              <h2>
                Nature makes
                <br />
                no two alike.
              </h2>
              <p>
                Explore the color, character, and quiet individuality of our
                stone studies.
              </p>
            </div>
            <div className="journey-rail-hint">
              <span className="rail-auto-label">
                An automatic journey through the stones
              </span>
              <button
                type="button"
                className="rail-playback"
                aria-pressed={railPaused}
                onClick={() => setRailPaused((paused) => !paused)}
              >
                {railPaused ? "Play movement" : "Pause movement"}
              </button>
            </div>
            <div className="journey-rail" ref={railTrackRef}>
              {[
                [
                  "Chrysocolla",
                  "wfc-hero-02-chrysocolla.jpg",
                  "silver-studies",
                ],
                [
                  "Clown Doublet",
                  "wfc-hero-02-clown-doublet.jpg",
                  "line-and-form",
                ],
                [
                  "Bumble Bee Jasper",
                  "wfc-hero-02-bumble-bee-jasper.jpg",
                  "small-rituals",
                ],
                [
                  "Indonesian stone studies",
                  "wfc-hero.jpg",
                  "indonesian-stones",
                ],
              ].map(([name, image, slug], index) => (
                <Link
                  className="journey-material-card"
                  href={`/collections/${slug}`}
                  key={name}
                >
                  <img
                    src={`/images/editorial/${image}`}
                    alt={name + " handmade jewelry study"}
                    loading="lazy"
                  />
                  <span className="journey-card-number">0{index + 1}</span>
                  <ArrowUpRight />
                  <h3>{name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="journey-studies journey-reveal">
          <p className="eyebrow">DIFFERENT EXPRESSIONS. ONE POINT OF VIEW.</p>
          <h2>Find your own rhythm.</h2>
          {collections.map((collection, index) => (
            <Link
              href={`/collections/${collection.slug}`}
              className="journey-study-row"
              key={collection.slug}
            >
              <div>
                <span className="eyebrow">COLLECTION 0{index + 1}</span>
                <h3>{collection.name}</h3>
                <p>{collectionNotes[index]}</p>
              </div>
              <img
                src={
                  heroCollectionVisuals[collection.slug]?.src ??
                  collection.image
                }
                alt={collection.name + " jewelry"}
                loading="lazy"
              />
              <ArrowUpRight />
            </Link>
          ))}
        </section>
        <section className="journey-manifesto journey-reveal">
          <div className="journey-floating">
            <span>STERLING SILVER</span>
            <span>NATURAL STONES</span>
            <span>HAND-FINISHED</span>
            <span>INDEPENDENT SPIRIT</span>
          </div>
          <p className="eyebrow">THE SPIRIT OF WILD FEATHER</p>
          <h2>
            Some things are made to fit in.
            <br />
            <em>We make things to feel like you.</em>
          </h2>
          <Link href="/about" className="text-link">
            A little about us <ArrowUpRight size={18} />
          </Link>
        </section>
        <section className="section favorites" id="featured-pieces">
          <SectionHead
            eyebrow="The considered collection"
            title="Pieces to make your own."
          />
          <div className="product-grid">
            {products
              .filter((p) => p.featured && p.published)
              .slice(0, 4)
              .map((p, i) => (
                <ProductCard product={p} index={i} key={p.id} />
              ))}
          </div>
        </section>
        <section className="journey-faq journey-reveal">
          <h2>A little guidance.</h2>
          <div>
            {faqs.slice(0, 5).map((faq, index) => (
              <details key={faq.q} name="home-faq" open={index === 0}>
                <summary>
                  {faq.q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="journey-contact journey-reveal">
          <FeatherMark />
          <p className="eyebrow">YOUR NEXT EVERYDAY FAVORITE</p>
          <h2>
            Find a piece.
            <br />
            <em>Make it your own.</em>
          </h2>
          <div>
            <Link href="/shop" className="button">
              Explore the collection <ArrowUpRight size={18} />
            </Link>
            <Link href="/contact" className="text-link">
              Get in touch <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
