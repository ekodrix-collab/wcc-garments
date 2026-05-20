import { HeroSection } from '@/components/home/HeroSection'
import { MarqueeBanner } from '@/components/home/MarqueeBanner'
import { WhoWeAre } from '@/components/home/WhoWeAre'
import { DivisionCutouts } from '@/components/home/DivisionCutouts'
import { NewArrivals } from '@/components/home/NewArrivals'
import { KillingOffers } from '@/components/home/KillingOffers'
import { GlobalPresence } from '@/components/home/GlobalPresence'
import { HospitalitySpotlight } from '@/components/home/HospitalitySpotlight'
import { ManufacturingStory } from '@/components/home/ManufacturingStory'
import { WhyWCC } from '@/components/home/WhyWCC'
import { EnquiryConsole } from '@/components/home/EnquiryConsole'
import { CoverDemo } from '@/components/ui/cover-demo'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeBanner />
      <WhoWeAre />
      <DivisionCutouts />
      <NewArrivals />
      <KillingOffers />
      <GlobalPresence />
      <HospitalitySpotlight />
      <ManufacturingStory />
      <CoverDemo />
      {/* <WhyWCC /> */}
      <EnquiryConsole />
    </>
  )
}
