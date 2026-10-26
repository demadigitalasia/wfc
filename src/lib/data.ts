export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  collection: string;
  material: string;
  price: number;
  images: string[];
  status: "Ready to ship" | "Made to order" | "Sold out";
  stock: number;
  sizes: string[];
  description: string;
  detail: string;
  leadTime: string;
  featured?: boolean;
  published: boolean;
};
const image = (name: string) => `/images/${name}.svg`;
const editorialImage = (name: string, format = "jpg") =>
  `/images/editorial/${name}.${format}`;
const productConceptImage = (name: string) =>
  `/images/product-concepts/${name}.jpg`;
export const categories = ["Rings", "Necklaces", "Earrings", "Bracelets"];
export const collections = [
  {
    slug: "silver-studies",
    name: "Silver Studies",
    eyebrow: "Collection 01",
    description:
      "An exploration of reflection, line, and the quiet weight of silver. Sculptural pieces with an everyday sensibility.",
    image: editorialImage("collection-silver-studies-v2"),
    imageAlt: "Hand-hammered silver ring displayed on dark stone.",
  },
  {
    slug: "line-and-form",
    name: "Line & Form",
    eyebrow: "Collection 02",
    description:
      "A single line becomes something to wear. Delicate connections, considered proportions, and unexpected silhouettes.",
    image: editorialImage("collection-line-and-form-v2"),
    imageAlt: "Geometric silver pendant necklace against pale limestone.",
  },
  {
    slug: "small-rituals",
    name: "Small Rituals",
    eyebrow: "Collection 03",
    description:
      "The pieces you reach for without thinking. Familiar shapes, tactile details, and a little everyday intention.",
    image: editorialImage("collection-small-rituals-v2"),
    imageAlt:
      "Small hammered silver huggie earrings on ivory paper beside a smooth stone.",
  },
];
export const initialProducts: Product[] = [
  {
    id: "p01",
    slug: "arc-ring",
    name: "Arc Ring",
    category: "Rings",
    collection: "silver-studies",
    material: "Sterling silver",
    price: 148,
    images: [
      productConceptImage("p01-arc-ring-purple-chalcedony"),
      image("atelier-study"),
    ],
    status: "Ready to ship",
    stock: 7,
    sizes: ["5", "6", "7", "8", "9"],
    description:
      "A small study in balance. A polished silver arc follows the hand, with a sculptural profile and an unexpectedly quiet presence.",
    detail: "Sterling silver · polished finish · approximately 4 mm band",
    leadTime: "Ships in 2–4 business days",
    featured: true,
    published: true,
  },
  {
    id: "p02",
    slug: "thread-pendant",
    name: "Thread Pendant",
    category: "Necklaces",
    collection: "line-and-form",
    material: "Gold vermeil",
    price: 186,
    images: [
      productConceptImage("p02-thread-pendant-clown-doublet"),
      image("pendant-detail"),
    ],
    status: "Made to order",
    stock: 12,
    sizes: ["16 inches", "18 inches", "20 inches"],
    description:
      "A delicate pendant held by a fine chain. A light-catching piece with the intimacy of something made just for you.",
    detail: "Gold vermeil · fine chain · adjustable fastening",
    leadTime: "Made for you in 2–3 weeks",
    featured: true,
    published: true,
  },
  {
    id: "p03",
    slug: "fold-earrings",
    name: "Fold Earrings",
    category: "Earrings",
    collection: "small-rituals",
    material: "Gold vermeil",
    price: 124,
    images: [
      productConceptImage("p03-fold-earrings-chrysocolla"),
      image("jewelry-editorial"),
    ],
    status: "Ready to ship",
    stock: 5,
    sizes: ["One size"],
    description:
      "An expressive pair with a light touch. Designed to move with you, from the ordinary morning to the unplanned evening.",
    detail: "Gold vermeil · sold as a pair · secure post fastening",
    leadTime: "Ships in 2–4 business days",
    featured: true,
    published: true,
  },
  {
    id: "p04",
    slug: "continuum-bracelet",
    name: "Continuum Bracelet",
    category: "Bracelets",
    collection: "silver-studies",
    material: "Sterling silver",
    price: 162,
    images: [
      productConceptImage("p04-continuum-bracelet-palm-root"),
      image("ring-sculpture"),
    ],
    status: "Ready to ship",
    stock: 4,
    sizes: ["Small", "Medium", "Large"],
    description:
      "A considered curve around the wrist. Simple in appearance, with a tactile finish that rewards a closer look.",
    detail: "Sterling silver · hand-finished edges · three sizes",
    leadTime: "Ships in 2–4 business days",
    featured: true,
    published: true,
  },
  {
    id: "p05",
    slug: "trace-necklace",
    name: "Trace Necklace",
    category: "Necklaces",
    collection: "line-and-form",
    material: "Gold vermeil",
    price: 172,
    images: [
      productConceptImage("p05-trace-necklace-carnelian"),
      image("necklace-studio"),
    ],
    status: "Ready to ship",
    stock: 6,
    sizes: ["16 inches", "18 inches"],
    description:
      "Fine lines and a restrained silhouette. A versatile necklace to wear alone or as the beginning of a personal arrangement.",
    detail: "Gold vermeil · fine-link chain · adjustable length",
    leadTime: "Ships in 2–4 business days",
    published: true,
  },
  {
    id: "p06",
    slug: "orbit-ring",
    name: "Orbit Ring",
    category: "Rings",
    collection: "silver-studies",
    material: "Sterling silver",
    price: 156,
    images: [
      productConceptImage("p06-orbit-ring-bumble-bee-jasper"),
      image("ring-sculpture"),
    ],
    status: "Made to order",
    stock: 10,
    sizes: ["5", "6", "7", "8", "9", "10"],
    description:
      "A rounded silhouette with an architectural spirit. Made slowly, finished by hand, and designed to feel at home on yours.",
    detail: "Sterling silver · sculptural profile · comfort fit",
    leadTime: "Made for you in 2–3 weeks",
    published: true,
  },
  {
    id: "p07",
    slug: "still-pendant",
    name: "Still Pendant",
    category: "Necklaces",
    collection: "small-rituals",
    material: "Gold vermeil",
    price: 138,
    images: [
      productConceptImage("p07-still-pendant-blue-opalized-wood"),
      image("necklace-detail"),
    ],
    status: "Ready to ship",
    stock: 8,
    sizes: ["18 inches", "20 inches"],
    description:
      "One small focal point. A pendant that holds its own without asking for attention, made for the way you move through a day.",
    detail: "Gold vermeil · smooth pendant · fine-link chain",
    leadTime: "Ships in 2–4 business days",
    published: true,
  },
  {
    id: "p08",
    slug: "echo-earrings",
    name: "Echo Earrings",
    category: "Earrings",
    collection: "line-and-form",
    material: "Sterling silver",
    price: 112,
    images: [
      productConceptImage("p08-echo-earrings-maligano-jasper"),
      image("earrings-study"),
    ],
    status: "Sold out",
    stock: 0,
    sizes: ["One size"],
    description:
      "A subtle repetition of line and light. The simplicity of a pair, considered from every angle.",
    detail: "Sterling silver · sold as a pair · lightweight construction",
    leadTime: "Currently unavailable",
    published: true,
  },
  {
    id: "p09",
    slug: "interval-bracelet",
    name: "Interval Bracelet",
    category: "Bracelets",
    collection: "small-rituals",
    material: "Sterling silver",
    price: 144,
    images: [
      productConceptImage("p09-interval-bracelet-blue-opalized-wood"),
      image("jewelry-editorial"),
    ],
    status: "Made to order",
    stock: 8,
    sizes: ["Small", "Medium", "Large"],
    description:
      "Space between links creates its rhythm. A softly structured bracelet with the ease of a well-loved object.",
    detail: "Sterling silver · linked construction · hand finished",
    leadTime: "Made for you in 3–4 weeks",
    published: true,
  },
  {
    id: "p10",
    slug: "form-ring",
    name: "Form Ring",
    category: "Rings",
    collection: "silver-studies",
    material: "Sterling silver",
    price: 178,
    images: [
      productConceptImage("p10-form-ring-maligano-jasper"),
      image("atelier-study"),
    ],
    status: "Made to order",
    stock: 6,
    sizes: ["5", "6", "7", "8", "9"],
    description:
      "A bolder expression of an essential shape. Its generous profile catches the light while a smooth inner surface keeps it comfortable.",
    detail: "Sterling silver · substantial profile · polished interior",
    leadTime: "Made for you in 3–4 weeks",
    published: true,
  },
  {
    id: "p11",
    slug: "line-earrings",
    name: "Line Earrings",
    category: "Earrings",
    collection: "line-and-form",
    material: "Gold vermeil",
    price: 96,
    images: [image("earrings-study"), image("jewelry-editorial")],
    status: "Ready to ship",
    stock: 9,
    sizes: ["One size"],
    description:
      "An unbroken gesture, translated into a pair. A light, understated addition to an everyday collection.",
    detail: "Gold vermeil · sold as a pair · post fastening",
    leadTime: "Ships in 2–4 business days",
    published: true,
  },
  {
    id: "p12",
    slug: "memory-chain",
    name: "Memory Chain",
    category: "Necklaces",
    collection: "small-rituals",
    material: "Gold vermeil",
    price: 152,
    images: [image("necklace-studio"), image("necklace-detail")],
    status: "Ready to ship",
    stock: 3,
    sizes: ["16 inches", "18 inches", "20 inches"],
    description:
      "A chain to become familiar with. Delicate enough to layer, with enough character to wear on its own.",
    detail: "Gold vermeil · secure clasp · three lengths",
    leadTime: "Ships in 2–4 business days",
    published: true,
  },
];
export const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
export type Order = {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  status: string;
  payment: string;
  items: {
    productId: string;
    quantity: number;
    size: string;
    name?: string;
    unitPrice?: number;
    image?: string;
  }[];
  country: string;
  address: string;
  tracking: string;
};
const orderSeed: Order[] = [
  {
    id: "WFC-1048",
    customer: "Avery Morgan",
    email: "avery@example.com",
    date: "2026-10-25",
    total: 310,
    status: "Processing",
    payment: "Paid",
    items: [
      { productId: "p01", quantity: 1, size: "7" },
      { productId: "p04", quantity: 1, size: "Medium" },
    ],
    country: "United States",
    address: "148 Willow Avenue, Portland, OR 97205",
    tracking: "",
  },
  {
    id: "WFC-1047",
    customer: "Jordan Ellis",
    email: "jordan@example.com",
    date: "2026-10-24",
    total: 198,
    status: "Shipped",
    payment: "Paid",
    items: [{ productId: "p02", quantity: 1, size: "18 inches" }],
    country: "Canada",
    address: "42 Alder Street, Vancouver, BC V6B 1A1",
    tracking: "9400111899223847182045",
  },
  {
    id: "WFC-1046",
    customer: "Riley Brooks",
    email: "riley@example.com",
    date: "2026-10-23",
    total: 124,
    status: "Delivered",
    payment: "Paid",
    items: [{ productId: "p03", quantity: 1, size: "One size" }],
    country: "United States",
    address: "716 Oak Lane, Austin, TX 78701",
    tracking: "9400111899223847182046",
  },
  {
    id: "WFC-1045",
    customer: "Casey Quinn",
    email: "casey@example.com",
    date: "2026-10-22",
    total: 178,
    status: "Awaiting payment",
    payment: "Pending",
    items: [{ productId: "p10", quantity: 1, size: "6" }],
    country: "United Kingdom",
    address: "28 Fern Road, London, N1 6DZ",
    tracking: "",
  },
  {
    id: "WFC-1044",
    customer: "Taylor Reed",
    email: "taylor@example.com",
    date: "2026-10-20",
    total: 172,
    status: "Cancelled",
    payment: "Refunded",
    items: [{ productId: "p05", quantity: 1, size: "18 inches" }],
    country: "Australia",
    address: "86 Elm Street, Melbourne, VIC 3000",
    tracking: "",
  },
];
export function hydrateOrder(order: Order): Order {
  return {
    ...order,
    items: order.items.map((item) => {
      const product = initialProducts.find((p) => p.id === item.productId);
      return {
        ...item,
        name: item.name ?? product?.name ?? "Archived piece",
        unitPrice: item.unitPrice ?? product?.price ?? 0,
        image: item.image ?? product?.images[0],
      };
    }),
  };
}
export const initialOrders: Order[] = orderSeed.map(hydrateOrder);

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: "New" | "Read" | "Resolved";
};
export const initialInquiries: Inquiry[] = [
  {
    id: "in01",
    name: "Alex Parker",
    email: "alex@example.com",
    subject: "Sizing advice for the Arc Ring",
    message:
      "I usually wear a US size 7. Would you recommend my usual size for the Arc Ring? Thank you!",
    date: "2026-10-25",
    status: "New",
  },
  {
    id: "in02",
    name: "Sam Lee",
    email: "sam@example.com",
    subject: "Made-to-order timing",
    message:
      "I am considering the Thread Pendant as a gift. Can you share more about the making process and estimated timing?",
    date: "2026-10-24",
    status: "Read",
  },
  {
    id: "in03",
    name: "Jamie Carter",
    email: "jamie@example.com",
    subject: "Caring for silver",
    message:
      "Thank you for your advice about storing my silver pieces. The soft pouch has made a difference.",
    date: "2026-10-22",
    status: "Resolved",
  },
];
export const faqs = [
  {
    category: "Orders",
    q: "What is the difference between ready to ship and made to order?",
    a: "Ready-to-ship pieces have already been made. Made-to-order pieces are created after an order is placed. The product page shows the relevant availability and making window.",
  },
  {
    category: "Orders",
    q: "Can I request a different size?",
    a: "Available sizes are listed on each product page. For a size outside that range, use our contact form to ask about the possibilities before ordering.",
  },
  {
    category: "Shipping",
    q: "Where does Wild Feather Creations ship?",
    a: "Our studio is based in the United States. We plan to offer delivery across the US and to international destinations. Available delivery options depend on the destination.",
  },
  {
    category: "Shipping",
    q: "When will my piece be ready?",
    a: "Look for the dispatch or making window on the product page. For a mixed order, the made-to-order piece may determine when the full order is ready.",
  },
  {
    category: "Care",
    q: "How should I care for sterling silver?",
    a: "Store your piece in a dry, soft pouch. Keep it away from perfume, chlorine, and household chemicals. Use a gentle jewelry cloth to restore its surface.",
  },
  {
    category: "Care",
    q: "How do I find my ring size?",
    a: "A professional measurement is the most reliable starting point. You can also compare the inside diameter of a comfortable ring with our size guide.",
  },
  {
    category: "Orders",
    q: "How can I get in touch?",
    a: "Use our contact form for product questions, sizing, or order enquiries. Include the product name and any details that will help us understand your question.",
  },
];
export const guides: Record<
  string,
  {
    title: string;
    eyebrow: string;
    intro: string;
    sections: { title: string; text: string }[];
  }
