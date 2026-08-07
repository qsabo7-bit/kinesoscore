import MilitaryAssessmentShell from '../../components/MilitaryAssessmentShell'
import { scoreAirForcePfa } from '../../calculations/military/scoreAirForcePfa'
import { getMilitaryAssessment } from '../../data/military/assessments'
import {
  AIR_FORCE_PFA_CALCULATOR_TYPE,
  AIR_FORCE_PFA_TRACKS,
} from '../../data/trackingTracks'
import { DEFAULT_LOCKED_PREVIEW } from '../../components/tracking/lockedPreviewCopy'

const PFA_LOCKED_PREVIEW = {
  ...DEFAULT_LOCKED_PREVIEW,
  title: 'Want to save your progress? Log-in!',
}

function AirForcePfaPage({ onRequestAuth, onOpenTab }) {
  const assessment = getMilitaryAssessment('air-force-pfa')
  return (
    <MilitaryAssessmentShell
      assessment={assessment}
      scoreFn={scoreAirForcePfa}
      tracks={AIR_FORCE_PFA_TRACKS}
      calculatorType={AIR_FORCE_PFA_CALCULATOR_TYPE}
      lockedPreview={PFA_LOCKED_PREVIEW}
      onRequestAuth={onRequestAuth}
      onOpenTab={onOpenTab}
    />
  )
}

export default AirForcePfaPage
