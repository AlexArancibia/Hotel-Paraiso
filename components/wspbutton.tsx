"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function WhatsAppButton() {
  // Número de teléfono fijo
  const phoneNumber = "51958100066"

  // Mensaje predeterminado para Hotel Paraiso
  const defaultMessage = `Hola! Me interesa conocer más sobre los servicios de Hotel Paraiso. ¿Podrían brindarme más información?`
  const whatsappMessage = encodeURIComponent(defaultMessage)

  // Construir URL de WhatsApp con mensaje personalizado
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors duration-300 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Contáctanos por WhatsApp - Hotel Paraiso"
    >
      <Image
        src="/wsp.png"
        alt="Logo WhatsApp"
        width={40}
        height={40}
        className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12"
        priority
      />

      <span className="sr-only">Contáctanos por WhatsApp - Hotel Paraiso</span>

      {/* Efecto de pulso animado */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Chatea con nosotros
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </div>
    </motion.a>
  )
}
