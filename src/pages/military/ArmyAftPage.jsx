import MilitaryAssessmentShell from '../../components/MilitaryAssessmentShell'
import { scoreArmyAft } from '../../calculations/military/scoreArmyAft'
import { getMilitaryAssessment } from '../../data/military/assessments'
import {
  ARMY_AFT_CALCULATOR_TYPE,
  ARMY_AFT_TRACKS,
} from '../../data/trackingTracks'
import { DEFAULT_LOCKED_PREVIEW } from '../../components/tracking/lockedPreviewCopy'

const ARMY_LOCKED_PREVIEW = {
  ...DEFAULT_LOCKED_PREVIEW,
  title: 'Want to save your progress? Log-in!',
}

function ArmyAftPage({ onRequestAuth }) {
  const assessment = getMilitaryAssessment('army-aft')
  return (
    <MilitaryAssessmentShell
      assessment={assessment}
      scoreFn={scoreArmyAft}
      tracks={ARMY_AFT_TRACKS}
      calculatorType={ARMY_AFT_CALCULATOR_TYPE}
      lockedPreview={ARMY_LOCKED_PREVIEW}
      onRequestAuth={onRequestAuth}
    />
  )
}

export default ArmyAftPage
