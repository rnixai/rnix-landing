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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-secondary focus:text-surface focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <ArchitectureSection />
      <UseCasesSection />
      <ComparisonSection />
      <RoadmapSection />
      <GetStartedSection />
      <CTASection />
      </main>
      <Footer />
    </div>
  );
}
