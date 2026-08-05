function DemographicFields({
  age,
  gender,
  onAgeChange,
  onGenderChange,
  children,
  legend = 'Optional peer comparison',
  note = 'Add these details to see how you compare with published norms for your group. Everything above still works without them.',
}) {
  return (
    <fieldset className="optional-fields">
      <legend>{legend}</legend>
      <p className="optional-note">{note}</p>

      <div className={`field-row${children ? ' field-row-optional' : ''}`}>
        {children}

        <label className="field field-compact">
          <span>Age</span>
          <input
            type="number"
            min="12"
            max="100"
            step="1"
            placeholder="—"
            value={age}
            onChange={(event) => onAgeChange(event.target.value)}
          />
        </label>

        <label className="field">
          <span>Gender</span>
          <select
            value={gender}
            onChange={(event) => onGenderChange(event.target.value)}
          >
            <option value="">Prefer not to say</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
      </div>
    </fieldset>
  )
}

export default DemographicFields
