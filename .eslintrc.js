module.exports = {
    root: true,
    env: {
        browser: true,
        webextensions: true
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".vue"],
        project: "./tsconfig.json"
    },
    plugins: [
        "@typescript-eslint",
        "vue"
    ],
    ignorePatterns: [
        ".eslintrc.js",
        "postcss.js",
        "tailwind.config.js",
        "webpack.config.js"
    ],
    rules: {
        // Style - Enable
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        // NodeJs - Enable
        "require-await": "error",
        "no-return-await": "error",
        "@typescript-eslint/explicit-module-boundary-types": "error",
        // NodeJs - Disable
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/unbound-method": ["error", {"ignoreStatic": true}],
        // Vue - Enable
        "vue/name-property-casing": ["error", "kebab-case"],
        "vue/mustache-interpolation-spacing": ["error", "never"],
        // Vue - Disable
        "vue/html-self-closing": "off",
        "vue/singleline-html-element-content-newline": "off",
        "vue/multiline-html-element-content-newline": "off",
        "vue/max-attributes-per-line": "off",
        "vue/html-closing-bracket-newline": "off",
        "vue/require-v-for-key": "off",
    }
};
