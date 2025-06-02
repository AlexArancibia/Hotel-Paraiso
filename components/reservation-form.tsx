"use client"

import { useState } from "react"
import { Users, Baby, Bed, MapPin, CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export default function ReservationForm() {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date())
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000))
  const [adults, setAdults] = useState("2 ADULTOS")
  const [children, setChildren] = useState("1 NIÑO")
  const [rooms, setRooms] = useState("01 HAB")
  const [city, setCity] = useState("CHICLAYO")

  const handleReservation = () => {
    const checkInFormatted = checkInDate ? format(checkInDate, "dd-MM-yyyy") : "No seleccionada"
    const checkOutFormatted = checkOutDate ? format(checkOutDate, "dd-MM-yyyy") : "No seleccionada"

    const message = `Hola! Me gustaría hacer una reserva con los siguientes datos:
  
📅 Check-in: ${checkInFormatted}
📅 Check-out: ${checkOutFormatted}
👥 Adultos: ${adults}
👶 Niños: ${children}
🛏️ Habitaciones: ${rooms}
📍 Ciudad: ${city}

¿Podrían ayudarme con la disponibilidad y precios?

Saludos!`

    // Siempre usar WhatsApp independientemente del dispositivo
    const whatsappUrl = `https://wa.me/51958100066?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  // Estilo común para todos los elementos del formulario
  const commonInputStyle = "w-full h-10 border border-gray-300 rounded-md text-xs sm:text-sm"

  return (
    <section className="relative container-section bg-gray-100 py-12 sm:py-12" id="reserva">
      <div className="content-section">
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-6 lg:pt-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 sm:gap-4">
            {/* Contenedor para asegurar que todos los elementos tengan el mismo ancho */}
            <div className="contents">
              {/* Fecha Check-in */}
              <div className="space-y-2 w-full">
                <Label className="text-[10px] font-medium text-gray-600 uppercase tracking-wide">FECHA CHECK-IN</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        commonInputStyle,
                        "justify-start text-left font-normal",
                        !checkInDate && "text-muted-foreground",
                      )}
                      aria-label="Seleccionar fecha de check-in"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-[#F58718]" />
                      {checkInDate ? format(checkInDate, "dd-MM-yyyy") : <span>Seleccionar fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 border border-gray-300 rounded-md" align="start">
                    <Calendar
                      mode="single"
                      selected={checkInDate}
                      onSelect={setCheckInDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Fecha Check-out */}
              <div className="space-y-2 w-full">
                <Label className="text-[10px] font-medium text-gray-600 uppercase tracking-wide">FECHA CHECK-OUT</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        commonInputStyle,
                        "justify-start text-left font-normal",
                        !checkOutDate && "text-muted-foreground",
                      )}
                      aria-label="Seleccionar fecha de check-out"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-[#F58718]" />
                      {checkOutDate ? format(checkOutDate, "dd-MM-yyyy") : <span>Seleccionar fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 border border-gray-300 rounded-md" align="start">
                    <Calendar
                      mode="single"
                      selected={checkOutDate}
                      onSelect={setCheckOutDate}
                      disabled={(date) => date < (checkInDate || new Date())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Adultos */}
              <div className="space-y-2 w-full">
                <Label className="text-[10px] font-medium text-gray-600 uppercase tracking-wide">Nº ADULTOS</Label>
                <div className="relative">
                  <Users className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#F58718] w-4 h-4 z-10" />
                  <Select value={adults} onValueChange={setAdults}>
                    <SelectTrigger
                      className={cn(commonInputStyle, "pl-8 focus:ring-orange-500 focus:border-orange-500")}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 ADULTO">1 ADULTO</SelectItem>
                      <SelectItem value="2 ADULTOS">2 ADULTOS</SelectItem>
                      <SelectItem value="3 ADULTOS">3 ADULTOS</SelectItem>
                      <SelectItem value="4 ADULTOS">4 ADULTOS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Niños */}
              <div className="space-y-2 w-full">
                <Label className="text-[10px] font-medium text-gray-600 uppercase tracking-wide">Nº NIÑOS</Label>
                <div className="relative">
                  <Baby className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#F58718] w-4 h-4 z-10" />
                  <Select value={children} onValueChange={setChildren}>
                    <SelectTrigger
                      className={cn(commonInputStyle, "pl-8 focus:ring-orange-500 focus:border-orange-500")}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0 NIÑOS">0 NIÑOS</SelectItem>
                      <SelectItem value="1 NIÑO">1 NIÑO</SelectItem>
                      <SelectItem value="2 NIÑOS">2 NIÑOS</SelectItem>
                      <SelectItem value="3 NIÑOS">3 NIÑOS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Habitaciones */}
              <div className="space-y-2 w-full">
                <Label className="text-[10px] font-medium text-gray-600 uppercase tracking-wide">Nº HABS</Label>
                <div className="relative">
                  <Bed className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#F58718] w-4 h-4 z-10" />
                  <Select value={rooms} onValueChange={setRooms}>
                    <SelectTrigger
                      className={cn(commonInputStyle, "pl-8 focus:ring-orange-500 focus:border-orange-500")}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="01 HAB">01 HAB</SelectItem>
                      <SelectItem value="02 HAB">02 HAB</SelectItem>
                      <SelectItem value="03 HAB">03 HAB</SelectItem>
                      <SelectItem value="04 HAB">04 HAB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Ciudad */}
              <div className="space-y-2 w-full">
                <Label className="text-[10px] font-medium text-gray-600 uppercase tracking-wide">CIUDAD</Label>
                <div className="relative">
                  <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#F58718] w-4 h-4 z-10" />
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger
                      className={cn(commonInputStyle, "pl-8 focus:ring-orange-500 focus:border-orange-500")}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ESCOGE">ESCOGE</SelectItem>
                      <SelectItem value="CHICLAYO">CHICLAYO</SelectItem>
                      <SelectItem value="TRUJILLO">TRUJILLO</SelectItem>
                      <SelectItem value="PIURA">PIURA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Botón Reserva */}
              <div className="space-y-2 w-full">
                <Label className="text-[10px] font-medium text-transparent">.</Label>
                <Button
                  onClick={handleReservation}
                  className={cn(
                    commonInputStyle,
                    "bg-[#F58718] hover:bg-[#f55e18] text-white font-bold py-2.5 px-4 text-xs uppercase tracking-wide transition-all duration-300",
                  )}
                  aria-label="Realizar reserva"
                >
                  RESERVAR
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
