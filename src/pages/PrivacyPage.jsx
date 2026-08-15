import { BRAND } from '../data/brand'
import { pathForTab } from '../data/seo'

const EFFECTIVE_DATE = 'August 7, 2026'

function PrivacyPage({ onOpenTab }) {
  const handleLink = (event, tab) => {
    if (
      !onOpenTab ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }
    event.preventDefault()
    onOpenTab(tab)
  }

  return (
    <main className="page about-page">
      <header className="page-header">
        <p className="page-eyebrow">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="page-lead">
          How {BRAND.short} collects, uses, and protects information when you
          use our educational fitness platform.
        </p>
        <p className="about-intro">Effective date: {EFFECTIVE_DATE}</p>
      </header>

      <section className="about-section" aria-labelledby="privacy-overview">
        <h2 id="privacy-overview" className="result-section-title">
          Overview
        </h2>
        <p>
          {BRAND.full} (“{BRAND.short},” “we,” “us,” or “our”) provides free
          educational fitness calculators and optional progress tracking. You
          can use many calculators without creating an account. If you create an
          account, we store the information needed to authenticate you and save
          your results.
        </p>
        <p>
          This Privacy Policy explains what we collect, why we collect it, and
          the choices you have. It is written for a small consumer fitness
          website and is not a substitute for personalized legal advice.
        </p>
      </section>

      <section className="about-section" aria-labelledby="privacy-educational">
        <h2 id="privacy-educational" className="result-section-title">
          Educational platform notice
        </h2>
        <p>
          {BRAND.short} is an educational fitness performance platform. Our
          calculators produce estimates for training insight and progress
          tracking. They are not medical devices, not medical advice, and not
          official military scorecards or certification systems.
        </p>
      </section>

      <section className="about-section" aria-labelledby="privacy-collect">
        <h2 id="privacy-collect" className="result-section-title">
          Information we collect
        </h2>
        <p>Depending on how you use {BRAND.short}, we may collect:</p>
        <ul className="about-notes">
          <li>
            <strong>Account information.</strong> Email address, password
            (stored by our authentication provider in hashed form), and optional
            profile details such as first name and a preset profile icon.
          </li>
          <li>
            <strong>Saved fitness data.</strong> Calculator inputs and results
            you choose to save (for example strength lifts, race times,{' '}
            {BRAND.scoreName}, VO₂ estimates, BMI, fitness age, or military
            assessment estimates), plus shared preferences such as units or
            default form values.
          </li>
          <li>
            <strong>Optional public leaderboard data.</strong> If you create a
            Leaderboard Name and opt in to share, we may show that name, your
            preset profile icon, the shared result or habit streak, and (unless
            you hide them) medal tiers next to your name. Email and legal name
            stay private.
          </li>
          <li>
            <strong>Technical data.</strong> Standard web logs and device
            information typically collected by hosting and authentication
            providers (for example IP address, browser type, and approximate
            timestamps) to operate and secure the service.
          </li>
        </ul>
        <p>
          If you use calculators without signing in, results generally remain on
          your device session and are not saved to your account.
        </p>
      </section>

      <section className="about-section" aria-labelledby="privacy-use">
        <h2 id="privacy-use" className="result-section-title">
          How we use information
        </h2>
        <ul className="about-notes">
          <li>Provide, maintain, and improve the {BRAND.short} website and calculators.</li>
          <li>Create and authenticate accounts, and restore your session.</li>
          <li>Save and display your progress history and dashboard when you are signed in.</li>
          <li>
            Respond to support, business inquiries, or developer feedback you
            send us.
          </li>
          <li>Protect against abuse, fraud, and security incidents.</li>
          <li>Comply with applicable law when required.</li>
        </ul>
        <p>
          We do not sell your personal information. We do not use your saved
          fitness results to provide medical diagnosis or official military
          testing.
        </p>
      </section>

      <section className="about-section" aria-labelledby="privacy-providers">
        <h2 id="privacy-providers" className="result-section-title">
          Service providers
        </h2>
        <p>
          We use trusted third-party infrastructure to run {BRAND.short}. In
          particular, authentication and cloud database services (currently
          Supabase) help us create accounts, manage sessions, send account
          emails such as confirmation or password reset messages, and store
          saved performance records and preferences associated with your user
          id.
        </p>
        <p>
          Hosting and related vendors may process technical data needed to
          deliver the website. These providers process data on our behalf under
          their own terms and security practices.
        </p>
      </section>

      <section className="about-section" aria-labelledby="privacy-retention">
        <h2 id="privacy-retention" className="result-section-title">
          Retention and account deletion
        </h2>
        <p>
          We retain account and saved fitness data while your account remains
          active, or as needed to operate the service and meet legal
          obligations. You may delete your account from Account settings when
          signed in. Account deletion is designed to remove your authentication
          account and associated saved records and preferences from our
          application database, subject to residual backups or logs retained for
          a limited period by infrastructure providers.
        </p>
        <p>
          After deletion, local browser copies of preferences on that device are
          also cleared when deletion completes successfully in the app.
        </p>
      </section>

      <section className="about-section" aria-labelledby="privacy-choices">
        <h2 id="privacy-choices" className="result-section-title">
          Your choices
        </h2>
        <ul className="about-notes">
          <li>Use many calculators without creating an account.</li>
          <li>Update profile details available in your account settings.</li>
          <li>Save or delete individual performance records where tracking is offered.</li>
          <li>Reset your password using the email reset flow.</li>
          <li>Delete your account when you no longer want to use saved progress.</li>
        </ul>
      </section>

      <section className="about-section" aria-labelledby="privacy-security">
        <h2 id="privacy-security" className="result-section-title">
          Security
        </h2>
        <p>
          We use industry-standard practices appropriate for a small web
          application, including encrypted transport (HTTPS) and authentication
          handled by our provider. No method of transmission or storage is
          completely secure. Please use a strong unique password and protect
          access to your email account.
        </p>
      </section>

      <section className="about-section" aria-labelledby="privacy-children">
        <h2 id="privacy-children" className="result-section-title">
          Children
        </h2>
        <p>
          {BRAND.short} is not directed to children under 13, and we do not
          knowingly collect personal information from children under 13. If you
          believe a child has provided personal information, contact us and we
          will take reasonable steps to delete it.
        </p>
      </section>

      <section className="about-section" aria-labelledby="privacy-changes">
        <h2 id="privacy-changes" className="result-section-title">
          Changes
        </h2>
        <p>
          We may update this Privacy Policy from time to time. When we do, we
          will revise the effective date above and post the updated policy on
          this page. Continued use of {BRAND.short} after changes means you
          acknowledge the updated policy.
        </p>
      </section>

      <section
        className="about-section business-inquiry"
        aria-labelledby="privacy-contact"
      >
        <h2 id="privacy-contact" className="result-section-title">
          Contact
        </h2>
        <p className="business-copy">
          Questions about privacy may be sent to{' '}
          <a
            className="business-email-inline"
            href={`mailto:${BRAND.businessEmail}`}
          >
            {BRAND.businessEmail}
          </a>
          . You can also review our{' '}
          <a
            className="seo-intro-link"
            href={pathForTab('terms')}
            onClick={(event) => handleLink(event, 'terms')}
          >
            Terms of Service
          </a>
          .
        </p>
      </section>
    </main>
  )
}

export default PrivacyPage
