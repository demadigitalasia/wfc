"use client";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Minus,
  Plus,
  Search,
  SlidersHorizontal,
  X,
  Check,
  Copy,
  Package,
  Globe,
  Feather,
} from "lucide-react";
import {
  categories,
  collections,
  faqs,
  guides,
  policies,
  money,
} from "@/lib/data";
import { useStore } from "./store-provider";
import { ProductCard, SectionHead } from "./product-card";
import { FeatherMark } from "./site-shell";
export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {items.map((item, i) => (
        <span key={i}>
          <ChevronRight size={11} />
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
export function Shop({
  collection,
  initialCategory = "",
}: {
  collection?: string;
  initialCategory?: string;
}) {
  const { products, collectionData, categoryData } = useStore();
  const [category, setCategory] = useState(initialCategory);
  const [material, setMaterial] = useState("");
  const [availability, setAvailability] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("curated");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const col = collectionData.find((c) => c.slug === collection);
  const filtered = useMemo(() => {
    const rows = products.filter(
      (p) =>
        p.published &&
        (!collection || p.collection === collection) &&
        (!category || p.category === category) &&
        (!material || p.material === material) &&
        (!availability || p.status === availability) &&
        `${p.name} ${p.material} ${p.description}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    );
    return rows.sort((a, b) =>
      sort === "price-low"
        ? a.price - b.price
        : sort === "price-high"
          ? b.price - a.price
          : sort === "name"
            ? a.name.localeCompare(b.name)
            : Number(!!b.featured) - Number(!!a.featured),
    );
  }, [products, collection, category, material, availability, query, sort]);
  const reset = () => {
    setCategory("");
    setMaterial("");
    setAvailability("");
    setQuery("");
  };
  return (
    <>
      <div className="page-intro">
        <Breadcrumb
          items={
            col
              ? [
                  { label: "Collections", href: "/collections" },
                  { label: col.name },
                ]
              : [{ label: "Shop" }]
          }
        />
        <div className="shop-heading">
          <div>
            <p className="eyebrow">
              {col?.eyebrow ?? "The considered collection"}
            </p>
            <h1>{col?.name ?? "A piece of your own."}</h1>
          </div>
          <p>
            {col?.description ??
              "Independent forms. Personal expressions. Discover jewelry for wherever the day takes you."}
          </p>
        </div>
      </div>
      <section className="shop-section">
        <div className="shop-toolbar">
          <div
            className="category-tabs"
            role="group"
            aria-label="Filter by category"
          >
            {["", ...categoryData].map((cat) => (
              <button
                key={cat}
                className={category === cat ? "selected" : ""}
                onClick={() => setCategory(cat)}
              >
                {cat || "All pieces"}
              </button>
            ))}
          </div>
          <button
            className="filter-toggle text-link"
            onClick={() => setFiltersOpen(!filtersOpen)}
            aria-expanded={filtersOpen}
          >
            <SlidersHorizontal size={15} /> Filter & sort
          </button>
        </div>
        <div className={`filter-panel ${filtersOpen ? "open" : ""}`}>
          <label>
            Material
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              <option value="">All materials</option>
              {[...new Set(products.map((p) => p.material))].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>
          <label>
            Availability
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              <option value="">All availability</option>
              {["Ready to ship", "Made to order", "Sold out"].map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </label>
          <label>
            Sort by
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="curated">Our selection</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </label>
          <label className="filter-search">
            Find a piece
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name or material"
            />
          </label>
        </div>
        <div className="results-meta">
          <span>{filtered.length} pieces</span>
          {(category || material || availability || query) && (
            <button className="text-link" onClick={reset}>
              Clear filters <X size={12} />
            </button>
          )}
          <span className="muted">Thoughtfully made. Individually yours.</span>
        </div>
        {filtered.length ? (
          <div className="product-grid">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={30} />
            <h2>A fresh perspective?</h2>
            <p>No pieces match your selection. Try changing a filter.</p>
            <button onClick={reset} className="button dark">
              View all pieces <ArrowRight size={16} />
            </button>
          </div>
        )}
      </section>
      <div className="shop-bottom">
        <FeatherMark />
        <p>Something particular in mind?</p>
        <Link href="/contact" className="text-link">
          Let’s talk <ArrowUpRight size={16} />
        </Link>
      </div>
    </>
  );
}
export function ProductDetail({ slug }: { slug: string }) {
  const { products, addToCart, collectionData } = useStore();
  const p = products.find((x) => x.slug === slug && x.published);
  const [selectedImage, setSelectedImage] = useState(0);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  if (!p)
    return (
      <div className="empty-state">
        <h1>This piece isn’t here.</h1>
        <Link href="/shop" className="button dark">
          Explore the collection
        </Link>
      </div>
    );
  const choice = size || (p.sizes.length === 1 ? p.sizes[0] : "");
  return (
    <>
      <div className="product-breadcrumb">
        <Breadcrumb
          items={[{ label: "Shop", href: "/shop" }, { label: p.name }]}
        />
      </div>
      <section className="product-detail">
        <div className="product-gallery">
          <div className="main-product-image">
            <img
              src={p.images[selectedImage] ?? p.images[0]}
              alt={`${p.name}, view ${selectedImage + 1}`}
            />
            <span className="gallery-caption">A STUDY IN DETAIL — WFC</span>
          </div>
          <div className="thumbnails">
            {p.images.map((image, i) => (
              <button
                key={i}
                className={selectedImage === i ? "selected" : ""}
                onClick={() => setSelectedImage(i)}
                aria-label={`View ${p.name} image ${i + 1}`}
                aria-pressed={selectedImage === i}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="product-detail-copy">
          <p className="eyebrow">
            {collectionData.find((c) => c.slug === p.collection)?.name} /{" "}
            {p.category}
          </p>
          <h1>{p.name}</h1>
          <div className="product-price">
            <span>{money(p.price)}</span>
            <span>USD</span>
          </div>
          <p className="product-description">{p.description}</p>
          <div className="availability">
            <span
              className={
                p.status === "Sold out" ? "stock-dot empty" : "stock-dot"
              }
            />
            {p.status}
            <span>· {p.leadTime}</span>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!choice) {
                setError("Please choose a size.");
                return;
              }
              setError("");
              addToCart(p.id, choice, quantity);
            }}
          >
            <div className="spread size-label">
              <label htmlFor="product-size">
                {p.category === "Necklaces" ? "Length" : "Size"}
              </label>
              <Link href="/guides/sizing" className="text-link">
                Size guide <ArrowUpRight size={12} />
              </Link>
            </div>
            <select
              id="product-size"
              value={choice}
              onChange={(e) => {
                setSize(e.target.value);
                setError("");
              }}
              aria-describedby={error ? "size-error" : undefined}
            >
              <option value="">
                Choose your {p.category === "Necklaces" ? "length" : "size"}
              </option>
              {p.sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {error && (
              <p className="field-error" id="size-error" role="alert">
                {error}
              </p>
            )}
            <div className="purchase-row">
              <div className="quantity">
                <button
                  type="button"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={14} />
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  disabled={quantity >= p.stock}
                  aria-label="Increase quantity"
                  onClick={() => setQuantity(Math.min(p.stock, quantity + 1))}
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                className="button dark"
                disabled={p.status === "Sold out"}
              >
                {p.status === "Sold out"
                  ? "Currently unavailable"
                  : "Add to bag"}
                <Plus size={17} />
              </button>
            </div>
          </form>
          <div className="product-accordions">
            {[
              { q: "Materials & details", a: p.detail },
              {
                q: "Making & delivery",
                a: `${p.leadTime}. Based in the United States, shipping across the US and internationally. Delivery options are shown with your destination at checkout.`,
              },
              {
                q: "Care for your piece",
                a: "Store separately in a soft, dry pouch. Avoid perfume, moisture, chlorine, and cleaning chemicals. Clean gently with a soft jewelry cloth.",
              },
            ].map((a) => (
              <details key={a.q}>
                <summary>
                  {a.q}
                  <Plus size={15} />
                </summary>
                <p>{a.a}</p>
              </details>
            ))}
          </div>
          <Link
            href={`/contact?product=${p.slug}`}
            className="product-question"
          >
            A question about this piece?{" "}
            <span>
              Ask the studio <ArrowUpRight size={13} />
            </span>
          </Link>
        </div>
      </section>
      <section className="section related">
        <SectionHead eyebrow="In good company" title="A few kindred pieces." />
        <div className="product-grid">
          {products
            .filter((x) => x.id !== p.id && x.published)
            .slice(0, 4)
            .map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
        </div>
      </section>
    </>
  );
}
export function CollectionsPage() {
  const { collectionData } = useStore();
  return (
    <>
      <div className="page-intro">
        <Breadcrumb items={[{ label: "Collections" }]} />
        <p className="eyebrow">Different expressions. One point of view.</p>
        <h1>Considered together.</h1>
        <p className="intro-description">
          A collection is a conversation between pieces.
          <br />
          Find the one that speaks your language.
        </p>
      </div>
      <section className="collections-list">
        {collectionData.map((c, i) => (
          <Link
            href={`/collections/${c.slug}`}
            className="collection-row"
            key={c.slug}
          >
            <div className="collection-row-image">
              <img
                src={c.image}
                alt={`${c.name} jewelry collection`}
                loading="lazy"
              />
            </div>
            <div className="collection-row-copy">
              <p className="eyebrow">{c.eyebrow}</p>
              <h2>{c.name}</h2>
              <p>{c.description}</p>
              <span className="text-link">
                Explore the collection <ArrowUpRight size={17} />
              </span>
              <span className="collection-count">0{i + 1} / 03</span>
            </div>
          </Link>
        ))}
        <Link
          href="/collections/indonesian-stones"
          className="collection-row stone-study-collection-row"
        >
          <div className="collection-row-image">
            <img
              src="/images/stone-studies/maligano-jasper-set.jpg"
              alt="Maligano jasper pendant and earrings set in hand-finished silver"
              loading="lazy"
            />
          </div>
          <div className="collection-row-copy">
            <p className="eyebrow">Material stories / Indonesia</p>
            <h2>Stone studies</h2>
            <p>
              Distinctive color and natural patterns, brought together with
              hand-finished silver.
            </p>
            <span className="text-link">
              Explore the stone studies <ArrowUpRight size={17} />
            </span>
            <span className="collection-count">04 / MATERIAL STORIES</span>
          </div>
        </Link>
      </section>
    </>
  );
}
export function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div>
          <Breadcrumb items={[{ label: "Our story" }]} />
          <p className="eyebrow">A little about Wild Feather</p>
          <h1>
            Made with intention.
            <br />
            <em>Worn with feeling.</em>
          </h1>
          <p>
            Jewelry is a small thing with a way of becoming something much
            bigger. A reminder. An expression. A piece of your own story.
          </p>
        </div>
        <div className="about-art">
          <img
            src="/images/editorial/studio-workspace.jpg"
            alt="A quiet jewelry studio with hand tools arranged around a workbench"
          />
          <span>AN INDEPENDENT POINT OF VIEW</span>
        </div>
      </section>
      <section className="story-text">
        <span className="eyebrow">The name. The spirit.</span>
        <div>
          <h2>
            A feather found.
            <br />
            <i>A story begun.</i>
          </h2>
          <p>
            Wild Feather Creations takes its name from a love of birds and the
            simple pleasure of finding a feather along the way. Something small,
            unexpected, and entirely its own.
          </p>
          <p>
            That same curiosity guides our approach to making. We are drawn to
            considered forms and the individuality of things made by hand.
            Today, that expression is jewelry. Tomorrow, there is room for
            something new.
          </p>
          <p>
            Based in the United States, WFC brings ready-to-ship pieces and
            made-to-order creations together in a collection that leaves space
            for you.
          </p>
        </div>
      </section>
      <section className="editorial-split about-process">
        <div className="editorial-copy">
          <p className="eyebrow">At the workbench</p>
          <h2>
            Formed by hand.
            <br />
            <em>Finished with care.</em>
          </h2>
          <p>
            Small adjustments give each piece its character: the curve, the
            balance, and the way its surface catches the light.
          </p>
          <span className="editorial-index">A CLOSER LOOK AT THE MAKING</span>
        </div>
        <div className="editorial-image">
          <img
            src="/images/editorial/craft-process.jpg"
            alt="A jeweler hand-filing a silver ring at a workbench"
            loading="lazy"
          />
        </div>
      </section>
      <section className="manifesto light">
        <FeatherMark />
        <p className="eyebrow">Our point of view</p>
        <h2>
          Considered in form.
          <br />
          <em>Individual in spirit.</em>
        </h2>
        <Link href="/shop" className="text-link">
          Discover the collection <ArrowUpRight size={17} />
        </Link>
      </section>
    </>
  );
}
export function ContactPage({ productSlug = "" }: { productSlug?: string }) {
  const { products, notify } = useStore();
  const product = products.find((p) => p.slug === productSlug);
  const [review, setReview] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: product ? `A question about ${product.name}` : "",
    message: "",
  });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setTimeout(() => {
      setReview(values);
      setBusy(false);
    }, 400);
  };
  return (
    <section className="contact-page">
      <div className="contact-copy">
        <Breadcrumb items={[{ label: "Contact" }]} />
        <p className="eyebrow">The studio is listening</p>
        <h1>
          A good place
          <br />
          to <em>start.</em>
        </h1>
        <p>
          A product question, a little sizing advice, or something you have in
          mind. Tell us what you’re thinking.
        </p>
        <div className="contact-small">
          <span>BASED IN THE UNITED STATES</span>
          <span>FOR ENQUIRIES NEAR & FAR</span>
        </div>
        <FeatherMark />
      </div>
      <div className="contact-form">
        {review ? (
          <div className="message-review">
            <p className="eyebrow">Your enquiry</p>
            <h2>A note to the studio.</h2>
            <p className="muted">Review your details before sending.</p>
            <dl>
              <dt>Name</dt>
              <dd>{review.name}</dd>
              <dt>Email</dt>
              <dd>{review.email}</dd>
              <dt>Subject</dt>
              <dd>{review.subject}</dd>
              <dt>Message</dt>
              <dd className="preserve-lines">{review.message}</dd>
            </dl>
            <button
              className="button dark"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(
                    `${review.subject}\n\n${review.message}\n\n${review.name}\n${review.email}`,
                  );
                  notify("Message copied");
                } catch {
                  notify("Select and copy the message above.");
                }
              }}
            >
              Copy message <Copy size={15} />
            </button>
            <button className="text-link" onClick={() => setReview(null)}>
              Back to edit
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p className="eyebrow">Send an enquiry</p>
            <label>
              Your name
              <input
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </label>
            <label>
              Subject
              <select
                value={values.subject}
                onChange={(e) =>
                  setValues({ ...values, subject: e.target.value })
                }
                required
              >
                <option value="">Choose a subject</option>
                {product && <option>A question about {product.name}</option>}
                {[
                  "Product & sizing",
                  "Made to order",
                  "Shipping & delivery",
                  "Care & repairs",
                  "Something else",
                ].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label>
              A few details
              <textarea
                required
                rows={5}
                minLength={10}
                maxLength={3000}
                value={values.message}
                onChange={(e) =>
                  setValues({ ...values, message: e.target.value })
                }
              />
            </label>
            <p className="small muted">
              Please avoid including payment information. Read our{" "}
              <Link href="/policies/privacy" className="underlined">
                privacy policy
              </Link>
              .
            </p>
            <button className="button dark" disabled={busy}>
              {busy ? "Preparing your message…" : "Review message"}
              <ArrowRight size={16} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
export function FAQPage() {
  const [category, setCategory] = useState("All");
  return (
    <>
      <div className="page-intro">
        <Breadcrumb items={[{ label: "Frequently asked" }]} />
        <p className="eyebrow">A little guidance</p>
        <h1>A few good questions.</h1>
        <p className="intro-description">
          The details that make choosing a piece a little easier.
        </p>
      </div>
      <section className="faq-layout">
        <div className="faq-nav">
          {["All", "Orders", "Shipping", "Care"].map((t) => (
            <button
              key={t}
              className={category === t ? "selected" : ""}
              onClick={() => setCategory(t)}
            >
              {t}
              <ArrowUpRight size={14} />
            </button>
          ))}
          <p>Something else?</p>
          <Link href="/contact" className="text-link">
            Ask the studio <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="faq-list">
          {faqs
            .filter((f) => category === "All" || f.category === category)
            .map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <Plus size={18} />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
        </div>
      </section>
    </>
  );
}
export function GuidePage({ slug }: { slug: string }) {
  const guide = guides[slug];
  if (!guide) return null;
  return (
    <>
      <div className="page-intro">
        <Breadcrumb items={[{ label: guide.eyebrow }]} />
        <p className="eyebrow">{guide.eyebrow}</p>
        <h1>{guide.title}</h1>
        <p className="intro-description">{guide.intro}</p>
      </div>
      <section className="reading-layout">
        <aside>
          <p className="eyebrow">A little guidance</p>
          <Link href="/guides/sizing">Finding your size</Link>
          <Link href="/guides/care">Jewelry care</Link>
          <Link href="/contact">Ask the studio</Link>
        </aside>
        <div>
          {guide.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
              {slug === "sizing" && s.title === "Rings" && (
                <table className="size-table">
                  <thead>
                    <tr>
                      <th>US size</th>
                      <th>Inside diameter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["5", "15.7 mm"],
                      ["6", "16.5 mm"],
                      ["7", "17.3 mm"],
                      ["8", "18.2 mm"],
                      ["9", "19.0 mm"],
                      ["10", "19.8 mm"],
                    ].map(([size, mm]) => (
                      <tr key={size}>
                        <td>{size}</td>
                        <td>{mm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
export function PolicyPage({ slug }: { slug: string }) {
  const policy = policies[slug];
  if (!policy) return null;
  return (
    <>
      <div className="page-intro">
        <Breadcrumb items={[{ label: policy.title }]} />
        <p className="eyebrow">The details</p>
        <h1>{policy.title}</h1>
        <p className="intro-description">{policy.intro}</p>
      </div>
      <section className="reading-layout">
        <aside>
          {Object.entries(policies).map(([slug, p]) => (
            <Link key={slug} href={`/policies/${slug}`}>
              {p.title}
            </Link>
          ))}
          <Link href="/contact">Contact the studio</Link>
        </aside>
        <div>
          {policy.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
