/** @type {import('tailwindcss').Config} */
import { Container } from 'postcss';
import { green, blue } from 'tailwindcss/colors';

export const content = [
  "./src/**/*.{html,ts}",
];
export const theme = {
  extend: {
    colors: {
      success: green,
      primary: blue,
    },
    container: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1024px',
        '2xl': '1280px',
      }
    }
  },
};
export const plugins = [
  require('@tailwindcss/forms'),
];

