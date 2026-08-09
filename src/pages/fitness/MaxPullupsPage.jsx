import FitnessAssessmentShell from '../../components/FitnessAssessmentShell'
import { DEFAULT_LOCKED_PREVIEW } from '../../components/tracking/lockedPreviewCopy'
import { getFitnessAssessment } from '../../data/fitness/assessments'
import {
  MAX_PULLUPS_CALCULATOR_TYPE,
  MAX_PULLUPS_TRACKS,
} from '../../data/trackingTracks'

const LOCKED_PREVIEW = {
  ...DEFAULT_LOCKED_PREVIEW,
  title: 'Save your fitness assessment progress',
}

function MaxPullupsPage({ onRequestAuth, onOpenTab }) {
  const assessment = getFitnessAssessment('max-pullups')
  return (
    <FitnessAssessmentShell
      assessment={assessment}
      tracks={MAX_PULLUPS_TRACKS}
      calculatorType={MAX_PULLUPS_CALCULATOR_TYPE}
      lockedPreview={LOCKED_PREVIEW}
      onRequestAuth={onRequestAuth}
      onOpenTab={onOpenTab}
    />
  )
}

export default MaxPullupsPage
