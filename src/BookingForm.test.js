import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm, { validateForm } from './BookingForm';

test('validateForm returns true for valid inputs', () => {
  expect(validateForm('2024-07-23', '18:00', 2, 'birthday')).toBe(true);
});

test('validateForm returns false for invalid date', () => {
  expect(validateForm('', '18:00', 2, 'birthday')).toBe(false);
});

test('validateForm returns false for invalid time', () => {
  expect(validateForm('2024-07-23', '', 2, 'birthday')).toBe(false);
});

test('validateForm returns false for invalid numGuests (too low)', () => {
  expect(validateForm('2024-07-23', '18:00', 0, 'birthday')).toBe(false);
});

test('validateForm returns false for invalid numGuests (too high)', () => {
  expect(validateForm('2024-07-23', '18:00', 11, 'birthday')).toBe(false);
});

test('validateForm returns false for invalid occasion', () => {
  expect(validateForm('2024-07-23', '18:00', 2, '')).toBe(false);
});
