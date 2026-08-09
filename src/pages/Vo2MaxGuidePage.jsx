import EducationalGuidePage from '../components/EducationalGuidePage'
import { VO2_MAX_GUIDE_SEO } from '../data/seoCopy'

function Vo2MaxGuidePage({ onOpenTab }) {
  return <EducationalGuidePage seo={VO2_MAX_GUIDE_SEO} onOpenTab={onOpenTab} />
}

export default Vo2MaxGuidePage
