const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./options.html",
        "./src/**/*.{ts,vue}",
    ],
    theme: {
        fontFamily: {
            sans: [
                "Poppins",
                ...defaultTheme.fontFamily.sans
            ]
        }
    }
}
