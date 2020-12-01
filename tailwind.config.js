const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
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
    },
    variants: {
        borderRadius: ["responsive", "hover"],
        borderStyle: ["responsive", "hover"],
        borderWidth: ["responsive", "hover"]
    }
}
