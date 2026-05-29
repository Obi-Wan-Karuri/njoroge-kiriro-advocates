import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { urlFor } from "@/sanity/lib/sanity";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage?: any;
  category?: string;
  publishedAt: string;
}

interface BlogProps {
  posts: Post[];
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Blog({ posts }: BlogProps) {
  return (
    <section id="blog" className="bg-light-grey section-padding">
      <div className="container-max">
        <SectionHeading
          eyebrow="Legal Insights"
          title="From Our Desk"
          subtitle="Perspectives on Kenyan law, recent developments, and practical guidance from the advocates at Njoroge Kiriro & Company."
        />

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-outfit text-muted text-base">No posts published yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post, index) => (
              <Link href={`/blog/${post.slug.current}`} key={post._id} className={`group bg-warm-white flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${index === 0 ? "lg:col-span-1" : ""}`}>
                {/* Image */}
                <div className="relative w-full h-48 bg-charcoal overflow-hidden">
                  {post.mainImage ? (
                    <Image src={urlFor(post.mainImage).width(600).height(400).url()} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-charcoal">
                      <span className="font-cormorant text-4xl text-sage-green/30 font-semibold">NK</span>
                    </div>
                  )}
                  {post.category && (
                    <div className="absolute top-4 left-4">
                      <span className="font-outfit text-xs font-semibold uppercase tracking-wider text-white bg-forest-green px-3 py-1">{post.category.replace(/-/g, " ")}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={14} className="text-muted" />
                    <span className="font-outfit text-xs text-muted">{formatDate(post.publishedAt)}</span>
                  </div>
                  <h3 className="font-cormorant text-2xl font-semibold text-charcoal leading-snug mb-3 group-hover:text-forest-green transition-colors duration-200">{post.title}</h3>
                  <p className="font-outfit text-sm text-muted leading-relaxed flex-1">{post.excerpt}</p>
                  <div className="flex items-center gap-2 mt-5 text-forest-green font-outfit text-sm font-medium group-hover:gap-3 transition-all duration-200">
                    Read More <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {posts.length > 3 && (
          <div className="text-center mt-12">
            <Link href="/blog" className="inline-flex items-center gap-2 font-outfit text-sm font-medium text-forest-green hover:text-sage-green transition-colors duration-200">
              View All Posts <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}