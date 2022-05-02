export default [
  {
    "filename": "demo.vue",
    "script": "import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'\n\nconst breakpoints = useBreakpoints(breakpointsTailwind)\n\nconst sm = breakpoints.smaller('sm')\nconst md = breakpoints.between('sm', 'md')\nconst lg = breakpoints.between('md', 'lg')\nconst xl = breakpoints.between('lg', 'xl')\nconst xxl = breakpoints.between('xl', '2xl')\nconst xxxl = breakpoints['2xl']",
    "template": "<div class=\"font-mono\">\n    <div> sm: <BooleanDisplay :value=\"sm\" /></div>\n    <div> md: <BooleanDisplay :value=\"md\" /></div>\n    <div> lg: <BooleanDisplay :value=\"lg\" /></div>\n    <div> xl: <BooleanDisplay :value=\"xl\" /></div>\n    <div>2xl: <BooleanDisplay :value=\"xxl\" /></div>\n    <div>3xl: <BooleanDisplay :value=\"xxxl\" /></div>\n  </div>"
  }
]
