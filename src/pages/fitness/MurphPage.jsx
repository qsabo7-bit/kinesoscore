import FitnessAssessmentShell from '../../components/FitnessAssessmentShell'
import { DEFAULT_LOCKED_PREVIEW } from '../../components/tracking/lockedPreviewCopy'
import { getFitnessAssessment } from '../../data/fitness/assessments'
import { MURPH_CALCULATOR_TYPE, MURPH_TRACKS } from '../../data/trackingTracks'

const LOCKED_PREVIEW = {
  ...DEFAULT_LOCKED_PREVIEW,
  title: 'Save your fitness assessment progress',
}

function MurphPage({ onRequestAuth, onOpenTab }) {
  const assessment = getFitnessAssessment('murph')
  return (
    <FitnessAssessmentShell
      assessment={assessment}
      tracks={MURPH_TRACKS}
      calculatorType={MURPH_CALCULATOR_TYPE}
      lockedPreview={LOCKED_PREVIEW}
      onRequestAuth={onRequestAuth}
      onOpenTab={onOpenTab}
    />
  )
}

export default MurphPage
