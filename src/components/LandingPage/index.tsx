import News from "../News";
import About from "./About";
import Banner from "./Banner";
import Footer from "./Footer";
import Services from "./Services";
import Specialties from "./Specialties";
import Testimonials from "./Testimonials";
import FeaturedDoctorsSection from "@/components/FeaturedDoctorsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import SpecialtiesSection from "@/components/SpecialtiesSection";

const LandingPage = () => {
  return (
    <div className="flex flex-col">
      <Banner />
      <About />
      <SpecialtiesSection />
      <FeaturedDoctorsSection />
      <Services />
      <HowItWorksSection />
      <Testimonials />
      <News />
      <Footer />
    </div>
  );
};
export default LandingPage;
