"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  ChevronDown,
  ArrowRight,
  Search,
  ShoppingBag,
  X,
  Menu,
  Minus,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { useStore } from "./store-provider";
import { money } from "@/lib/data";
export function FeatherMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M7 42C10 22 21 5 34 4c2 17-7 31-24 33M8 42L29 12M17 29l-1-10M22 22l9-2M12 36l12-3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function BrandLogo({
  className = "",
  variant = "dark",
  alt = "Wild Feather Creations",
}: {
  className?: string;
  variant?: "dark" | "light";
  alt?: string;
}) {
  return (
    <img
      className={`brand-logo ${className}`.trim()}
      src={
        variant === "light"
          ? "/brand/wfc-logo-primary-light.png"
          : "/brand/wfc-logo-primary.png"
      }
      alt={alt}
    />
  );
}
export function Overlay({
  open,
  onClose,
  title,
  children,
  className = "",
  dialogId,
  headingContent,
}: {
  dialogId?: string;
  headingContent?: ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    if (open && !ref.current?.open) ref.current?.showModal();
    if (!open && ref.current?.open) ref.current.close();
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, [open]);
  return (
    <dialog
      id={dialogId}
      ref={ref}
      className={`overlay ${className}`}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby={id}
    >
      <div className="overlay-inner">
        <div className="overlay-top">
          <h2 id={id} className={headingContent ? "sr-only" : undefined}>
            {title}
          </h2>
          {headingContent}
          <button className="icon-button" onClick={onClose} aria-label="Close">
            <X size={22} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
function Bag() {
  const { cart, products, bagOpen, setBagOpen, updateCart } = useStore();
  const subtotal = cart.reduce(
    (sum, i) =>
      sum +
      (products.find((p) => p.id === i.productId)?.price ?? 0) * i.quantity,
    0,
  );
  return (
    <Overlay
      open={bagOpen}
      onClose={() => setBagOpen(false)}
      title={`Your bag (${cart.reduce((n, x) => n + x.quantity, 0)})`}
      className="side-overlay"
    >
      {cart.length ? (
        <>
          <div className="bag-items">
            {cart.map((item) => {
              const p = products.find((x) => x.id === item.productId);
              if (!p) return null;
              return (
                <div
                  className="bag-line"
                  key={`${item.productId}-${item.size}`}
                >
                  <Link
                    href={`/products/${p.slug}`}
                    onClick={() => setBagOpen(false)}
                  >
                    <img src={p.images[0]} alt={p.name} />
                  </Link>
                  <div>
                    <Link
                      href={`/products/${p.slug}`}
                      onClick={() => setBagOpen(false)}
                    >
                      {p.name}
                    </Link>
                    <p className="muted">
                      {p.material} · {item.size}
                    </p>
                    <p>{money(p.price)}</p>
                    <div className="quantity">
                      <button
                        onClick={() =>
                          updateCart(p.id, item.size, item.quantity - 1)
                        }
                        aria-label={`Decrease ${p.name} quantity`}
                      >
                        <Minus size={12} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateCart(p.id, item.size, item.quantity + 1)
                        }
                        aria-label={`Increase ${p.name} quantity`}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <button
                    className="icon-button remove-item"
                    onClick={() => updateCart(p.id, item.size, 0)}
                    aria-label={`Remove ${p.name}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>
          <div className="bag-bottom">
            <div className="spread">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <p className="muted small">
              Shipping calculated at checkout. Prices in USD.
            </p>
            <Link
              className="button dark"
              href="/checkout"
              onClick={() => setBagOpen(false)}
            >
              Continue to checkout <ArrowRight size={16} />
            </Link>
            <Link
              className="text-link centered"
              href="/cart"
              onClick={() => setBagOpen(false)}
            >
              View your bag
            </Link>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <FeatherMark />
          <h3>A little room for something special.</h3>
          <p>Your bag is waiting for its first piece.</p>
          <Link
            href="/shop"
            className="button dark"
            onClick={() => setBagOpen(false)}
          >
            Explore the collection <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </Overlay>
  );
}
const navigationGroups = [
  {
    title: "Shop",
    links: [
      ["Shop All", "/shop"],
      ...["Rings", "Necklaces", "Earrings", "Bracelets"].map((name) => [
        name,
        `/shop?category=${name}`,
      ]),
    ],
  },
  {
    title: "Collections",
    links: [
      ["All Collections", "/collections"],
      ["Silver Studies", "/collections/silver-studies"],
      ["Line & Form", "/collections/line-and-form"],
      ["Small Rituals", "/collections/small-rituals"],
      ["Indonesian Stone Studies", "/collections/indonesian-stones"],
    ],
  },
  {
    title: "Client Care",
    links: [
      ["Size Guide", "/guides/sizing"],
      ["Jewelry Care", "/guides/care"],
      ["Shipping & Delivery", "/policies/shipping"],
      ["Returns & Repairs", "/policies/returns"],
      ["FAQ", "/faq"],
      ["Contact", "/contact"],
    ],
  },
];
const navigationEditorial: Record<
  string,
  {
    eyebrow: string;
    title: string;
    copy: string;
    image: string;
    alt: string;
    href: string;
    caption: string;
    notes: string[];
  }
> = {
  Shop: {
    eyebrow: "OBJECTS TO WEAR",
    title: "Find your everyday extraordinary.",
    copy: "Considered shapes, natural character. A piece that feels like you.",
    image: "/images/editorial/wfc-hero.jpg",
    alt: "Carnelian stone set in a sculptural silver ring",
    href: "/shop",
    caption: "Explore the considered collection",
    notes: [
      "Every piece, one point of view",
      "Small sculptures for the hand",
      "Fine lines, close to the heart",
      "A little movement, a little light",
      "Considered curves for everyday",
    ],
  },
  Collections: {
    eyebrow: "DIFFERENT EXPRESSIONS",
    title: "Your own kind of wild.",
    copy: "Explore a collection by its form, its feeling, or the stone at its heart.",
    image: "/images/editorial/wfc-hero-02-chrysocolla.jpg",
    alt: "Chrysocolla pendant and earrings in hand-finished silver",
    href: "/collections/indonesian-stones",
    caption: "The Indonesian stone studies",
    notes: [
      "Discover every expression",
      "Reflection, texture, quiet weight",
      "Delicate connections",
      "The pieces you reach for",
      "Natural color. Individual character.",
    ],
  },
  "Client Care": {
    eyebrow: "A LITTLE GUIDANCE",
    title: "Here for the details.",
    copy: "From finding your fit to caring for a favorite. Make yourself at home.",
    image: "/images/editorial/craft-process.jpg",
    alt: "Hand-finishing silver at the studio workbench",
    href: "/contact",
    caption: "A question? Let's talk.",
    notes: [
      "Find a comfortable fit",
      "Keep your pieces at their best",
      "From our studio to your door",
      "A little reassurance",
      "Answers, thoughtfully gathered",
      "Speak with the studio",
    ],
  },
};
function NavigationGroup({
  group,
  mobile = false,
  onNavigate,
}: {
  group: (typeof navigationGroups)[number];
  mobile?: boolean;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const editorial = navigationEditorial[group.title];
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (
        !mobile &&
        event.target instanceof Node &&
        !ref.current?.contains(event.target)
      )
        ref.current?.removeAttribute("open");
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [mobile]);
  return (
    <details
      ref={ref}
      className={`nav-group${mobile ? " nav-group-mobile" : ""}`}
      name={mobile ? "mobile-navigation" : "desktop-navigation"}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          ref.current?.removeAttribute("open");
          ref.current?.querySelector("summary")?.focus();
        }
      }}
      onBlur={(event) => {
        if (!mobile && !event.currentTarget.contains(event.relatedTarget))
          ref.current?.removeAttribute("open");
      }}
    >
      <summary
        className={
          group.links.some(([, href]) => href.split("?")[0] === pathname)
            ? "active"
            : ""
        }
      >
        {mobile ? (
          <>
            <span className="mobile-chapter" aria-hidden="true">
              {group.title === "Shop"
                ? "01"
                : group.title === "Collections"
                  ? "02"
                  : "04"}
            </span>
            <span className="mobile-nav-copy">
              <span>{group.title}</span>
              <small>
                {group.title === "Shop"
                  ? "Find your everyday piece"
                  : group.title === "Collections"
                    ? "Explore form, stone & feeling"
                    : "For every little detail"}
              </small>
            </span>
          </>
        ) : (
          group.title
        )}
        <ChevronDown size={13} />
      </summary>
      <div className="nav-dropdown">
        {!mobile && (
          <div className="nav-editorial-intro">
            <span className="nav-eyebrow">{editorial.eyebrow}</span>
            <h2>{editorial.title}</h2>
            <p>{editorial.copy}</p>
            <span className="nav-editorial-signature">
              WILD FEATHER CREATIONS <FeatherMark />
            </span>
          </div>
        )}
        <div className="nav-dropdown-links">
          {group.links.map(([label, href], index) => (
            <Link
              key={href}
              href={href}
              aria-current={
                href !== "/shop" && !href.includes("?") && pathname === href
                  ? "page"
                  : undefined
              }
              onClick={() => {
                ref.current?.removeAttribute("open");
                onNavigate();
              }}
            >
              {!mobile && (
                <span className="nav-link-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
              <span className="nav-link-copy">
                <span>{label}</span>
                {!mobile && <small>{editorial.notes[index]}</small>}
              </span>
              {!mobile && <ArrowUpRight size={16} className="nav-link-arrow" />}
            </Link>
          ))}
        </div>
        {!mobile && (
          <Link
            href={editorial.href}
            className="nav-preview"
            onClick={() => {
              ref.current?.removeAttribute("open");
              onNavigate();
            }}
          >
            <img src={editorial.image} alt={editorial.alt} />
            <span>
              {editorial.caption} <ArrowUpRight size={14} />
            </span>
          </Link>
        )}
      </div>
    </details>
  );
}
export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { cart, products, setBagOpen } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const menuId = useId();
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 801px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    closeOnDesktop();
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);
  if (pathname.startsWith("/admin")) return <>{children}</>;
  const count = cart.reduce((n, x) => n + x.quantity, 0);
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="announcement">
        Handmade in spirit. Individual by nature.
        <span>Based in the US · Shipping worldwide</span>
      </div>
      <header className="site-header">
        <button
          className="icon-button mobile-only"
          aria-label="Open navigation"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-haspopup="dialog"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={21} />
        </button>
        <Link
          href="/"
          className="site-logo"
          aria-label="Wild Feather Creations home"
        >
          <BrandLogo alt="" />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigationGroups.slice(0, 2).map((group) => (
            <NavigationGroup
              group={group}
              key={group.title}
              onNavigate={() => {}}
            />
          ))}
          <Link
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
          >
            Our Story
          </Link>
          <NavigationGroup group={navigationGroups[2]} onNavigate={() => {}} />
        </nav>
        <div className="header-actions">
          <button
            className="icon-button"
            aria-label="Search jewelry"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={19} />
          </button>
          <button
            className="bag-button"
            onClick={() => setBagOpen(true)}
            aria-label={`Open shopping bag, ${count} items`}
          >
            <span className="desktop-only">Bag</span>
            <ShoppingBag size={18} />
            <span className="bag-count">{count}</span>
          </button>
        </div>
      </header>
      <main
        id="main-content"
        className={pathname === "/" ? undefined : "interior-page"}
      >
        {children}
      </main>
      <Footer />
      <Bag />
      <Overlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        title="Find your next piece."
        className="search-overlay"
      >
        <label className="search-input">
          <Search size={20} />
          <input
            autoFocus={searchOpen}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rings, silver, necklaces…"
            aria-label="Search products"
          />
        </label>
        <p className="eyebrow">
          {query ? "Search results" : "A few favorites"}
        </p>
        <div className="search-results">
          {products
            .filter(
              (p) =>
                p.published &&
                (!query ||
                  `${p.name} ${p.category} ${p.material}`
                    .toLowerCase()
                    .includes(query.toLowerCase())),
            )
            .slice(0, 6)
            .map((p) => (
              <Link href={`/products/${p.slug}`} key={p.id}>
                <img src={p.images[0]} alt={p.name} />
                <div>
                  {p.name}
                  <p className="muted">{p.material}</p>
                </div>
                <span>{money(p.price)}</span>
                <ArrowUpRight size={17} />
              </Link>
            ))}
        </div>
        {query &&
          !products.some((p) =>
            `${p.name} ${p.category} ${p.material}`
              .toLowerCase()
              .includes(query.toLowerCase()),
          ) && (
            <p className="empty-note">
              No pieces found. Try a material or a different name.
            </p>
          )}
      </Overlay>
      <Overlay
        open={menuOpen}
        dialogId={menuId}
        onClose={() => setMenuOpen(false)}
        title="Explore WFC"
        headingContent={
          <Link
            href="/"
            className="menu-brand"
            aria-label="Wild Feather Creations home"
            onClick={() => setMenuOpen(false)}
          >
            <BrandLogo alt="" />
          </Link>
        }
        className="side-overlay menu-overlay"
      >
        <button
          className="mobile-menu-search"
          onClick={() => {
            setMenuOpen(false);
            setSearchOpen(true);
          }}
        >
          <Search size={18} />
          <span>Find something that feels like you</span>
          <ArrowRight size={16} />
        </button>
        <nav
          aria-label="Mobile navigation"
          className="mobile-navigation-groups"
        >
          {navigationGroups.slice(0, 2).map((group) => (
            <NavigationGroup
              mobile
              group={group}
              key={group.title}
              onNavigate={() => setMenuOpen(false)}
            />
          ))}
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            aria-current={pathname === "/about" ? "page" : undefined}
          >
            <span className="mobile-chapter" aria-hidden="true">
              03
            </span>
            <span className="mobile-nav-copy">
              <span>Our Story</span>
              <small>The hands behind the pieces</small>
            </span>
            <ArrowUpRight size={18} />
          </Link>
          <NavigationGroup
            mobile
            group={navigationGroups[2]}
            onNavigate={() => setMenuOpen(false)}
          />
        </nav>
        <Link
          href="/collections/indonesian-stones"
          className="mobile-menu-feature"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/images/stone-studies/purple-chalcedony-earrings.jpg"
            alt="Silver drop earrings with purple chalcedony cabochons"
          />
          <div>
            <span className="mobile-feature-eyebrow">THE STONE EDIT</span>
            <span className="mobile-feature-title">
              Small details.
              <br />
              <em>Distinct character.</em>
            </span>
            <span className="mobile-feature-link">
              Discover the studies <ArrowUpRight size={15} />
            </span>
          </div>
        </Link>
        <div className="mobile-menu-foot">
          <span>
            Independent by nature.
            <br />
            Considered by hand.
          </span>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>
            A note to the studio <ArrowUpRight size={14} />
          </Link>
        </div>
      </Overlay>
    </>
  );
}
function Footer() {
  return (
    <footer className="studio-footer">
      <div className="studio-footer-intro">
        <div className="studio-footer-statement">
          <p className="eyebrow">The Wild Feather point of view</p>
          <h2>
            Drawn to the
            <br />
            <em>unexpected.</em>
          </h2>
          <p className="studio-footer-description">
            Explore the stones, forms, and details behind Wild Feather
            Creations.
          </p>
          <Link
            href="/collections/indonesian-stones"
            className="studio-footer-story"
          >
            Discover the stone studies{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <figure className="studio-footer-image">
          <img
            src="/images/stone-studies/maligano-jasper-set.jpg"
            alt="Jewelry design study exploring the natural patterns of Maligano jasper"
            loading="lazy"
            width={1024}
            height={1024}
          />
          <figcaption>Stone studies / Maligano jasper</figcaption>
        </figure>
      </div>
      <div className="studio-footer-details">
        <div className="studio-footer-identity">
          <Link href="/" aria-label="Wild Feather Creations home">
            <BrandLogo className="footer-logo" variant="light" />
          </Link>
          <p>
            Independent jewelry & handmade creations.
            <br />
            Based in the United States.
          </p>
        </div>
        <div className="studio-footer-contact">
          <h3>A note to the studio</h3>
          <p>
            Questions about a piece,
            <br />
            its fit, or its care?
          </p>
          <Link href="/contact" className="studio-footer-story">
            Get in touch <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <nav aria-label="Footer collections">
          <h3>Collections</h3>
          <Link href="/shop">All pieces</Link>
          <Link href="/collections">Explore collections</Link>
          <Link href="/collections/indonesian-stones">Stone studies</Link>
        </nav>
        <nav aria-label="Footer client care">
          <h3>Client care</h3>
          <Link href="/guides/sizing">Size guide</Link>
          <Link href="/guides/care">Jewelry care</Link>
          <Link href="/policies/shipping">Shipping & delivery</Link>
          <Link href="/policies/returns">Returns & repairs</Link>
          <Link href="/faq">FAQ</Link>
        </nav>
        <nav aria-label="Footer studio">
          <h3>The studio</h3>
          <Link href="/about">Our story</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
      <div className="studio-footer-bottom">
        <span>© {new Date().getFullYear()} Wild Feather Creations</span>
        <div>
          <Link href="/policies/privacy">Privacy</Link>
          <Link href="/policies/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
