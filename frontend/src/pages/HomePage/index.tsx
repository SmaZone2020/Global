import HeroSection from './HeroSection'
import FlowSection from './FlowSection'
import CapabilitySection from './CapabilitySection'
import CredibilitySection from './CredibilitySection'
import FooterSection from './FooterSection'

export default function HomePage() {
  return (
    <div className="-mx-6 -my-8">
      <HeroSection />
      <FlowSection />
      <CapabilitySection />
      <CredibilitySection />
      <FooterSection />
    </div>
  )
}
