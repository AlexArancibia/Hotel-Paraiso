"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import AboutSection from "@/components/about-section"
import Footer from "@/components/footer"
import Header from "@/components/header"
import HeroSlider from "@/components/hero-slider"
import HotelsMapSection from "@/components/hotels-map-section"
import HotelsShowcaseSection from "@/components/hotels-showcase-section"
import { InstagramPosts } from "@/components/instagram-section"
import ReservationForm from "@/components/reservation-form"
import ServiceBanner from "@/components/service-banner"
import ServicesSection from "@/components/service-section"
import { WhatsAppButton } from "@/components/wspbutton"

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Contenido principal del sitio
  const MainContent = () => (
    <div className="relative w-full">
      <Header />
      <section id="inicio">
        <HeroSlider />
      </section>
      <section id="reserva">
        <ReservationForm />
      </section>
      <section id="quienes-somos">
        <AboutSection />
      </section>
      <section id="sedes">
        <HotelsMapSection />
      </section>
      <section id="hoteles">
        <HotelsShowcaseSection />
      </section>
      <section id="servicios">
        <ServicesSection />
      </section>
      <section id="instagram">
        <InstagramPosts />
      </section>
      <ServiceBanner />
      <Footer />
      <WhatsAppButton />
    </div>
  )

  // Pantalla de carga
  const LoadingScreen = () => (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-orange-50 z-50">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative"
        >
          {/* Efecto de resplandor */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-[#F58718]/20 rounded-full blur-lg"
          />
          
          <Image
            src="/images/logofooter.png"
            alt="Hotel Paraíso Logo"
            width={180}
            height={120}
            className="object-contain relative z-10"
            priority
            unoptimized
          />
        </motion.div>

        {/* Barra de progreso */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-8 w-64 h-2 bg-gray-200/50 rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              delay: 0.1,
            }}
            className="h-full bg-gradient-to-r from-[#F58718] to-[#FF8C42] rounded-full"
          />
        </motion.div>

        {/* Texto de carga */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="mt-4 text-gray-600 text-sm font-medium"
        >
          Cargando experiencia...
        </motion.p>
      </div>
    </div>
  )

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.3, ease: "easeInOut" }
            }}
          >
            <LoadingScreen />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.4, 
              ease: "easeInOut",
              delay: 0.1 
            }}
          >
            <MainContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}