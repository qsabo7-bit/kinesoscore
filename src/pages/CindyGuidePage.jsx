import EducationalGuidePage from '../components/EducationalGuidePage'
import { CINDY_GUIDE_SEO } from '../data/seoCopy'

function CindyGuidePage({ onOpenTab }) {
  return <EducationalGuidePage seo={CINDY_GUIDE_SEO} onOpenTab={onOpenTab} />
}

export default CindyGuidePage
