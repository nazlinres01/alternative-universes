import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import PreviousScenarios from "@/components/previous-scenarios";
import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <PreviousScenarios />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
