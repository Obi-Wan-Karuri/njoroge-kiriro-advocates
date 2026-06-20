// app/blog/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/sanity'

export const revalidate = 60

interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  category?: string
  mainImage?: {
    asset: { url: string }
    alt?: string
  }
}

async function getAllPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      category,
      mainImage { asset->{ url }, alt }
    }`
  )
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-[#F9F9F7]">
      {/* Page Header */}
      <section className="bg-[#1C1C1E] pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#2D7A55] font-[Outfit] text-sm uppercase tracking-widest mb-3">
            Legal Insights
          </p>
          <h1
            className="text-white font-[Cormorant_Garamond] text-5xl md:text-6xl font-semibold leading-tight"
          >
            From Our Desk
          </h1>
          <p className="mt-4 text-white/60 font-[Outfit] text-lg max-w-2xl">
            Perspectives on Kenyan law, recent developments, and practical
            guidance from the advocates at Njoroge Kiriro &amp; Company.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#1C1C1E]/50 font-[Outfit] text-lg">
              No posts published yet. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group flex flex-col bg-white border border-[#1C1C1E]/10 hover:border-[#1A4D35] transition-colors duration-300 rounded-sm overflow-hidden"
              >
                {/* Cover image */}
                {post.mainImage?.asset?.url ? (
                  <div className="relative h-48 w-full overflow-hidden bg-[#1C1C1E]/5">
                    <Image
                      src={post.mainImage.asset.url}
                      alt={post.mainImage.alt ?? post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="h-48 w-full bg-[#1A4D35]/10 flex items-center justify-center">
                    <span className="text-[#1A4D35]/30 font-[Cormorant_Garamond] text-4xl font-semibold">
                      NK
                    </span>
                  </div>
                )}

                {/* Card body */}
                <div className="flex flex-col flex-1 p-6">
                  {post.category && (
                    <span className="text-[#2D7A55] font-[Outfit] text-xs uppercase tracking-widest mb-2">
                      {post.category}
                    </span>
                  )}
                  <h2 className="text-[#1C1C1E] font-[Cormorant_Garamond] text-xl font-semibold leading-snug group-hover:text-[#1A4D35] transition-colors duration-200 mb-2">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-[#1C1C1E]/60 font-[Outfit] text-sm leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#1C1C1E]/10">
                    <time className="text-[#1C1C1E]/40 font-[Outfit] text-xs">
                      {new Date(post.publishedAt).toLocaleDateString('en-KE', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                    <span className="text-[#1A4D35] font-[Outfit] text-xs font-medium group-hover:translate-x-1 transition-transform duration-200 inline-block">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Back to home */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="font-[Outfit] text-sm text-[#1C1C1E]/50 hover:text-[#1A4D35] transition-colors duration-200 inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  )
}