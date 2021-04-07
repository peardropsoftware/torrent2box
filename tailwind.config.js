const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    mode: "jit",
    purge: [
        "./options.html",
        "./src/**/*.vue",
        "./src/options/services/ToasterService.ts"
    ],
    theme: {
        fontFamily: {
            sans: [
                "Open Sans",
                ...defaultTheme.fontFamily.sans
            ]
        }
    }
}
