"use client"
import { useEffect, useState, useRef } from "react"
import type React from "react"

import {
  Heart,
  MessageCircle,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Volume2,
  VolumeX,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Tipos para los datos de Instagram
interface InstagramPost {
  id: string
  media_url: string
  media_product_type: "FEED" | "REELS"
  caption: string
  alt_text?: string
  like_count: number
  comments_count: number
  thumbnail_url?: string
  permalink: string
  legacy_instagram_media_id: string
  shortcode: string
}

interface InstagramApiResponse {
  data: InstagramPost[]
  paging?: {
    cursors: {
      before: string
      after: string
    }
    next?: string
  }
}

export function InstagramPosts() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [activePost, setActivePost] = useState<number | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set())
  const [mutedVideos, setMutedVideos] = useState<Set<string>>(new Set())
  const [hoveredPost, setHoveredPost] = useState<string | null>(null)
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map())

  // Detectar si es móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Función para obtener los posts de Instagram desde nuestra API
  const fetchInstagramPosts = async () => {
    try {
      setLoading(true)
      setError(null)

      // Llamar a nuestra API route en lugar de directamente a Instagram
      const response = await fetch("/api/instagram", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`)
      }

      const data: InstagramApiResponse = await response.json()
      setPosts(data.data)
    } catch (err) {
      console.error("Error fetching Instagram posts:", err)
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  // Cargar posts al montar el componente
  useEffect(() => {
    fetchInstagramPosts()
  }, [])

  // Limpiar videos cuando cambie el slide
  useEffect(() => {
    // Pausar todos los videos cuando cambie el slide
    videoRefs.current.forEach((video) => {
      video.pause()
    })
    setPlayingVideos(new Set())
  }, [currentSlide])

  // Calcular cuántos posts mostrar por fila según el tamaño de pantalla
  const postsPerRow = isMobile ? 2 : 4
  const rowsToShow = 2
  const postsPerPage = postsPerRow * rowsToShow
  const totalSlides = Math.ceil(posts.length / postsPerPage)

  // Obtener los posts para la página actual
  const currentPosts = posts.slice(currentSlide * postsPerPage, (currentSlide + 1) * postsPerPage)

  const handlePostClick = (index: number, post: InstagramPost) => {
    if (isMobile) {
      setActivePost(activePost === index ? null : index)
    } else {
      // En desktop, abrir directamente en Instagram
      const instagramUrl = `https://www.instagram.com/p/${post.shortcode}/`
      window.open(instagramUrl, "_blank")
    }
  }

  const handleVideoPlay = (postId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    const video = videoRefs.current.get(postId)
    if (video) {
      if (playingVideos.has(postId)) {
        video.pause()
        setPlayingVideos((prev) => {
          const newSet = new Set(prev)
          newSet.delete(postId)
          return newSet
        })
      } else {
        // Pausar otros videos
        videoRefs.current.forEach((v, id) => {
          if (id !== postId) {
            v.pause()
          }
        })
        setPlayingVideos(new Set([postId]))
        video.play()
      }
    }
  }

  const handleVideoMute = (postId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    const video = videoRefs.current.get(postId)
    if (video) {
      video.muted = !video.muted
      if (video.muted) {
        setMutedVideos((prev) => new Set(prev).add(postId))
      } else {
        setMutedVideos((prev) => {
          const newSet = new Set(prev)
          newSet.delete(postId)
          return newSet
        })
      }
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k"
    }
    return num.toString()
  }

  const extractHashtags = (caption: string) => {
    const hashtags = caption.match(/#\w+/g)
    return hashtags ? hashtags.slice(0, 3).join(" ") : "#ExperienciaParaiso"
  }

  const truncateCaption = (caption: string, maxLength = 100) => {
    if (caption.length <= maxLength) return caption
    return caption.substring(0, maxLength) + "..."
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  // Estado de carga
  if (loading) {
    return (
      <section className="relative bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-4 tracking-tight">
              SÍGUENOS EN <span className="text-[#F58718]">INSTAGRAM</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium">
              Descubre los momentos más especiales de nuestros huéspedes
            </p>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-[#F58718]" />
              <p className="text-gray-600">Cargando posts de Instagram...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Estado de error
  if (error) {
    return (
      <section className="relative bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-4 tracking-tight">
              SÍGUENOS EN <span className="text-[#F58718]">INSTAGRAM</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium">
              Descubre los momentos más especiales de nuestros huéspedes
            </p>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <p className="text-red-600 mb-4">Error al cargar los posts de Instagram</p>
              <p className="text-gray-500 text-sm mb-4">{error}</p>
              <Button onClick={fetchInstagramPosts} className="bg-[#F58718] hover:bg-[#C13584] text-white">
                Intentar de nuevo
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Estado sin posts
  if (posts.length === 0) {
    return (
      <section className="relative bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-4 tracking-tight">
              SÍGUENOS EN <span className="text-[#E4405F]">INSTAGRAM</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium">
              Descubre los momentos más especiales de nuestros huéspedes
            </p>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <p className="text-gray-600 mb-4">No se encontraron posts de Instagram</p>
              <a
                href="https://instagram.com/hotelparaiso"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E4405F] to-[#C13584] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Visitar Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4">
        {/* Título principal */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-4 tracking-tight">
            SÍGUENOS EN <span className="text-[#F58718]">INSTAGRAM</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium">
            Descubre los momentos más especiales de nuestros huéspedes
          </p>
          <div className="mt-4">
            <a
              href="https://instagram.com/hotelparaiso"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F58718] to-[#e2790f] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @hotelparaiso
            </a>
          </div>
        </div>

        {/* Contenedor del slider con controles */}
        <div className="relative">
          {/* Grid de posts en patrón de ajedrez - Solo 2 filas */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {currentPosts.map((post, index) => {
              // Lógica para móvil: 2 columnas (patrón de ajedrez real)
              // Lógica para desktop: 4 columnas (mantener patrón original)
              let isGradient

              if (isMobile) {
                // En móvil: patrón de ajedrez con 2 columnas
                const row = Math.floor(index / 2) // 2 columnas en móvil
                const col = index % 2
                isGradient = (row + col) % 2 === 0
              } else {
                // En desktop: mantener el patrón original
                const row = Math.floor(index / 4)
                const col = index % 4
                isGradient = (row + col) % 2 === 0
              }

              const isActive = isMobile && activePost === index
              const isVideo = post.media_product_type === "REELS"
              const isPlaying = playingVideos.has(post.id)
              const isMuted = mutedVideos.has(post.id)
              const isHovered = hoveredPost === post.id

              return (
                <div
                  key={post.id}
                  className={`aspect-square group cursor-pointer relative overflow-hidden rounded-lg ${
                    isMobile ? "touch-manipulation" : ""
                  }`}
                  onClick={() => handlePostClick(index, post)}
                  onMouseEnter={() => !isMobile && setHoveredPost(post.id)}
                  onMouseLeave={() => !isMobile && setHoveredPost(null)}
                >
                  {/* Contenido principal - Imagen/Video del post */}
                  <div
                    className={`
                      w-full h-full relative overflow-hidden
                      transition-all duration-300
                      ${isMobile ? (isActive ? "blur-sm" : "") : isVideo ? "" : "group-hover:blur-sm"}
                    `}
                  >
                    {/* Imagen o Video del post */}
                    {isVideo ? (
                      <video
                        ref={(el) => {
                          if (el) {
                            videoRefs.current.set(post.id, el)
                          }
                        }}
                        src={post.media_url}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loop
                        muted={isMuted}
                        playsInline
                        preload="metadata"
                        onPlay={() => setPlayingVideos((prev) => new Set(prev).add(post.id))}
                        onPause={() =>
                          setPlayingVideos((prev) => {
                            const newSet = new Set(prev)
                            newSet.delete(post.id)
                            return newSet
                          })
                        }
                      />
                    ) : (
                      <img
                        src={post.media_url || "/placeholder.svg"}
                        alt={post.alt_text || `Instagram post ${post.id}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        crossOrigin="anonymous"
                      />
                    )}

                    {/* Overlay con gradiente Instagram */}
                    {isGradient && (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#E4405F]/20 via-[#C13584]/20 to-[#833AB4]/20" />
                    )}

                    {/* Controles de video para REELS - Solo aparecen en hover o cuando está pausado */}
                    {isVideo && (isHovered || !isPlaying) && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={(e) => handleVideoPlay(post.id, e)}
                          className="bg-black/50 rounded-full p-3 transition-all duration-300 hover:bg-black/70"
                        >
                          {isPlaying ? (
                            <Pause className="w-6 h-6 text-white fill-white" />
                          ) : (
                            <Play className="w-6 h-6 text-white fill-white" />
                          )}
                        </button>
                      </div>
                    )}

                    {/* Indicador de video para REELS */}
                    {isVideo && (
                      <div className="absolute top-2 left-2 bg-black/70 rounded-full p-1">
                        <Play className="w-3 h-3 text-white fill-white" />
                      </div>
                    )}

                    {/* Control de sonido para videos */}
                    {isVideo && (
                      <button
                        onClick={(e) => handleVideoMute(post.id, e)}
                        className="absolute top-2 right-2 bg-black/70 rounded-full p-1 hover:bg-black/90 transition-colors"
                      >
                        {isMuted ? (
                          <VolumeX className="w-3 h-3 text-white" />
                        ) : (
                          <Volume2 className="w-3 h-3 text-white" />
                        )}
                      </button>
                    )}

                    {/* Enlace a Instagram - Solo para imágenes en hover */}
                    {!isVideo && isHovered && (
                      <div className="absolute top-2 right-2">
                        <div className="bg-black/70 rounded-full p-1 hover:bg-black/90 transition-colors">
                          <ExternalLink className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    )}

                    {/* Indicadores de interacción para imágenes */}
                    {/* {!isVideo && !isHovered && (
                      <div className="absolute top-2 right-2 flex gap-1">
                        <div className="bg-black/50 rounded-full p-1">
                          <Heart className="w-3 h-3 text-white" />
                        </div>
                        <div className="bg-black/50 rounded-full p-1">
                          <MessageCircle className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    )} */}

                    {/* Contador de likes y comentarios en la esquina inferior */}
                    <div className="absolute bottom-2 left-2 flex gap-2">
                      <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        <span>{formatNumber(post.like_count)}</span>
                      </div>
                      <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{formatNumber(post.comments_count)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Overlay con información del post - Solo para imágenes */}
                  {!isVideo && (
                    <div
                      className={`
                        absolute inset-0 flex flex-col items-center justify-center p-3 sm:p-4 lg:p-6
                        transition-all duration-300 backdrop-blur-md rounded-lg
                        ${
                          isMobile
                            ? isActive
                              ? "opacity-100"
                              : "opacity-0 pointer-events-none"
                            : "opacity-0 group-hover:opacity-100"
                        }
                        bg-gradient-to-br from-[#F58718]/90 via-[#C13584]/90 to-[#833AB4]/90
                      `}
                    >
                      {/* Caption del post */}
                      <p className="text-xs sm:text-sm text-center leading-tight text-white mb-3 line-clamp-4">
                        {truncateCaption(post.caption, 120)}
                      </p>

                      {/* Estadísticas */}
                      <div className="flex items-center gap-4 mb-2 text-white text-xs">
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          <span>{formatNumber(post.like_count)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>{formatNumber(post.comments_count)}</span>
                        </div>
                      </div>

                      {/* Hashtags */}
                      <p className="text-xs text-center text-blue-200 font-medium">{extractHashtags(post.caption)}</p>

                      {/* Botón para ver en Instagram */}
                      <div className="mt-3">
                        <div className="bg-white/20 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          <span>Ver en Instagram</span>
                        </div>
                      </div>

                      {/* Indicador de cierre para móvil */}
                      {isMobile && isActive && (
                        <div className="absolute top-2 right-2 text-white text-lg font-bold opacity-70">×</div>
                      )}
                    </div>
                  )}

                  {/* Overlay simple para videos en móvil */}
                  {isVideo && isMobile && isActive && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 bg-gradient-to-br from-[#E4405F]/90 via-[#C13584]/90 to-[#833AB4]/90 backdrop-blur-md rounded-lg">
                      <p className="text-xs text-center leading-tight text-white mb-3 line-clamp-3">
                        {truncateCaption(post.caption, 100)}
                      </p>
                      <div className="flex items-center gap-4 text-white text-xs">
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          <span>{formatNumber(post.like_count)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>{formatNumber(post.comments_count)}</span>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 text-white text-lg font-bold opacity-70">×</div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Controles del slider */}
          {totalSlides > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-[#cab65d] text-[#E4405F] hover:bg-[#E4405F] hover:text-white"
                onClick={prevSlide}
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Anterior</span>
              </Button>

              {/* Indicadores de página */}
              <div className="flex gap-2">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <button
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentSlide ? "bg-[#F58718] w-4" : "bg-gray-300"
                    }`}
                    onClick={() => setCurrentSlide(i)}
                    aria-label={`Ir a página ${i + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-[#F58718] text-[#F58718] hover:bg-[#F58718] hover:text-white"
                onClick={nextSlide}
                disabled={currentSlide === totalSlides - 1}
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Siguiente</span>
              </Button>
            </div>
          )}
        </div>

        {/* Call to action final */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">¿Te gusta lo que ves? ¡Síguenos para más contenido!</p>
          <a
            href="https://instagram.com/hotelparaiso"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-[#F58718] text-[#F58718] px-6 py-3 rounded-full font-semibold hover:bg-[#E4405F] hover:text-white transition-all duration-300"
          >
            Ver más en Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
