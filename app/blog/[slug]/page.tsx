import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { getPost, urlFor } from "@/sanity/lib/sanity";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const components = {
  block: {
    normal: ({ children }: any) => <p className="font-outfit text-base text-charcoal/80 leading-relaxed mb-4">{children}</p>,
    h2: ({ children }: any) => <h2 className="font-cormorant text-3xl font-semibold text-charcoal mt-10 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="font-cormorant text-2xl font-semibold text-charcoal mt-8 mb-3">{children}</h3>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-forest-green pl-6 my-6 font-cormorant text-xl italic text-charcoal/70">{children}</blockquote>,
  },
  types: {
    image: ({ value }: any) => (
      <div className="relative w-full h-96 my-8">
        <Image src={urlFor(value).width(1200).height(600).url()} alt={value.alt || ""} fill className="object-cover" />
      </div>
    ),
  },
};

export default async function BlogPost({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) notFound();

  return (
    <main className="bg-warm-white min-h-screen">
      {/* Header */}
      <div className="bg-charcoal pt-32 pb-16 section-padding">
        <div className="container-max">
          <Link href="/#blog" className="inline-flex items-center gap-2 font-outfit text-sm text-white/60 hover:text-white transition-colors duration-200 mb-8">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          {post.category && (
            <span className="font-outfit text-xs font-semibold uppercase tracking-wider text-white bg-forest-green px-3 py-1 mb-6 inline-block">{post.category.replace(/-/g, " ")}</span>
          )}
          <h1 className="font-cormorant text-4xl md:text-5xl font-semibold text-white leading-tight max-w-3xl mt-4 mb-6">{post.title}</h1>
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-sage-green" />
            <span className="font-outfit text-sm text-white/60">{formatDate(post.publishedAt)}</span>
          </div>
        </div>
      </div>

      {/* Main Image */}
      {post.mainImage && (
        <div className="relative w-full h-96 md:h-[500px]">
          <Image src={urlFor(post.mainImage).width(1600).height(800).url()} alt={post.title} fill className="object-cover" />
        </div>
      )}

      {/* Body */}
      <div className="container-max section-padding">
        <div className="max-w-3xl mx-auto">
          <p className="font-cormorant text-2xl italic text-muted leading-relaxed mb-10 border-l-4 border-forest-green pl-6">{post.excerpt}</p>
          <PortableText value={post.body} components={components} />
        </div>
      </div>

      {/* Back link */}
      <div className="container-max px-6 md:px-12 lg:px-24 pb-16">
        <Link href="/#blog" className="inline-flex items-center gap-2 font-outfit text-sm font-medium text-forest-green hover:text-sage-green transition-colors duration-200">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    </main>
  );
}