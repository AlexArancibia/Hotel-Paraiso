"use client"

import AboutSection from "@/components/about-section"
import Footer from "@/components/footer"
import Header from "@/components/header"
import HeroSlider from "@/components/hero-slider"
import HotelsMapSection from "@/components/hotels-map-section"
import HotelsShowcaseSection from "@/components/hotels-showcase-section"
import ReservationForm from "@/components/reservation-form"
import ServiceBanner from "@/components/service-banner"
import ServicesSection from "@/components/service-section"
import { WhatsAppButton } from "@/components/wspbutton"


export default function LandingPage() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <section id="inicio">
        <HeroSlider />
      </section>

            <section id="reserva">
        <ReservationForm />
      </section>

      <section id="quienes-somos">
        <AboutSection />
      </section>

      <section id="sedes">
        <HotelsMapSection />
      </section>
      <section id="hoteles">
        <HotelsShowcaseSection />
      </section>
      <section id="servicios">
        <ServicesSection />
      </section>
      <ServiceBanner />
      <Footer />
        <WhatsAppButton />
    </div>
  )
}
