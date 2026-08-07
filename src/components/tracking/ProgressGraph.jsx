import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  formatRecordDate,
  formatRecordValue,
} from '../../lib/performanceRecords'

const TOOLTIP_CONTENT_STYLE = {
  background: '#171d1a',
  border: '1px solid rgba(242, 247, 244, 0.12)',
  borderRadius: 0,
  color: '#f2f7f4',
  margin: 0,
  padding: 10,
}

const TOOLTIP_LABEL_STYLE = {
  margin: 0,
  color: '#b8c4bc',
}

/**
 * Tooltip reads the active chart point payload.
 * LineChart only supports axis tooltips; unique xKey values keep lookup unambiguous.
 */
function ProgressGraphTooltip({ active, payload, valueKind, timeFormat }) {
  if (!active || !payload?.length) return null

  const point = payload[0]?.payload
  if (!point || !Number.isFinite(Number(point.value))) return null

  const formatted = formatRecordValue(
    point.value,
    valueKind,
    valueKind === 'duration' ? null : point.unit,
    timeFormat,
  )

  return (
    <div className="recharts-default-tooltip" style={TOOLTIP_CONTENT_STYLE}>
      <p className="recharts-tooltip-label" style={TOOLTIP_LABEL_STYLE}>
        {point.dateLabel}
      </p>
      <p style={{ margin: 0, color: '#f2f7f4' }}>
        <span>Result</span>
        <span> : </span>
        <span>{formatted}</span>
      </p>
    </div>
  )
}

function ProgressGraph({
  records,
  yAxisLabel = 'Result',
  valueKind = 'number',
  timeFormat = 'clock',
  emptyMessage = 'No saved results yet.\nComplete this calculator and save your first result.',
}) {
  if (!records?.length) {
    return (
      <p className="progress-empty">
        {emptyMessage.split('\n').map((line) => (
          <span key={line} className="progress-empty-line">
            {line}
          </span>
        ))}
      </p>
    )
  }

  const chartData = records.map((record, index) => {
    const id = record.id ?? `idx-${index}`
    const createdAt = record.created_at ?? ''
    const point = {
      id,
      // Unique internal category for LineChart axis tooltip lookup.
      xKey: `${createdAt}:${id}`,
      // Visible / tooltip date (calendar day only — unchanged).
      dateLabel: formatRecordDate(record.created_at),
      value: Number(record.result_value),
    }
    // Mass graphs keep unit for tooltip; duration must not pass "sec".
    if (valueKind === 'mass' && record.result_unit) {
      point.unit = record.result_unit
    }
    return point
  })

  const dateLabelByXKey = new Map(
    chartData.map((point) => [point.xKey, point.dateLabel]),
  )

  const formatTick = (value) =>
    valueKind === 'duration'
      ? formatRecordValue(value, 'duration', null, timeFormat)
      : String(Math.round(Number(value) * 10) / 10)

  return (
    <div className="progress-chart-wrap">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          data={chartData}
          margin={{ top: 12, right: 12, left: 8, bottom: 4 }}
        >
          <CartesianGrid stroke="rgba(242, 247, 244, 0.08)" vertical={false} />
          <XAxis
            dataKey="xKey"
            tickFormatter={(xKey) => dateLabelByXKey.get(xKey) ?? ''}
            tick={{ fill: '#b8c4bc', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(242, 247, 244, 0.12)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#b8c4bc', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={valueKind === 'duration' ? 56 : 52}
            tickFormatter={formatTick}
            label={{
              value: yAxisLabel,
              angle: -90,
              position: 'insideLeft',
              fill: '#b8c4bc',
              fontSize: 11,
            }}
          />
          <Tooltip
            content={(tooltipProps) => (
              <ProgressGraphTooltip
                {...tooltipProps}
                valueKind={valueKind}
                timeFormat={timeFormat}
              />
            )}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#7dffb3"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#7dffb3', strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ProgressGraph
