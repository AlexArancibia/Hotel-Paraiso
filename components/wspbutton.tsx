"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function WhatsAppButton() {
  const phoneNumber = "51958100066"

  const defaultMessage = `Hola! Me interesa conocer más sobre los servicios de Hotel Paraiso. ¿Podrían brindarme más información?`
  const whatsappMessage = encodeURIComponent(defaultMessage)

  const whatsappUrlMobile = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`
  const whatsappUrlDesktop = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${whatsappMessage}`

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Enlace para escritorio */}
      <a
        href={whatsappUrlDesktop}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden lg:block bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors duration-300 group"
        aria-label="WhatsApp Desktop"
      >
        <Image
          src="/wsp.png"
          alt="WhatsApp"
          width={40}
          height={40}
          className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12"
          priority
        />
      </a>

      {/* Enlace para móviles */}
      <a
        href={whatsappUrlMobile}
        target="_blank"
        rel="noopener noreferrer"
        className="block lg:hidden bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors duration-300 group"
        aria-label="WhatsApp Mobile"
      >
        <Image
          src="/wsp.png"
          alt="WhatsApp"
          width={40}
          height={40}
          className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12"
          priority
        />
      </a>
    </motion.div>
  )
}
