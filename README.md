# Tailwind CSS potential Node memory leak

This is to replicate a potential Node memory leak in Tailwind CSS.

## Repro steps:

- environment: MacBook Air M2 with 8GB of RAM

- run this app with `npm start`
- expected: the application loads in the browser without errors in the Node console
- actual: receive `FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory` (for the full output see [here](node-error.txt) )

## Remarks

This is not happening on an older iMac Retina 27" with 32GB of Ram, but happens consistently with a MacBook Air M2 with 8GB of RAM.

I tried also increasing Node's available memory by running the app with:
```export NODE_OPTIONS=\"--max-old-space-size=4096\"; npm run dev```

It just takes a longer time to throw the out of memory error, but it happen anyway.
Preliminary research indicates a potential memory leak that causes Node to throw this error.


## Preliminary heuristics


This seems to happen when, within tailwind.config.js, the `safelist > pattern` has a RegEx with several keywords separated by | (or):

```
safelist: [
    {
      pattern: /^(bg|text|border|shadow|placeholder|ring|rounded)+/,
...
```

Reducing the list of keywords to 1 or 2 seems to solve the problems:

```
safelist: [
    {
      pattern: /^(bg|text)+/,
...
```

I also noticed that with 1 keyword only the app loads very fast, but with 2 or 3 keywords is 1-3 seconds slower, with 4 or more start throwing the memory leak error.


# Additional information

**What version of Tailwind CSS are you using?**

v3.1.8

**What build tool (or framework if it abstracts the build tool) are you using?**

vite: v3.1.0
postcss: v8.4.16
autoprefixer: v10.4.8

**What version of Node.js are you using?**

v16.17.0

**What browser are you using?**

Chrome or Edge (latest)

**What operating system are you using?**

macOS (Monterey 12.5 on MacBook Air M2 where the issue happens)

**Reproduction URL**

[https://github.com/damianof/tailwind-config-memory-issue](https://github.com/damianof/tailwind-config-memory-issue)

**Describe your issue**

Receiving `FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory` in terminal from Node.

Repro steps:
- run the sample project with `npm start`
- expected: the application loads in the browser without errors in the Node console
- actual: receive `FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory` (for the full output see [here](https://github.com/damianof/tailwind-config-memory-issue/blob/main/node-error.txt) )

Additional details can be found within the README.md file on the sample project.


## Possible solution:

```
const safeListPatterns = ['text', 'border', 'shadow', 'placeholder', 'ring', 'rounded']
const safeListVariants = [
  'sm', 'md', 'lg',
  'hover', 'focus', 
  'sm:hover', 'md:hover', 'lg:hover'
]

module.exports = {
  plugins: [],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  safelist: [
    {
      pattern: /^(bg)+/
    },
    ...safeListPatterns.flatMap(p => safeListVariants.map(v => `${ p }-${ v }`))
  ]
}
```