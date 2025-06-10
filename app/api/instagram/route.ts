import { NextResponse } from "next/server"

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

export async function GET() {
  try {
    // Obtener las credenciales del servidor (variables de entorno privadas)
    const igId = process.env.INSTAGRAM_ID
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN

    if (!igId || !accessToken) {
      return NextResponse.json({ error: "Variables de entorno de Instagram no configuradas" }, { status: 500 })
    }

    // Construir la URL de la API de Instagram
    const url = `https://graph.facebook.com/v23.0/${igId}/media?fields=id,media_url,media_product_type,caption,alt_text,like_count,comments_count,thumbnail_url,permalink,legacy_instagram_media_id,shortcode&access_token=${accessToken}`

    // Hacer la petición a la API de Instagram
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache por 5 minutos
    })

    if (!response.ok) {
      console.error("Error de Instagram API:", response.status, response.statusText)
      return NextResponse.json({ error: `Error de Instagram API: ${response.status}` }, { status: response.status })
    }

    const data: InstagramApiResponse = await response.json()

    // Validar que tenemos datos
    if (!data.data || !Array.isArray(data.data)) {
      return NextResponse.json({ error: "Formato de respuesta inválido de Instagram" }, { status: 500 })
    }

    // Opcional: Filtrar o transformar los datos si es necesario
    const processedPosts = data.data.map((post) => ({
      ...post,
      // Asegurar que todos los campos requeridos estén presentes
      caption: post.caption || "",
      like_count: post.like_count || 0,
      comments_count: post.comments_count || 0,
    }))

    // Devolver los datos con headers de cache
    return NextResponse.json(
      { data: processedPosts, paging: data.paging },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      },
    )
  } catch (error) {
    console.error("Error en API route de Instagram:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
