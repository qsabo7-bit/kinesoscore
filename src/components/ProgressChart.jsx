import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatRecordDate, formatRecordValue } from '../lib/performanceRecords'

function ProgressChart({ records, yAxisLabel = 'Result' }) {
  if (!records?.length) {
    return (
      <p className="progress-empty">
        No saved results yet. Complete this calculator and save your first
        result.
      </p>
    )
  }

  const chartData = records.map((record) => ({
    id: record.id,
    dateLabel: formatRecordDate(record.created_at),
    value: Number(record.result_value),
    unit: record.result_unit,
  }))

  return (
    <div className="progress-chart-wrap">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          data={chartData}
          margin={{ top: 12, right: 12, left: 4, bottom: 4 }}
        >
          <CartesianGrid stroke="rgba(242, 247, 244, 0.08)" vertical={false} />
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
            label={{
              value: yAxisLabel,
              angle: -90,
              position: 'insideLeft',
              fill: '#b8c4bc',
              fontSize: 11,
            }}
          />
          <Tooltip
            contentStyle={{
              background: '#171d1a',
              border: '1px solid rgba(242, 247, 244, 0.12)',
              borderRadius: 0,
              color: '#f2f7f4',
            }}
            labelStyle={{ color: '#b8c4bc' }}
            formatter={(value, _name, item) => [
              formatRecordValue(value, item.payload.unit),
              'Result',
            ]}
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

export default ProgressChart
