import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import FeaturesSection from './components/FeaturesSection';
import ArchitectureSection from './components/ArchitectureSection';
import UseCasesSection from './components/UseCasesSection';
import ComparisonSection from './components/ComparisonSection';
import RoadmapSection from './components/RoadmapSection';
import GetStartedSection from './components/GetStartedSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <ArchitectureSection />
      <UseCasesSection />
      <ComparisonSection />
      <RoadmapSection />
      <GetStartedSection />
      <CTASection />
      <Footer />
    </div>
  );
}
