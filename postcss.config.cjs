module.exports = ({ env }) => ({
    plugins: [
        require("postcss-import"),
        require("tailwindcss")
    ]
});
