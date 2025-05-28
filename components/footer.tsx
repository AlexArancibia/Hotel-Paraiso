"use client"

import Image from "next/image"
import { Phone, Mail, Instagram, Facebook } from "lucide-react"

const quickAccessLinks = [
  { name: "Inicio", href: "#inicio" },
  { name: "Reserva", href: "#reserva" },
  { name: "¿Quiénes somos?", href: "#quienes-somos" },
  { name: "Sedes", href: "#sedes" },
  { name: "Hoteles", href: "#hoteles" },
  { name: "Servicios", href: "#servicios" },
  { name: "Galería", href: "#galeria" },
]

const contactInfo = [
  {
    icon: Phone,
    label: "Whatsapp:",
    value: "(+51) 958 100 066",
    link: "https://wa.me/51958100066",
  },
  {
    icon: Mail,
    label: "Correo:",
    value: "ventas@hotelesparaiso.com.pe",
    link: "mailto:ventas@hotelesparaiso.com.pe",
  },
  {
    icon: Instagram,
    label: "Instagram:",
    value: "@paraisohoteles",
    link: "https://instagram.com/paraisohoteles",
  },
  {
    icon: Facebook,
    label: "Facebook:",
    value: "@Paraiso Hoteles",
    link: "https://facebook.com/paraisohoteles",
  },
  {
    icon: null,
    label: "Tiktok:",
    value: "@hoteles.paraiso",
    link: "https://tiktok.com/@hoteles.paraiso",
  },
]

export default function Footer() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="relative bg-gray-50 pt-12 sm:pt-16 container-section">
      <div className="content-section">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 items-start">
          {/* Logo */}
          <div className="flex justify-center sm:justify-start lg:justify-center xl:justify-start col-span-1 sm:col-span-2 lg:col-span-1">
            <button onClick={() => handleNavClick("#inicio")} className="cursor-pointer">
              <Image
                src="/images/logofooter.png"
                alt="Paraíso Hoteles Logo"
                width={200}
                height={120}
                className="h-20 sm:h-40 w-auto"
              />
            </button>
          </div>

          {/* Acceso Rápido */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-[#F58718] mb-4 sm:mb-6 tracking-wide">ACCESO RÁPIDO</h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickAccessLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-gray-700 hover:text-[#F58718] transition-colors duration-300 font-medium cursor-pointer text-sm sm:text-base"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contáctanos */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-[#F58718] mb-4 sm:mb-6 tracking-wide">CONTÁCTANOS</h3>
            <ul className="space-y-3 sm:space-y-4">
              {contactInfo.map((contact) => {
                const IconComponent = contact.icon

                return (
                  <li key={contact.label}>
                    <a
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 text-gray-700 hover:text-[#F58718] transition-colors duration-300 group"
                    >
                      {IconComponent && (
                        <IconComponent
                          size={16}
                          className="sm:w-[18px] sm:h-[18px] text-[#F58718] group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                      {!IconComponent && contact.label === "Tiktok:" && (
                        <div className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#F58718] group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                          </svg>
                        </div>
                      )}
                      <div className="text-center sm:text-left">
                        <span className="font-medium text-gray-600 text-sm sm:text-base">{contact.label}</span>
                        <span className="ml-1 font-semibold text-sm sm:text-base">{contact.value}</span>
                      </div>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t pb-8 border-gray-300 text-center">
          <p className="text-gray-600 text-xs sm:text-sm">© 2024 Hoteles Paraíso. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
