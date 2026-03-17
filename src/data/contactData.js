// src/data/contactData.js
// Contact form configuration and settings

export const contactData = {
  // Form settings
  form: {
    title: "Let's Connect",
    subtitle: "Have a project in mind? Want to collaborate? Just want to say hi?",
    submitButton: "Send Message",
    submittingText: "Sending...",
    successMessage: "Message sent successfully! I'll get back to you soon.",
    errorMessage: "Something went wrong. Please try again.",
  },

  // Contact methods
  contactMethods: [
    {
      type: "email",
      value: "natashahinga58@gmail.com",
      icon: "fa-solid fa-envelope",
      label: "Email",
      link: "mailto:natashahinga58@gmail.com",
      description: "Drop me an email anytime"
    },
    {
      type: "linkedin",
      value: "natasha-hinga",
      icon: "fa-brands fa-linkedin-in",
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/natasha-hinga-a2b268337",
      description: "Connect with me professionally"
    },
    {
      type: "github",
      value: "slate299",
      icon: "fa-brands fa-github",
      label: "GitHub",
      link: "https://github.com/slate299",
      description: "Check out my code"
    },
    {
      type: "twitter",
      value: "@HingaNatas39546",
      icon: "fa-brands fa-x-twitter",
      label: "Twitter/X",
      link: "https://x.com/HingaNatas39546",
      description: "Follow me for tech thoughts"
    }
  ],

  // Availability
  availability: {
    status: "Available for freelance",
    hours: "Response within 24-48 hours",
    timezone: "EAT (UTC+3)",
    icon: "fa-solid fa-clock"
  },

  // Form fields configuration
  fields: [
    {
      name: "name",
      label: "Your Name",
      type: "text",
      placeholder: "John Doe",
      icon: "fa-solid fa-user",
      required: true,
      validation: {
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s]*$/,
        message: "Please enter a valid name (letters only)"
      }
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "john@example.com",
      icon: "fa-solid fa-envelope",
      required: true,
      validation: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email address"
      }
    },
    {
      name: "subject",
      label: "Subject",
      type: "text",
      placeholder: "What would you like to discuss?",
      icon: "fa-solid fa-tag",
      required: true,
      validation: {
        minLength: 3,
        maxLength: 100,
        message: "Subject must be between 3 and 100 characters"
      }
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      placeholder: "Tell me about your project or idea...",
      icon: "fa-solid fa-message",
      required: true,
      rows: 5,
      validation: {
        minLength: 10,
        maxLength: 1000,
        message: "Message must be between 10 and 1000 characters"
      }
    }
  ]
};

export default contactData;