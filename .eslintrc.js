/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: [
        "next/core-web-vitals",
    ],
    rules: {
        "@typescript-eslint/no-unused-vars": ["warn", {
            "argsIgnorePattern": "^_",
            "varsIgnorePattern": "^_"
        }],
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/prefer-optional-chain": "off",
        "@typescript-eslint/consistent-type-imports": "off",
        "react/no-unescaped-entities": "off",
        "@next/next/no-img-element": "off"
    }
}; 