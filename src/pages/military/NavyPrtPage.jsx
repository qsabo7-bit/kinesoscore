import MilitaryAssessmentShell from '../../components/MilitaryAssessmentShell'
import { scoreNavyPrt } from '../../calculations/military/scoreNavyPrt'
import { getMilitaryAssessment } from '../../data/military/assessments'
import {
  NAVY_PRT_CALCULATOR_TYPE,
  NAVY_PRT_TRACKS,
} from '../../data/trackingTracks'
import { DEFAULT_LOCKED_PREVIEW } from '../../components/tracking/lockedPreviewCopy'

const NAVY_LOCKED_PREVIEW = {
  ...DEFAULT_LOCKED_PREVIEW,
  title: 'Want to save your progress? Log-in!',
}

function NavyPrtPage({ onRequestAuth, onOpenTab }) {
  const assessment = getMilitaryAssessment('navy-prt')
  return (
    <MilitaryAssessmentShell
      assessment={assessment}
      scoreFn={scoreNavyPrt}
      tracks={NAVY_PRT_TRACKS}
      calculatorType={NAVY_PRT_CALCULATOR_TYPE}
      lockedPreview={NAVY_LOCKED_PREVIEW}
      onRequestAuth={onRequestAuth}
      onOpenTab={onOpenTab}
    />
  )
}

export default NavyPrtPage
