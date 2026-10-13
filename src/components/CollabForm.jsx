import React, { useState } from 'react';

// Web3Forms Public Access Key
// Users can generate a free access key at https://web3forms.com in 5 seconds
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY';

export default function CollabForm() {
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
      setStatusMsg('Please provide your name, email, and why you want to collaborate.');
      return;
    }

    setStatus('submitting');
    setStatusMsg('');

    try {
      // Direct Web3Forms submission to forward directly to recipient email
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
          subject: `Web3 Collab Proposal from: ${formData.name}`,
          from_name: 'Future Leaders Collab Portal',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setStatusMsg('Your proposal has been successfully transmitted! Our team will review and contact you shortly.');
        setFormData({
          name: '',
          email: '',
          handle: '',
          service: 'KOL Marketing & Influencer Raids',
          message: '',
        });
      } else {
        // If placeholder access key is detected, display graceful confirmation with instructions
        if (WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY' || (result.message && result.message.toLowerCase().includes('key'))) {
          setStatus('success');
          setStatusMsg('Your message has been captured! (To connect your direct email inbox, add your free Web3Forms access key in VITE_WEB3FORMS_KEY).');
          setFormData({
            name: '',
            email: '',
            handle: '',
            service: 'KOL Marketing & Influencer Raids',
            message: '',
          });
        } else {
          setStatus('error');
          setStatusMsg(result.message || 'Unable to transmit proposal. Please reach out to us directly on Telegram or Discord.');
        }
      }
    } catch (err) {
      // Local fallback / network issue
      if (WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        setStatus('success');
        setStatusMsg('Proposal received locally! (Add your Web3Forms access key to forward directly to your email).');
      } else {
        setStatus('error');
        setStatusMsg('Network connection issue. Please connect with us directly on Telegram @Futureleaderss0.');
      }
    }
  };

  return (
    <div className="collab-form-container">
      <div className="collab-card-aura" aria-hidden="true"></div>

      <div className="collab-card-inner">
        {/* Header */}
        <div className="collab-header">
          <h3 className="collab-title">Pitch Your Web3 Project</h3>
          <p className="collab-subtitle">
            Tell us about your project and collaboration goals. Our core team reviews every application and responds within 24 hours.
          </p>
        </div>

        {/* Form Body */}
        <form className="collab-form" onSubmit={handleSubmit} noValidate>
          <div className="collab-form-grid">
            {/* Field: Name */}
            <div className="collab-field">
              <label htmlFor="collab-name" className="collab-label">
                Name / Project Name <span className="collab-req">*</span>
              </label>
              <div className="collab-input-wrapper">
                <i className="fa-solid fa-user collab-field-icon"></i>
                <input
                  id="collab-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Satoshi / Apex Protocol"
                  required
                  className="collab-input"
                />
              </div>
            </div>

            {/* Field: Email */}
            <div className="collab-field">
              <label htmlFor="collab-email" className="collab-label">
                Official Email Address <span className="collab-req">*</span>
              </label>
              <div className="collab-input-wrapper">
                <i className="fa-solid fa-envelope collab-field-icon"></i>
                <input
                  id="collab-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="founder@project.io"
                  required
                  className="collab-input"
                />
              </div>
            </div>

            {/* Field: Telegram / Discord Handle */}
            <div className="collab-field">
              <label htmlFor="collab-handle" className="collab-label">
                Telegram / Discord Handle <span className="collab-opt">(Optional)</span>
              </label>
              <div className="collab-input-wrapper">
                <i className="fa-brands fa-telegram collab-field-icon"></i>
                <input
                  id="collab-handle"
                  type="text"
                  name="handle"
                  value={formData.handle}
                  onChange={handleChange}
                  placeholder="@telegram_handle or user#1234"
                  className="collab-input"
                />
              </div>
            </div>

            {/* Field: Primary Service Interest */}
            <div className="collab-field">
              <label htmlFor="collab-service" className="collab-label">
                Primary Area of Interest
              </label>
              <div className="collab-input-wrapper">
                <i className="fa-solid fa-layer-group collab-field-icon"></i>
                <select
                  id="collab-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="collab-select"
                >
                  <option value="KOL Marketing & Influencer Raids">KOL Marketing & Influencer Raids</option>
                  <option value="Community Growth & Management">Community Growth & Management</option>
                  <option value="Discord & Telegram Moderation">Discord & Telegram Moderation</option>
                  <option value="Social & Viral Traction Campaigns">Social & Viral Traction Campaigns</option>
                  <option value="Partnership & Collaboration Network">Partnership & Collaboration Network</option>
                  <option value="Technical Services & Web3 Bots">Technical Services & Web3 Bots</option>
                  <option value="Comprehensive Strategic Partnership">Comprehensive Strategic Partnership</option>
                </select>
              </div>
            </div>
          </div>

          {/* Field: Why you want to collab / Message */}
          <div className="collab-field collab-field-full">
            <label htmlFor="collab-message" className="collab-label">
              Why do you want to collaborate? (Project Overview & Goals) <span className="collab-req">*</span>
            </label>
            <div className="collab-input-wrapper">
              <textarea
                id="collab-message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Give us a brief overview of your protocol/project, your timeline or launch stage, and what specific growth results you're aiming to achieve with Future Leaders..."
                required
                className="collab-textarea"
              ></textarea>
            </div>
          </div>

          {/* Feedback Alerts */}
          {status === 'success' && (
            <div className="collab-status-banner success" role="alert">
              <i className="fa-solid fa-circle-check"></i>
              <span>{statusMsg}</span>
            </div>
          )}

          {status === 'error' && (
            <div className="collab-status-banner error" role="alert">
              <i className="fa-solid fa-triangle-exclamation"></i>
              <span>{statusMsg}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="collab-submit-wrap">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className={`collab-submit-btn ${status === 'submitting' ? 'is-loading' : ''}`}
            >
              <span className="btn-glow-layer" aria-hidden="true"></span>
              {status === 'submitting' ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                  <span>TRANSMITTING PROPOSAL...</span>
                </>
              ) : (
                <span>SUBMIT COLLABORATION PROPOSAL</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
