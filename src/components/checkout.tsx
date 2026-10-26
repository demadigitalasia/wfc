"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LockKeyhole,
  Minus,
  Plus,
  X,
  ShoppingBag,
  ChevronRight,
  CreditCard,
  Package,
  CircleAlert,
  Feather,
} from "lucide-react";
import { useStore } from "./store-provider";
import { money } from "@/lib/data";
import { Breadcrumb } from "./storefront";
const countryCodes =
  "US CA GB AU NZ DE FR IT ES NL BE AT CH IE DK NO SE FI PT PL CZ GR HU RO BG HR SI SK EE LV LT LU MT CY IS JP KR SG MY ID PH TH VN IN AE SA QA IL TR ZA EG KE NG MX BR AR CL CO PE CR PA BS JM BB DO TT HN GT EC UY PY BO SV BZ CU HT PR VI GU AS MP UM HK TW MO CN BD LK NP PK KH LA MM BN MN KZ GE AM AZ UA MD RS ME AL BA MK XK MA TN DZ GH RW TZ UG ZM ZW BW NA MU SC MG MZ CM SN CI CV GM FJ PG SB VU WS TO KI FM MH PW NR TV AD MC LI SM VA FO GL GI IM JE GG BM KY TC VG AW CW SX BQ GP MQ GF RE YT PF NC WF CK NU MS AI AG DM GD KN LC VC GY SR FK LC OM KW BH JO LB IQ IR YE AF BT MV UZ TM KG TJ LC".split(
    " ",
  );
const countryNames = new Intl.DisplayNames(["en"], { type: "region" });
const countries = [...new Set(countryCodes)]
  .map((code) => ({ code, name: countryNames.of(code) ?? code }))
  .sort((a, b) =>
    a.code === "US" ? -1 : b.code === "US" ? 1 : a.name.localeCompare(b.name),
  );
