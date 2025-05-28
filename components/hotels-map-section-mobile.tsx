"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function HotelsMapSectionMobile() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  const locations = [
    {
      id: "piura",
      name: "Piura",
      description: "Hotel moderno en el corazón de Piura",
      rooms: "57 habitaciones",
      details:
        "Un hotel nuevo, moderno y acogedor. Vive una experiencia de descanso con calidez y bienestar, a solo dos minutos de la Plaza de Armas de Piura.",
      googleMapsUrl:
        "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3973.4263279797874!2d-80.62737652501747!3d-5.195480794782069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNcKwMTEnNDMuNyJTIDgwwrAzNycyOS4zIlc!5e0!3m2!1ses!2spe!4v1748422930663!5m2!1ses!2spe",
      departmentImage: "/images/piura.png",
    },
    {
      id: "chiclayo",
      name: "Chiclayo",
      description: "En el centro histórico de Chiclayo",
      rooms: "65 habitaciones",
      details:
        "Ubicado en el corazón de Chiclayo, en el centro comercial de la ciudad, en el punto estratégico para tus viajes de negocios.",
      googleMapsUrl:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3962.0130560174416!2d-79.83734893798828!3d-6.768261432647705!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904ceed6fa13126d%3A0x426f87f31651e8a!2sHoteles%20Para%C3%ADso%20Chiclayo!5e0!3m2!1ses!2spe",
      departmentImage: "/images/lambayeque.png",
    },
    {
      id: "trujillo",
      name: "Trujillo",
      description: "A 6 minutos de la Plaza de Armas",
      rooms: "52 habitaciones",
      details:
        "Ubicado en el corazón de la ciudad, a solo 06 minutos de la Plaza de Armas de Trujillo. Un hotel con mucho encanto, moderno, cálido y acogedor.",
      googleMapsUrl:
        "https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d3949.890800699797!2d-79.03153228759766!3d-8.112600326538086!3m2!1i1024!2i768!4f13.1!2m1!1sHotel%20Paraiso!5e0!3m2!1ses!2spe",
      departmentImage: "/images/la-libertad.png",
    },
  ]

  const toggleLocation = (locationId: string) => {
    setSelectedLocation(selectedLocation === locationId ? null : locationId)
  }

  return (
    <section
      className="relative py-8 sm:py-20 bg-[#EDEDED] bg-[url(/images/mapa-fondo.png)] bg-center bg-no-repeat"
      style={{
        backgroundSize: "auto 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Información por defecto */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-transparent  rounded-2xl p-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-8 h-8 text-[#F58718]" />
              </div>
              <div>
                <h3 className="text-2xl lg:text-4xl font-bold text-gray-700 mb-1">NUESTROS</h3>
                <h3 className="text-2xl lg:text-4xl font-extrabold text-[#F58718]">HOTELES</h3>
              </div>
            </div>
            <p className="text-gray-800 leading-relaxed text-base ">
              Estamos presentes en <span className="font-semibold text-orange-500">Chiclayo, Trujillo y Piura</span>.
              Nuestros hoteles son reconocidos por su céntrica ubicación, cómodas instalaciones y sobre todo, por la
              calidad y compromiso de nuestro personal.
            </p>
          </motion.div>
        </div>

        {/* Lista de ubicaciones */}
        <div className="space-y-4">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden"
              style={{
                filter:
                  selectedLocation === location.id
                    ? "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))"
                    : "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))",
              }}
            >
              {/* Header clickeable */}
              <button
                onClick={() => toggleLocation(location.id)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-orange-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center">
                    <Image
                      src="/images/map-pin-icon.png"
                      alt="Map pin icon"
                      width={24}
                      height={28}
                      className="w-6 h-7 object-contain"
                      style={{
                        imageRendering: "crisp-edges",
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">Hotel Paraíso {location.name}</h4>
                    <p className="text-orange-500 text-sm font-medium">{location.rooms}</p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: selectedLocation === location.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                </motion.div>
              </button>

              {/* Contenido expandible */}
              <AnimatePresence>
                {selectedLocation === location.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      {/* Header del hotel expandido */}
                      <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="bg-[#F58718]/90 backdrop-blur-sm text-white p-4 rounded-lg mb-4 -mx-2"
                      >
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5" />
                          <div>
                            <h5 className="text-lg font-bold">Hotel Paraíso {location.name}</h5>
                            <p className="text-orange-100 text-sm">{location.rooms}</p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Descripción */}
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="text-gray-800 mb-4 leading-relaxed  "
                      >
                        {location.details}
                      </motion.p>

                      {/* Imagen del departamento */}
                      <motion.div
                        initial={{ y: 20, opacity: 0, scale: 0.8 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="mb-4 flex justify-center"
              
                      >
                        <div className="relative w-32 h-32">
                          <Image
                            src={location.departmentImage || "/placeholder.svg"}
                            alt={`Departamento de ${location.name}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </motion.div>

                      {/* Google Maps */}
                      <motion.div
                        initial={{ y: 20, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="rounded-lg overflow-hidden"
                        style={{
                          height: "200px",
                        }}
                      >
                        <iframe
                          src={location.googleMapsUrl}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={`Mapa de ${location.name}`}
                        ></iframe>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
