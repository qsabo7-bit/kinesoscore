import MilitaryAssessmentShell from '../../components/MilitaryAssessmentShell'
import { scoreMarinePft } from '../../calculations/military/scoreMarinePft'
import { getMilitaryAssessment } from '../../data/military/assessments'
import {
  MARINE_PFT_CALCULATOR_TYPE,
  MARINE_PFT_TRACKS,
} from '../../data/trackingTracks'
import { DEFAULT_LOCKED_PREVIEW } from '../../components/tracking/lockedPreviewCopy'

const MARINE_LOCKED_PREVIEW = {
  ...DEFAULT_LOCKED_PREVIEW,
  title: 'Save your assessment progress',
}

function MarinePftPage({ onRequestAuth, onOpenTab }) {
  const assessment = getMilitaryAssessment('marine-pft')
  return (
    <MilitaryAssessmentShell
      assessment={assessment}
      scoreFn={scoreMarinePft}
      tracks={MARINE_PFT_TRACKS}
      calculatorType={MARINE_PFT_CALCULATOR_TYPE}
      lockedPreview={MARINE_LOCKED_PREVIEW}
      onRequestAuth={onRequestAuth}
      onOpenTab={onOpenTab}
    />
  )
}

export default MarinePftPage
