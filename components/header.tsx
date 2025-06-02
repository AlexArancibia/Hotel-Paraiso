"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Inicio", href: "#inicio" },
  { name: "Reserva", href: "#reserva" },
  { name: "¿Quiénes somos?", href: "#quienes-somos" },
  { name: "Sedes", href: "#sedes" },
  { name: "Hoteles", href: "#hoteles" },
  { name: "Servicios", href: "#servicios" },
  { name: "Galería", href: "#galeria" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 700)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? "bg-white shadow-lg py-2" : "bg-black/15 backdrop-blur-md py-3"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, opacity: 0, y: -30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-shrink-0"
          >
            <button onClick={() => handleNavClick("#inicio")} className="cursor-pointer" aria-label="Ir al inicio">
              <Image
                src="/logosolo.png"
                alt="Hoteles Paraíso - Logo"
                width={100}
                height={50}
                className={`w-auto transition-all duration-500 ${
                  isScrolled ? "brightness-0 h-6 sm:h-8" : "brightness-100 h-8 sm:h-10"
                }`}
                priority
              />
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6" role="navigation">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{
                  y: -2,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className={`transition-all duration-500 font-medium text-xs xl:text-sm tracking-wide cursor-pointer ${
                  isScrolled ? "text-gray-800 hover:text-orange-500" : "text-white hover:text-yellow-400"
                }`}
                aria-label={`Ir a ${item.name}`}
              >
                {item.name}
              </motion.button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-1.5 rounded-lg transition-all duration-500 ${
              isScrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/10"
            }`}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformOrigin: "top" }}
              className={`lg:hidden mt-4 rounded-xl overflow-hidden transition-all duration-300 ${
                isScrolled ? "bg-gray-50 shadow-lg" : "bg-black/30 backdrop-blur-md"
              }`}
              role="navigation"
            >
              <div className="py-3">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.05,
                      ease: "easeOut",
                    }}
                    className={`block w-full text-left px-5 py-3 transition-all duration-200 font-medium text-sm hover:bg-opacity-10 ${
                      isScrolled
                        ? "text-gray-800 hover:text-orange-500 hover:bg-orange-500"
                        : "text-white hover:text-yellow-400 hover:bg-white"
                    }`}
                    aria-label={`Ir a ${item.name}`}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
