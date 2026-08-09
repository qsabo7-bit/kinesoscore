import EducationalGuidePage from '../components/EducationalGuidePage'
import { FRAN_GUIDE_SEO } from '../data/seoCopy'

function FranGuidePage({ onOpenTab }) {
  return <EducationalGuidePage seo={FRAN_GUIDE_SEO} onOpenTab={onOpenTab} />
}

export default FranGuidePage
