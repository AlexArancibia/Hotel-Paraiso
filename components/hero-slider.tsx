"use client"
import { useState, useEffect, useCallback } from "react"
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

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Precargar todas las imágenes
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = slides.map((slide) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image()
          img.onload = resolve
          img.onerror = reject
          img.src = slide.image
        })
      })
      
      try {
        await Promise.all(imagePromises)
        setIsLoaded(true)
      } catch (error) {
        console.error('Error precargando imágenes:', error)
        setIsLoaded(true) // Mostrar de todas formas
      }
    }

    preloadImages()
  }, [])

  // Memoizar el cambio de slide para evitar re-renders innecesarios
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  useEffect(() => {
    if (!isLoaded) return // No iniciar timer hasta que las imágenes estén cargadas
    
    const timer = setInterval(nextSlide, 7000)
    return () => clearInterval(timer)
  }, [isLoaded, nextSlide])

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Placeholder mientras cargan las imágenes */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-500">Cargando...</div>
        </div>
      )}

      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentSlide === index ? 1 : 0,
            scale: currentSlide === index ? 1 : 1.1 
          }}
          transition={{ 
            duration: 1.5, 
            ease: "easeInOut",
            scale: { duration: 7 }
          }}
          style={{ zIndex: currentSlide === index ? 1 : 0 }}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0} // Prioridad solo para la primera imagen
            quality={85} // Reducir calidad ligeramente para mejor rendimiento
            sizes="100vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            onLoad={() => {
              if (index === 0) setIsLoaded(true)
            }}
          />
        </motion.div>
      ))}

      {/* Centered Logo */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={200}
            height={100}
            priority
            className="filter drop-shadow-lg"
          />
        </motion.div>
      </div>

      {/* Indicadores opcionales */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}