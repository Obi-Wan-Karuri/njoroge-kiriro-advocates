// app/blog/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight, ArrowLeft } from 'lucide-react'
import { client, urlFor } from '@/sanity/lib/sanity'

export const revalidate = 60

interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  category?: string
  mainImage?: any
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
      mainImage
    }`
  )
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-warm-white">
      {/* Page Header */}
      <section data-cursor-theme="dark" className="bg-charcoal pt-32 pb-16 section-padding">
  <div className="container-max">
    {/* Back to Home — top of page */}
    <Link
      href="/"
      className="inline-flex items-center gap-2 font-outfit text-sm text-white/60 hover:text-white transition-colors duration-200 mb-8"
    >
      <ArrowLeft size={16} /> Back to Home
    </Link>

    <p className="font-outfit text-sm uppercase tracking-widest text-sage-green mb-3">
      Legal Insights
    </p>
          <h1 className="font-cormorant text-5xl md:text-6xl font-semibold text-white leading-tight">
            From Our Desk
          </h1>
          <p className="mt-4 font-outfit text-lg text-white/60 max-w-2xl">
            Perspectives on Kenyan law, recent developments, and practical
            guidance from the advocates at Njoroge Kiriro &amp; Company.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-padding">
        <div className="container-max">
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-outfit text-muted text-base">
                No posts published yet. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group bg-warm-white flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Image — identical to homepage card */}
                  <div className="relative w-full h-48 bg-charcoal overflow-hidden">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).width(600).height(400).url()}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-charcoal">
                        <span className="font-cormorant text-4xl text-sage-green/30 font-semibold">
                          NK
                        </span>
                      </div>
                    )}
                    {post.category && (
                      <div className="absolute top-4 left-4">
                        <span className="font-outfit text-xs font-semibold uppercase tracking-wider text-white bg-forest-green px-3 py-1">
                          {post.category.replace(/-/g, ' ')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content — identical to homepage card */}
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar size={14} className="text-muted" />
                      <span className="font-outfit text-xs text-muted">
                        {formatDate(post.publishedAt)}
                      </span>
                    </div>
                    <h3 className="font-cormorant text-2xl font-semibold text-charcoal leading-snug mb-3 group-hover:text-forest-green transition-colors duration-200">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="font-outfit text-sm text-muted leading-relaxed flex-1">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-5 text-forest-green font-outfit text-sm font-medium group-hover:gap-3 transition-all duration-200">
                      Read More <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          
        </div>
      </section>
    </main>
  )
}