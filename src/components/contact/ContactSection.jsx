// src/components/contact/ContactSection.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import contactData from '../../data/contactData';
import useFormValidation from '../../hooks/useFormValidation';
import SEOHelper from '../common/SEOHelper';
import PageTransition from '../common/PageTransition';

const ContactSection = () => {
  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  
  // Initialize form validation
  const validationRules = contactData.fields.reduce((acc, field) => {
    acc[field.name] = {
      required: field.required,
      minLength: field.validation?.minLength,
      maxLength: field.validation?.maxLength,
      pattern: field.validation?.pattern,
      message: field.validation?.message
    };
    return acc;
  }, {});

  const initialState = contactData.fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm
  } = useFormValidation(initialState, validationRules);

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  setFormStatus('submitting');

  try {
    // Replace THIS URL with your Formspree endpoint
    const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(values)
    });
    
    if (response.ok) {
      setFormStatus('success');
      resetForm();
    } else {
      const data = await response.json();
      console.error('Form submission error:', data);
      setFormStatus('error');
    }
  } catch (error) {
    console.error('Network error:', error);
    setFormStatus('error');
  }
  
  // Reset status after 5 seconds
  setTimeout(() => setFormStatus('idle'), 5000);
};

  return (
    <>
      <SEOHelper 
        title="Contact | Natasha Hinga - Full-Stack Developer"
        description="Get in touch with Natasha Hinga for collaborations, projects, or opportunities."
      />
      <PageTransition>
      <section id="contact" className="py-20 bg-primary relative overflow-hidden">
        {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-accent-dark/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-2 block">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
            {contactData.form.title}
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {contactData.form.subtitle}
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Availability Card */}
            <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <i className={`${contactData.availability.icon} text-accent text-xl`}></i>
                </div>
                <div>
                  <h3 className="text-text-primary font-semibold">{contactData.availability.status}</h3>
                  <p className="text-text-secondary text-sm">{contactData.availability.hours}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <i className="fa-solid fa-globe text-accent"></i>
                <span>Timezone: {contactData.availability.timezone}</span>
              </div>
            </div>

            {/* Contact Methods Grid */}
            <div className="grid grid-cols-2 gap-4">
              {contactData.contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-secondary/50 backdrop-blur-sm rounded-xl p-4 border border-border
                           hover:border-accent/50 transition-all duration-300 group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-2
                                  group-hover:bg-accent/20 transition-colors">
                      <i className={`${method.icon} text-accent text-lg`}></i>
                    </div>
                    <h4 className="text-text-primary font-medium text-sm mb-1">{method.label}</h4>
                    <p className="text-text-secondary text-xs">{method.description}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Quick Response Guarantee */}
            <div className="bg-gradient-to-br from-accent/10 to-accent-dark/10 rounded-xl p-6 border border-accent/30">
              <div className="flex items-center gap-3 mb-3">
                <i className="fa-solid fa-bolt text-accent text-xl"></i>
                <h4 className="text-text-primary font-semibold">Quick Response Guarantee</h4>
              </div>
              <p className="text-text-secondary text-sm">
                I typically respond within 24-48 hours. For urgent inquiries, 
                reach out via LinkedIn or Twitter for faster response.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-border">
              <h3 className="text-xl font-display font-semibold text-text-primary mb-6">
                Send a Message
              </h3>

              {/* Form Status Messages */}
              <AnimatePresence>
                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg
                             flex items-center gap-3"
                  >
                    <i className="fa-solid fa-circle-check text-green-400"></i>
                    <p className="text-green-400 text-sm">{contactData.form.successMessage}</p>
                  </motion.div>
                )}

                {formStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg
                             flex items-center gap-3"
                  >
                    <i className="fa-solid fa-circle-exclamation text-red-400"></i>
                    <p className="text-red-400 text-sm">{contactData.form.errorMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                {contactData.fields.map((field) => (
                  <div key={field.name} className="space-y-1">
                    <label 
                      htmlFor={field.name}
                      className="block text-sm font-medium text-text-primary mb-1"
                    >
                      {field.label} {field.required && <span className="text-accent">*</span>}
                    </label>
                    
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
                        <i className={field.icon}></i>
                      </div>
                      
                      {field.type === 'textarea' ? (
                        <textarea
                          id={field.name}
                          name={field.name}
                          rows={field.rows}
                          value={values[field.name] || ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder={field.placeholder}
                          className={`w-full pl-10 pr-4 py-3 bg-primary rounded-lg border
                            ${touched[field.name] && errors[field.name]
                              ? 'border-red-500/50 focus:border-red-500'
                              : 'border-border focus:border-accent'
                            } focus:outline-none transition-colors text-text-primary placeholder:text-text-secondary/50`}
                        />
                      ) : (
                        <input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          value={values[field.name] || ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder={field.placeholder}
                          className={`w-full pl-10 pr-4 py-3 bg-primary rounded-lg border
                            ${touched[field.name] && errors[field.name]
                              ? 'border-red-500/50 focus:border-red-500'
                              : 'border-border focus:border-accent'
                            } focus:outline-none transition-colors text-text-primary placeholder:text-text-secondary/50`}
                        />
                      )}
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                      {touched[field.name] && errors[field.name] && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-400 text-xs mt-1 flex items-center gap-1"
                        >
                          <i className="fa-solid fa-circle-exclamation text-xs"></i>
                          {errors[field.name]}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full btn-primary py-4 relative overflow-hidden group
                    ${formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <i className="fa-solid fa-circle-notch animate-spin mr-2"></i>
                      {contactData.form.submittingText}
                    </>
                  ) : (
                    <>
                      {contactData.form.submitButton}
                      <i className="fa-solid fa-paper-plane ml-2 group-hover:translate-x-1 transition-transform"></i>
                    </>
                  )}
                </motion.button>
              </form>

              {/* Form Footer */}
              <p className="text-center text-xs text-text-secondary mt-4">
                <i className="fa-solid fa-shield-halved text-accent mr-1"></i>
                Your information is safe and will never be shared
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </PageTransition>
    </>
  );
};

export default ContactSection;