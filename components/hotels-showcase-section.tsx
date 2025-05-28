"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { X } from "lucide-react"

// Add this style to the top of the component
const fadeInAnimation = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out;
  }
`

interface GalleryImage {
  src: string
  alt: string
}

interface Hotel {
  id: string
  name: string
  mainImage: GalleryImage
  galleryImages: GalleryImage[]
}

export default function HotelsShowcaseSection() {
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null)
  const [hoveredImages, setHoveredImages] = useState<{ [key: string]: string }>({})
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>({})

  const hotels: Hotel[] = [
    {
      id: "piura",
      name: "Piura",
      mainImage: {
        src: "/modern-hotel-orange.png",
        alt: "Hotel Paraíso Piura - Habitación principal",
      },
      galleryImages: [
        { src: "/elegant-hotel-lobby.png", alt: "Lobby Hotel Piura" },
        { src: "/modern-hotel-bathroom.png", alt: "Baño Hotel Piura" },
        { src: "/hotel-bedroom.png", alt: "Dormitorio Hotel Piura" },
        { src: "/luxurious-hotel-suite.png", alt: "Suite Hotel Piura" },
      ],
    },
    {
      id: "chiclayo",
      name: "Chiclayo",
      mainImage: {
        src: "/elegant-modern-hotel.png",
        alt: "Hotel Paraíso Chiclayo - Habitación principal",
      },
      galleryImages: [
        { src: "/placeholder-uzk4x.png", alt: "Recepción Hotel Chiclayo" },
        { src: "/elegant-hotel-dining.png", alt: "Comedor Hotel Chiclayo" },
        { src: "/placeholder-23vpn.png", alt: "Sala de conferencias Hotel Chiclayo" },
        { src: "/modern-hotel-exterior.png", alt: "Exterior Hotel Chiclayo" },
      ],
    },
    {
      id: "trujillo",
      name: "Trujillo",
      mainImage: {
        src: "/luxury-hotel-jacuzzi-suite.png",
        alt: "Hotel Paraíso Trujillo - Suite principal",
      },
      galleryImages: [
        { src: "/hotel-spa.png", alt: "Spa Hotel Trujillo" },
        { src: "/hotel-restaurant.png", alt: "Restaurante Hotel Trujillo" },
        { src: "/hotel-gym.png", alt: "Gimnasio Hotel Trujillo" },
        { src: "/hotel-terrace.png", alt: "Terraza Hotel Trujillo" },
      ],
    },
  ]

  const handleHotelReservation = (hotel: string) => {
    const message = `Hola! Me interesa hacer una reserva en el Hotel Paraíso ${hotel}. ¿Podrían proporcionarme información sobre disponibilidad, precios y servicios?

