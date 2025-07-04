"use client";

import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    category: '',
    frequency: '',
    page3Data: '',
    customFrequency: '',
    page5Data: '',
    // Add more fields as needed
  });

  const updateFormData = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);