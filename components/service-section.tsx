"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const services = [
  {
    name: "Desayuno Buffet",
    image: "/images/DESAYUNO 1.png",
    description: "¡Despierta con ánimo! Te espera un delicioso desayuno buffet.",
  },
  {
    name: "Aire Acondicionado",
    image: "/images/AIRE 1.png",
    description: "El clima perfecto, todo el día. Relájate y descansa con la temperatura ideal en tu habitación.",
  },
  {
    name: "Piscina",
    image: "/images/PISCINA 1.png",
    description: "Un espacio diseñado para relajarte. Disfrutar del sol. Disponible solo en nuestra sede de Trujillo.",
  },
  {
    name: "Wifi Gratuito",
    image: "/images/wifi.png",
    description: "Resuelve todos los pendientes con nuestro servicio de Wifi en todo el hotel.",
  },
  {
    name: "Garaje",
    image: "/images/GARAJE 1.png",
    description: "El espacio para tu auto que garantiza tu comodidad, dentro del hotel y directo a tu habitación.",
  },
  {
    name: "Custodia de Equipaje",
    image: "/images/VIAJES 1.png",
    description: "Disfruta tu estadía hasta el último minuto, sin cargar tus maletas.",
  },
  {
    name: "Cajas de Seguridad",
    image: "/images/SEGURIDAD 1.png",
    description: "Tus pertenencias, siempre protegidas. Disponible dentro de tu habitación para tu total tranquilidad.",
  },
  {
    name: "Lavandería",
    image: "/images/LAVANDERIA 1.png",
    description: "Las camisas arrugadas aquí no son un problema. Llega impecable a todas tus reuniones.",
  },
  {
    name: "Auditorio",
    image: "/images/auditorio 1.png",
    description: "Todos los servicios en un solo lugar, para el evento que necesitas.",
  },
  {
    name: "Directorio",
    image: "/images/OFICINA 1.png",
    description:
      "Una sala diseñada para tus reuniones más privadas. Ideal para encuentros ejecutivos o trabajos en equipo sin distracciones.",
  },
  {
    name: "Restaurante",
    image: "/images/BUFFET 1.png",
    description:
      "Un espacio reservado para tus sentidos, que te ofrece una variedad de platos a la carta. Disfrútalos en tu propio espacio, sin salir de tu habitación y sin ningún recargo.",
  },
  {
    name: "Cafetería 24/7",
    image: "/images/CAFE 1.png",
    description:
      "Para que nunca vayas a la cama con hambre. Disponible las 24 horas del día y los 7 días de la semana.",
  },
]

export default function ServicesSection() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeService, setActiveService] = useState<number | null>(null)

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

  const handleServiceClick = (index: number) => {
    if (isMobile) {
      setActiveService(activeService === index ? null : index)
    }
  }

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

            const isActive = isMobile && activeService === index
            const shouldShowOverlay = isMobile ? isActive : false

            return (
              <div
                key={service.name}
                className={`aspect-square group cursor-pointer relative overflow-hidden ${
                  isMobile ? "touch-manipulation" : ""
                }`}
                onClick={() => handleServiceClick(index)}
              >
                {/* Contenido principal */}
                <div
                  className={`
                    w-full h-full flex flex-col items-center justify-center p-3 sm:p-4 lg:p-6 
                    transition-all duration-300 relative
                    ${isMobile ? (isActive ? "blur-sm" : "") : "group-hover:blur-sm"}
                    ${
                      isOrange
                        ? "bg-[#F58718] text-white hover:bg-[#E07612]"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }
                  `}
                >
                  {/* Imagen del servicio */}
                  <div className="flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 transition-all duration-300 relative overflow-hidden">
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.name}
                        fill
                        className={`object-contain transition-transform duration-300 ${
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
                </div>

                {/* Overlay con descripción */}
                <div
                  className={`
                    absolute inset-0 flex flex-col items-center justify-center p-3 sm:p-4 lg:p-6
                    transition-all duration-300 backdrop-blur-md
                    ${
                      isMobile
                        ? isActive
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                        : "opacity-0 group-hover:opacity-100"
                    }
                    ${isOrange ? "bg-[#E07612]/80" : "bg-gray-800/80"}
                  `}
                >
                  {/* Título del servicio en overlay */}
                  <h3 className="text-xs sm:text-sm font-bold text-center mb-2 sm:mb-3 text-white">{service.name}</h3>

                  {/* Descripción */}
                  <p className="text-xs sm:text-xs lg:text-sm text-center leading-tight text-white">
                    {service.description}
                  </p>

                  {/* Indicador de cierre para móvil */}
                  {isMobile && isActive && (
                    <div className="absolute top-2 right-2 text-white text-lg font-bold opacity-70">×</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
