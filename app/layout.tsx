import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Hoteles Paraíso - Norte del Perú | Chiclayo, Trujillo y Piura",
  description:
    "Experimenta la hospitalidad excepcional en nuestros hoteles ubicados en Chiclayo, Trujillo y Piura. Más de 30 años de experiencia brindando el mejor servicio en el norte del Perú.",
  keywords: [
    "hoteles peru",
    "hoteles chiclayo",
    "hoteles trujillo",
    "hoteles piura",
    "hotel paraiso",
    "hospedaje norte peru",
    "turismo peru",
    "reservas hotel",
    "alojamiento peru",
  ],
  authors: [{ name: "Hoteles Paraíso" }],
  creator: "Hoteles Paraíso",
  publisher: "Hoteles Paraíso",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://hotelesparaiso.com.pe"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hoteles Paraíso - Norte del Perú | Chiclayo, Trujillo y Piura",
    description:
      "Experimenta la hospitalidad excepcional en nuestros hoteles ubicados en Chiclayo, Trujillo y Piura. Más de 30 años de experiencia brindando el mejor servicio en el norte del Perú.",
    url: "https://hotelesparaiso.com.pe",
    siteName: "Hoteles Paraíso",
    images: [
      {
        url: "/images/banner1.png",
        width: 1200,
        height: 630,
        alt: "Hoteles Paraíso - Norte del Perú",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoteles Paraíso - Norte del Perú",
    description: "Experimenta la hospitalidad excepcional en nuestros hoteles ubicados en Chiclayo, Trujillo y Piura.",
    images: ["/images/banner1.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/png" },
    ],
 
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "google-site-verification-code", // Reemplazar con código real
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={montserrat.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#f97316" />
        <meta name="msapplication-TileColor" content="#f97316" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              name: "Hoteles Paraíso",
              description: "Cadena de hoteles en el norte del Perú con sedes en Chiclayo, Trujillo y Piura",
              url: "https://hotelesparaiso.com.pe",
              telephone: "+51958100066",
              email: "ventas@hotelesparaiso.com.pe",
              address: [
                {
                  "@type": "PostalAddress",
                  addressLocality: "Chiclayo",
                  addressRegion: "Lambayeque",
                  addressCountry: "PE",
                },
                {
                  "@type": "PostalAddress",
                  addressLocality: "Trujillo",
                  addressRegion: "La Libertad",
                  addressCountry: "PE",
                },
                {
                  "@type": "PostalAddress",
                  addressLocality: "Piura",
                  addressRegion: "Piura",
                  addressCountry: "PE",
                },
              ],
              sameAs: [
                "https://instagram.com/paraisohoteles",
                "https://facebook.com/paraisohoteles",
                "https://tiktok.com/@hoteles.paraiso",
              ],
              amenityFeature: [
                "Free WiFi",
                "Air Conditioning",
                "Swimming Pool",
                "Restaurant",
                "Parking",
                "24/7 Reception",
              ],
            }),
          }}
        />
      </head>
      <body className="font-montserrat antialiased">{children}</body>
    </html>
  )
}
