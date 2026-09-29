import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Shield, Lock, FileText, CheckCircle2, ExternalLink } from "lucide-react";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Future Leaders",
  description:
    "This Privacy Policy describes how Future Leaders collects, uses, stores, and protects personal data on futureleaderss.com.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#060D24] text-slate-100 selection:bg-purple-600 selection:text-white flex flex-col font-sans">
      {/* Ambient Web3 Glows */}
      <div className="fixed inset-0 pointer-events-none -z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/3 w-[550px] h-[550px] bg-cyan-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Top Floating Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-[#060D24]/80 backdrop-blur-md border-b border-blue-900/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <Logo color="white" size="md" />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
            >
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Privacy Policy Content */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-20">
        {/* Document Header Card */}
        <div className="mb-12 p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0B1A3F] to-[#071330] border border-blue-700/40 shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-4">
            <Shield size={14} className="text-cyan-400" />
            <span>Official Legal Document</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Privacy Policy
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400">
            <div>
              <span className="font-semibold text-slate-300">Effective Date:</span> June 2, 2026
            </div>
            <span className="text-slate-600">•</span>
            <div>
              <span className="font-semibold text-slate-300">Last Updated:</span> June 2, 2026
            </div>
          </div>
        </div>

        {/* Policy Body */}
        <div className="space-y-10 text-slate-300 leading-relaxed text-sm sm:text-base">
          {/* Section 1 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-[#091538]/70 border border-blue-900/40">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="text-cyan-400 font-mono text-lg">1.</span>
              <span>General Provisions</span>
            </h2>
            <p className="mb-4">
              This Privacy Policy (the &ldquo;Policy&rdquo;) describes how <strong>Future Leaders</strong> (the &ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) collects, uses, stores, and protects the personal data of users of the website <strong>futureleaderss.com</strong> (the &ldquo;Website&rdquo;).
            </p>
            <p className="mb-6">
              By using the Website and submitting a request through our contact form, you confirm that you have read this Policy and consent to the processing of your personal data on the terms set forth below.
            </p>
            <div className="p-4 rounded-xl bg-blue-950/60 border border-blue-800/50">
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2">
                Data Controller Contact Information
              </div>
              <p className="text-slate-200 font-medium">Name: Future Leaders</p>
              <p className="text-slate-300 text-sm mt-1">
                Official channels for data protection inquiries:{" "}
                <a
                  href="https://t.me/Futureleaderss0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline font-medium inline-flex items-center gap-0.5 ml-1"
                >
                  Telegram <ExternalLink size={12} />
                </a>
                ,{" "}
                <a
                  href="https://x.com/0Futureleaders"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline font-medium inline-flex items-center gap-0.5"
                >
                  X (Twitter) <ExternalLink size={12} />
                </a>
                , and{" "}
                <a
                  href="https://discord.gg/SdP2sAD8zT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline font-medium inline-flex items-center gap-0.5"
                >
                  Discord <ExternalLink size={12} />
                </a>
                .
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-[#091538]/70 border border-blue-900/40">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="text-cyan-400 font-mono text-lg">2.</span>
              <span>Personal Data We Collect</span>
            </h2>
            <p className="mb-4">
              Through the &ldquo;Start Your Project&rdquo; form on the Website, we collect the following personal data that you voluntarily provide to us:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
              {[
                "Project name",
                "Contact name (or alias)",
                "Email address",
                "Your preferred contact method and the related username or handle (Telegram, Discord, Twitter/X, or email)",
                "A link to your project (website or social media), if you choose to share one",
                "Details about your project — its stage, the services you are interested in, and your required timeline",
                "Source information: how you heard about us",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-950/40 border border-blue-900/30 text-xs sm:text-sm text-slate-200"
                >
                  <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mb-3 text-sm text-slate-400">
              We do not collect special categories of personal data (health data, political opinions, religious beliefs, biometric data, etc.).
            </p>
            <p className="text-sm text-slate-400">
              Limited technical data (such as IP address, browser type, and access time) may be processed by our hosting and infrastructure providers for security and basic functionality purposes.
            </p>
          </section>

          {/* Section 3 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-[#091538]/70 border border-blue-900/40">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="text-cyan-400 font-mono text-lg">3.</span>
              <span>Purposes of Processing and Legal Basis</span>
            </h2>
            <p className="mb-6">
              We process your personal data for the following purposes and on the following legal bases:
            </p>
            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-blue-800/60 mb-6">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#0D2152] text-cyan-300 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5 sm:p-4 border-b border-blue-800/80">Purpose</th>
                    <th className="p-3.5 sm:p-4 border-b border-blue-800/80">Legal Basis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-900/40">
                  <tr className="hover:bg-blue-950/40 transition-colors">
                    <td className="p-3.5 sm:p-4 text-slate-200 font-medium">Contacting you to discuss potential cooperation</td>
                    <td className="p-3.5 sm:p-4 text-slate-300">Your consent (Art. 6(1)(a) GDPR)</td>
                  </tr>
                  <tr className="hover:bg-blue-950/40 transition-colors">
                    <td className="p-3.5 sm:p-4 text-slate-200 font-medium">Pre-contractual measures and project negotiations</td>
                    <td className="p-3.5 sm:p-4 text-slate-300">Pre-contractual steps at your request (Art. 6(1)(b) GDPR)</td>
                  </tr>
                  <tr className="hover:bg-blue-950/40 transition-colors">
                    <td className="p-3.5 sm:p-4 text-slate-200 font-medium">Bookkeeping and accounting</td>
                    <td className="p-3.5 sm:p-4 text-slate-300">Compliance with legal obligations (Art. 6(1)(c) GDPR)</td>
                  </tr>
                  <tr className="hover:bg-blue-950/40 transition-colors">
                    <td className="p-3.5 sm:p-4 text-slate-200 font-medium">Protection against fraud and form abuse</td>
                    <td className="p-3.5 sm:p-4 text-slate-300">Legitimate interest (Art. 6(1)(f) GDPR)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              If you are a resident of the EU/EEA, the United Kingdom, or another jurisdiction applying GDPR/UK GDPR, the processing of your data is carried out in accordance with these regulations. For users in other regions, we process your data in accordance with the applicable data protection laws of our operating jurisdiction.
            </p>
          </section>

          {/* Section 4 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-[#091538]/70 border border-blue-900/40">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="text-cyan-400 font-mono text-lg">4.</span>
              <span>Data Retention Period</span>
            </h2>
            <p className="mb-4">
              We store your personal data for the duration of negotiations and cooperation, plus <strong>1 (one) year</strong> after their completion — for accounting purposes and to resolve potential disputes.
            </p>
            <p className="text-sm text-slate-400">
              After this period, your data will be deleted or anonymized, except where applicable law requires a longer retention period. You may request the deletion of your data earlier than the specified period at any time (see Section 7).
            </p>
          </section>

          {/* Section 5 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-[#091538]/70 border border-blue-900/40">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="text-cyan-400 font-mono text-lg">5.</span>
              <span>Disclosure to Third Parties</span>
            </h2>
            <p className="mb-4">
              We do not sell, rent, or trade your personal data to third parties for marketing purposes.
            </p>
            <p className="mb-6">
              However, in the course of our work, we rely on the following data processors, who may access your data solely to the extent necessary to perform their functions:
            </p>
            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-blue-800/60 mb-6">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#0D2152] text-cyan-300 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5 sm:p-4 border-b border-blue-800/80">Service</th>
                    <th className="p-3.5 sm:p-4 border-b border-blue-800/80">Purpose</th>
                    <th className="p-3.5 sm:p-4 border-b border-blue-800/80">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-900/40">
                  <tr className="hover:bg-blue-950/40 transition-colors">
                    <td className="p-3.5 sm:p-4 text-slate-200 font-bold">Supabase</td>
                    <td className="p-3.5 sm:p-4 text-slate-300">Database hosting and storage of form submissions</td>
                    <td className="p-3.5 sm:p-4 text-slate-400">Cloud infrastructure (regional data centers)</td>
                  </tr>
                  <tr className="hover:bg-blue-950/40 transition-colors">
                    <td className="p-3.5 sm:p-4 text-slate-200 font-bold">Website hosting provider</td>
                    <td className="p-3.5 sm:p-4 text-slate-300">Serving the Website and processing basic technical requests</td>
                    <td className="p-3.5 sm:p-4 text-slate-400">International</td>
                  </tr>
                  <tr className="hover:bg-blue-950/40 transition-colors">
                    <td className="p-3.5 sm:p-4 text-slate-200 font-bold">Telegram, Discord, X (Twitter)</td>
                    <td className="p-3.5 sm:p-4 text-slate-300">Communicating with you if you choose to contact us there</td>
                    <td className="p-3.5 sm:p-4 text-slate-400">International infrastructure</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              All listed services maintain their own privacy policies, and we strive to work only with providers that ensure an adequate level of data protection. We may disclose your data to government authorities only in cases expressly provided for by law.
            </p>
          </section>

          {/* Section 6 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-[#091538]/70 border border-blue-900/40">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="text-cyan-400 font-mono text-lg">6.</span>
              <span>International Data Transfers</span>
            </h2>
            <p className="mb-4">
              Because the services we use are located in various jurisdictions, submitting a request through the Website may involve the international transfer of personal data.
            </p>
            <p className="text-sm text-slate-400">
              For users in the EU/EEA: such transfers are carried out on the basis of your explicit consent (Art. 49(1)(a) GDPR), which you provide by submitting the form. We take reasonable measures to ensure data security during transfer, including the use of encrypted connections (HTTPS/TLS).
            </p>
          </section>

          {/* Section 7 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-[#091538]/70 border border-blue-900/40">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="text-cyan-400 font-mono text-lg">7.</span>
              <span>Your Rights</span>
            </h2>
            <p className="mb-5">
              Depending on your location, you have the following rights regarding your personal data:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { title: "Right of access", desc: "To confirm whether your data is processed and to receive a copy;" },
                { title: "Right to rectification", desc: "To request correction of inaccurate or incomplete data;" },
                { title: "Right to erasure (“right to be forgotten”)", desc: "To request deletion of your data;" },
                { title: "Right to restriction of processing", desc: "To request suspension of processing in certain cases;" },
                { title: "Right to data portability", desc: "To receive your data in a structured, machine-readable format;" },
                { title: "Right to object", desc: "To object to processing based on legitimate interest;" },
                { title: "Right to withdraw consent", desc: "At any time, without affecting the lawfulness of processing prior to withdrawal;" },
                { title: "Right to lodge a complaint", desc: "With the data protection supervisory authority of your country." },
              ].map((right, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-900/30">
                  <div className="text-sm font-bold text-white mb-1">{right.title}</div>
                  <div className="text-xs text-slate-300">{right.desc}</div>
                </div>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              To exercise any of these rights, please contact us through our official community channels (
              <a
                href="https://t.me/Futureleaderss0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline font-medium"
              >
                Telegram
              </a>
              ,{" "}
              <a
                href="https://x.com/0Futureleaders"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline font-medium"
              >
                X (Twitter)
              </a>
              , and{" "}
              <a
                href="https://discord.gg/SdP2sAD8zT"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline font-medium"
              >
                Discord
              </a>
              ). We will respond to your request within 30 days.
            </p>
          </section>

          {/* Section 8 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-[#091538]/70 border border-blue-900/40">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="text-cyan-400 font-mono text-lg">8.</span>
              <span>Cookies and Analytics</span>
            </h2>
            <p>
              The Website uses only the technical cookies and local storage necessary for its basic operation (for example, to remember your light/dark theme preference). We do not use advertising pixels or third-party behavioral tracking. Any analytics we may use are limited to aggregated, non-identifying usage statistics.
            </p>
          </section>

          {/* Section 9 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-[#091538]/70 border border-blue-900/40">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="text-cyan-400 font-mono text-lg">9.</span>
              <span>Data Security</span>
            </h2>
            <p className="mb-4">
              We apply reasonable technical and organizational measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction, including:
            </p>
            <ul className="space-y-2 mb-4 text-sm text-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                <span>Transmitting data through an encrypted connection (HTTPS/TLS);</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                <span>Limiting access to data to people who need it to perform their functions;</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                <span>Relying on reputable data processing and storage services.</span>
              </li>
            </ul>
            <p className="text-xs sm:text-sm text-slate-400">
              Despite the measures taken, no method of transmitting data over the Internet is absolutely secure. We cannot guarantee absolute protection, but we undertake to notify you promptly in the event of a data breach, in accordance with applicable law.
            </p>
          </section>

          {/* Section 10 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-[#091538]/70 border border-blue-900/40">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="text-cyan-400 font-mono text-lg">10.</span>
              <span>Children</span>
            </h2>
            <p>
              The Website is not intended for persons under 18 years of age. We do not knowingly collect personal data from minors. If you become aware that a minor has provided us with their data, please contact us and we will delete it.
            </p>
          </section>

          {/* Section 11 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-[#091538]/70 border border-blue-900/40">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="text-cyan-400 font-mono text-lg">11.</span>
              <span>Changes to This Policy</span>
            </h2>
            <p>
              We reserve the right to modify this Policy. The current version is always available on this page, and the date of the last update is indicated at the top of the document. In case of material changes, we will endeavor to notify users additionally.
            </p>
          </section>

          {/* Section 12 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0D2152] to-[#081535] border border-cyan-500/40 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
              <span className="text-cyan-400 font-mono text-lg">12.</span>
              <span>Contact</span>
            </h2>
            <p className="mb-4">
              For any questions related to the processing of personal data, please contact us:
            </p>
            <div className="space-y-2 text-sm text-slate-200">
              <p>
                <strong>Company:</strong> Future Leaders
              </p>
              <p>
                <strong>Community channels:</strong>{" "}
                <a
                  href="https://t.me/Futureleaderss0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-200 underline font-medium inline-flex items-center gap-0.5 ml-1"
                >
                  Telegram <ExternalLink size={12} />
                </a>
                ,{" "}
                <a
                  href="https://x.com/0Futureleaders"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-200 underline font-medium inline-flex items-center gap-0.5"
                >
                  X (Twitter) <ExternalLink size={12} />
                </a>
                , and{" "}
                <a
                  href="https://discord.gg/SdP2sAD8zT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-200 underline font-medium inline-flex items-center gap-0.5"
                >
                  Discord <ExternalLink size={12} />
                </a>
              </p>
            </div>
          </section>
        </div>

        {/* Back Button CTA */}
        <div className="mt-14 pt-8 border-t border-blue-900/40 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 shadow-[0_10px_25px_rgba(124,58,237,0.35)] hover:shadow-[0_14px_32px_rgba(124,58,237,0.48)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <ArrowLeft size={16} />
            <span>Return to Future Leaders</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
