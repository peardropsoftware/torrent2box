module.exports = {
    root: true,
    env: {
        browser: true
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        project: ['./tsconfig.json'],
        extraFileExtensions: [".vue"]
    },
    plugins: [
        "@typescript-eslint",
        "vue"
    ],
    extends: [
        "eslint:recommended",
        "plugin:vue/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    ignorePatterns: ["**/*.js", "vue.d.ts"],
    rules: {
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/interface-name-prefix": ["error", {
            prefixWithI: "always",
            allowUnderscorePrefix: false
        }],
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/member-ordering": "error",
        "@typescript-eslint/unbound-method": ["error", {
            ignoreStatic: true
        }],
        "vue/max-attributes-per-line": "off",
        "vue/html-closing-bracket-newline": "off",
        "vue/html-self-closing": "off",
        "vue/mustache-interpolation-spacing": ["error", "never"],
        "vue/singleline-html-element-content-newline": "off",
        "vue/multiline-html-element-content-newline": "off",
        "vue/require-v-for-key": "off",
        "vue/name-property-casing": ["error", "kebab-case"]
    }
};
