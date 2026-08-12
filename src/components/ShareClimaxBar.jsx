import ShareMomentButton from './ShareMomentButton'
import { dismissShareMoment } from '../lib/shareMoments'

/**
 * Soft post-success share prompt (not a hard interrupt).
 */
function ShareClimaxBar({
  moment,
  onDismiss,
}) {
  if (!moment?.primary) return null

  return (
    <section
      className="share-climax-bar"
      aria-label={moment.climaxTitle || 'Share your result'}
    >
      <div className="share-climax-copy">
        <p className="share-climax-title">
          {moment.climaxTitle || 'Share your result'}
        </p>
        <p className="share-climax-body">
          {moment.climaxBody ||
            'Post a premium KinesoScore card — Instagram-ready.'}
        </p>
      </div>
      <div className="share-climax-actions">
        <ShareMomentButton
          type={moment.type || 'manual'}
          title={moment.title}
          primary={moment.primary}
          secondary={moment.secondary}
          filename={moment.filename}
          athleteName={moment.athleteName}
          awards={moment.awards}
          fitnessScore={moment.fitnessScore}
          strengthScore={moment.strengthScore}
          runningScore={moment.runningScore}
          label="Share image"
          className="btn btn-primary"
        />
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            if (moment.type) dismissShareMoment(moment.type)
            onDismiss?.()
          }}
        >
          Not now
        </button>
      </div>
    </section>
  )
}

export default ShareClimaxBar
