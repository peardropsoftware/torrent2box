module.exports = {
    future: {
        purgeLayersByDefault: true,
    },

    purge: [
        "./options.html",
        "./src/**/*.vue"
    ],
    theme: {
        fontFamily: {
            sans: [
                "Open Sans"
            ]
        }
    },
    variants: {
        borderRadius: ["responsive", "hover"],
        borderStyle: ["responsive", "hover"],
        borderWidth: ["responsive", "hover"]
    }
}
