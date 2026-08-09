import EducationalGuidePage from '../components/EducationalGuidePage'
import { ARMY_AFT_GUIDE_SEO } from '../data/seoCopy'

function ArmyAftGuidePage({ onOpenTab }) {
  return <EducationalGuidePage seo={ARMY_AFT_GUIDE_SEO} onOpenTab={onOpenTab} />
}

export default ArmyAftGuidePage