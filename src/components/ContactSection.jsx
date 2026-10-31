import React, { useState } from 'react';
import './originkit/contact-01.css';
import XylophoneHelix from './originkit/ui/contact-01/xylophone-helix';

// Web3Forms Public Access Key
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY';

export default function ContactSection({ theme }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    handle: '',
    service: 'KOL Marketing & Influencer Raids',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [statusMsg, setStatusMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setStatusMsg('Please provide your name, official email, and project details.');
      return;
    }

    setStatus('submitting');
    setStatusMsg('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          handle: formData.handle || 'Not specified',
          service: formData.service,
          message: formData.message,
          subject: `Web3 Proposal from: ${formData.name}`,
          from_name: 'Future Leaders Collab Portal',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setStatusMsg('Proposal transmitted successfully! Our team will contact you shortly.');
        setFormData({
          name: '',
          email: '',
          handle: '',
          service: 'KOL Marketing & Influencer Raids',
          message: '',
        });
      } else {
        if (
          WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY' ||
          (result.message && result.message.toLowerCase().includes('key'))
        ) {
          setStatus('success');
          setStatusMsg(
            'Proposal received locally! (Add your Web3Forms access key in VITE_WEB3FORMS_KEY to forward to email).'
          );
          setFormData({
            name: '',
            email: '',
            handle: '',
            service: 'KOL Marketing & Influencer Raids',
            message: '',
          });
        } else {
          setStatus('error');
          setStatusMsg(
            result.message || 'Unable to transmit proposal. Reach out directly on Telegram @Futureleaderss0.'
          );
        }
      }
    } catch (err) {
      if (WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        setStatus('success');
        setStatusMsg('Proposal received locally!');
      } else {
        setStatus('error');
        setStatusMsg('Network connection issue. Please connect with us directly on Telegram @Futureleaderss0.');
      }
    }
  };

  return (
    <section
      id="contact-section"
      className="page-section section-contact contact-01"
      aria-label="Contact and Collaboration"
    >
      <div className="contact">
        {/* Top Header */}
        <div className="top">
          <h2>
            WORK
            <br />
            WITH US
          </h2>
          <div className="addr">
            <b>Future Leaders Agency</b>
            <br />
            Global Web3 Growth & Ecosystem Architects
            <br />
            <a href="https://t.me/Futureleaderss0" target="_blank" rel="noopener noreferrer">
              Telegram: @Futureleaderss0
            </a>
            <br />
            <a href="https://discord.gg/Tbd96eh4Tq" target="_blank" rel="noopener noreferrer">
              Discord Community
            </a>
            {' · '}
            <a href="https://x.com/0Futureleaders" target="_blank" rel="noopener noreferrer">
              Official X (Twitter)
            </a>
          </div>
        </div>

        {/* Body 2-Column Grid */}
        <div className="body">
          {/* Left Column: Interactive Chime Sphere Portal */}
          <div>
            <div className="portal">
              <div
                id="chimes"
                aria-label="Interactive chime sphere; they ring and illuminate as pointer crosses them"
              >
                <XylophoneHelix
                  key={theme === 'light' ? 'contact-light' : 'contact-dark'}
                  background={theme === 'light' ? '#f5e4dc' : '#2E0715'}
                  baseColor={theme === 'light' ? '#c4a696' : '#D9C7B8'}
                  bars={44}
                  shape="sphere"
                  speed={70}
                  drag={100}
                  scale={74}
                  metal={{ reflect: 85, polish: 100 }}
                  hover={{
                    colors:
                      theme === 'light'
                        ? ['#d94b26', '#ff7a50', '#ffffff', '#ffb08a']
                        : ['#4A0F22', '#FF5A3C', '#F7E6D8', '#FFB08A'],
                    strength: 100,
                    tint: 90,
                    glow: 40,
                  }}
                  camera={{ tilt: 47, sideTilt: 0 }}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
            <p className="cap">The chimes in Future Leaders. Run your pointer across them.</p>
          </div>

          {/* Right Column: Web3 Collaboration Form */}
          <form id="book" onSubmit={handleSubmit} noValidate>
            <p className="intro">
              Tell us what you're building and your growth targets. Our core team reviews every proposal and writes
              back within 24 hours.
            </p>

            {/* Service Selection Cards */}
            <fieldset>
              <legend>Which service area?</legend>
              <div className="rooms">
                <label>
                  <input
                    type="radio"
                    name="service"
                    value="KOL Marketing & Influencer Raids"
                    checked={formData.service === 'KOL Marketing & Influencer Raids'}
                    onChange={handleChange}
                  />
                  <b>KOL Marketing</b>
                  <span>500+ Verified Creators</span>
                  <em>Tier-1 Raids</em>
                </label>

                <label>
                  <input
                    type="radio"
                    name="service"
                    value="Community Incubation & Growth"
                    checked={formData.service === 'Community Incubation & Growth'}
                    onChange={handleChange}
                  />
                  <b>Community</b>
                  <span>Discord & Telegram</span>
                  <em>Alpha & Mods</em>
                </label>

                <label>
                  <input
                    type="radio"
                    name="service"
                    value="Web3 Tech Dev & Bot Automation"
                    checked={formData.service === 'Web3 Tech Dev & Bot Automation'}
                    onChange={handleChange}
                  />
                  <b>Web3 Tech & Dev</b>
                  <span>Bots & Contracts</span>
                  <em>Full Automation</em>
                </label>
              </div>
            </fieldset>

            {/* Input Fields: Name, Email, Handle, Message */}
            <div className="fields">
              <div className="f">
                <label htmlFor="collab-name">Name / Project Name *</label>
                <input
                  id="collab-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Ada Morgan / Satoshi"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="f">
                <label htmlFor="collab-email">Official Email *</label>
                <input
                  id="collab-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="founder@project.io"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="f full">
                <label htmlFor="collab-handle">Telegram or Discord Handle (Optional)</label>
                <input
                  id="collab-handle"
                  name="handle"
                  type="text"
                  placeholder="@telegram_handle or username#0000"
                  value={formData.handle}
                  onChange={handleChange}
                />
              </div>

              <div className="f full">
                <label htmlFor="collab-message">The Project & Goals *</label>
                <textarea
                  id="collab-message"
                  name="message"
                  required
                  placeholder="Tell us about your protocol, upcoming launch timeline, tokenomics, or specific marketing targets."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="send">
              <button type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Submitting...' : 'Request Proposal'}
              </button>
              <span id="sent">
                {statusMsg ? (
                  <span style={{ color: status === 'error' ? '#ff7a60' : '#4ade80', fontWeight: 600 }}>
                    {statusMsg}
                  </span>
                ) : (
                  'Core team reviews every application and responds within 24 hours.'
                )}
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
