import FitnessAssessmentShell from '../../components/FitnessAssessmentShell'
import { DEFAULT_LOCKED_PREVIEW } from '../../components/tracking/lockedPreviewCopy'
import { getFitnessAssessment } from '../../data/fitness/assessments'
import {
  MAX_PUSHUPS_CALCULATOR_TYPE,
  MAX_PUSHUPS_TRACKS,
} from '../../data/trackingTracks'

const LOCKED_PREVIEW = {
  ...DEFAULT_LOCKED_PREVIEW,
  title: 'Save your fitness assessment progress',
}

function MaxPushupsPage({ onRequestAuth, onOpenTab }) {
  const assessment = getFitnessAssessment('max-pushups')
  return (
    <FitnessAssessmentShell
      assessment={assessment}
      tracks={MAX_PUSHUPS_TRACKS}
      calculatorType={MAX_PUSHUPS_CALCULATOR_TYPE}
      lockedPreview={LOCKED_PREVIEW}
      onRequestAuth={onRequestAuth}
      onOpenTab={onOpenTab}
    />
  )
}

export default MaxPushupsPage
