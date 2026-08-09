import EducationalGuidePage from '../components/EducationalGuidePage'
import { AIR_FORCE_PFRA_GUIDE_SEO } from '../data/seoCopy'

function AirForcePfraGuidePage({ onOpenTab }) {
  return (
    <EducationalGuidePage seo={AIR_FORCE_PFRA_GUIDE_SEO} onOpenTab={onOpenTab} />
  )
}

export default AirForcePfraGuidePage
