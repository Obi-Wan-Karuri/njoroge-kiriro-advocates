import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import PracticeAreas from "@/components/sections/PracticeAreas";
import Blog from "@/components/sections/Blog";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import { getPosts } from "@/sanity/lib/sanity";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <PracticeAreas />
      <Blog posts={posts} />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}