> = {
  sizing: {
    title: "Finding your fit.",
    eyebrow: "The size guide",
    intro:
      "The right fit should feel almost effortless. A few considered measurements can make all the difference.",
    sections: [
      {
        title: "Rings",
        text: "We use US ring sizing. Measure the inside diameter of a ring that fits the intended finger, or visit a jeweler for a professional measurement. Wider bands may feel more fitted.",
      },
      {
        title: "Necklaces",
        text: "Measure a favorite necklace laid flat, from end to end. Consider where you want the pendant to sit and allow for the neckline you usually wear.",
      },
      {
        title: "Bracelets",
        text: "Measure your wrist at its narrowest point with a soft tape. Add a little room for movement. Contact us when you are between sizes.",
      },
    ],
  },
  care: {
    title: "Made to be kept.",
    eyebrow: "Jewelry care",
    intro:
      "A little care, often. Simple habits help preserve the finish and character of a handmade piece.",
    sections: [
      {
        title: "Wear with care",
        text: "Put jewelry on after perfume, lotion, and cosmetics. Remove it before swimming, exercising, or using household cleaning products.",
      },
      {
        title: "A quiet place to rest",
        text: "Store pieces separately in a soft pouch, away from direct sunlight and moisture. Keeping silver dry helps reduce natural tarnishing.",
      },
      {
        title: "Gentle cleaning",
        text: "Use a soft, dry jewelry cloth. Avoid abrasive cleaners and prolonged soaking, especially for plated finishes and delicate stones.",
      },
    ],
  },
};
export const policies: Record<
  string,
  { title: string; intro: string; sections: { title: string; text: string }[] }
