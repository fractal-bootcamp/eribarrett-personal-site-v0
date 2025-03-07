/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: [
        "next/core-web-vitals",
        // other extends...
    ],
    rules: {
        "@typescript-eslint/no-unused-vars": ["warn", {
            "argsIgnorePattern": "^_",
            "varsIgnorePattern": "^_"
        }]
    }
}; 