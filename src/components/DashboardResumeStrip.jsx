import { useEffect, useState } from 'react'
import {
  peekLastCalculatorTab,
  resumeLabelForTab,
} from '../lib/lastCalculator'
import {
  buildDashboardModel,
  loadDashboardRecords,
} from '../lib/dashboardData'

/**
 * One-tap resume: last visited calculator, else latest save.
 */
function DashboardResumeStrip({ userId, onOpenTab }) {
  const [resume, setResume] = useState(null)

  useEffect(() => {
    if (!userId) {
      setResume(null)
      return undefined
    }

    let cancelled = false
    const remembered = peekLastCalculatorTab(userId)

    if (remembered) {
      setResume({
        tab: remembered,
        label: resumeLabelForTab(remembered),
        detail: 'Pick up where you left off',
      })
      return undefined
    }

    loadDashboardRecords(userId)
      .then((records) => {
        if (cancelled) return
        const latest = buildDashboardModel(records).recentActivity?.[0]
        if (!latest?.tab) {
          setResume(null)
          return
        }
        setResume({
          tab: latest.tab,
          label: resumeLabelForTab(latest.tab) || latest.title,
          detail: [latest.valueLabel, latest.dateLabel].filter(Boolean).join(' · '),
        })
      })
      .catch(() => {
        if (!cancelled) setResume(null)
      })

    return () => {
      cancelled = true
    }
  }, [userId])

  if (!resume) return null

  return (
    <section
      className="dashboard-section account-card dashboard-resume-strip"
      aria-labelledby="dash-resume"
    >
      <h2 id="dash-resume" className="result-section-title">
        Continue
      </h2>
      <p className="dashboard-resume-line">
        <strong>{resume.label}</strong>
        {resume.detail ? (
          <span className="dashboard-resume-detail"> — {resume.detail}</span>
        ) : null}
      </p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => onOpenTab?.(resume.tab)}
      >
        Open {resume.label}
      </button>
    </section>
  )
}

export default DashboardResumeStrip
