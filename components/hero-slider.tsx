"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const slides = [
  {
    id: 1,
    image: "/images/banner1.png",
    alt: "Complejo residencial",
  },
  {
    id: 2,
    image: "/images/banner2.png",
    alt: "Habitación de hotel",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 7000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[400px] md:h-[650px]">
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          initial={false}
          animate={{
            opacity: index === currentSlide ? 1 : 0,
          }}
          transition={{
            duration: 2.5,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="absolute inset-0 overflow-hidden"
          style={{ zIndex: index === currentSlide ? 2 : 1 }}
        >
          <motion.div
            initial={false}
            animate={{
              scale: index === currentSlide ? 1.15 : 1.05,
            }}
            transition={{
              duration: 7,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="w-full h-full"
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      ))}

      {/* Centered Logo */}
      <div className="absolute inset-0  flex items-center justify-center z-30 px-4">
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            duration: 1.5,
            delay: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.5, ease: "easeOut" },
          }}
          className="text-center"
        >
          <Image
            src="/images/logo.png"
            alt="Paraíso Hotel Logo"
            width={300}
            height={150}
            className="h-24 sm:h-28 md:h-32 lg:h-36 xl:h-44 w-auto drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </div>
  )
}
