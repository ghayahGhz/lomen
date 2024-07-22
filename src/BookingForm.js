import React, { useState, useEffect } from 'react';

export const fetchAPI = (date) => {
  const availableTimes = ['17:00', '18:00', '19:00', '20:00', '21:00'];
  return availableTimes;
};

export const submitAPI = (formData) => {
  return true;
};

export const initializeTimes = () => {
  const today = new Date();
  return fetchAPI(today);
};

export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return fetchAPI(action.payload);
    default:
      return state;
  }
};

export const validateForm = (date, time, numGuests, occasion) => {
  return date && time && numGuests >= 1 && numGuests <= 10 && occasion;
};

const BookingForm = ({ submitForm }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [availableTimes, setAvailableTimes] = useState(initializeTimes);
  const [numGuests, setNumGuests] = useState('');
  const [occasion, setOccasion] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setAvailableTimes(fetchAPI(new Date()));
  }, []);

  useEffect(() => {
    const checkFormValidity = () => {
      setIsFormValid(validateForm(date, time, numGuests, occasion));
    };

    checkFormValidity();
  }, [date, time, numGuests, occasion]);

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setDate(newDate);
    setAvailableTimes(fetchAPI(new Date(newDate)));
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleNumGuestsChange = (event) => {
    setNumGuests(event.target.value);
  };

  const handleOccasionChange = (event) => {
    setOccasion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { date, time, numGuests, occasion };
    submitForm(formData);
  };

  return (
    <form style={{ display: 'grid', maxWidth: '200px', gap: '20px' }} onSubmit={handleSubmit} aria-label="Booking Form">
      <h2>Book Now</h2>
      <label htmlFor="res-date">Choose date</label>
      <input type="date" id="res-date" value={date} onChange={handleDateChange} required aria-label="Choose date" />
      <label htmlFor="res-time">Choose time</label>
      <select id="res-time" value={time} onChange={handleTimeChange} required aria-label="Choose time">
        {availableTimes.map((timeOption) => (
          <option key={timeOption} value={timeOption}>
            {timeOption}
          </option>
        ))}
      </select>
      <label htmlFor="guests">Number of guests</label>
      <input type="number" id="guests" value={numGuests} onChange={handleNumGuestsChange} min="1" max="10" required aria-label="Number of guests" />
      <label htmlFor="occasion">Occasion</label>
      <select id="occasion" value={occasion} onChange={handleOccasionChange} required aria-label="Occasion">
        <option value="">Select an occasion</option>
        <option value="birthday">Birthday</option>
        <option value="anniversary">Anniversary</option>
      </select>
      <button type="submit" disabled={!isFormValid} aria-label="Submit">Submit</button>
    </form>
  );
};

export default BookingForm;
