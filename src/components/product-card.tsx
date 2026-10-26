"use client";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { type Product, money } from "@/lib/data";
import { useStore } from "./store-provider";
export function ProductCard({
  product: p,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { addToCart } = useStore();
  return (
    <article className="product-card">
      <div className="product-photo">
        <Link href={`/products/${p.slug}`} aria-label={`View ${p.name}`}>
          <img
            src={p.images[0]}
            alt={`${p.name}, ${p.material.toLowerCase()}`}
            loading="lazy"
          />
          <span className="product-number">
            {String(index + 1).padStart(2, "0")}
          </span>
        </Link>
        {p.status !== "Ready to ship" && (
          <span className="product-label">{p.status}</span>
        )}
        <button
          className="quick-add"
          onClick={() => addToCart(p.id, p.sizes[0])}
          disabled={p.status === "Sold out"}
          aria-label={`Add ${p.name} in ${p.sizes[0]} to bag`}
        >
          <Plus size={17} />
        </button>
      </div>
      <div className="product-info">
        <div>
          <Link href={`/products/${p.slug}`}>{p.name}</Link>
          <p>{p.material}</p>
        </div>
        <span>{money(p.price)}</span>
      </div>
    </article>
  );
}
export function SectionHead({
  eyebrow,
  title,
  link = "/shop",
  label = "Explore all pieces",
}: {
  eyebrow: string;
  title: string;
  link?: string;
  label?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <Link href={link} className="text-link">
        {label}
        <ArrowUpRight size={16} />
      </Link>
    </div>
  );
}
