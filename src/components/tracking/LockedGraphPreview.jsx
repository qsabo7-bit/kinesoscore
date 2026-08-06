import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import {
  SAMPLE_BMI_DATA,
  SAMPLE_DURATION_DATA,
  SAMPLE_FITNESS_AGE_DATA,
  SAMPLE_PROGRESS_DATA,
  SAMPLE_SCORE_DATA,
  formatRecordValue,
} from '../../lib/performanceRecords'
import { DEFAULT_LOCKED_PREVIEW } from './lockedPreviewCopy'

function LockedGraphPreview({
  onRequestAuth,
  yAxisLabel = 'Result',
  valueKind = 'number',
  sampleKind,
  title = DEFAULT_LOCKED_PREVIEW.title,
  lead = DEFAULT_LOCKED_PREVIEW.lead,
  benefits = DEFAULT_LOCKED_PREVIEW.benefits,
}) {
  const resolvedSample =
    sampleKind ||
    (valueKind === 'duration'
      ? 'duration'
      : valueKind === 'score'
        ? 'score'
        : 'number')

  const sampleData =
    resolvedSample === 'duration'
      ? SAMPLE_DURATION_DATA
      : resolvedSample === 'score'
        ? SAMPLE_SCORE_DATA
        : resolvedSample === 'bmi'
          ? SAMPLE_BMI_DATA
          : resolvedSample === 'fitnessAge'
            ? SAMPLE_FITNESS_AGE_DATA
            : SAMPLE_PROGRESS_DATA

  return (
    <div className="locked-graph-preview" aria-label="Progress tracking locked">
      <div className="locked-graph-sample" aria-hidden="true">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart
            data={sampleData}
            margin={{ top: 12, right: 12, left: 4, bottom: 4 }}
          >
            <CartesianGrid
              stroke="rgba(242, 247, 244, 0.08)"
              vertical={false}
            />
            <XAxis
              dataKey="dateLabel"
              tick={{ fill: '#b8c4bc', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(242, 247, 244, 0.12)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#b8c4bc', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={52}
              domain={resolvedSample === 'score' ? [0, 100] : ['auto', 'auto']}
              tickFormatter={(value) =>
                formatRecordValue(
                  value,
                  valueKind === 'duration' ? 'duration' : 'number',
                )
              }
              label={{
                value: yAxisLabel,
                angle: -90,
                position: 'insideLeft',
                fill: '#b8c4bc',
                fontSize: 11,
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#7dffb3"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#7dffb3', strokeWidth: 0 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="locked-graph-overlay">
        <div className="locked-graph-card">
          <h3 className="locked-graph-title">{title}</h3>
          {lead ? <p className="locked-graph-lead">{lead}</p> : null}
          {benefits?.length ? (
            <ul className="locked-graph-benefits">
              {benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onRequestAuth?.()}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  )
}

export default LockedGraphPreview
