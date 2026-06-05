import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function ProjectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [formData, setFormData] = useState({
    projectName: '',
    contactName: '',
    email: '',
    contactMethod: 'Telegram',
    contactUsername: '',
    projectLink: '',
    services: [],
    projectStage: 'Development',
    timeline: 'Immediate',
    heardAboutUs: ''
  });

  // Listen to the custom event to open the modal
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsSubmitted(false);
    };
    window.addEventListener('open-project-modal', handleOpen);
    return () => window.removeEventListener('open-project-modal', handleOpen);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setSubmitError(null);
  };

  const handleCheckboxChange = (serviceName) => {
    setFormData((prev) => {
      const services = prev.services.includes(serviceName)
        ? prev.services.filter((s) => s !== serviceName)
        : [...prev.services, serviceName];
      return { ...prev, services };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError(null);

    const { error } = await supabase.from('project_requests').insert([
      {
        project_name:     formData.projectName,
        contact_name:     formData.contactName,
        email:            formData.email,
        contact_method:   formData.contactMethod,
        contact_username: formData.contactUsername,
        project_link:     formData.projectLink || null,
        services:         formData.services,
        project_stage:    formData.projectStage,
        timeline:         formData.timeline,
        heard_about_us:   formData.heardAboutUs || null,
      }
    ]);

    setIsLoading(false);

    if (error) {
      console.error('Supabase insert error:', error);
      setSubmitError('Something went wrong. Please try again or contact us directly.');
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container (Prism Style, Adapting to Theme) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            layout
            className={`relative bg-white dark:bg-[#07070d] border border-slate-200 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2.5rem] p-6 sm:p-10 no-scrollbar ${
              isSubmitted
                ? 'w-full max-w-lg overflow-hidden flex flex-col items-center justify-center min-h-[480px]'
                : 'w-full max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden'
            }`}
          >

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 flex items-center justify-center transition-all select-none cursor-pointer z-50"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8 select-none">
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-gradient uppercase tracking-tight">
                    Start Your Project
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-2">
                    Fill out the form below and we will customize a growth plan for you.
                  </p>
                </div>Direction

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                  {/* Project Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-display tracking-wider uppercase text-slate-500 dark:text-slate-400 font-bold mb-0.5">Project Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Future Leaders"
                      value={formData.projectName}
                      onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white transition-all duration-200"
                    />
                  </div>

                  {/* Contact Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-display tracking-wider uppercase text-slate-500 dark:text-slate-400 font-bold mb-0.5">Contact Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sakuna"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white transition-all duration-200"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-display tracking-wider uppercase text-slate-500 dark:text-slate-400 font-bold mb-0.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. builder@futureleaderss.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white transition-all duration-200"
                    />
                  </div>

                  {/* Preferred Contact Method */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-display tracking-wider uppercase text-slate-500 dark:text-slate-400 font-bold mb-0.5">Preferred Contact Method</label>
                    <select
                      value={formData.contactMethod}
                      onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white transition-all duration-200"
                    >
                      <option value="Telegram" className="bg-white dark:bg-slate-950">Telegram</option>
                      <option value="Discord" className="bg-white dark:bg-slate-950">Discord</option>
                      <option value="Twitter/X" className="bg-white dark:bg-slate-950">Twitter/X</option>
                      <option value="Email" className="bg-white dark:bg-slate-950">Email</option>
                    </select>
                  </div>

                  {/* Username / Contact */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-display tracking-wider uppercase text-slate-500 dark:text-slate-400 font-bold mb-0.5">Username / Contact Details *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. @0Sakuna"
                      value={formData.contactUsername}
                      onChange={(e) => setFormData({ ...formData, contactUsername: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white transition-all duration-200"
                    />
                  </div>

                  {/* Project Link */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-display tracking-wider uppercase text-slate-500 dark:text-slate-400 font-bold mb-0.5">Project Link (Website/X)</label>
                    <input
                      type="url"
                      placeholder="e.g. https://futureleaderss.com"
                      value={formData.projectLink}
                      onChange={(e) => setFormData({ ...formData, projectLink: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white transition-all duration-200"
                    />
                  </div>

                  {/* Project Stage */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-display tracking-wider uppercase text-slate-500 dark:text-slate-400 font-bold mb-0.5">Project Stage</label>
                    <select
                      value={formData.projectStage}
                      onChange={(e) => setFormData({ ...formData, projectStage: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white transition-all duration-200"
                    >
                      <option value="Idea/Pre-launch" className="bg-white dark:bg-slate-950">Idea / Pre-launch</option>
                      <option value="Development" className="bg-white dark:bg-slate-950">Under Development</option>
                      <option value="Launched & Scaling" className="bg-white dark:bg-slate-950">Launched & Scaling</option>
                    </select>
                  </div>

                  {/* Timeline */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-display tracking-wider uppercase text-slate-500 dark:text-slate-400 font-bold mb-0.5">Required Timeline</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white transition-all duration-200"
                    >
                      <option value="Immediate" className="bg-white dark:bg-slate-950">Immediate</option>
                      <option value="< 1 Month" className="bg-white dark:bg-slate-950">&lt; 1 Month</option>
                      <option value="1-3 Months" className="bg-white dark:bg-slate-950">1-3 Months</option>
                      <option value="Flexible" className="bg-white dark:bg-slate-950">Flexible</option>
                    </select>
                  </div>
                </div>

                {/* Multi-select Services Needed */}
                <div className="flex flex-col gap-2 mb-6">
                  <label className="text-xs font-display tracking-wider uppercase text-slate-500 dark:text-slate-400 font-bold select-none">Services Needed</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Paid Promotions',
                      'NFT Collaborations',
                      'Ambassador Programs',
                      'Marketing Support',
                      'Developer Support'
                    ].map((service) => {
                      const isChecked = formData.services.includes(service);
                      return (
                        <div
                          key={service}
                          onClick={() => handleCheckboxChange(service)}
                          className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold select-none cursor-pointer flex items-center gap-2.5 transition-all duration-200 ${isChecked
                              ? 'border-white bg-white/5 dark:bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                              : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${isChecked ? 'bg-white border-white text-black' : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950'
                            }`}>
                            {isChecked && (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-2.5 h-2.5">
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                            )}
                          </div>
                          {service}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* How Did You Hear About Us */}
                <div className="flex flex-col gap-1.5 mb-8">
                  <label className="text-xs font-display tracking-wider uppercase text-slate-500 dark:text-slate-400 font-bold mb-0.5">How Did You Hear About Us?</label>
                  <input
                    type="text"
                    placeholder="e.g. Twitter/X, Friend, Partner community"
                    value={formData.heardAboutUs}
                    onChange={(e) => setFormData({ ...formData, heardAboutUs: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white transition-all duration-200"
                  />
                </div>

                {/* Error Message */}
                {submitError && (
                  <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 text-sm select-none">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {submitError}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary py-4 rounded-xl flex items-center justify-center gap-3 text-base font-black cursor-pointer select-none disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit A Request
                    </>
                  )}
                </button>
              </form>

            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 flex flex-col items-center justify-center text-center py-8 px-4 select-none flex-1 w-full"
              >
                <div className="w-20 h-20 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-gradient uppercase tracking-tight mb-4">
                  Request Received!
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
                  Thank you for starting your project with <strong className="text-slate-900 dark:text-white font-black">Future Leaders</strong>. Our operators will review your details and reach out within <strong className="text-slate-900 dark:text-white font-black">12 hours</strong> to deliver your custom growth plan.
                </p>
                <button
                  onClick={handleClose}
                  className="btn-ghost px-8 py-3 rounded-xl cursor-pointer"
                >
                  Close Window
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Hiding scrollbar completely while keeping native scrolling */}
          <style>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none !important;
            }
            .no-scrollbar {
              -ms-overflow-style: none !important;
              scrollbar-width: none !important;
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}
