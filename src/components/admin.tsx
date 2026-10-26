"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Check,
  ChevronRight,
  CircleDollarSign,
  Eye,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Mail,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Truck,
  Users,
  X,
  Save,
  ImagePlus,
  ShieldCheck,
} from "lucide-react";
import { useStore, type CollectionData } from "./store-provider";
import { type Product, type Order, type Inquiry, money } from "@/lib/data";
import { BrandLogo, FeatherMark, Overlay } from "./site-shell";
const nav = [
  { slug: "", name: "Overview", icon: LayoutDashboard },
  { slug: "products", name: "Products", icon: Package },
  { slug: "collections", name: "Collections", icon: FolderOpen },
  { slug: "orders", name: "Orders", icon: ShoppingBag },
  { slug: "shipping", name: "Shipping", icon: Truck },
  { slug: "inquiries", name: "Inquiries", icon: Mail },
  { slug: "settings", name: "Settings", icon: Settings },
];
export function AdminApp({ section = [] }: { section?: string[] }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const time = Number(sessionStorage.getItem("wfc-admin-session"));
    const access = !!time && Date.now() - time < 8 * 60 * 60 * 1000;
    setAllowed(access);
    setReady(true);
    if (
      !access &&
      section[0] !== "login" &&
      section[0] !== "session-expired" &&
      section[0] !== "access-denied"
    )
      router.replace("/admin/login");
  }, [router, section.join("/")]);
  if (section[0] === "login" || section[0] === "session-expired")
    return (
      <AdminLogin
        expired={section[0] === "session-expired"}
        onLogin={() => {
          setAllowed(true);
          router.push("/admin");
        }}
      />
    );
  if (section[0] === "access-denied")
    return (
      <div className="admin-login">
        <ShieldCheck size={40} />
        <h1>This space is for the studio.</h1>
        <p>Sign in with an authorized studio account.</p>
        <Link className="button dark" href="/admin/login">
          Go to sign in
        </Link>
      </div>
    );
  if (!ready || !allowed)
    return (
      <div className="admin-loading">
        <FeatherMark />
        <p>Opening the studio…</p>
      </div>
    );
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link
          className="admin-sidebar-logo"
          href="/admin"
          aria-label="Wild Feather Creations studio"
        >
          <BrandLogo alt="" />
        </Link>
        <p className="eyebrow sidebar-label">Workspace</p>
        <nav aria-label="Studio navigation">
          {nav.map(({ slug, name, icon: Icon }) => (
            <Link
              className={(section[0] ?? "") === slug ? "selected" : ""}
              href={`/admin${slug ? "/" + slug : ""}`}
              key={name}
            >
              <Icon size={18} />
              {name}
              {slug === "inquiries" && <NewInquiryCount />}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <Link href="/" target="_blank">
            <ArrowUpRight size={17} /> View storefront
          </Link>
          <button
            onClick={() => {
              sessionStorage.removeItem("wfc-admin-session");
              setAllowed(false);
              router.push("/admin/login");
            }}
          >
            <LogOut size={17} /> Sign out
          </button>
          <span className="studio-avatar">WF</span>
          <div>
            <strong>Wild Feather Studio</strong>
            <p>Store owner</p>
          </div>
        </div>
      </aside>
      <div className="admin-workspace">
        <header className="admin-header">
          <span>
            Studio <ChevronRight size={13} />{" "}
            {nav.find((n) => n.slug === (section[0] ?? ""))?.name ?? "Overview"}
          </span>
          <div className="admin-header-actions">
            <Link href="/" target="_blank" className="text-link">
              Visit store <ArrowUpRight size={14} />
            </Link>
            <button
              className="icon-button mobile-only"
              aria-label="Sign out"
              onClick={() => {
                sessionStorage.removeItem("wfc-admin-session");
                setAllowed(false);
                router.push("/admin/login");
              }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>
        <main className="admin-content">
          {!section[0] ? (
            <Dashboard />
          ) : section[0] === "products" ? (
            section[1] ? (
              <ProductEditor key={section[1]} id={section[1]} />
            ) : (
              <ProductTable />
            )
          ) : section[0] === "collections" ? (
            <CollectionsAdmin />
          ) : section[0] === "orders" ? (
            section[1] ? (
              <OrderDetail key={section[1]} id={section[1]} />
            ) : (
              <OrdersTable />
            )
          ) : section[0] === "shipping" ? (
            <ShippingAdmin />
          ) : section[0] === "inquiries" ? (
            <InquiriesAdmin />
          ) : section[0] === "settings" ? (
            <SettingsAdmin />
          ) : (
            <Dashboard />
          )}
        </main>
      </div>
    </div>
  );
}
function NewInquiryCount() {
  const { inquiries } = useStore();
  const count = inquiries.filter((i) => i.status === "New").length;
  return count ? <span className="nav-badge">{count}</span> : null;
}
function AdminLogin({
  expired,
  onLogin,
}: {
  expired: boolean;
  onLogin: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <div className="admin-login-page">
      <div className="login-art">
        <FeatherMark />
        <h2>
          The quiet work
          <br />
          <i>behind the pieces.</i>
        </h2>
        <span>WILD FEATHER CREATIONS / STUDIO</span>
      </div>
      <div className="admin-login">
        <Link
          className="admin-login-logo"
          href="/"
          aria-label="Wild Feather Creations home"
        >
          <BrandLogo alt="" />
        </Link>
        <p className="eyebrow">The studio</p>
        <h1>Welcome back.</h1>
        <p className="muted">
          {expired
            ? "Your session has ended. Sign in to continue."
            : "A little space to keep everything in order."}
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setBusy(true);
            setError("");
            setTimeout(() => {
              if (
                email.toLowerCase() === "studio@wildfeathercreations.com" &&
                password === "WildFeather2026!"
              ) {
                sessionStorage.setItem("wfc-admin-session", String(Date.now()));
                onLogin();
              } else setError("Check your email and password, then try again.");
              setBusy(false);
            }, 400);
          }}
        >
          <label>
            Email address
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              minLength={8}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && (
            <p role="alert" className="field-error">
              {error}
            </p>
          )}
          <button className="button dark" disabled={busy}>
            {busy ? "Signing in…" : "Sign in to the studio"}
            <ArrowRight size={16} />
          </button>
        </form>
        <Link href="/" className="text-link">
          <ArrowLeft size={13} /> Back to the collection
        </Link>
      </div>
    </div>
  );
}
function AdminTitle({
  eyebrow = "Your studio, at a glance",
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="admin-title">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description && <p className="muted">{description}</p>}
      </div>
      <div className="admin-title-actions">{children}</div>
    </div>
  );
}
function Status({ value }: { value: string }) {
  return (
    <span
      className={`status-badge ${["Paid", "Ready to ship", "Delivered", "Resolved", "Published"].includes(value) ? "positive" : ["Cancelled", "Sold out", "Refunded"].includes(value) ? "neutral" : "pending"}`}
    >
      <span />
      {value}
    </span>
  );
}
function Dashboard() {
  const { products, orders, inquiries } = useStore();
  const revenue = orders
    .filter((o) => o.payment === "Paid")
    .reduce((n, o) => n + o.total, 0);
  const chart = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(Date.UTC(2026, 9, 20 + i));
    const key = date.toISOString().slice(0, 10);
    return {
      label: date.toLocaleDateString("en-US", {
        weekday: "short",
        timeZone: "UTC",
      }),
      value: orders
        .filter((o) => o.date === key && o.payment === "Paid")
        .reduce((n, o) => n + o.total, 0),
    };
  });
  const chartMax = Math.max(100, ...chart.map((x) => x.value));
  return (
    <>
      <AdminTitle
        title="A good day to create."
        description="A considered overview of what’s happening in your store."
      >
        <Link href="/admin/products/new" className="button dark">
          <Plus size={15} /> Add product
        </Link>
      </AdminTitle>
      <div className="metric-grid">
        {[
          {
            label: "Sales revenue",
            value: money(revenue),
            icon: CircleDollarSign,
            note: "Across paid orders",
          },
          {
            label: "Orders",
            value: orders.length,
            icon: ShoppingBag,
            note: `${orders.filter((o) => o.status === "Processing").length} ready for your attention`,
          },
          {
            label: "Active products",
            value: products.filter((p) => p.published).length,
            icon: Package,
            note: "In your collection",
          },
          {
            label: "New enquiries",
            value: inquiries.filter((i) => i.status === "New").length,
            icon: Mail,
            note: "A conversation waiting",
          },
        ].map(({ label, value, icon: Icon, note }) => (
          <div className="metric-card" key={label}>
            <div className="spread">
              <span>{label}</span>
              <Icon size={17} />
            </div>
            <strong>{value}</strong>
            <p>{note}</p>
          </div>
        ))}
      </div>
      <div className="dashboard-grid">
        <section className="admin-panel">
          <div className="panel-heading">
            <h2>The rhythm of your studio</h2>
            <span className="small muted">Last 7 days</span>
          </div>
          <div className="sales-chart">
            <div className="chart-axis">
              <span>{money(chartMax)}</span>
              <span>{money(chartMax / 2)}</span>
              <span>$0</span>
            </div>
            <div className="chart-bars">
              {chart.map((day, i) => (
                <div key={i}>
                  <div
                    style={{
                      height: `${(day.value / chartMax) * 100}%`,
                      minHeight: day.value ? 10 : 0,
                    }}
                  >
                    <span>{money(day.value)}</span>
                  </div>
                  <small>{day.label}</small>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="admin-panel studio-notes">
          <p className="eyebrow">A little attention</p>
          <h2>
            Behind every piece,
            <br />
            <i>a few details.</i>
          </h2>
          <Link href="/admin/orders">
            <ShoppingBag size={17} />
            <span>Review open orders</span>
            <ArrowUpRight size={16} />
          </Link>
          <Link href="/admin/products">
            <Package size={17} />
            <span>
              {products.filter((p) => p.stock < 5).length} pieces running low
            </span>
            <ArrowUpRight size={16} />
          </Link>
          <Link href="/admin/inquiries">
            <Mail size={17} />
            <span>Keep the conversation going</span>
            <ArrowUpRight size={16} />
          </Link>
        </section>
      </div>
      <section className="admin-panel">
        <div className="panel-heading">
          <h2>Recent orders</h2>
          <Link href="/admin/orders" className="text-link">
            View all orders <ArrowRight size={14} />
          </Link>
        </div>
        <OrdersRows orders={orders.slice(0, 4)} />
      </section>
    </>
  );
}
function ProductTable() {
  const { products, saveProduct } = useStore();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All products");
  const [selected, setSelected] = useState<string[]>([]);
  const rows = products.filter(
    (p) =>
      `${p.name} ${p.category} ${p.material}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (status === "All products" ||
        (status === "Archived"
          ? !p.published
          : p.status === status && p.published)),
  );
  return (
    <>
      <AdminTitle
        title="Your collection."
        description="Small details. Considered together."
      >
        <Link className="button dark" href="/admin/products/new">
          <Plus size={15} /> Add product
        </Link>
      </AdminTitle>
      <section className="admin-panel">
        <div className="admin-toolbar">
          <label className="admin-search">
            <Search size={16} />
            <input
              placeholder="Find a product…"
              aria-label="Find a product"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <select
            aria-label="Filter products"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {[
              "All products",
              "Ready to ship",
              "Made to order",
              "Sold out",
              "Archived",
            ].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {selected.length > 0 && (
            <button
              className="button small-button outline"
              onClick={() => {
                products
                  .filter((p) => selected.includes(p.id))
                  .forEach((p) => saveProduct({ ...p, published: false }));
                setSelected([]);
              }}
            >
              Archive {selected.length} selected
            </button>
          )}
        </div>
        <div className="table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    aria-label="Select all products"
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={(e) =>
                      setSelected(e.target.checked ? rows.map((p) => p.id) : [])
                    }
                  />
                </th>
                <th>Product</th>
                <th>Status</th>
                <th>Inventory</th>
                <th>Price</th>
                <th>Category</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id}>
                  <td>
                    <input
                      type="checkbox"
                      aria-label={`Select ${p.name}`}
                      checked={selected.includes(p.id)}
                      onChange={(e) =>
                        setSelected(
                          e.target.checked
                            ? [...selected, p.id]
                            : selected.filter((id) => id !== p.id),
                        )
                      }
                    />
                  </td>
                  <td>
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="admin-product-name"
                    >
                      <img src={p.images[0]} alt="" />
                      <span>
                        {p.name}
                        <small>{p.material}</small>
                      </span>
                    </Link>
                  </td>
                  <td>
                    <Status value={p.published ? p.status : "Archived"} />
                  </td>
                  <td>
                    {p.status === "Made to order"
                      ? "On request"
                      : `${p.stock} available`}
                  </td>
                  <td>{money(p.price)}</td>
                  <td>{p.category}</td>
                  <td>
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="icon-button"
                      aria-label={`Edit ${p.name}`}
                    >
                      <ArrowUpRight size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!rows.length && (
          <AdminEmpty text="No products match your selection." />
        )}
        <div className="table-footer">
          {rows.length} products <span>Keep your collection considered.</span>
        </div>
      </section>
    </>
  );
}
function ProductEditor({ id }: { id: string }) {
  const { products, saveProduct, collectionData, categoryData, notify } =
    useStore();
  const router = useRouter();
  const existing = products.find((p) => p.id === id);
  const [product, setProduct] = useState<Product>(
    existing ?? {
      id: `p-${Date.now()}`,
      slug: "",
      name: "",
      category: "Rings",
      collection: "silver-studies",
      material: "Sterling silver",
      price: 0,
      images: ["/images/ring-sculpture.svg"],
      status: "Ready to ship",
      stock: 1,
      sizes: ["One size"],
      description: "",
      detail: "",
      leadTime: "Ships in 2–4 business days",
      published: false,
    },
  );
  const [error, setError] = useState("");
  const set = <K extends keyof Product>(k: K, v: Product[K]) =>
    setProduct((p) => ({ ...p, [k]: v }));
  if (id !== "new" && !existing)
    return <AdminEmpty text="This product could not be found." />;
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (products.some((p) => p.slug === product.slug && p.id !== product.id)) {
      setError("Choose a unique product URL.");
      return;
    }
    if (!product.sizes.filter(Boolean).length) {
      setError("Add at least one size or variation.");
      return;
    }
    saveProduct({
      ...product,
      stock: product.status === "Sold out" ? 0 : product.stock,
      sizes: product.sizes.filter(Boolean),
    });
    router.push("/admin/products");
  };
  return (
    <form onSubmit={submit}>
      <AdminTitle
        eyebrow="Collection / product details"
        title={existing ? existing.name : "Something new."}
      >
        <Link href="/admin/products" className="button outline">
          Cancel
        </Link>
        <button className="button dark">
          <Save size={15} /> Save product
        </button>
      </AdminTitle>
      {error && (
        <div className="notice-box" role="alert">
          {error}
        </div>
      )}
      <div className="admin-editor-grid">
        <div>
          <section className="admin-panel form-panel">
            <h2>The essentials</h2>
            <label>
              Product name
              <input
                required
                value={product.name}
                onChange={(e) => {
                  set("name", e.target.value);
                  if (id === "new")
                    set(
                      "slug",
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-|-$/g, ""),
                    );
                }}
              />
            </label>
            <label>
              Product URL
              <input
                required
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                value={product.slug}
                onChange={(e) => set("slug", e.target.value)}
              />
            </label>
            <label>
              Description
              <textarea
                rows={5}
                required
                value={product.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </label>
            <label>
              Materials & details
              <textarea
                rows={3}
                required
                value={product.detail}
                onChange={(e) => set("detail", e.target.value)}
              />
            </label>
          </section>
          <section className="admin-panel form-panel">
            <h2>Visuals</h2>
            <div className="admin-photo-grid">
              {product.images.map((img, i) => (
                <div key={i}>
                  <img src={img} alt={`Product view ${i + 1}`} />
                  {product.images.length > 1 && (
                    <button
                      type="button"
                      className="icon-button"
                      aria-label={`Remove image ${i + 1}`}
                      onClick={() =>
                        set(
                          "images",
                          product.images.filter((_, n) => n !== i),
                        )
                      }
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
              ))}
              <label className="upload-image">
                <ImagePlus size={25} />
                <span>Add image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    if (file.size > 2 * 1024 * 1024) {
                      notify("Choose an image smaller than 2 MB.");
                      return;
                    }
                    const reader = new FileReader();
                    reader.onload = () =>
                      set("images", [...product.images, String(reader.result)]);
                    reader.readAsDataURL(file);
                  }}
                />
              </label>
            </div>
          </section>
        </div>
        <div>
          <section className="admin-panel form-panel">
            <h2>Availability</h2>
            <label>
              Publication
              <select
                value={String(product.published)}
                onChange={(e) => set("published", e.target.value === "true")}
              >
                <option value="true">Published</option>
                <option value="false">Archived</option>
              </select>
            </label>
            <label>
              Fulfillment
              <select
                value={product.status}
                onChange={(e) =>
                  set("status", e.target.value as Product["status"])
                }
              >
                {["Ready to ship", "Made to order", "Sold out"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label>
              {product.status === "Made to order"
                ? "Order capacity"
                : "Stock quantity"}
              <input
                type="number"
                min={0}
                required
                value={product.stock}
                onChange={(e) => set("stock", Number(e.target.value))}
              />
            </label>
            <label>
              Making / dispatch window
              <input
                required
                value={product.leadTime}
                onChange={(e) => set("leadTime", e.target.value)}
              />
            </label>
          </section>
          <section className="admin-panel form-panel">
            <h2>Organization & price</h2>
            <label>
              Category
              <select
                value={product.category}
                onChange={(e) => set("category", e.target.value)}
              >
                {categoryData.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label>
              Collection
              <select
                value={product.collection}
                onChange={(e) => set("collection", e.target.value)}
              >
                {collectionData.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Material
              <input
                required
                value={product.material}
                onChange={(e) => set("material", e.target.value)}
              />
            </label>
            <label>
              Price (USD)
              <input
                required
                type="number"
                min="1"
                step="0.01"
                value={product.price || ""}
                onChange={(e) => set("price", Number(e.target.value))}
              />
            </label>
            <label>
              Sizes / variations, comma separated
              <input
                required
                value={product.sizes.join(", ")}
                onChange={(e) =>
                  set(
                    "sizes",
                    e.target.value.split(",").map((s) => s.trim()),
                  )
                }
              />
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={!!product.featured}
                onChange={(e) => set("featured", e.target.checked)}
              />
              Feature on the homepage
            </label>
          </section>
        </div>
      </div>
    </form>
  );
}
function OrdersRows({ orders }: { orders: Order[] }) {
  return (
    <div className="table-scroll">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Payment</th>
            <th>Fulfillment</th>
            <th>Total</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>
                <Link href={`/admin/orders/${o.id}`} className="strong">
                  {o.id}
                </Link>
              </td>
              <td>
                {new Date(o.date + "T12:00:00").toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td>
                {o.customer}
                <small>{o.country}</small>
              </td>
              <td>
                <Status value={o.payment} />
              </td>
              <td>
                <Status value={o.status} />
              </td>
              <td>{money(o.total)}</td>
              <td>
                <Link
                  href={`/admin/orders/${o.id}`}
                  className="icon-button"
                  aria-label={`View ${o.id}`}
                >
                  <ArrowUpRight size={16} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function OrdersTable() {
  const { orders } = useStore();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All orders");
  const rows = orders.filter(
    (o) =>
      `${o.id} ${o.customer}`.toLowerCase().includes(query.toLowerCase()) &&
      (status === "All orders" || o.status === status),
  );
  const download = () => {
    const esc = (s: string) => '"' + s.replaceAll('"', '""') + '"';
    const csv = [
      "Order,Customer,Date,Country,Status,Total",
      ...rows.map((o) =>
        [o.id, o.customer, o.date, o.country, o.status, String(o.total)]
          .map(esc)
          .join(","),
      ),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "wfc-orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <>
      <AdminTitle
        title="Every order, considered."
        description="From a first selection to a well-loved piece."
      >
        <button className="button outline" onClick={download}>
          <ArrowDownToLine size={15} /> Export orders
        </button>
      </AdminTitle>
      <section className="admin-panel">
        <div className="admin-toolbar">
          <label className="admin-search">
            <Search size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search orders or customers…"
              aria-label="Search orders"
            />
          </label>
          <select
            aria-label="Filter orders"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {[
              "All orders",
              "Awaiting payment",
              "Processing",
              "Shipped",
              "Delivered",
              "Cancelled",
            ].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <OrdersRows orders={rows} />
        {!rows.length && <AdminEmpty text="No orders match your selection." />}
        <div className="table-footer">{rows.length} orders</div>
      </section>
    </>
  );
}
function OrderDetail({ id }: { id: string }) {
  const { orders, products, saveOrder } = useStore();
  const existing = orders.find((o) => o.id === id);
  const [order, setOrder] = useState(existing);
  if (!order) return <AdminEmpty text="This order could not be found." />;
  return (
    <>
      <AdminTitle
        eyebrow="Orders / details"
        title={order.id}
        description={`${order.customer} · ${new Date(order.date + "T12:00:00").toLocaleDateString("en-US")}`}
      >
        <Link href="/admin/orders" className="button outline">
          All orders
        </Link>
        <button className="button dark" onClick={() => saveOrder(order)}>
          <Save size={15} /> Save changes
        </button>
      </AdminTitle>
      <div className="admin-editor-grid">
        <div>
          <section className="admin-panel form-panel">
            <div className="panel-heading">
              <h2>Selected pieces</h2>
              <Status value={order.payment} />
            </div>
            {order.items.map((i, n) => {
              const p = products.find((p) => p.id === i.productId);
              return (
                <div className="checkout-item" key={n}>
                  {p && <img src={p.images[0]} alt={p.name} />}
                  <div>
                    <strong>{i.name ?? p?.name ?? "Archived piece"}</strong>
                    <p className="muted">
                      {i.size} · Qty {i.quantity}
                    </p>
                  </div>
                  <span>
                    {money((i.unitPrice ?? p?.price ?? 0) * i.quantity)}
                  </span>
                </div>
              );
            })}
            <div className="spread summary-total">
              <span>Order total</span>
              <strong>{money(order.total)}</strong>
            </div>
          </section>
          <section className="admin-panel form-panel">
            <h2>Fulfillment</h2>
            <label>
              Order status
              <select
                value={order.status}
                onChange={(e) => setOrder({ ...order, status: e.target.value })}
              >
                {[
                  "Awaiting payment",
                  "Processing",
                  "Shipped",
                  "Delivered",
                  "Cancelled",
                  "Returned",
                ].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label>
              Tracking reference
              <input
                value={order.tracking}
                onChange={(e) =>
                  setOrder({ ...order, tracking: e.target.value })
                }
                placeholder="Add a tracking reference"
              />
            </label>
            <p className="small muted">
              Updates are saved when you select Save changes.
            </p>
          </section>
        </div>
        <div>
          <section className="admin-panel form-panel">
            <h2>Customer</h2>
            <p>{order.customer}</p>
            <p className="muted">{order.email}</p>
          </section>
          <section className="admin-panel form-panel">
            <h2>Delivery address</h2>
            <p>{order.address}</p>
            <p>{order.country}</p>
          </section>
          <section className="admin-panel form-panel">
            <h2>Payment</h2>
            <Status value={order.payment} />
            <p className="small muted">
              Payment status follows the transaction record.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
function CollectionsAdmin() {
  const {
    collectionData,
    categoryData,
    products,
    saveCollection,
    saveCategory,
    notify,
  } = useStore();
  const [edit, setEdit] = useState<CollectionData | null>(null);
  const [originalSlug, setOriginalSlug] = useState("");
  const [category, setCategory] = useState("");
  return (
    <>
      <AdminTitle
        title="A shared point of view."
        description="The conversations between your pieces."
      >
        <button
          className="button dark"
          onClick={() => {
            setOriginalSlug("");
            setEdit({
              slug: "",
              name: "",
              description: "",
              eyebrow: `Collection ${String(collectionData.length + 1).padStart(2, "0")}`,
              image: "/images/jewelry-editorial.svg",
            });
          }}
        >
          <Plus size={15} /> New collection
        </button>
      </AdminTitle>
      <div className="admin-collection-grid">
        {collectionData.map((c) => (
          <article className="admin-panel collection-admin-card" key={c.slug}>
            <img src={c.image} alt={c.name} />
            <div>
              <p className="eyebrow">{c.eyebrow}</p>
              <h2>{c.name}</h2>
              <p className="muted">
                {products.filter((p) => p.collection === c.slug).length} pieces
              </p>
              <button
                className="text-link"
                onClick={() => {
                  setOriginalSlug(c.slug);
                  setEdit(c);
                }}
              >
                Edit collection <ArrowUpRight size={15} />
              </button>
            </div>
          </article>
        ))}
      </div>
      <section className="admin-panel form-panel">
        <h2>Product categories</h2>
        <div className="category-pills">
          {categoryData.map((c) => (
            <span key={c}>
              {c}
              <small>{products.filter((p) => p.category === c).length}</small>
            </span>
          ))}
        </div>
        <form
          className="inline-form"
          onSubmit={(e) => {
            e.preventDefault();
            saveCategory(category.trim());
            setCategory("");
          }}
        >
          <input
            required
            minLength={2}
            maxLength={40}
            aria-label="New category name"
            placeholder="A new category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <button className="button outline">
            Add category <Plus size={15} />
          </button>
        </form>
      </section>
      <Overlay
        open={!!edit}
        onClose={() => setEdit(null)}
        title="Collection details"
        className="editor-overlay"
      >
        {edit && (
          <form
            className="form-panel"
            onSubmit={(e) => {
              e.preventDefault();
              if (
                !originalSlug &&
                collectionData.some((c) => c.slug === edit.slug)
              ) {
                notify("Choose a unique collection URL.");
                return;
              }
              saveCollection(edit);
              setEdit(null);
            }}
          >
            <label>
              Collection name
              <input
                required
                value={edit.name}
                onChange={(e) =>
                  setEdit({
                    ...edit,
                    name: e.target.value,
                    slug: originalSlug
                      ? edit.slug
                      : e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-|-$/g, ""),
                  })
                }
              />
            </label>
            <label>
              URL slug
              <input
                required
                readOnly={!!originalSlug}
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                value={edit.slug}
                onChange={(e) => setEdit({ ...edit, slug: e.target.value })}
              />
            </label>
            <label>
              Eyebrow label
              <input
                required
                value={edit.eyebrow}
                onChange={(e) => setEdit({ ...edit, eyebrow: e.target.value })}
              />
            </label>
            <label>
              Story
              <textarea
                required
                rows={5}
                value={edit.description}
                onChange={(e) =>
                  setEdit({ ...edit, description: e.target.value })
                }
              />
            </label>
            <button className="button dark">
              <Check size={16} /> Save collection
            </button>
          </form>
        )}
      </Overlay>
    </>
  );
}
function InquiriesAdmin() {
  const { inquiries, saveInquiry, notify } = useStore();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Inquiry | null>(null);
  const [reply, setReply] = useState("");
  return (
    <>
      <AdminTitle
        title="A conversation starts here."
        description="A little attention goes a long way."
      />
      <section className="admin-panel">
        <div className="admin-toolbar">
          <label className="admin-search">
            <Search size={16} />
            <input
              aria-label="Search inquiries"
              placeholder="Find an enquiry…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        {inquiries
          .filter((i) =>
            `${i.subject} ${i.name}`
              .toLowerCase()
              .includes(query.toLowerCase()),
          )
          .map((i) => (
            <button
              className="inquiry-row"
              key={i.id}
              onClick={() => {
                setActive(i);
                setReply("");
                if (i.status === "New") saveInquiry({ ...i, status: "Read" });
              }}
            >
              <span className="inquiry-avatar">
                {i.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div>
                <strong>{i.subject}</strong>
                <p>
                  {i.name} · {i.message.slice(0, 95)}…
                </p>
              </div>
              <Status value={i.status} />
              <ArrowUpRight size={17} />
            </button>
          ))}
      </section>
      <Overlay
        open={!!active}
        onClose={() => setActive(null)}
        title="A note to the studio"
        className="editor-overlay"
      >
        {active && (
          <div className="form-panel">
            <div className="spread">
              <p className="eyebrow">{active.name}</p>
              <span className="small muted">{active.date}</span>
            </div>
            <h2>{active.subject}</h2>
            <p className="muted">{active.email}</p>
            <p className="inquiry-message">{active.message}</p>
            <label>
              Your reply
              <textarea
                rows={5}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="A considered reply…"
              />
            </label>
            <div className="form-actions">
              <button
                className="button outline"
                disabled={!reply.trim()}
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(reply);
                    notify("Reply copied");
                  } catch {
                    notify("Select and copy your reply.");
                  }
                }}
              >
                Copy reply
              </button>
              <button
                className="button dark"
                onClick={() => {
                  saveInquiry({ ...active, status: "Resolved" });
                  setActive(null);
                }}
              >
                Mark resolved <Check size={15} />
              </button>
            </div>
          </div>
        )}
      </Overlay>
    </>
  );
}
function ShippingAdmin() {
  const { orders, settings, saveSettings } = useStore();
  const [rates, setRates] = useState(settings);
  return (
    <>
      <AdminTitle
        title="From here, to them."
        description="Delivery details and the pieces on their way."
      />
      <section className="admin-panel">
        <div className="panel-heading">
          <h2>In transit</h2>
          <Truck size={19} />
        </div>
        <OrdersRows orders={orders.filter((o) => o.status === "Shipped")} />
      </section>
      <form
        className="admin-panel form-panel"
        onSubmit={(e) => {
          e.preventDefault();
          saveSettings(rates);
        }}
      >
        <h2>Delivery rates</h2>
        <p className="muted">
          Set the rates used for domestic and international destinations.
        </p>
        <div className="form-grid">
          {(
            [
              ["standardUS", "US standard"],
              ["expressUS", "US express"],
              ["standardIntl", "International standard"],
              ["expressIntl", "International express"],
            ] as const
          ).map(([key, label]) => (
            <label key={key}>
              {label} (USD)
              <input
                type="number"
                min={0}
                step="0.01"
                required
                value={rates[key]}
                onChange={(e) =>
                  setRates({ ...rates, [key]: Number(e.target.value) })
                }
              />
            </label>
          ))}
        </div>
        <button className="button dark">
          Save delivery rates <Check size={15} />
        </button>
      </form>
    </>
  );
}
function SettingsAdmin() {
  const { settings, saveSettings, reset } = useStore();
  const [form, setForm] = useState(settings);
  useEffect(() => setForm(settings), [settings]);
  const [resetOpen, setResetOpen] = useState(false);
  return (
    <>
      <AdminTitle
        title="The studio details."
        description="The essentials behind your storefront."
      />
      <form
        className="admin-panel form-panel settings-panel"
        onSubmit={(e) => {
          e.preventDefault();
          saveSettings(form);
        }}
      >
        <h2>Business information</h2>
        <label>
          Business name
          <input
            required
            value={form.businessName}
            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
          />
        </label>
        <label>
          Customer care email
          <input
            type="email"
            value={form.email}
            placeholder="Your business email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <div className="form-grid">
          <label>
            Based in
            <input value={form.origin} readOnly />
          </label>
          <label>
            Store currency
            <select defaultValue="USD">
              <option value="USD">USD — US Dollar</option>
            </select>
          </label>
        </div>
        <label>
          Customer language
          <input readOnly value="English" />
        </label>
        <button className="button dark">
          <Save size={15} /> Save settings
        </button>
      </form>
      <section className="admin-panel form-panel settings-panel">
        <h2>Workspace</h2>
        <p className="muted">
          Restore the collection and workspace to its initial state. This clears
          changes saved on this device.
        </p>
        <button className="button outline" onClick={() => setResetOpen(true)}>
          Restore workspace
        </button>
      </section>
      <Overlay
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        title="Restore this workspace?"
        className="editor-overlay"
      >
        <div className="form-panel">
          <p>
            Products, orders, enquiries, settings, and your bag on this device
            will return to their initial state.
          </p>
          <div className="form-actions">
            <button
              className="button outline"
              onClick={() => setResetOpen(false)}
            >
              Keep my changes
            </button>
            <button
              className="button dark"
              onClick={() => {
                reset();
                setForm(settings);
                setResetOpen(false);
              }}
            >
              Restore
            </button>
          </div>
        </div>
      </Overlay>
    </>
  );
}
function AdminEmpty({ text }: { text: string }) {
  return (
    <div className="empty-state">
      <Package size={28} />
      <h2>A little space.</h2>
      <p>{text}</p>
    </div>
  );
}
