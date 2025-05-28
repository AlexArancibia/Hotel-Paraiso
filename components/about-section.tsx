"use client"

export default function AboutSection() {
  return (
    <section className="relative container-section bg-[#F58718] py-12 sm:py-16">
      <div className="content-section">
        <div className="text-white">
          <h2 className="text-2xl lg:text-4xl font-bold mb-4 sm:mb-6 uppercase">¿QUIÉNES SOMOS?</h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            Hoteles Paraíso <span className="font-bold">comenzó en 1989</span> como una pequeña empresa familiar{" "}
            <span className="font-bold">en Chiclayo</span>, con solo 14 habitaciones. Hoy, también estamos presentes{" "}
            <span className="font-bold">en Trujillo y Piura</span>, con un total de 156 habitaciones y 40 colaboradores.
            Nuestros hoteles son reconocidos por su céntrica ubicación, cómodas instalaciones y sobre todo, por la
            calidad y compromiso de nuestro personal.
          </p>
        </div>
      </div>
    </section>
  )
}