> = {
  shipping: {
    title: "Shipping & delivery",
    intro: "From our studio in the United States to your everyday collection.",
    sections: [
      {
        title: "Ready to ship & made to order",
        text: "Each product page shows its availability and an estimated making or dispatch window. These are separate from carrier transit time.",
      },
      {
        title: "US delivery",
        text: "Delivery options and the applicable charge are shown when a destination is entered at checkout. A complete, accurate address helps your piece arrive as intended.",
      },
      {
        title: "International delivery",
        text: "International options depend on the destination. Customs processing can affect transit time. Any applicable import duties and taxes must be reviewed before a purchase.",
      },
      {
        title: "Questions about delivery",
        text: "Use our contact form for a destination or delivery question. Final carrier schedules and shipping terms will be confirmed before sales open.",
      },
    ],
  },
  returns: {
    title: "Returns & repairs",
    intro: "Thoughtfully made, and thoughtfully looked after.",
    sections: [
      {
        title: "Before ordering",
        text: "Check measurements, materials, and the making window carefully. We are happy to help with sizing and product questions through our contact form.",
      },
      {
        title: "Returns and cancellations",
        text: "Eligibility can differ between ready-to-ship pieces and items made to your specifications. Final return windows, cancellation terms, and refund conditions will be published before purchases open.",
      },
      {
        title: "Care and repairs",
        text: "If a piece needs attention, contact us with its name and a clear description. We will review the details before recommending a next step.",
      },
    ],
  },
  privacy: {
    title: "Privacy",
    intro: "A considered approach to the information you share.",
    sections: [
      {
        title: "Information for an order",
        text: "An online order may require your name, email, and billing or delivery address. Only information needed to fulfill and support the order will be requested.",
      },
      {
        title: "Payment details",
        text: "Payment information will be processed by the selected payment provider. Wild Feather Creations will not store full card details.",
      },
      {
        title: "Contact and choices",
        text: "Our final service providers, retention periods, and privacy contact will be published before customer information is collected for live transactions.",
      },
    ],
  },
  terms: {
    title: "Terms of service",
    intro: "Clear information for a considered purchase.",
    sections: [
      {
        title: "Product information",
        text: "Handmade pieces can carry small variations in finish and proportion. Product photographs, material descriptions, size options, and prices should be reviewed before ordering.",
      },
      {
        title: "Prices and availability",
        text: "Availability and the final order total are confirmed during checkout. Production pricing, taxes, and delivery terms will be approved before sales open.",
      },
      {
        title: "Service terms",
        text: "Final business contact details and applicable service terms will be published before the store begins accepting transactions.",
      },
    ],
  },
};
