/* ─────────────────────────────────────────────────────────────
   EDIT THESE TO MATCH YOUR DETAILS
   ───────────────────────────────────────────────────────────── */
const COMPANY = 'Future Leaders';
const WEBSITE = 'futureleaderss.com';               // ← your website domain
const EFFECTIVE_DATE = 'June 2, 2026';
const LAST_UPDATED = 'June 2, 2026';
const SOCIALS = {
  telegram: 'https://t.me/Futureleaderss0',
  x: 'https://x.com/0Futureleaders',
  discord: 'https://discord.gg/SdP2sAD8zT',
};
/* ───────────────────────────────────────────────────────────── */

function Section({ n, title, children }) {
  return (
    <section className="mb-9">
      <h2 className="font-display font-black text-xl sm:text-2xl text-base-strong mb-4 flex items-baseline gap-3">
        <span className="text-gradient">{n}.</span>
        <span>{title}</span>
      </h2>
      <div className="space-y-4 text-base-muted text-sm sm:text-[15px] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

const Channels = () => (
  <>
    <a className="text-cyan-brand hover:underline" href={SOCIALS.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>,{' '}
    <a className="text-cyan-brand hover:underline" href={SOCIALS.x} target="_blank" rel="noopener noreferrer">X (Twitter)</a>, and{' '}
    <a className="text-cyan-brand hover:underline" href={SOCIALS.discord} target="_blank" rel="noopener noreferrer">Discord</a>
  </>
);

export default function PrivacyPolicy() {
  return (
    <main className="relative z-10 min-h-screen px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 pb-20">
      <div className="max-w-[1400px] mx-auto">
        {/* Title */}
        <div className="mb-10">
          <h1 className="section-title text-4xl sm:text-5xl md:text-6xl leading-tight text-base-strong mb-4">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs sm:text-sm text-base-faint font-display tracking-wider uppercase">
            <span>Effective Date: {EFFECTIVE_DATE}</span>
            <span>Last Updated: {LAST_UPDATED}</span>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 sm:p-10 lg:p-14">
          <Section n="1" title="General Provisions">
            <p>
              This Privacy Policy (the “Policy”) describes how {COMPANY} (the “Company”, “we”, “us”, “our”)
              collects, uses, stores, and protects the personal data of users of the website{' '}
              <span className="text-base-strong">{WEBSITE}</span> (the “Website”).
            </p>
            <p>
              By using the Website and submitting a request through our contact form, you confirm that you have read
              this Policy and consent to the processing of your personal data on the terms set forth below.
            </p>
            <p className="text-base-strong">Data Controller Contact Information:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="text-base-strong">Name:</span> {COMPANY}</li>
              <li><span className="text-base-strong">Official channels for data protection inquiries:</span> <Channels /></li>
            </ul>
          </Section>

          <Section n="2" title="Personal Data We Collect">
            <p>
              Through the “Start Your Project” form on the Website, we collect the following personal data that you
              voluntarily provide to us:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Project name;</li>
              <li>Contact name (or alias);</li>
              <li>Email address;</li>
              <li>Your preferred contact method and the related username or handle (Telegram, Discord, Twitter/X, or email);</li>
              <li>A link to your project (website or social media), if you choose to share one;</li>
              <li>Details about your project — its stage, the services you are interested in, and your required timeline;</li>
              <li>Source information: how you heard about us.</li>
            </ul>
            <p>
              We do not collect special categories of personal data (health data, political opinions, religious beliefs,
              biometric data, etc.).
            </p>
            <p>
              Limited technical data (such as IP address, browser type, and access time) may be processed by our hosting
              and infrastructure providers for security and basic functionality purposes.
            </p>
          </Section>

          <Section n="3" title="Purposes of Processing and Legal Basis">
            <p>We process your personal data for the following purposes and on the following legal bases:</p>
            <div className="overflow-x-auto rounded-2xl border border-base">
              <table className="w-full text-left text-sm">
                <thead className="bg-cyan-brand/5">
                  <tr className="border-b border-base">
                    <th className="px-4 py-3 font-display text-xs uppercase tracking-wider text-base-strong">Purpose</th>
                    <th className="px-4 py-3 font-display text-xs uppercase tracking-wider text-base-strong">Legal Basis</th>
                  </tr>
                </thead>
                <tbody className="text-base-muted">
                  {[
                    ['Contacting you to discuss potential cooperation', 'Your consent (Art. 6(1)(a) GDPR)'],
                    ['Pre-contractual measures and project negotiations', 'Pre-contractual steps at your request (Art. 6(1)(b) GDPR)'],
                    ['Bookkeeping and accounting', 'Compliance with legal obligations (Art. 6(1)(c) GDPR)'],
                    ['Protection against fraud and form abuse', 'Legitimate interest (Art. 6(1)(f) GDPR)'],
                  ].map(([purpose, basis]) => (
                    <tr key={purpose} className="border-b border-base last:border-none align-top">
                      <td className="px-4 py-3">{purpose}</td>
                      <td className="px-4 py-3">{basis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              If you are a resident of the EU/EEA, the United Kingdom, or another jurisdiction applying GDPR/UK GDPR,
              the processing of your data is carried out in accordance with these regulations. For users in other
              regions, we process your data in accordance with the applicable data protection laws of our operating
              jurisdiction.
            </p>
          </Section>

          <Section n="4" title="Data Retention Period">
            <p>
              We store your personal data for the duration of negotiations and cooperation, plus 1 (one) year after
              their completion — for accounting purposes and to resolve potential disputes.
            </p>
            <p>
              After this period, your data will be deleted or anonymized, except where applicable law requires a longer
              retention period. You may request the deletion of your data earlier than the specified period at any time
              (see Section 7).
            </p>
          </Section>

          <Section n="5" title="Disclosure to Third Parties">
            <p>We do not sell, rent, or trade your personal data to third parties for marketing purposes.</p>
            <p>
              However, in the course of our work, we rely on the following data processors, who may access your data
              solely to the extent necessary to perform their functions:
            </p>
            <div className="overflow-x-auto rounded-2xl border border-base">
              <table className="w-full text-left text-sm">
                <thead className="bg-cyan-brand/5">
                  <tr className="border-b border-base">
                    <th className="px-4 py-3 font-display text-xs uppercase tracking-wider text-base-strong">Service</th>
                    <th className="px-4 py-3 font-display text-xs uppercase tracking-wider text-base-strong">Purpose</th>
                    <th className="px-4 py-3 font-display text-xs uppercase tracking-wider text-base-strong">Location</th>
                  </tr>
                </thead>
                <tbody className="text-base-muted">
                  {[
                    ['Supabase', 'Database hosting and storage of form submissions', 'Cloud infrastructure (regional data centers)'],
                    ['Website hosting provider', 'Serving the Website and processing basic technical requests', 'International'],
                    ['Telegram, Discord, X (Twitter)', 'Communicating with you if you choose to contact us there', 'International infrastructure'],
                  ].map(([service, purpose, location]) => (
                    <tr key={service} className="border-b border-base last:border-none align-top">
                      <td className="px-4 py-3 text-base-strong">{service}</td>
                      <td className="px-4 py-3">{purpose}</td>
                      <td className="px-4 py-3">{location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              All listed services maintain their own privacy policies, and we strive to work only with providers that
              ensure an adequate level of data protection. We may disclose your data to government authorities only in
              cases expressly provided for by law.
            </p>
          </Section>

          <Section n="6" title="International Data Transfers">
            <p>
              Because the services we use are located in various jurisdictions, submitting a request through the Website
              may involve the international transfer of personal data.
            </p>
            <p>
              For users in the EU/EEA: such transfers are carried out on the basis of your explicit consent
              (Art. 49(1)(a) GDPR), which you provide by submitting the form. We take reasonable measures to ensure data
              security during transfer, including the use of encrypted connections (HTTPS/TLS).
            </p>
          </Section>

          <Section n="7" title="Your Rights">
            <p>Depending on your location, you have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="text-base-strong">Right of access</span> — to confirm whether your data is processed and to receive a copy;</li>
              <li><span className="text-base-strong">Right to rectification</span> — to request correction of inaccurate or incomplete data;</li>
              <li><span className="text-base-strong">Right to erasure</span> (“right to be forgotten”) — to request deletion of your data;</li>
              <li><span className="text-base-strong">Right to restriction of processing</span> — to request suspension of processing in certain cases;</li>
              <li><span className="text-base-strong">Right to data portability</span> — to receive your data in a structured, machine-readable format;</li>
              <li><span className="text-base-strong">Right to object</span> — to object to processing based on legitimate interest;</li>
              <li><span className="text-base-strong">Right to withdraw consent</span> — at any time, without affecting the lawfulness of processing prior to withdrawal;</li>
              <li><span className="text-base-strong">Right to lodge a complaint</span> with the data protection supervisory authority of your country.</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us through our official community channels (<Channels />).
              We will respond to your request within 30 days.
            </p>
          </Section>

          <Section n="8" title="Cookies and Analytics">
            <p>
              The Website uses only the technical cookies and local storage necessary for its basic operation (for
              example, to remember your light/dark theme preference). We do not use advertising pixels or third-party
              behavioral tracking. Any analytics we may use are limited to aggregated, non-identifying usage statistics.
            </p>
          </Section>

          <Section n="9" title="Data Security">
            <p>
              We apply reasonable technical and organizational measures to protect your personal data from unauthorized
              access, alteration, disclosure, or destruction, including:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>transmitting data through an encrypted connection (HTTPS/TLS);</li>
              <li>limiting access to data to people who need it to perform their functions;</li>
              <li>relying on reputable data processing and storage services.</li>
            </ul>
            <p>
              Despite the measures taken, no method of transmitting data over the Internet is absolutely secure. We
              cannot guarantee absolute protection, but we undertake to notify you promptly in the event of a data
              breach, in accordance with applicable law.
            </p>
          </Section>

          <Section n="10" title="Children">
            <p>
              The Website is not intended for persons under 18 years of age. We do not knowingly collect personal data
              from minors. If you become aware that a minor has provided us with their data, please contact us and we
              will delete it.
            </p>
          </Section>

          <Section n="11" title="Changes to This Policy">
            <p>
              We reserve the right to modify this Policy. The current version is always available on this page, and the
              date of the last update is indicated at the top of the document. In case of material changes, we will
              endeavor to notify users additionally.
            </p>
          </Section>

          <Section n="12" title="Contact">
            <p>For any questions related to the processing of personal data, please contact us:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="text-base-strong">Company:</span> {COMPANY}</li>
              <li><span className="text-base-strong">Community channels:</span> <Channels /></li>
            </ul>
          </Section>
        </div>
      </div>
    </main>
  );
}
