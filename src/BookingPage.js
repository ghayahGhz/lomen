import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';
import { submitAPI } from './api'; // Adjust the import based on your project structure

const BookingPage = () => {
  const navigate = useNavigate();

  const submitForm = (formData) => {
    if (submitAPI(formData)) {
      navigate('/confirmation');
    }
  };

  return (
    <div>
      <h1>Book Your Appointment</h1>
      <BookingForm submitForm={submitForm} />
      {/* Add any additional content here */}
    </div>
  );
};

export default BookingPage;
