"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function HotelsMapSection() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isInteracting, setIsInteracting] = useState(false)

  const locations = [
    {
      id: "piura",
      name: "Piura",
      position: { top: "35%", left: "25%" },
      description: "Hotel moderno en el corazón de Piura",
      rooms: "57 habitaciones",
      details:
        "Nos encontramos en la esquina de Malecón Eguiguren con Jr. Callao, a solo tres cuadras de la Plaza de Armas de Piura. Una zona céntrica y segura, ideal para tu estadía por negocios o descanso.",
      googleMapsUrl:
        "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3973.4263279797874!2d-80.62737652501747!3d-5.195480794782069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNcKwMTEnNDMuNyJTIDgwwrAzNycyOS4zIlc!5e0!3m2!1ses!2spe",
      departmentImage: "/images/piura.png",
      departmentPosition: { top: "25.1%", left: "14.4%" },
      size: { width: "140px", height: "128px" },
    },
    {
      id: "chiclayo",
      name: "Chiclayo",
      position: { top: "33%", left: "18%" },
      description: "En el centro histórico de Chiclayo",
      rooms: "65 habitaciones",
      details:
        "Nos ubicamos en Av. Pedro Ruiz 1064, una zona estratégica en el centro comercial de la ciudad. Disfruta de una estadía cómoda con todo cerca: entidades financieras, comercios y restaurantes.",
      googleMapsUrl:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3962.0130560174416!2d-79.83734893798828!3d-6.768261432647705!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904ceed6fa13126d%3A0x426f87f31651e8a!2sHoteles%20Para%C3%ADso%20Chiclayo!5e0!3m2!1ses!2spe",
      departmentImage: "/images/lambayeque.png",
      departmentPosition: { top: "29%", left: "10%" },
      size: { width: "85px", height: "85px" },
    },
    {
      id: "trujillo",
      name: "Trujillo",
      position: { top: "43%", left: "27%" },
      description: "A 6 minutos de la Plaza de Armas",
      rooms: "52 habitaciones",
      details:
        "Estamos en Jr. San Martín 240, al frente del Club Libertad y a solo 6 minutos de la Plaza de Armas de Trujillo. Una ubicación ideal para disfrutar la ciudad, con fácil acceso a su centro histórico, zonas comerciales y culturales.",
      googleMapsUrl:
        "https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d3949.890800699797!2d-79.03153228759766!3d-8.112600326538086!3m2!1i1024!2i768!4f13.1!2m1!1sHotel%20Paraiso!5e0!3m2!1ses!2spe",
      departmentImage: "/images/la-libertad.png",
      departmentPosition: { top: "35.3%", left: "18.1%" },
      size: { width: "124px", height: "117px" },
    },
  ]

  const selectedLocationData = locations.find((loc) => loc.id === selectedLocation)

  // Detectar si es móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Efecto para manejar el reseteo automático después de 5 segundos de inactividad
  useEffect(() => {
    if (selectedLocation && !isInteracting && !isMobile) {
      // Limpiar cualquier timeout existente
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }

      // Configurar un nuevo timeout para resetear después de 5 segundos
      resetTimeoutRef.current = setTimeout(() => {
        setSelectedLocation(null)
      }, 5000)
    }

    return () => {
      // Limpiar el timeout cuando cambie el estado o se desmonte el componente
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [selectedLocation, isInteracting, isMobile])

  const handleMouseEnter = (locationId: string) => {
    if (isMobile) return // Deshabilitar hover en móvil

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }

    setSelectedLocation(locationId)
    setIsInteracting(true)

    // Limpiar cualquier timeout de reseteo existente
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current)
    }
  }

  const handleMouseLeave = () => {
    if (isMobile) return // Deshabilitar hover en móvil
    setIsInteracting(false)
  }

  const handleClick = (locationId: string) => {
    if (!isMobile) return // Solo funcionar en móvil

    setSelectedLocation(selectedLocation === locationId ? null : locationId)
  }

  // Función para manejar cuando el mouse está sobre el card de información
  const handleCardMouseEnter = () => {
    if (isMobile) return
    setIsInteracting(true)

    // Limpiar cualquier timeout de reseteo existente
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current)
    }
  }

  // Función para manejar cuando el mouse sale del card de información
  const handleCardMouseLeave = () => {
    if (isMobile) return
    setIsInteracting(false)
  }

  // Versión móvil
  if (isMobile) {
    return (
      <section className="relative bg-[#EDEDED] py-16 px-4">
        <div className="max-w-md mx-auto">
          {/* Título */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <MapPin className="w-8 h-8 text-[#F58718]" />
              <div>
                <h3 className="text-2xl font-bold text-gray-700">NUESTROS</h3>
                <h3 className="text-3xl font-extrabold text-[#F58718]">HOTELES</h3>
              </div>
            </div>
            <p className="text-gray-800 text-sm leading-relaxed">
              Estamos en las ciudades de{" "}
              <span className="font-semibold text-[#F58718]">Chiclayo, Trujillo y Piura</span>, conectando nuestros
              servicios con lo mejor del norte del país.
            </p>
          </div>

          {/* Mapa móvil */}
          <div className="relative mb-8">
            <div className="relative w-full h-[450px] rounded-2xl overflow-hidden">
              <Image
                src="/images/mapa-isolated.png"
                alt="Mapa del Perú"
                fill
                className="object-contain"
                style={{
                  objectPosition: "center",
                  maxHeight: "100%",
                  maxWidth: "100%",
                }}
              />

              {/* Pins interactivos para móvil */}
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="absolute cursor-pointer"
                  style={{
                    top: location.position.top,
                    left: location.position.left,
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                  onClick={() => handleClick(location.id)}
                >
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      scale: selectedLocation === location.id ? 1.2 : 1,
                      filter:
                        selectedLocation === location.id
                          ? "drop-shadow(0 0 12px rgba(249, 115, 22, 0.7))"
                          : "drop-shadow(0 3px 8px rgba(0, 0, 0, 0.25))",
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="transition-all duration-300 ease-out flex items-center justify-center"
                  >
                    <Image
                      src="/images/mappin.png"
                      alt="Map pin icon"
                      width={40}
                      height={48}
                      className="w-8 h-10 object-contain"
                    />
                  </motion.div>
                </div>
              ))}

              {/* Imágenes de departamentos para móvil */}
              <AnimatePresence>
                {locations.map((location) => (
                  <motion.div
                    key={`dept-${location.id}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: selectedLocation === location.id ? 1 : 0,
                      scale: selectedLocation === location.id ? 1 : 0.8,
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute pointer-events-none"
                    style={{
                      top: location.departmentPosition.top,
                      left: location.departmentPosition.left,
                      transform: "translate(-50%, -50%)",
                      width: `calc(${location.size.width} * 0.5)`,
                      height: `calc(${location.size.height} * 0.5)`,
                      zIndex: selectedLocation === location.id ? 5 : 1,
                    }}
                  >
                    <Image
                      src={location.departmentImage || "/placeholder.svg"}
                      alt={`Departamento de ${location.name}`}
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Cards de información móvil */}
          <div className="space-y-4">
            {locations.map((location) => (
              <motion.div
                key={location.id}
                layout
                className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                  selectedLocation === location.id ? "bg-white shadow-lg" : "bg-gray-100"
                }`}
                onClick={() => handleClick(location.id)}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-[#F58718]" />
                      <div>
                        <h4 className="font-bold text-gray-800">Hotel Paraíso {location.name}</h4>
                        <p className="text-sm text-gray-600">{location.rooms}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: selectedLocation === location.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[#F58718]"
                    >
                      ▼
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {selectedLocation === location.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-gray-200 mt-4">
                          <p className="text-gray-700 text-sm mb-4 leading-relaxed">{location.details}</p>
                          <div className="rounded-lg overflow-hidden h-48">
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
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Versión desktop (exactamente igual que el original)
  return (
    <section
      className="relative bg-[#EDEDED] bg-[url(/images/mapa-fondo.png)] bg-right bg-no-repeat min-h-[800px] pt-4 overflow-hidden"
      style={{
        backgroundSize: "auto 100%",
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Contenedor del contenido */}
      <div className="content-section mx-auto relative z-10 h-full">
        <div className="relative min-h-[800px] flex items-center">
          {/* Card de información - Lado izquierdo */}
          <div className="max-w-2xl pr-8 z-30" onMouseEnter={handleCardMouseEnter} onMouseLeave={handleCardMouseLeave}>
            <motion.div layout className="rounded-2xl overflow-hidden" style={{ height: "500px" }}>
              <AnimatePresence mode="wait">
                {!selectedLocation ? (
                  // Estado por defecto
                  <motion.div
                    key="default"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      opacity: { duration: 0.4 },
                    }}
                    className="p-8 h-full flex flex-col justify-center bg-transparent"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="flex items-center space-x-4 mb-6"
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-20 h-20 text-[#F58718]" />
                      </div>
                      <div>
                        <h3 className="text-4xl font-bold text-gray-700 mb-1">
                          NUESTROS
                          <br />
                        </h3>
                        <h3 className="text-5xl font-extrabold text-[#F58718]">HOTELES</h3>
                      </div>
                    </motion.div>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="text-gray-800 leading-relaxed text-xl drop-shadow-lg w-[400px] xl:w-[600px]"
                    >
                      Estamos en las ciudades de{" "}
                      <span className="font-semibold text-[#F58718]">Chiclayo, Trujillo y Piura</span>, conectando
                      nuestros servicios con lo mejor del norte del país. Nuestros hoteles son reconocidos por su
                      ubicación estratégica cerca de los principales atractivos y centros empresariales, instalaciones
                      cómodas y funcionales, y, sobre todo, por la calidez y compromiso de nuestro equipo en cada
                      ciudad.
                    </motion.p>
                  </motion.div>
                ) : (
                  // Estado con hotel seleccionado
                  <motion.div
                    key={selectedLocation}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      opacity: { duration: 0.4 },
                    }}
                    className="h-full bg-transparent w-[400px] xl:w-[600px] px-6"
                  >
                    {/* Header del hotel */}
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="bg-[#F58718]/90 backdrop-blur-sm text-white p-6 rounded-2xl"
                    >
                      <div className="flex items-center space-x-3">
                        <motion.div
                          initial={{ rotate: -90, scale: 0 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{ delay: 0.2, duration: 0.3 }}
                        >
                          <MapPin className="w-6 h-6" />
                        </motion.div>
                        <div>
                          <motion.h3
                            initial={{ x: -15, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                            className="text-2xl font-bold"
                          >
                            Hotel Paraíso {selectedLocationData?.name}
                          </motion.h3>
                          <motion.p
                            initial={{ x: -15, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.25, duration: 0.3 }}
                            className="text-orange-100 text-base"
                          >
                            {selectedLocationData?.rooms}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Contenido del hotel */}
                    <div className="p-6 flex flex-col h-full">
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="text-gray-800 mb-6 leading-relaxed flex-shrink-0 drop-shadow-lg text-lg"
                      >
                        {selectedLocationData?.details}
                      </motion.p>

                      {/* Google Maps */}
                      <motion.div
                        initial={{ y: 30, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="rounded-lg overflow-hidden flex-1 min-h-0"
                        style={{ minHeight: "200px" }}
                      >
                        <iframe
                          src={selectedLocationData?.googleMapsUrl}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={`Mapa de ${selectedLocationData?.name}`}
                        ></iframe>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mapa interactivo - Posicionado respecto al section principal */}
      <div
        className="absolute top-1/2 transform -translate-y-1/2 z-20"
        style={{
          right: "186px", // Distancia fija desde la derecha del section
          width: "605px", // Ancho fijo
          height: "771px", // Alto fijo
        }}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          {/* Imagen del mapa base con dimensiones fijas */}
          <div className="relative w-full h-full">
            <Image
              src="/images/mapa-isolated.png"
              alt="Mapa del Perú"
              width={605}
              height={771}
              className="object-contain w-full h-full"
              style={{
                objectPosition: "center",
                maxWidth: "605px",
                maxHeight: "771px",
              }}
            />
          </div>

          {/* Imágenes de departamentos posicionadas individualmente */}
          <AnimatePresence>
            {locations.map((location) => (
              <motion.div
                key={`dept-${location.id}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: selectedLocation === location.id ? 1 : 0,
                  scale: selectedLocation === location.id ? 1 : 0.8,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute pointer-events-none"
                style={{
                  top: location.departmentPosition.top,
                  left: location.departmentPosition.left,
                  transform: "translate(-50%, -50%)",
                  width: location.size.width,
                  height: location.size.height,
                  zIndex: selectedLocation === location.id ? 5 : 1,
                  filter: selectedLocation === location.id ? "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))" : "none",
                }}
                onMouseEnter={() => handleMouseEnter(location.id)}
                onMouseLeave={handleMouseLeave}
              >
                <Image
                  src={location.departmentImage || "/placeholder.svg"}
                  alt={`Departamento de ${location.name}`}
                  fill
                  className="object-contain"
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Iconos de ubicación */}
          {locations.map((location) => (
            <div
              key={location.id}
              className="absolute cursor-pointer group"
              style={{
                top: location.position.top,
                left: location.position.left,
                transform: "translate(-50%, -50%)",
                zIndex: 10,
              }}
              onMouseEnter={() => handleMouseEnter(location.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Pin del mapa */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: selectedLocation === location.id ? 1.15 : 1,
                  filter:
                    selectedLocation === location.id
                      ? "drop-shadow(0 0 12px rgba(249, 115, 22, 0.7))"
                      : "drop-shadow(0 3px 8px rgba(0, 0, 0, 0.25))",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="transition-all duration-300 ease-out flex items-center justify-center"
              >
                <Image
                  src="/images/mappin.png"
                  alt="Map pin icon"
                  width={40}
                  height={48}
                  className="w-8 h-10 object-contain"
                  style={{
                    imageRendering: "crisp-edges",
                  }}
                  priority
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
