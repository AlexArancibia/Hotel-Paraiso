"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryImage {
  src: string
  alt: string
}

interface Hotel {
  id: string
  name: string
  displayName: string
}

export default function HotelsShowcaseSection() {
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({})
  const [hotelImages, setHotelImages] = useState<{ [key: string]: GalleryImage[] }>({})
  const [isTransitioning, setIsTransitioning] = useState<{ [key: string]: boolean }>({})
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState<{ [key: string]: number }>({})
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({})

  const hotels: Hotel[] = [
    {
      id: "trujillo",
      name: "trujillo",
      displayName: "Trujillo",
    },
    {
      id: "chiclayo",
      name: "chiclayo",
      displayName: "Chiclayo",
    },
    {
      id: "piura",
      name: "piura",
      displayName: "Piura",
    },
    
    
  ]

  // Configuración fija de imágenes por hotel (ajusta según tus imágenes reales)
  const hotelImageCounts = {
    piura: 10,    // Número de imágenes que realmente tienes para Piura
    chiclayo: 10, // Número de imágenes que realmente tienes para Chiclayo
    trujillo: 9  // Número de imágenes que realmente tienes para Trujillo
  }

  // Función para generar las rutas de imágenes basada en el conteo real
  const generateImagePaths = (hotelName: string): GalleryImage[] => {
    const images: GalleryImage[] = []
    const count = hotelImageCounts[hotelName as keyof typeof hotelImageCounts] || 5

    for (let i = 1; i <= count; i++) {
      images.push({
        src: `/${hotelName}/${hotelName}${i}.jpg`,
        alt: `Hotel Paraíso ${hotelName.charAt(0).toUpperCase() + hotelName.slice(1)} - Vista ${i}`,
      })
    }

    return images
  }

  // Inicializar imágenes sin verificación asíncrona
  useEffect(() => {
    const initializeHotelImages = () => {
      const newHotelImages: { [key: string]: GalleryImage[] } = {}
      const newCurrentImageIndex: { [key: string]: number } = {}
      const newThumbnailStartIndex: { [key: string]: number } = {}

      hotels.forEach(hotel => {
        const images = generateImagePaths(hotel.name)
        newHotelImages[hotel.id] = images
        newCurrentImageIndex[hotel.id] = 0
        newThumbnailStartIndex[hotel.id] = 0
      })

      setHotelImages(newHotelImages)
      setCurrentImageIndex(newCurrentImageIndex)
      setThumbnailStartIndex(newThumbnailStartIndex)
    }

    initializeHotelImages()
  }, [])

  // Manejar errores de carga de imágenes
  const handleImageError = (hotelId: string, imageIndex: number) => {
    const errorKey = `${hotelId}-${imageIndex}`
    setImageErrors(prev => ({ ...prev, [errorKey]: true }))
  }

  // Verificar si una imagen tiene error
  const hasImageError = (hotelId: string, imageIndex: number) => {
    const errorKey = `${hotelId}-${imageIndex}`
    return imageErrors[errorKey] || false
  }

  // Navegación del carrusel principal
  const navigateCarousel = (hotelId: string, direction: "prev" | "next") => {
    const images = hotelImages[hotelId] || []
    if (images.length <= 1) return

    const currentIndex = currentImageIndex[hotelId] || 0
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    } else {
      newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
    }

    setIsTransitioning((prev) => ({ ...prev, [hotelId]: true }))

    setTimeout(() => {
      setCurrentImageIndex((prev) => ({ ...prev, [hotelId]: newIndex }))
      updateThumbnailView(hotelId, newIndex)
      setTimeout(() => {
        setIsTransitioning((prev) => ({ ...prev, [hotelId]: false }))
      }, 200)
    }, 100)
  }

  // Actualizar vista de miniaturas para mostrar la imagen actual
  const updateThumbnailView = (hotelId: string, newIndex: number) => {
    const images = hotelImages[hotelId] || []
    if (images.length <= 4) return

    const currentStart = thumbnailStartIndex[hotelId] || 0

    if (newIndex < currentStart || newIndex >= currentStart + 4) {
      let newStart = newIndex - 1
      newStart = Math.max(0, newStart)
      newStart = Math.min(newStart, images.length - 4)

      setThumbnailStartIndex((prev) => ({ ...prev, [hotelId]: newStart }))
    }
  }

  // Manejar clic en miniatura
  const handleThumbnailClick = (hotelId: string, index: number) => {
    if (currentImageIndex[hotelId] === index) return

    setIsTransitioning((prev) => ({ ...prev, [hotelId]: true }))

    setTimeout(() => {
      setCurrentImageIndex((prev) => ({ ...prev, [hotelId]: index }))
      setTimeout(() => {
        setIsTransitioning((prev) => ({ ...prev, [hotelId]: false }))
      }, 200)
    }, 100)
  }

  const handleHotelReservation = (hotel: string) => {
    const message = `Hola! Me interesa hacer una reserva en el Hotel Paraíso ${hotel}. ¿Podrían proporcionarme información sobre disponibilidad, precios y servicios?

Gracias!`

    const whatsappUrl = `https://web.whatsapp.com/send?phone=51958100066&text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank")
  }

  const openLightbox = (image: GalleryImage) => {
    setLightboxImage(image)
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  const getCurrentImage = (hotel: Hotel) => {
    const images = hotelImages[hotel.id] || []
    const currentIndex = currentImageIndex[hotel.id] || 0
    return images[currentIndex] || { src: "/placeholder.svg", alt: `Hotel ${hotel.displayName}` }
  }

  // Obtener las 4 miniaturas visibles
  const getVisibleThumbnails = (hotelId: string) => {
    const images = hotelImages[hotelId] || []
    if (images.length <= 4) return images

    const startIndex = thumbnailStartIndex[hotelId] || 0
    return images.slice(startIndex, startIndex + 4)
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
            "Un hotel dinámico y acogedor. Ubicado en el centro comercial de la ciudad, en el punto estratégico para tus viajes de negocios. Cuenta con 65 habitaciones entre individuales, matrimoniales, dobles y triples; ideales para vivir una experiencia cómoda de principio a fin.",
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
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
        .main-image-transition {
          transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }
        .main-image-transitioning {
          opacity: 0;
        }
        .thumbnail-hover {
          transition: all 0.2s ease-in-out;
        }
        .thumbnail-hover:hover:not(.ring-2) {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
      `}</style>

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
            {hotels.map((hotel) => {
              const content = getHotelContent(hotel.id)
              const currentImage = getCurrentImage(hotel)
              const images = hotelImages[hotel.id] || []
              const currentIndex = currentImageIndex[hotel.id] || 0
              const isTransitioningImage = isTransitioning[hotel.id] || false
              const visibleThumbnails = getVisibleThumbnails(hotel.id)
              const thumbnailStart = thumbnailStartIndex[hotel.id] || 0
              const showNavigation = images.length > 1

              return (
                <div
                  key={hotel.id}
                  className={`bg-white rounded-2xl shadow-lg lg:shadow-xl flex flex-col overflow-hidden ${
                    hotel.id === "trujillo" ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  {/* Imagen principal con controles */}
                  <div className="relative">
                    <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                      <div
                        className={`relative w-full h-full cursor-pointer main-image-transition ${
                          isTransitioningImage ? "main-image-transitioning" : ""
                        }`}
                        onClick={() => openLightbox(currentImage)}
                      >
                        <Image
                          src={currentImage.src || "/placeholder.svg"}
                          alt={currentImage.alt}
                          fill
                          className="object-cover"
                          quality={85}
                          priority={currentIndex === 0}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onError={() => handleImageError(hotel.id, currentIndex)}
                        />
                      </div>

                      {/* Controles del carrusel principal */}
                      {showNavigation && (
                        <>
                          {/* Botón anterior */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              navigateCarousel(hotel.id, "prev")
                            }}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-10"
                            aria-label="Imagen anterior"
                          >
                            <ChevronLeft size={20} />
                          </button>

                          {/* Botón siguiente */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              navigateCarousel(hotel.id, "next")
                            }}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-10"
                            aria-label="Imagen siguiente"
                          >
                            <ChevronRight size={20} />
                          </button>

                          {/* Contador de imágenes */}
                          <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs font-medium">
                            {currentIndex + 1} / {images.length}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Carrusel de miniaturas */}
                    {images.length > 0 && (
                      <div className="p-2 bg-white">
                        <div className="grid grid-cols-4 gap-2">
                          {visibleThumbnails.map((image, index) => {
                            const actualIndex = thumbnailStart + index
                            const hasError = hasImageError(hotel.id, actualIndex)
                            
                            return (
                              <div
                                key={actualIndex}
                                className={`relative h-14 sm:h-16 lg:h-18 overflow-hidden rounded-lg cursor-pointer thumbnail-hover ${
                                  actualIndex === currentIndex ? "ring-2 ring-[#F58718] ring-offset-2" : ""
                                }`}
                                onClick={() => handleThumbnailClick(hotel.id, actualIndex)}
                              >
                                <Image
                                  src={hasError ? "/placeholder.svg" : image.src}
                                  alt={image.alt}
                                  fill
                                  className="object-cover"
                                  quality={75}
                                  sizes="80px"
                                  onError={() => handleImageError(hotel.id, actualIndex)}
                                />
                                {/* Overlay para imagen activa */}
                                {actualIndex === currentIndex && (
                                  <div className="absolute inset-0 bg-[#F58718]/10 pointer-events-none" />
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 pt-4 lg:pt-6 flex flex-col">
                    <h3 className="text-lg sm:text-xl px-6 font-bold text-gray-800 mb-3 sm:mb-4 tracking-wide">
                      {content.title}
                    </h3>
                    <p
                      className={`text-gray-600 px-6 text-xs sm:text-sm leading-relaxed flex-1 ${
                        hotel.id === "trujillo" ? "mb-4 sm:mb-6" : "mb-4 sm:mb-6"
                      }`}
                    >
                      {content.description}
                    </p>
                    <Button
                      onClick={() => handleHotelReservation(hotel.displayName)}
                      className={`w-full ${content.buttonClass} text-white font-bold py-6 sm:py-8 px-4 sm:px-6 rounded-none text-xs sm:text-base uppercase tracking-wide`}
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

      {/* Lightbox mejorado */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
          onClick={closeLightbox}
        >
          <div className="relative max-w-5xl max-h-full animate-slideIn">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 p-2 rounded-full transition-colors duration-200"
              aria-label="Cerrar lightbox"
            >
              <X size={32} />
            </button>
            <div className="relative w-full h-full">
              <Image
                src={lightboxImage.src || "/placeholder.svg"}
                alt={lightboxImage.alt}
                width={1400}
                height={900}
                className="object-contain max-w-full max-h-[85vh] rounded-lg shadow-2xl"
                quality={90}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}