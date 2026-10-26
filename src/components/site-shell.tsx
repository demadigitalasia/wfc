"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
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
}: {
  dialogId?: string;
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
          <h2 id={id}>{title}</h2>
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
          <Link href="/shop" className={pathname === "/shop" ? "active" : ""}>
            Shop all
          </Link>
          <Link
            href="/collections"
            className={pathname.startsWith("/collections") ? "active" : ""}
          >
            Collections
          </Link>
          <Link href="/about" className={pathname === "/about" ? "active" : ""}>
            Our story
          </Link>
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
      <main id="main-content">{children}</main>
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
        className="side-overlay menu-overlay"
      >
        <nav aria-label="Mobile navigation">
          {[
            ["Shop all", "/shop"],
            ["Collections", "/collections"],
            ["Our story", "/about"],
            ["Contact", "/contact"],
            ["Size guide", "/guides/sizing"],
          ].map(([t, url]) => (
            <Link
              href={url}
              key={url}
              onClick={() => setMenuOpen(false)}
              aria-current={
                pathname === url ||
                (url === "/collections" && pathname.startsWith("/collections/"))
                  ? "page"
                  : undefined
              }
              className={
                url === "/contact" || url === "/guides/sizing"
                  ? "menu-secondary"
                  : undefined
              }
            >
              {t}
              <ArrowUpRight size={24} />
            </Link>
          ))}
        </nav>
        <p className="muted">Independent jewelry. A point of view.</p>
      </Overlay>
    </>
  );
}
function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand">
          <BrandLogo className="footer-logo" variant="light" />
          <p>
            Objects to wear.
            <br />
            <i>Stories to keep.</i>
          </p>
          <span>
            Independent jewelry & handmade creations.
            <br />
            Based in the United States.
          </span>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <Link href="/shop">Shop all</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/about">Our story</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <p className="eyebrow">A little guidance</p>
          <Link href="/guides/sizing">Size guide</Link>
          <Link href="/guides/care">Jewelry care</Link>
          <Link href="/policies/shipping">Shipping & delivery</Link>
          <Link href="/policies/returns">Returns & repairs</Link>
          <Link href="/faq">Frequently asked</Link>
        </div>
        <div className="footer-note">
          <p className="eyebrow">A considered collection</p>
          <p>
            Made to be worn, loved,
            <br />
            and made your own.
          </p>
          <Link href="/shop" className="text-link">
            Find your piece <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Wild Feather Creations</span>
        <div>
          <Link href="/policies/privacy">Privacy</Link>
          <Link href="/policies/terms">Terms</Link>
          <span>United States · English · USD</span>
        </div>
      </div>
    </footer>
  );
}