export function CartPage() {
  const { cart, products, updateCart } = useStore();
  const subtotal = cart.reduce(
    (n, i) =>
      n + (products.find((p) => p.id === i.productId)?.price ?? 0) * i.quantity,
    0,
  );
  return (
    <section className="cart-page">
      <Breadcrumb items={[{ label: "Your bag" }]} />
      <div className="section-heading">
        <div>
          <p className="eyebrow">A considered selection</p>
          <h1>
            Your bag
            <span className="count-sup">
              {cart.reduce((n, x) => n + x.quantity, 0)}
            </span>
          </h1>
        </div>
        <Link href="/shop" className="text-link">
          Keep exploring <ArrowRight size={15} />
        </Link>
      </div>
      {!cart.length ? (
        <div className="empty-state">
          <ShoppingBag size={36} strokeWidth={1} />
          <h2>A little room for something special.</h2>
          <p>Your collection starts with a piece that feels like you.</p>
          <Link href="/shop" className="button dark">
            Discover the collection <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div>
            {cart.map((i) => {
              const p = products.find((p) => p.id === i.productId);
              if (!p) return null;
              return (
                <div className="cart-product" key={`${i.productId}-${i.size}`}>
                  <Link href={`/products/${p.slug}`}>
                    <img src={p.images[0]} alt={p.name} />
                  </Link>
                  <div className="cart-product-copy">
                    <p className="eyebrow">{p.category}</p>
                    <Link href={`/products/${p.slug}`}>
                      <h2>{p.name}</h2>
                    </Link>
                    <p className="muted">
                      {p.material} · {i.size}
                    </p>
                    <p className="small">{p.leadTime}</p>
                    <div className="quantity">
                      <button
                        onClick={() => updateCart(p.id, i.size, i.quantity - 1)}
                        aria-label={`Decrease ${p.name}`}
                      >
                        <Minus size={13} />
                      </button>
                      <span>{i.quantity}</span>
                      <button
                        onClick={() => updateCart(p.id, i.size, i.quantity + 1)}
                        aria-label={`Increase ${p.name}`}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-end">
                    <span>{money(p.price * i.quantity)}</span>
                    <button
                      className="text-link"
                      onClick={() => updateCart(p.id, i.size, 0)}
                    >
                      Remove <X size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <aside className="order-summary">
            <h2>A closer look.</h2>
            <div className="spread">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <div className="spread muted">
              <span>Shipping</span>
              <span>At checkout</span>
            </div>
            <div className="spread muted">
              <span>Taxes</span>
              <span>At payment</span>
            </div>
            <div className="summary-total spread">
              <span>
                Subtotal <small>USD</small>
              </span>
              <span>{money(subtotal)}</span>
            </div>
            <Link href="/checkout" className="button dark">
              Continue to checkout <ArrowRight size={15} />
            </Link>
            <p className="small muted">
              Ready-to-ship and made-to-order pieces may have different making
              windows.
            </p>
            <Link className="text-link" href="/policies/shipping">
              Shipping details <ArrowRight size={13} />
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}
type Address = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  region: string;
  postal: string;
  country: string;
};
export function CheckoutPage() {
  const { cart, products, settings } = useStore();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState<Address>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    region: "",
    postal: "",
    country: "US",
  });
  const [shipping, setShipping] = useState("standard");
  const [accepted, setAccepted] = useState(false);
  const [billingSame, setBillingSame] = useState(true);
  const [billing, setBilling] = useState({
    name: "",
    address: "",
    city: "",
    country: "US",
    postal: "",
  });
  const [busy, setBusy] = useState(false);
  const unavailable = cart.some((item) => {
    const product = products.find((p) => p.id === item.productId);
    const quantity = cart
      .filter((i) => i.productId === item.productId)
      .reduce((n, i) => n + i.quantity, 0);
    return (
      !product ||
      !product.published ||
      product.status === "Sold out" ||
      quantity > product.stock ||
      !product.sizes.includes(item.size)
    );
  });
  const subtotal = cart.reduce(
    (n, i) =>
      n + (products.find((p) => p.id === i.productId)?.price ?? 0) * i.quantity,
    0,
  );
  const shippingCost =
    address.country === "US"
      ? shipping === "standard"
        ? settings.standardUS
        : settings.expressUS
      : shipping === "standard"
        ? settings.standardIntl
        : settings.expressIntl;
  const change = (key: keyof Address, value: string) =>
    setAddress((prev) => ({ ...prev, [key]: value }));
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const review = () => {
    if (unavailable) return;
    setBusy(true);
    const summary = {
      items: cart.map((i) => ({
        ...i,
        name: products.find((p) => p.id === i.productId)?.name,
        price: products.find((p) => p.id === i.productId)?.price,
        image: products.find((p) => p.id === i.productId)?.images[0],
      })),
      subtotal,
      shipping: shippingCost,
      total: subtotal + shippingCost,
      country: countryNames.of(address.country),
      method: shipping,
      reference: "WFC-" + new Date().getTime().toString().slice(-6),
    };
    sessionStorage.setItem("wfc-order-review", JSON.stringify(summary));
    router.push("/checkout/result/review");
  };
  if (!cart.length)
    return (
      <section className="empty-state checkout-empty">
        <ShoppingBag size={35} />
        <h1>Start with something you love.</h1>
        <p>Add a piece to your bag to begin.</p>
        <Link href="/shop" className="button dark">
          Explore the collection <ArrowRight size={17} />
        </Link>
      </section>
    );
  return (
    <div className="checkout-page">
      <div className="checkout-heading">
        <Link href="/cart" className="text-link">
          <ArrowLeft size={14} /> Return to bag
        </Link>
        <span>
          <LockKeyhole size={13} /> A considered checkout
        </span>
      </div>
      <div className="checkout-layout">
        <div className="checkout-main">
          <p className="eyebrow">Your next everyday favorite</p>
          <h1>Make it yours.</h1>
          {unavailable && (
            <div className="notice-box" role="alert">
              A piece in your bag has changed availability.{" "}
              <Link className="underlined" href="/cart">
                Review your bag
              </Link>{" "}
              before continuing.
            </div>
          )}
          <ol className="checkout-steps">
            {["Your details", "Delivery", "Review"].map((t, i) => (
              <li
                className={
                  step === i + 1 ? "current" : step > i + 1 ? "complete" : ""
                }
                key={t}
              >
                <button disabled={step < i + 1} onClick={() => setStep(i + 1)}>
                  {step > i + 1 ? <Check size={13} /> : <span>{i + 1}</span>}
                  {t}
                </button>
                {i < 2 && <ChevronRight size={12} />}
              </li>
            ))}
          </ol>
          {step === 1 && (
            <form onSubmit={submit} className="checkout-form">
              <h2>Contact</h2>
              <label>
                Email address
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={address.email}
                  onChange={(e) => change("email", e.target.value)}
                />
              </label>
              <h2>Shipping address</h2>
              <label>
                Country / region
                <select
                  value={address.country}
                  onChange={(e) => change("country", e.target.value)}
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="form-grid">
                <label>
                  First name
                  <input
                    required
                    autoComplete="given-name"
                    value={address.firstName}
                    onChange={(e) => change("firstName", e.target.value)}
                  />
                </label>
                <label>
                  Last name
                  <input
                    required
                    autoComplete="family-name"
                    value={address.lastName}
                    onChange={(e) => change("lastName", e.target.value)}
                  />
                </label>
              </div>
              <label>
                Address
                <input
                  required
                  autoComplete="address-line1"
                  value={address.address}
                  onChange={(e) => change("address", e.target.value)}
                />
              </label>
              <label>
                Apartment, suite, etc. <span className="muted">(optional)</span>
                <input
                  autoComplete="address-line2"
                  value={address.apartment}
                  onChange={(e) => change("apartment", e.target.value)}
                />
              </label>
              <div className="form-grid three">
                <label>
                  City
                  <input
                    required
                    autoComplete="address-level2"
                    value={address.city}
                    onChange={(e) => change("city", e.target.value)}
                  />
                </label>
                <label>
                  {address.country === "US" ? "State" : "State / province"}
                  <input
                    autoComplete="address-level1"
                    required={["US", "CA", "AU"].includes(address.country)}
                    value={address.region}
                    onChange={(e) => change("region", e.target.value)}
                  />
                </label>
                <label>
                  Postal code
                  <input
                    autoComplete="postal-code"
                    required={
                      !["HK", "MO", "AE", "QA"].includes(address.country)
                    }
                    value={address.postal}
                    onChange={(e) => change("postal", e.target.value)}
                  />
                </label>
              </div>
              <button className="button dark">
                Continue to delivery <ArrowRight size={16} />
              </button>
            </form>
          )}
          {step === 2 && (
            <section className="checkout-form">
              <div className="address-review">
                <div>
                  <span className="eyebrow">Deliver to</span>
                  <p>
                    {address.firstName} {address.lastName}
                    <br />
                    {address.address}, {address.city}
                    <br />
                    {address.region} {address.postal} ·{" "}
                    {countryNames.of(address.country)}
                  </p>
                </div>
                <button className="text-link" onClick={() => setStep(1)}>
                  Change
                </button>
              </div>
              <h2>A way to get there.</h2>
              <p className="muted">Select your preferred delivery option.</p>
              <div className="shipping-options">
                {["standard", "express"].map((s) => (
                  <label
                    className={`shipping-option ${shipping === s ? "selected" : ""}`}
                    key={s}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      checked={shipping === s}
                      onChange={() => setShipping(s)}
                    />
                    <div>
                      <strong>
                        {s === "standard"
                          ? "Standard delivery"
                          : "Express delivery"}
                      </strong>
                      <span>
                        {address.country === "US"
                          ? s === "standard"
                            ? "3–7 business days"
                            : "2–3 business days"
                          : s === "standard"
                            ? "7–21 business days"
                            : "3–7 business days"}
                      </span>
                    </div>
                    <span>
                      {money(
                        address.country === "US"
                          ? s === "standard"
                            ? settings.standardUS
                            : settings.expressUS
                          : s === "standard"
                            ? settings.standardIntl
                            : settings.expressIntl,
                      )}
                    </span>
                  </label>
                ))}
              </div>
              <p className="small muted">
                Transit time begins after your piece is ready. Made-to-order
                windows are shown on each product page.
              </p>
              {address.country !== "US" && (
                <div className="notice-box">
                  International shipments may be subject to duties and taxes.
                  Review destination information before purchasing.
                </div>
              )}
              <button className="button dark" onClick={() => setStep(3)}>
                Review your selection <ArrowRight size={16} />
              </button>
            </section>
          )}
          {step === 3 && (
            <form
              className="checkout-form"
              onSubmit={(e) => {
                e.preventDefault();
                review();
              }}
            >
              <h2>The details, together.</h2>
              <div className="address-review">
                <div>
                  <span className="eyebrow">Contact</span>
                  <p>{address.email}</p>
                </div>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => setStep(1)}
                >
                  Change
                </button>
              </div>
              <div className="address-review">
                <div>
                  <span className="eyebrow">Delivery</span>
                  <p>
                    {address.firstName} {address.lastName}
                    <br />
                    {address.address}, {address.city}
                    <br />
                    {countryNames.of(address.country)}
                  </p>
                  <p className="muted">
                    {shipping === "standard"
                      ? "Standard delivery"
                      : "Express delivery"}{" "}
                    · {money(shippingCost)}
                  </p>
                </div>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => setStep(2)}
                >
                  Change
                </button>
              </div>
              <div className="payment-surface">
                <CreditCard size={23} />
                <div>
                  <strong>Payment</strong>
                  <p className="muted">
                    Review the complete order summary before payment.
                  </p>
                </div>
                <LockKeyhole size={17} />
              </div>
              <h2>Billing address</h2>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={billingSame}
                  onChange={(e) => setBillingSame(e.target.checked)}
                />
                <span>Same as shipping address</span>
              </label>
              {!billingSame && (
                <div className="billing-fields">
                  <label>
                    Billing name
                    <input
                      required
                      autoComplete="billing name"
                      value={billing.name}
                      onChange={(e) =>
                        setBilling({ ...billing, name: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    Billing address
                    <input
                      required
                      autoComplete="billing address-line1"
                      value={billing.address}
                      onChange={(e) =>
                        setBilling({ ...billing, address: e.target.value })
                      }
                    />
                  </label>
                  <div className="form-grid">
                    <label>
                      Billing city
                      <input
                        required
                        autoComplete="billing address-level2"
                        value={billing.city}
                        onChange={(e) =>
                          setBilling({ ...billing, city: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      Billing postal code
                      <input
                        autoComplete="billing postal-code"
                        value={billing.postal}
                        onChange={(e) =>
                          setBilling({ ...billing, postal: e.target.value })
                        }
                      />
                    </label>
                  </div>
                  <label>
                    Billing country
                    <select
                      value={billing.country}
                      onChange={(e) =>
                        setBilling({ ...billing, country: e.target.value })
                      }
                    >
                      {countries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              )}
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                />
                <span>
                  I have reviewed the{" "}
                  <Link
                    href="/policies/terms"
                    target="_blank"
                    className="underlined"
                  >
                    terms
                  </Link>
                  ,{" "}
                  <Link
                    href="/policies/shipping"
                    target="_blank"
                    className="underlined"
                  >
                    shipping information
                  </Link>
                  , and{" "}
                  <Link
                    href="/policies/returns"
                    target="_blank"
                    className="underlined"
                  >
                    returns policy
                  </Link>
                  .
                </span>
              </label>
              <button
                className="button dark"
                disabled={!accepted || busy || unavailable}
              >
                {busy ? "Preparing summary…" : "View order summary"}
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
        <aside className="checkout-summary">
          <p className="eyebrow">
            Your selection / {cart.reduce((n, x) => n + x.quantity, 0)} pieces
          </p>
          {cart.map((i) => {
            const p = products.find((p) => p.id === i.productId);
            if (!p) return null;
            return (
              <div className="checkout-item" key={`${i.productId}-${i.size}`}>
                <div className="checkout-item-image">
                  <img src={p.images[0]} alt={p.name} />
                  <span>{i.quantity}</span>
                </div>
                <div>
                  <strong>{p.name}</strong>
                  <p className="muted">
                    {i.size} · {p.material}
                  </p>
                  <span className="small muted">{p.status}</span>
                </div>
                <span>{money(p.price * i.quantity)}</span>
              </div>
            );
          })}
          <div className="checkout-totals">
            <div className="spread">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <div className="spread">
              <span>Shipping</span>
              <span>{step > 1 ? money(shippingCost) : "Next step"}</span>
            </div>
            <div className="spread muted">
              <span>Taxes</span>
              <span>At payment</span>
            </div>
            <div className="spread summary-total">
              <span>
                Total <small>USD</small>
              </span>
              <span>{money(subtotal + (step > 1 ? shippingCost : 0))}</span>
            </div>
          </div>
          <p className="small muted">
            <Package size={13} /> Made-to-order pieces are crafted after your
            order.
          </p>
          <Link className="text-link" href="/contact">
            Need a little help? <ArrowRight size={14} />
          </Link>
        </aside>
      </div>
    </div>
  );
}
type Summary = {
  reference: string;
  items: {
    name: string;
    image: string;
    price: number;
    quantity: number;
    size: string;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  country: string;
  method: string;
};
export function CheckoutResult({ status }: { status: string }) {
  const [summary, setSummary] = useState<Summary | null>(null);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("wfc-order-review");
      if (raw) setSummary(JSON.parse(raw));
    } catch {}
  }, []);
  const failed = status === "failed";
  const cancelled = status === "cancelled";
  const pending = status === "pending";
  return (
    <section className="checkout-result">
      <div className="result-icon">
        {failed ? (
          <CircleAlert size={27} />
        ) : cancelled ? (
          <X size={27} />
        ) : pending ? (
          <Package size={27} />
        ) : (
          <Feather size={27} />
        )}
      </div>
      <p className="eyebrow">
        {failed
          ? "Payment incomplete"
          : cancelled
            ? "Checkout paused"
            : pending
              ? "Awaiting payment"
              : "Your order summary"}
      </p>
      <h1>
        {failed ? (
          "Let’s try that again."
        ) : cancelled ? (
          "Take your time."
        ) : pending ? (
          "A little patience."
        ) : (
          <>
            A final look.
            <br />
            <em>Before it’s yours.</em>
          </>
        )}
      </h1>
      <p className="muted">
        {failed
          ? "Your payment could not be completed. Return to checkout to review your selection."
          : cancelled
            ? "Your selection is still in your bag, whenever you are ready."
            : pending
              ? "The payment status is awaiting confirmation."
              : "Your pieces, delivery choice, and totals in one place. Payment has not been completed."}
      </p>
      {summary && !failed && !cancelled && (
        <div className="result-summary">
          <div className="spread">
            <span className="eyebrow">{summary.reference}</span>
            <span>USD</span>
          </div>
          {summary.items.map((i, n) => (
            <div className="checkout-item" key={n}>
              <img src={i.image} alt={i.name} />
              <div>
                {i.name}
                <p className="muted">
                  {i.size} · Qty {i.quantity}
                </p>
              </div>
              <span>{money(i.price * i.quantity)}</span>
            </div>
          ))}
          <div className="spread">
            <span>Delivery to {summary.country}</span>
            <span>{money(summary.shipping)}</span>
          </div>
          <div className="spread summary-total">
            <span>Order subtotal</span>
            <span>{money(summary.total)}</span>
          </div>
          <p className="small muted">
            Any applicable taxes are determined at payment.
          </p>
        </div>
      )}
      <div className="result-actions">
        <Link href="/checkout" className="button dark">
          Return to checkout <ArrowRight size={16} />
        </Link>
        <Link href="/shop" className="text-link">
          Continue exploring
        </Link>
      </div>
    </section>
  );
}
