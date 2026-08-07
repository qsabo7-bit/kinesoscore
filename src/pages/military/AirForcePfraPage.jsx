import MilitaryAssessmentShell from '../../components/MilitaryAssessmentShell'
import { scoreAirForcePfra } from '../../calculations/military/scoreAirForcePfra'
import { getMilitaryAssessment } from '../../data/military/assessments'
import {
  AIR_FORCE_PFRA_CALCULATOR_TYPE,
  AIR_FORCE_PFRA_TRACKS,
} from '../../data/trackingTracks'
import { DEFAULT_LOCKED_PREVIEW } from '../../components/tracking/lockedPreviewCopy'

const PFRA_LOCKED_PREVIEW = {
  ...DEFAULT_LOCKED_PREVIEW,
  title: 'Save your assessment progress',
}

function AirForcePfraPage({ onRequestAuth, onOpenTab }) {
  const assessment = getMilitaryAssessment('air-force-pfra')
  return (
    <MilitaryAssessmentShell
      assessment={assessment}
      scoreFn={scoreAirForcePfra}
      tracks={AIR_FORCE_PFRA_TRACKS}
      calculatorType={AIR_FORCE_PFRA_CALCULATOR_TYPE}
      lockedPreview={PFRA_LOCKED_PREVIEW}
      onRequestAuth={onRequestAuth}
      onOpenTab={onOpenTab}
    />
  )
}

export default AirForcePfraPage
