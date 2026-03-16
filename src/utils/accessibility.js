// src/utils/accessibility.js
// Accessibility utilities for keyboard navigation

// Handle keyboard navigation for modals
export const trapFocus = (modalRef, closeCallback) => {
  const focusableElements = modalRef.current?.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );

  if (!focusableElements?.length) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeCallback();
      return;
    }

    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  document.addEventListener("keydown", handleKeyDown);
  firstElement?.focus();

  return () => document.removeEventListener("keydown", handleKeyDown);
};

// Announce messages to screen readers
export const announceToScreenReader = (message, priority = "polite") => {
  const announcer = document.getElementById("sr-announcer");
  if (announcer) {
    announcer.setAttribute("aria-live", priority);
    announcer.textContent = message;

    // Clear after announcement
    setTimeout(() => {
      announcer.textContent = "";
    }, 1000);
  }
};

// Get ARIA labels for project status
export const getStatusAriaLabel = (status, projectTitle) => {
  const statusMap = {
    completed: `${projectTitle} is a completed project`,
    "in-progress": `${projectTitle} is currently in development`,
    team: `${projectTitle} is a team project`,
    backend: `${projectTitle} is a backend API project`,
    featured: `${projectTitle} is a featured project`,
  };
  return statusMap[status] || `${projectTitle} project`;
};
