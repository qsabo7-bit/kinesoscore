import EducationalGuidePage from '../components/EducationalGuidePage'
import { MARINE_PFT_GUIDE_SEO } from '../data/seoCopy'

function MarinePftGuidePage({ onOpenTab }) {
  return (
    <EducationalGuidePage seo={MARINE_PFT_GUIDE_SEO} onOpenTab={onOpenTab} />
  )
}

export default MarinePftGuidePage
