module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        webextensions: true
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
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
        "plugin:@typescript-eslint/recommended"
    ],
    rules: {
        "no-control-regex": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/member-delimiter-style": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/explicit-module-boundary-types": ["error", {"allowArgumentsExplicitlyTypedAsAny": true}],
        // Vue
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
