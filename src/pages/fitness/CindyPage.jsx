import FitnessAssessmentShell from '../../components/FitnessAssessmentShell'
import { DEFAULT_LOCKED_PREVIEW } from '../../components/tracking/lockedPreviewCopy'
import { getFitnessAssessment } from '../../data/fitness/assessments'
import { CINDY_CALCULATOR_TYPE, CINDY_TRACKS } from '../../data/trackingTracks'

const LOCKED_PREVIEW = {
  ...DEFAULT_LOCKED_PREVIEW,
  title: 'Save your fitness assessment progress',
}

function CindyPage({ onRequestAuth, onOpenTab }) {
  const assessment = getFitnessAssessment('cindy')
  return (
    <FitnessAssessmentShell
      assessment={assessment}
      tracks={CINDY_TRACKS}
      calculatorType={CINDY_CALCULATOR_TYPE}
      lockedPreview={LOCKED_PREVIEW}
      onRequestAuth={onRequestAuth}
      onOpenTab={onOpenTab}
    />
  )
}

export default CindyPage
