import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "محوّل العملات — أسعار صرف لحظية",
    short_name: "العملات",
    description: "تحويل بين أكثر من 160 عملة بأسعار لحظية ورسم بياني لآخر 7 أيام",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    dir: "rtl",
    lang: "ar",
    categories: ["finance", "utilities"],
    background_color: "#080d1a",
    theme_color: "#080d1a",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}

