import CtaBannerSection from "@/components/CtaBannerSection";
import FeaturedDoctorsSection from "@/components/FeaturedDoctorsSection";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ReviewsSection from "@/components/ReviewsSection";
import SpecialtiesSection from "@/components/SpecialtiesSection";

const Landing = () => {
  return (
    <>
      <HeroSection />
      <SpecialtiesSection />
      <HowItWorksSection />
      <FeaturedDoctorsSection />
      <ReviewsSection />
      <CtaBannerSection />
    </>
  );
};

export default Landing;
