/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customGray: '#45546a',
        backgroundImage: {
          'login-img': "url('/public/login_bg.jpg')",
        }
      },
    },
  },
  plugins: [],
};
