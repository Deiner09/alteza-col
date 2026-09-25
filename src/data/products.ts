export type Product = {
  name: string;
  category: string;
  price: string;
  image: string;
  keywords: string;
};

export const products: Product[] = [
  {
    name: "Crema Hidratante Facial",
    category: "Skincare",
    price: "$89.000",
    image: "/images/products/skincare/crema-hidratante.webp",
    keywords: "crema hidratante piel cara skincare",
  },

  {
    name: "Sérum Facial Rejuvenecedor",
    category: "Skincare",
    price: "$88.000",
    image: "/images/products/skincare/serum-rejuvenecedor.webp",
    keywords: "serum sérum rejuvenecedor piel skincare",
  },

  {
    name: "Lipstick Rose Nude",
    category: "Maquillaje",
    price: "$69.000",
    image: "/images/products/makeup/lipstick-rose-nude.webp",
    keywords: "labial lipstick nude labios maquillaje",
  },

  {
    name: "Blush Rose Glow",
    category: "Maquillaje",
    price: "$79.000",
    image: "/images/products/makeup/blush-rose-glow.webp",
    keywords: "blush rubor rosa mejillas maquillaje",
  },

  {
    name: "Glow Facial Oil",
    category: "Skincare",
    price: "$95.000",
    image: "",
    keywords: "aceite facial glow brillo piel skincare",
  },

  {
    name: "Hair Repair Mask",
    category: "Cuidado capilar",
    price: "$84.000",
    image: "",
    keywords: "mascarilla cabello pelo hair reparación",
  },

  {
    name: "Rose Hydrating Mist",
    category: "Skincare",
    price: "$72.000",
    image: "",
    keywords: "mist bruma hidratante rosa piel skincare",
  },

  {
    name: "Nude Rose Palette",
    category: "Maquillaje",
    price: "$119.000",
    image: "",
    keywords: "paleta sombras nude rosa maquillaje",
  },
];