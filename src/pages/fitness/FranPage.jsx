import FitnessAssessmentShell from '../../components/FitnessAssessmentShell'
import { DEFAULT_LOCKED_PREVIEW } from '../../components/tracking/lockedPreviewCopy'
import { getFitnessAssessment } from '../../data/fitness/assessments'
import { FRAN_CALCULATOR_TYPE, FRAN_TRACKS } from '../../data/trackingTracks'

const LOCKED_PREVIEW = {
  ...DEFAULT_LOCKED_PREVIEW,
  title: 'Save your fitness assessment progress',
}

function FranPage({ onRequestAuth, onOpenTab }) {
  const assessment = getFitnessAssessment('fran')
  return (
    <FitnessAssessmentShell
      assessment={assessment}
      tracks={FRAN_TRACKS}
      calculatorType={FRAN_CALCULATOR_TYPE}
      lockedPreview={LOCKED_PREVIEW}
      onRequestAuth={onRequestAuth}
      onOpenTab={onOpenTab}
    />
  )
}

export default FranPage
