// src/components/newsletter/NewsletterSection.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';

const NewsletterSection = () => {
  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Replace with your actual newsletter endpoint (ConvertKit, Mailchimp, etc.)
  const onSubmit = async (data) => {
    setFormStatus('submitting');
    
    // Simulate API call - replace with actual endpoint
    try {
      // Example for ConvertKit:
      // await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     api_key: 'YOUR_API_KEY',
      //     email: data.email,
      //     first_name: data.name
      //   })
      // });
      
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate
      setFormStatus('success');
      reset();
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-accent-dark/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Section Header */}
          <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-2 block">
            Stay Updated
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
            Join the Newsletter
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Get notified when I publish new projects, write blog posts, or share insights 
            about my journey in tech. No spam, unsubscribe anytime.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: 'fa-solid fa-rocket', title: 'New Projects', desc: 'Be first to know about my latest work' },
              { icon: 'fa-solid fa-pen', title: 'Blog Posts', desc: 'Get notified when I publish new articles' },
              { icon: 'fa-solid fa-star', title: 'Exclusive Content', desc: 'Occasional tips and insights' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-secondary/50 backdrop-blur-sm rounded-xl p-4 border border-border"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className={`${item.icon} text-accent text-xl`}></i>
                </div>
                <h3 className="text-text-primary font-medium mb-1">{item.title}</h3>
                <p className="text-text-secondary text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

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
                <i className="fa-solid fa-circle-check text-green-400 text-xl"></i>
                <p className="text-green-400">Thanks for subscribing! Check your email to confirm.</p>
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
                <i className="fa-solid fa-circle-exclamation text-red-400 text-xl"></i>
                <p className="text-red-400">Something went wrong. Please try again.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-secondary/50 backdrop-blur-sm rounded-xl p-8 border border-border"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Input */}
                <div className="relative">
                  <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"></i>
                  <input
                    type="text"
                    placeholder="Your name"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full pl-12 pr-4 py-3 bg-primary rounded-lg border border-border
                             focus:border-accent focus:outline-none text-text-primary
                             placeholder:text-text-secondary/50"
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"></i>
                  <input
                    type="email"
                    placeholder="Your email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full pl-12 pr-4 py-3 bg-primary rounded-lg border border-border
                             focus:border-accent focus:outline-none text-text-primary
                             placeholder:text-text-secondary/50"
                  />
                </div>
              </div>

              {/* Error Messages */}
              <div className="flex flex-col items-start text-sm text-red-400">
                {errors.name && <p>{errors.name.message}</p>}
                {errors.email && <p>{errors.email.message}</p>}
              </div>

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
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe to Newsletter
                    <i className="fa-solid fa-paper-plane ml-2 group-hover:translate-x-1 transition-transform"></i>
                  </>
                )}
              </motion.button>
            </form>

            {/* Privacy Note */}
            <p className="text-xs text-text-secondary/70 mt-4">
              <i className="fa-solid fa-shield-halved text-accent mr-1"></i>
              I respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>

          {/* Subscriber Count (Optional) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-sm text-text-secondary"
          >
            <i className="fa-solid fa-users text-accent mr-2"></i>
            Join <span className="text-accent font-semibold">100+</span> other developers
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;