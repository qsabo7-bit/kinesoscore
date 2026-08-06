import { SharedInputShell } from './SharedDataNotification'

function DemographicFields({
  age,
  gender,
  onAgeChange,
  onGenderChange,
  children,
  legend = 'Optional peer comparison',
  note = 'Add these details to see how you compare with published norms for your group. Everything above still works without them.',
  ageShared,
  genderShared,
}) {
  return (
    <fieldset className="optional-fields">
      <legend>{legend}</legend>
      <p className="optional-note">{note}</p>

      <div className={`field-row${children ? ' field-row-optional' : ''}`}>
        {children}

        <label className="field field-compact">
          <span>Age</span>
          <SharedInputShell shared={ageShared}>
            <input
              type="number"
              min="12"
              max="100"
              step="1"
              placeholder="30"
              value={age}
              onChange={(event) => onAgeChange(event.target.value)}
            />
          </SharedInputShell>
        </label>

        <label className="field">
          <span>Gender</span>
          <SharedInputShell shared={genderShared}>
            <select
              value={gender}
              onChange={(event) => onGenderChange(event.target.value)}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </SharedInputShell>
        </label>
      </div>
    </fieldset>
  )
}

export default DemographicFields
