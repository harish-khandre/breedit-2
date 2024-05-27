import Footer from "@/components/footer";
import { CarouselDemo } from "@/components/landing-page/carousel";
import Contact from "@/components/landing-page/contact";
import CTA from "@/components/landing-page/cta";
import Features from "@/components/landing-page/features";
import Gallery from "@/components/landing-page/gallery";
import Testimonials from "@/components/landing-page/testimonials";

export default function Home() {
  return (
    <div className="">
      <CarouselDemo />
      {/* <ValueProposition /> */}
      <Features />
      <CTA />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
