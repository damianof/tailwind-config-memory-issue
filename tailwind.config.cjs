module.exports = {
  plugins: [],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  safelist: [
    {
      pattern: /^(bg|text|border|shadow|placeholder|ring|rounded)+/,
      variants: [
        'sm', 'md', 'lg',
        'hover', 'focus', 
        'sm:hover', 'md:hover', 'lg:hover', 
      ]
    }
  ]
}
