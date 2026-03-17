// src/hooks/useFormValidation.js
import { useState } from 'react';

export const useFormValidation = (initialState, validationRules) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (fieldName, value) => {
    const rule = validationRules[fieldName];
    if (!rule) return '';

    if (rule.required && !value) {
      return `${fieldName} is required`;
    }

    if (rule.minLength && value.length < rule.minLength) {
      return `Minimum ${rule.minLength} characters required`;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      return `Maximum ${rule.maxLength} characters allowed`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message || `Invalid ${fieldName} format`;
    }

    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validate(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validate(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(values).forEach(key => {
      const error = validate(key, values[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setValues(initialState);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setValues
  };
};

export default useFormValidation;