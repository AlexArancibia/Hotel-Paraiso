"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const slides = [
  {
    id: 1,
    image: "/images/banner1.jpg",
    alt: "Complejo residencial",
  },
  {
    id: 2,
    image: "/images/banner2.jpg",
    alt: "Habitación de hotel",
  },
]

// Precargar la siguiente imagen
const preloadNextImage = (nextIndex: number) => {
  if (typeof window !== "undefined" && slides[nextIndex]) {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = slides[nextIndex].image
    document.head.appendChild(link)
  }
}

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set([0])) // Precargar primera imagen

  // Memoizar el siguiente slide para evitar cálculos repetidos
  const nextSlide = useMemo(() => (currentSlide + 1) % slides.length, [currentSlide])

  // Función memoizada para cambiar slide
  const changeSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const next = (prev + 1) % slides.length
      // Precargar la siguiente imagen
      const nextNext = (next + 1) % slides.length
      preloadNextImage(nextNext)
      return next
    })
  }, [])

  useEffect(() => {
    // Precargar la segunda imagen inmediatamente
    preloadNextImage(1)

    const timer = setInterval(changeSlide, 7000)
    return () => clearInterval(timer)
  }, [changeSlide])

  // Manejar carga de imágenes
  const handleImageLoad = useCallback((index: number) => {
    setImagesLoaded((prev) => new Set([...prev, index]))
  }, [])

  // Variantes de animación memoizadas
  const slideVariants = useMemo(
    () => ({
      visible: {
        opacity: 1,
        transition: {
          duration: 2.5,
          ease: [0.4, 0, 0.2, 1],
        },
      },
      hidden: {
        opacity: 0,
        transition: {
          duration: 2.5,
          ease: [0.4, 0, 0.2, 1],
        },
      },
    }),
    [],
  )

  const scaleVariants = useMemo(
    () => ({
      active: {
        scale: 1.15,
        transition: {
          duration: 7,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
      inactive: {
        scale: 1.05,
        transition: {
          duration: 7,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    }),
    [],
  )

  const logoVariants = useMemo(
    () => ({
      initial: { scale: 0, opacity: 0, y: 50 },
      animate: {
        scale: 1,
        opacity: 1,
        y: 0,
        transition: {
          duration: 1.5,
          delay: 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
      hover: {
        scale: 1.05,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    }),
    [],
  )

  return (
    <div className="relative h-[400px] md:h-[650px] overflow-hidden">
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          variants={slideVariants}
          initial="hidden"
          animate={index === currentSlide ? "visible" : "hidden"}
          className="absolute inset-0"
          style={{
            zIndex: index === currentSlide ? 2 : 1,
            willChange: "opacity", // Optimización CSS
          }}
        >
          <motion.div
            variants={scaleVariants}
            initial="inactive"
            animate={index === currentSlide ? "active" : "inactive"}
            className="w-full h-full"
            style={{ willChange: "transform" }} // Optimización CSS
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0} // Solo la primera imagen tiene prioridad
              loading={index === 0 ? "eager" : "lazy"}
              quality={85} // Reducir calidad ligeramente para mejor rendimiento
              sizes="100vw" // Optimización de responsive images
              onLoad={() => handleImageLoad(index)}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </motion.div>
          {/* Overlay optimizado */}
          <div
            className="absolute inset-0 bg-black/20"
            style={{ pointerEvents: "none" }} // Evitar interferencia con eventos
          />
        </motion.div>
      ))}

      {/* Logo centrado */}
      <div className="absolute inset-0 flex items-center justify-center z-30 px-4">
        <motion.div
          variants={logoVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="text-center"
        >
          <Image
            src="/images/logo.png"
            alt="Paraíso Hotel Logo"
            width={300}
            height={150}
            className="h-24 sm:h-28 md:h-32 lg:h-36 xl:h-44 w-auto drop-shadow-2xl"
            priority
            quality={90}
            sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, (max-width: 1024px) 300px, 350px"
          />
        </motion.div>
      </div>

      {/* Indicadores de slide (opcional) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
