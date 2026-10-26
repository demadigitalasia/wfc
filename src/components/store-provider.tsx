"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  initialProducts,
  initialOrders,
  hydrateOrder,
  initialInquiries,
  collections,
  categories,
  type Product,
  type Order,
  type Inquiry,
} from "@/lib/data";
export type CollectionData = Omit<(typeof collections)[number], "imageAlt"> & {
  imageAlt?: string;
};
export type SiteSettings = {
  businessName: string;
  email: string;
  origin: string;
  standardUS: number;
  expressUS: number;
  standardIntl: number;
  expressIntl: number;
};
const defaultSettings: SiteSettings = {
  businessName: "Wild Feather Creations",
  email: "",
  origin: "United States",
  standardUS: 8,
  expressUS: 16,
  standardIntl: 24,
  expressIntl: 42,
};
const legacyProductPrimaryImages: Record<string, string> = {
  p01: "/images/ring-sculpture.svg",
  p02: "/images/necklace-studio.svg",
  p03: "/images/earrings-study.svg",
  p04: "/images/silver-bracelet.svg",
  p05: "/images/necklace-detail.svg",
  p06: "/images/atelier-study.svg",
  p07: "/images/pendant-detail.svg",
  p08: "/images/jewelry-editorial.svg",
  p09: "/images/silver-bracelet.svg",
  p10: "/images/ring-sculpture.svg",
};
export type CartItem = { productId: string; size: string; quantity: number };
type Store = {
  collectionData: CollectionData[];
  categoryData: string[];
  settings: SiteSettings;
  saveCollection: (c: CollectionData) => void;
  saveCategory: (c: string) => void;
  saveSettings: (s: SiteSettings) => void;
  products: Product[];
  orders: Order[];
  inquiries: Inquiry[];
  cart: CartItem[];
  bagOpen: boolean;
  setBagOpen: (v: boolean) => void;
  notice: string;
  notify: (s: string) => void;
  addToCart: (id: string, size: string, quantity?: number) => void;
  updateCart: (id: string, size: string, quantity: number) => void;
  saveProduct: (p: Product) => void;
  saveOrder: (o: Order) => void;
  saveInquiry: (i: Inquiry) => void;
  reset: () => void;
};
const StoreContext = createContext<Store | null>(null);
export function StoreProvider({ children }: { children: ReactNode }) {
  const [collectionData, setCollectionData] =
    useState<CollectionData[]>(collections);
  const [categoryData, setCategoryData] = useState(categories);
  const [settings, setSettings] = useState(defaultSettings);
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("wfc-store-v1");
      if (raw) {
        const s = JSON.parse(raw);
        if (Array.isArray(s.products) && s.products.length) {
          const storedProducts = s.products.map((storedProduct: Product) => {
            const currentProduct = initialProducts.find(
              (product) => product.id === storedProduct.id,
            );
            const storedImages = Array.isArray(storedProduct.images)
              ? storedProduct.images
              : [];

            if (
              !currentProduct ||
              storedImages[0] !== legacyProductPrimaryImages[storedProduct.id]
            ) {
              return storedProduct;
            }

            return {
              ...storedProduct,
              images: [currentProduct.images[0], ...storedImages.slice(1)],
            };
          });

          setProducts(storedProducts);
        }
        if (Array.isArray(s.orders)) setOrders(s.orders.map(hydrateOrder));
        if (Array.isArray(s.inquiries)) setInquiries(s.inquiries);
        if (Array.isArray(s.cart)) setCart(s.cart);
        if (Array.isArray(s.collectionData)) {
          setCollectionData(
            s.collectionData.map((storedCollection: CollectionData) => {
              const currentCollection = collections.find(
                (collection) => collection.slug === storedCollection.slug,
              );
              const previousDefaultImages = [
                `/images/editorial/${storedCollection.slug}.jpg`,
                storedCollection.slug === "silver-studies"
                  ? "/images/ring-sculpture.svg"
                  : "",
                storedCollection.slug === "line-and-form"
                  ? "/images/necklace-detail.svg"
                  : "",
                storedCollection.slug === "small-rituals"
                  ? "/images/earrings-study.svg"
                  : "",
              ];
              return currentCollection &&
                previousDefaultImages.includes(storedCollection.image)
                ? { ...storedCollection, image: currentCollection.image }
                : storedCollection;
            }),
          );
        }
        if (Array.isArray(s.categoryData)) setCategoryData(s.categoryData);
        if (s.settings) setSettings({ ...defaultSettings, ...s.settings });
      }
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem(
          "wfc-store-v1",
          JSON.stringify({
            products,
            orders,
            inquiries,
            cart,
            collectionData,
            categoryData,
            settings,
          }),
        );
      } catch {
        setNotice(
          "Storage is full. Reduce the size or number of uploaded images.",
        );
      }
    }
  }, [
    ready,
    products,
    orders,
    inquiries,
    cart,
    collectionData,
    categoryData,
    settings,
  ]);
  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(""), 3200);
    return () => clearTimeout(id);
  }, [notice]);
  const addToCart = (productId: string, size: string, quantity = 1) => {
    const p = products.find((x) => x.id === productId);
    if (
      !p ||
      !p.published ||
      p.status === "Sold out" ||
      !p.sizes.includes(size)
    )
      return;
    const currentQuantity = cart
      .filter((item) => item.productId === productId)
      .reduce((n, item) => n + item.quantity, 0);
    if (currentQuantity >= p.stock) {
      setNotice("All available pieces are already in your bag.");
      setBagOpen(true);
      return;
    }
    setCart((prev) => {
      const found = prev.find(
        (x) => x.productId === productId && x.size === size,
      );
      const current = prev
        .filter((x) => x.productId === productId)
        .reduce((n, x) => n + x.quantity, 0);
      const allowance = Math.max(0, p.stock - current);
      if (!allowance) {
        return prev;
      }
      const amount = Math.min(quantity, allowance);
      return found
        ? prev.map((x) =>
            x === found ? { ...x, quantity: x.quantity + amount } : x,
          )
        : [...prev, { productId, size, quantity: amount }];
    });
    setBagOpen(true);
  };
  const updateCart = (id: string, size: string, quantity: number) =>
    setCart((prev) => {
      if (quantity <= 0)
        return prev.filter((x) => !(x.productId === id && x.size === size));
      const p = products.find((x) => x.id === id);
      const others = prev
        .filter((x) => x.productId === id && x.size !== size)
        .reduce((n, x) => n + x.quantity, 0);
      return prev.map((x) =>
        x.productId === id && x.size === size
          ? {
              ...x,
              quantity: Math.max(
                1,
                Math.min(quantity, (p?.stock ?? 99) - others),
              ),
            }
          : x,
      );
    });
  const saveProduct = (p: Product) => {
    setProducts((prev) =>
      prev.some((x) => x.id === p.id)
        ? prev.map((x) => (x.id === p.id ? p : x))
        : [...prev, p],
    );
    setNotice("Product saved");
  };
  const saveOrder = (o: Order) => {
    setOrders((prev) => prev.map((x) => (x.id === o.id ? o : x)));
    setNotice("Order updated");
  };
  const saveInquiry = (i: Inquiry) => {
    setInquiries((prev) => prev.map((x) => (x.id === i.id ? i : x)));
    setNotice("Inquiry updated");
  };
  const saveCollection = (c: CollectionData) => {
    setCollectionData((prev) =>
      prev.some((x) => x.slug === c.slug)
        ? prev.map((x) => (x.slug === c.slug ? c : x))
        : [...prev, c],
    );
    setNotice("Collection saved");
  };
  const saveCategory = (c: string) => {
    if (!c.trim()) return;
    setCategoryData((prev) => [...new Set([...prev, c])]);
    setNotice("Category added");
  };
  const saveSettings = (s: SiteSettings) => {
    setSettings(s);
    setNotice("Settings saved");
  };
  const reset = () => {
    setCollectionData(collections);
    setCategoryData(categories);
    setSettings(defaultSettings);
    setProducts(initialProducts);
    setOrders(initialOrders);
    setInquiries(initialInquiries);
    setCart([]);
    setNotice("Workspace restored");
  };
  return (
    <StoreContext.Provider
      value={{
        collectionData,
        categoryData,
        settings,
        saveCollection,
        saveCategory,
        saveSettings,
        products,
        orders,
        inquiries,
        cart,
        bagOpen,
        setBagOpen,
        notice,
        notify: setNotice,
        addToCart,
        updateCart,
        saveProduct,
        saveOrder,
        saveInquiry,
        reset,
      }}
    >
      {children}
      <div className={`toast ${notice ? "is-visible" : ""}`} role="status">
        {notice}
      </div>
    </StoreContext.Provider>
  );
}
export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Store provider missing");
  return store;
}
