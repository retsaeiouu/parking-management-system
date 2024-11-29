import type { Config } from "tailwindcss";

import forms from "@tailwindcss/forms";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: "Montserrat Variable",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondary: "var(--secondary)",
        secondaryforeground: "var(--secondary-foreground)",
        primary: "var(--primary)",
      },
    },
  },
  plugins: [forms],
} satisfies Config;
