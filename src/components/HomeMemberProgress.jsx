import { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { BRAND } from '../data/brand'
import {
  buildDashboardModel,
  loadDashboardRecords,
} from '../lib/dashboardData'

/**
 * Compact signed-in home progress moment — latest myKinesoScore™ or recent save.
 */
function HomeMemberProgress({ onOpenTab }) {
  const { user } = useAuth()
  const [status, setStatus] = useState('loading')
  const [moment, setMoment] = useState(null)

  useEffect(() => {
    if (!user?.id) return undefined
    let cancelled = false

    loadDashboardRecords(user.id)
      .then((records) => {
        if (cancelled) return
        const model = buildDashboardModel(records)
        if (!model.hasAnyData) {
          setMoment(null)
          setStatus('empty')
          return
        }

        if (model.fpcScore) {
          const trend = model.fpcScore.trend
          const trendBit =
            trend && trend.value && trend.value !== '—'
              ? `${trend.label} ${trend.value}`
              : null
          setMoment({
            eyebrow: BRAND.scoreName,
            primary: model.fpcScore.primary,
            secondary: model.fpcScore.secondary,
            trendLabel: trendBit,
            tab: 'dashboard',
            cta: 'Open Dashboard',
          })
          setStatus('ready')
          return
        }

        const latest = model.recentActivity?.[0]
        if (latest) {
          setMoment({
            eyebrow: 'Latest save',
            primary: latest.title || 'Saved result',
            secondary: [latest.valueLabel, latest.dateLabel]
              .filter(Boolean)
              .join(' · '),
            trendLabel: null,
            tab: latest.tab || 'dashboard',
            cta: 'Continue',
          })
          setStatus('ready')
          return
        }

        setMoment(null)
        setStatus('empty')
      })
      .catch(() => {
        if (!cancelled) setStatus('empty')
      })

    return () => {
      cancelled = true
    }
  }, [user?.id])

  if (status === 'loading') {
    return (
      <section
        className="home-member-progress"
        aria-label="Your progress"
        aria-busy="true"
      >
        <p className="calc-hint">Loading your progress…</p>
      </section>
    )
  }

  if (status === 'empty' || !moment) {
    return (
      <section className="home-member-progress" aria-label="Your progress">
        <p className="home-member-progress-eyebrow">Your progress</p>
        <p className="home-member-progress-primary">No saves yet</p>
        <p className="home-member-progress-secondary">
          Run a calculator and save a result — trends show up here and on your
          Dashboard.
        </p>
        <button
          type="button"
          className="btn btn-primary home-member-progress-cta"
          onClick={() => onOpenTab?.('scoring')}
        >
          Open {BRAND.scoreName}
        </button>
      </section>
    )
  }

  return (
    <section className="home-member-progress" aria-label="Your progress">
      <p className="home-member-progress-eyebrow">{moment.eyebrow}</p>
      <p className="home-member-progress-primary">{moment.primary}</p>
      <p className="home-member-progress-secondary">
        {moment.secondary}
        {moment.trendLabel ? ` · ${moment.trendLabel}` : ''}
      </p>
      <button
        type="button"
        className="btn btn-primary home-member-progress-cta"
        onClick={() => onOpenTab?.(moment.tab)}
      >
        {moment.cta}
      </button>
    </section>
  )
}

export default HomeMemberProgress
