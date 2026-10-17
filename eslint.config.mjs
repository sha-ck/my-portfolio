import coreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      ".superpowers/**",
      "dist/**",
      "build/**",
      "out/**",
    ],
  },
  ...coreWebVitals,
];

export default eslintConfig;
