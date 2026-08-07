import { BRAND } from '../data/brand'
import { pathForTab } from '../data/seo'

const EFFECTIVE_DATE = 'August 7, 2026'

function TermsPage({ onOpenTab }) {
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
        <h1>Terms of Service</h1>
        <p className="page-lead">
          The rules for using {BRAND.short}, our educational fitness calculators,
          and optional account features.
        </p>
        <p className="about-intro">Effective date: {EFFECTIVE_DATE}</p>
      </header>

      <section className="about-section" aria-labelledby="terms-agreement">
        <h2 id="terms-agreement" className="result-section-title">
          Agreement
        </h2>
        <p>
          By accessing or using {BRAND.full} (“{BRAND.short},” “we,” “us,” or
          “our”), you agree to these Terms of Service. If you do not agree, do
          not use the website or create an account.
        </p>
        <p>
          These terms are intended for a normal small fitness SaaS / consumer
          website. They are not a substitute for personalized legal counsel.
        </p>
      </section>

      <section className="about-section" aria-labelledby="terms-service">
        <h2 id="terms-service" className="result-section-title">
          The service
        </h2>
        <p>
          {BRAND.short} is an educational fitness performance platform. We offer
          calculators and related tools for strength, running, cardiovascular
          fitness, body metrics, {BRAND.scoreName}, and military-style
          assessment estimates, along with optional progress tracking when you
          create an account.
        </p>
        <p>
          Features may change, improve, or be discontinued over time. We may
          update formulas, reference tables, or interface details as we refine
          the product.
        </p>
      </section>

      <section className="about-section" aria-labelledby="terms-educational">
        <h2 id="terms-educational" className="result-section-title">
          Educational estimates — not medical or official testing
        </h2>
        <ul className="about-notes">
          <li>
            Calculator outputs are estimates for education, training insight, and
            personal tracking.
          </li>
          <li>
            {BRAND.short} does not provide medical advice, diagnosis, or
            treatment. Always consult a qualified professional for health
            decisions.
          </li>
          <li>
            Military assessment tools are unofficial training aids. They are not
            official Army, Marine Corps, Navy, Air Force, or other service
            scorecards, and they are not a substitute for official testing
            procedures.
          </li>
          <li>
            Field-test estimates (for example VO₂ max, fitness age, 1RM, or race
            predictions) can differ from laboratory or competition results.
          </li>
        </ul>
      </section>

      <section className="about-section" aria-labelledby="terms-accounts">
        <h2 id="terms-accounts" className="result-section-title">
          Accounts
        </h2>
        <p>
          Some features, such as saving results and viewing your dashboard,
          require an account. You agree to provide accurate registration
          information, keep your login credentials confidential, and notify us
          if you suspect unauthorized access.
        </p>
        <p>
          Account authentication and data storage are provided through our cloud
          infrastructure (currently Supabase). You are responsible for activity
          that occurs under your account. You may delete your account from
          Account settings, subject to the process described in our{' '}
          <a
            className="seo-intro-link"
            href={pathForTab('privacy')}
            onClick={(event) => handleLink(event, 'privacy')}
          >
            Privacy Policy
          </a>
          .
        </p>
      </section>

      <section className="about-section" aria-labelledby="terms-acceptable">
        <h2 id="terms-acceptable" className="result-section-title">
          Acceptable use
        </h2>
        <p>You agree not to:</p>
        <ul className="about-notes">
          <li>Use the service for unlawful, harmful, or abusive purposes.</li>
          <li>Attempt to break, overload, or reverse engineer the service except as allowed by law.</li>
          <li>Interfere with other users or with our authentication or database systems.</li>
          <li>Misrepresent {BRAND.short} outputs as official medical results or official military scores.</li>
          <li>Scrape or automate access in a way that degrades the service for others.</li>
        </ul>
      </section>

      <section className="about-section" aria-labelledby="terms-ip">
        <h2 id="terms-ip" className="result-section-title">
          Intellectual property
        </h2>
        <p>
          The {BRAND.short} name, {BRAND.scoreName} branding, site design, and
          original content are owned by us or our licensors. You may use the
          website for personal, non-commercial fitness education. You may not
          copy, resell, or redistribute the service as your own product without
          permission.
        </p>
        <p>
          Third-party methods, datasets, and standards referenced on the site
          remain the property of their respective owners and are cited for
          educational transparency.
        </p>
      </section>

      <section className="about-section" aria-labelledby="terms-disclaimer">
        <h2 id="terms-disclaimer" className="result-section-title">
          Disclaimers
        </h2>
        <p>
          The service is provided “as is” and “as available.” To the fullest
          extent permitted by law, we disclaim warranties of merchantability,
          fitness for a particular purpose, and non-infringement. We do not
          warrant that estimates will be accurate, complete, or suitable for any
          specific training, medical, or military purpose.
        </p>
      </section>

      <section className="about-section" aria-labelledby="terms-liability">
        <h2 id="terms-liability" className="result-section-title">
          Limitation of liability
        </h2>
        <p>
          To the fullest extent permitted by law, {BRAND.short} and its
          operators will not be liable for indirect, incidental, special,
          consequential, or punitive damages, or for lost profits, data, or
          training outcomes arising from your use of the service. Our total
          liability for any claim relating to the service will not exceed the
          greater of (a) the amount you paid us for the service in the twelve
          months before the claim or (b) zero dollars if the service is provided
          free of charge.
        </p>
      </section>

      <section className="about-section" aria-labelledby="terms-indemnity">
        <h2 id="terms-indemnity" className="result-section-title">
          Indemnity
        </h2>
        <p>
          You agree to indemnify and hold harmless {BRAND.short} and its
          operators from claims arising out of your misuse of the service, your
          violation of these terms, or your reliance on calculator estimates for
          medical, employment, or official testing decisions.
        </p>
      </section>

      <section className="about-section" aria-labelledby="terms-law">
        <h2 id="terms-law" className="result-section-title">
          Governing law
        </h2>
        <p>
          These terms are governed by the laws applicable in the jurisdiction
          where the service operator principally resides, without regard to
          conflict-of-law rules, except where mandatory consumer protections in
          your location apply.
        </p>
      </section>

      <section className="about-section" aria-labelledby="terms-changes">
        <h2 id="terms-changes" className="result-section-title">
          Changes
        </h2>
        <p>
          We may update these Terms of Service from time to time. When we do, we
          will revise the effective date above and post the updated terms on
          this page. Continued use of {BRAND.short} after changes means you
          accept the updated terms.
        </p>
      </section>

      <section
        className="about-section business-inquiry"
        aria-labelledby="terms-contact"
      >
        <h2 id="terms-contact" className="result-section-title">
          Contact
        </h2>
        <p className="business-copy">
          Questions about these terms may be sent to{' '}
          <a
            className="business-email-inline"
            href={`mailto:${BRAND.businessEmail}`}
          >
            {BRAND.businessEmail}
          </a>
          . See also our{' '}
          <a
            className="seo-intro-link"
            href={pathForTab('privacy')}
            onClick={(event) => handleLink(event, 'privacy')}
          >
            Privacy Policy
          </a>
          .
        </p>
      </section>
    </main>
  )
}

export default TermsPage
