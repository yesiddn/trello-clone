/** @type {import('tailwindcss').Config} */
import { green, blue } from 'tailwindcss/colors';

export const content = [
  "./src/**/*.{html,ts}",
];
export const theme = {
  extend: {
    colors: {
      success: green,
      primary: blue,
    }
  },
};
export const plugins = [
  require('@tailwindcss/forms'),
];

