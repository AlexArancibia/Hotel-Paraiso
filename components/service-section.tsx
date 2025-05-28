"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const services = [
  { name: "Desayuno Buffet", image: "/images/DESAYUNO 1.png" },
  { name: "Aire Acondicionado", image: "/images/AIRE 1.png" },
  { name: "Piscina", image: "/images/PISCINA 1.png" },
  { name: "Wifi Gratuito", image: "/images/WiFi 1.png" },
  { name: "Garaje", image: "/images/GARAJE 1.png" },
  { name: "Custodia de Equipaje", image: "/images/OFICINA 1.png" },
  { name: "Cajas de Seguridad", image: "/images/SEGURIDAD 1.png" },
  { name: "Lavandería", image: "/images/LAVANDERIA 1.png" },
  { name: "Auditorio", image: "/images/auditorio 1.png" },
  { name: "Directorio", image: "/images/VIAJES 1.png" },
  { name: "Restaurante", image: "/images/BUFFET 1.png" },
  { name: "Cafetería 24/7", image: "/images/CAFE 1.png" },
]

export default function ServicesSection() {
  const [isMobile, setIsMobile] = useState(false)

  // Detectar si es móvil para aplicar el patrón de ajedrez adecuado
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640) // 640px es el breakpoint sm de Tailwind
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return (
    <section className="relative bg-white py-16 sm:py-20 container-section">
      <div className="content-section">
        {/* Título principal */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-4 tracking-tight">
            NUESTROS <span className="text-[#F58718]">SERVICIOS</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium">
            Todo lo necesario para disfrutar al máximo tu estadía
          </p>
        </div>

        {/* Grid de servicios en patrón de ajedrez */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {services.map((service, index) => {
            // Lógica para móvil: 2 columnas (patrón de ajedrez real)
            // Lógica para desktop: 4 columnas (mantener patrón original)
            let isOrange

            if (isMobile) {
              // En móvil: patrón de ajedrez con 2 columnas
              const row = Math.floor(index / 2) // 2 columnas en móvil
              const col = index % 2
              isOrange = (row + col) % 2 === 0
            } else {
              // En desktop: mantener el patrón original
              const row = Math.floor(index / 4)
              const col = index % 4
              isOrange = (row + col) % 2 === 0
            }

            return (
              <div
                key={service.name}
                className={`
                  relative aspect-square flex flex-col items-center justify-center p-3 sm:p-4 lg:p-6 
                  transition-all duration-300 group
                  ${
                    isOrange
                      ? "bg-[#F58718] text-white hover:bg-[#E07612]"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }
                `}
              >
                {/* Imagen del servicio */}
                <div
                  className={`
                  flex items-center justify-center mb-2 sm:mb-3 lg:mb-4
                  transition-all duration-300 group-hover:scale-110 relative overflow-hidden
                `}
                >
                  <div className="relative w-24 h-24 sm:w-24 sm:h-24 lg:w-48 lg:h-48">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      fill
                      className={`object-contain transition-transform duration-300 group-hover:scale-110 ${
                        isOrange ? "brightness-0 invert" : "brightness-0"
                      }`}
                    />
                  </div>
                </div>

                {/* Nombre del servicio */}
                <h3
                  className={`
                  text-xs sm:text-sm font-bold text-center leading-tight tracking-wide
                  transition-all duration-300
                  ${isOrange ? "text-white" : "text-gray-800"}
                `}
                >
                  {service.name}
                </h3>

                {/* Efecto hover overlay */}
                <div
                  className={`
                  absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300
                  ${isOrange ? "bg-white" : "bg-[#F58718]"}
                `}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
