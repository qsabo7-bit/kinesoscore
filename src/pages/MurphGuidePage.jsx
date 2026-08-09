import EducationalGuidePage from '../components/EducationalGuidePage'
import { MURPH_GUIDE_SEO } from '../data/seoCopy'

function MurphGuidePage({ onOpenTab }) {
  return <EducationalGuidePage seo={MURPH_GUIDE_SEO} onOpenTab={onOpenTab} />
}

export default MurphGuidePage