Gracias!`

    const whatsappUrl = `https://wa.me/51958100066?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleImageHover = (hotelId: string, imageSrc: string) => {
    setImageLoading((prev) => ({ ...prev, [hotelId]: true }))
    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      setHoveredImages((prev) => ({ ...prev, [hotelId]: imageSrc }))
      setImageLoading((prev) => ({ ...prev, [hotelId]: false }))
    }
    img.onerror = () => {
      setImageLoading((prev) => ({ ...prev, [hotelId]: false }))
    }
    img.src = imageSrc
  }

  const handleImageLeave = (hotelId: string) => {
    setHoveredImages((prev) => {
      const newState = { ...prev }
      delete newState[hotelId]
      return newState
    })
  }

  const openLightbox = (image: GalleryImage) => {
    setLightboxImage(image)
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  const getCurrentMainImage = (hotel: Hotel) => {
    return hoveredImages[hotel.id] ? { src: hoveredImages[hotel.id], alt: `Vista de ${hotel.name}` } : hotel.mainImage
  }

  const getHotelContent = (hotelId: string) => {
    switch (hotelId) {
      case "piura":
        return {
          title: "HOTELES PARAÍSO PIURA:",
          description:
            "Un hotel nuevo, moderno y acogedor. Vive una experiencia de descanso con calidez y bienestar, a solo dos minutos de la Plaza de Armas de Piura. Con 57 habitaciones diseñadas para tu confort, entre habitaciones individuales, matrimoniales, dobles, doble + adicional y Junior Suite.",
          buttonClass: "bg-[#F58718] hover:bg-orange-600",
        }
      case "chiclayo":
        return {
          title: "HOTELES PARAÍSO CHICLAYO:",
          description:
            "Ubicado en el corazón de Chiclayo, ubicado en el centro comercial de la ciudad, en el punto estratégico para tus viajes de negocios. Cuenta con 65 habitaciones entre individuales, matrimoniales, dobles y triples; ideales para vivir una experiencia cómoda y placentera a fin.",
          buttonClass: "bg-gray-800 hover:bg-gray-900",
        }
      case "trujillo":
        return {
          title: "HOTELES PARAÍSO TRUJILLO:",
          description:
            "Ubicado en el corazón de la ciudad, a solo 6 minutos de la Plaza de Armas de Trujillo. Un hotel encantador, moderno, cálido y acogedor. Todo lo necesario para que el huésped disfrute su estadía. Ofrece 52 habitaciones: individuales, matrimoniales, dobles, doble + adicional y junior suite, totalmente equipadas.",
          buttonClass: "bg-[#F58718] hover:bg-orange-600",
        }
      default:
        return { title: "", description: "", buttonClass: "" }
    }
  }

  return (
    <>
      <style jsx global>
        {fadeInAnimation}
      </style>
      <section className="relative bg-gray-100/65 container-section py-16 lg:py-24">
        <div className="content-section">
          {/* Título principal */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-4 tracking-tight px-4">
              VISITA EL NORTE, DESCUBRE <span className="text-[#F58718]">EL PARAÍSO</span>
            </h2>
          </div>

          {/* Grid de hoteles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-8">
            {hotels.map((hotel, index) => {
              const content = getHotelContent(hotel.id)
              const currentMainImage = getCurrentMainImage(hotel)

              return (
                <div
                  key={hotel.id}
                  className={`bg-white rounded-3xl shadow-lg lg:shadow-2xl flex flex-col ${
                    hotel.id === "trujillo" ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  {/* Imagen principal */}
                  <div className="relative h-48 sm:h-56 lg:h-72 overflow-hidden rounded-t-3xl cursor-pointer">
                    <Image
                      src={currentMainImage.src || "/placeholder.svg"}
                      alt={currentMainImage.alt}
                      fill
                      className="object-cover transition-opacity duration-300 ease-in-out"
                      onClick={() => openLightbox(currentMainImage)}
                      quality={100}
                    />
                  </div>

                  {/* Galería de miniaturas */}
                  <div className="grid grid-cols-4 gap-1 p-1">
                    {hotel.galleryImages.map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="relative h-16 sm:h-20 overflow-hidden cursor-pointer rounded-sm"
                        onMouseEnter={() => handleImageHover(hotel.id, image.src)}
                        onMouseLeave={() => handleImageLeave(hotel.id)}
                        onClick={() => openLightbox(image)}
                      >
                        <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                      </div>
                    ))}
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 pt-4 lg:pt-8 flex flex-col">
                    <h3 className="text-lg sm:text-xl px-6 font-bold text-gray-800 mb-3 sm:mb-4 tracking-wide">
                      {content.title}
                    </h3>
                    <p
                      className={`text-gray-600 px-6 text-xs sm:text-sm leading-relaxed flex-1 ${
                        hotel.id === "trujillo" ? "mb-4 sm:mb-8" : "mb-4 sm:mb-6"
                      }`}
                    >
                      {content.description}
                    </p>
                    <Button
                      onClick={() => handleHotelReservation(hotel.name)}
                      className={`w-full ${content.buttonClass} text-white font-bold py-6 sm:py-8 px-4 sm:px-6 rounded-b-3xl rounded-t-none text-xs sm:text-base uppercase tracking-wide`}
                    >
                      RESERVAR AHORA
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white p-2 rounded-full"
              aria-label="Cerrar lightbox"
            >
              <X size={32} />
            </button>
            <div className="relative w-full h-full">
              <Image
                src={lightboxImage.src || "/placeholder.svg"}
                alt={lightboxImage.alt}
                width={1200}
                height={800}
                className="object-contain max-w-full max-h-[80vh] rounded-lg shadow-2xl"
                quality={100}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
