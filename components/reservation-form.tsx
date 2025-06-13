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

  const encodedMessage = encodeURIComponent(message)

  const commonInputStyle = "w-full h-10 border border-gray-300 rounded-md text-xs sm:text-sm"

  return (
    <section className="relative container-section bg-gray-100 py-12 sm:py-12" id="reserva">
      <div className="content-section">
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-6 lg:pt-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 sm:gap-4">
            <div className="contents">
              {/* ... (tus inputs de fecha, adultos, niños, etc. sin cambios) ... */}

              {/* Botón de reserva por WhatsApp para Móvil y Desktop */}
              <div className="space-y-2 w-full">
                <Label className="text-[10px] font-medium text-transparent">.</Label>

                {/* Botón para MÓVIL */}
                <a
                  href={`https://wa.me/51958100066?text=${encodedMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block lg:hidden bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-2.5 px-4 text-xs uppercase rounded shadow transition-all duration-300 text-center"
                  aria-label="Reservar por WhatsApp en móvil"
                >
                  RESERVAR POR WHATSAPP
                </a>

                {/* Botón para DESKTOP */}
                <a
                  href={`https://web.whatsapp.com/send?phone=51958100066&text=${encodedMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden lg:block bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-2.5 px-4 text-xs uppercase rounded shadow transition-all duration-300 text-center"
                  aria-label="Reservar por WhatsApp en desktop"
                >
                  RESERVAR POR WHATSAPP
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
