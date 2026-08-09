import EducationalGuidePage from '../components/EducationalGuidePage'
import { NAVY_PRT_GUIDE_SEO } from '../data/seoCopy'

function NavyPrtGuidePage({ onOpenTab }) {
  return <EducationalGuidePage seo={NAVY_PRT_GUIDE_SEO} onOpenTab={onOpenTab} />
}

export default NavyPrtGuidePage
