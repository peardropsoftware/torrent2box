const Webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// Hide some plugin stat messages
class CleanUpStatsPlugin {
    shouldPickStatChild(child) {
        return !child.name.includes("mini-css-extract-plugin") &&
            !child.name.includes("vue-loader") &&
            !child.name.includes("html-webpack-plugin") &&
            !child.name.includes("HtmlWebpackCompiler");
    }

    apply(compiler) {
        compiler.hooks.done.tap("CleanUpStatsPlugin", (stats) => {
            const children = stats.compilation.children;
            if (Array.isArray(children)) {
                stats.compilation.children = children
                    .filter(child => this.shouldPickStatChild(child));
            }
        });
    }
}

module.exports = {
    mode: process.env.NODE_ENV,
    target: "web",
    entry: {
        background: "./src/background/background.ts",
        content: "./src/content/content.ts",
        options: "./src/options/options.ts"
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js"
    },
    // Sourcemaps are broken in Chrome extensions
    // See: https://bugs.chromium.org/p/chromium/issues/detail?id=1053535
    // See: https://chromium-review.googlesource.com/c/chromium/src/+/2141899
    devtool: false,
    module: {
        rules: [
            {
                // Vue single file components
                test: /\.vue$/,
                use: {
                    loader: "vue-loader",
                    options: {
                        hotReload: false,
                        productionMode: true
                    }
                }
            },
            {
                // TypeScript
                test: /\.ts$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                            transpileOnly: true
                        }
                    }
                ]
            },
            {
                // HTML
                // exclude options.html which is processed by HtmlWebpackPlugin
                test: /\.html$/,
                exclude: /options\.html$/,
                use: "html-loader"
            },
            {
                // CSS
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                // SASS
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true
                        }
                    },
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            // Import variables for use in Vue single file components
                            prependData:
                                `@import "./src/options/styles/colors.scss";`
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin({
            async: false,
            typescript: {
                extensions: {
                    vue: true
                },
                mode: "readonly"
            },
            eslint: {
                files: [
                    "./src/**/*"
                ]
            }
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new CleanUpStatsPlugin(),
        new HtmlWebpackPlugin({
            template: "options.html",
            filename: "options.html",
            minify: false,
            hash: true,
            chunks: [
                "options",
                "options-vendor"
            ]
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: "manifest.json"},
                {from: "images", to: "images"},
                {from: "images/icon-green-128.png", to: "icon-128.png"},
                {from: "node_modules/@fortawesome/fontawesome-free/webfonts", to: "fonts/font-awesome"},
                {from: "fonts/google", to: "fonts/google"}
            ]
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false
        })
    ],
    optimization: {
        minimize: false,
        splitChunks: {
            cacheGroups: {
                backgroundVendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "background-vendor",
                    chunks: (chunk) => {
                        return chunk.name !== "content" && chunk.name !== "options";
                    }
                },
                contentVendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "content-vendor",
                    chunks: (chunk) => {
                        return chunk.name !== "background" && chunk.name !== "options";
                    }
                },
                optionsVendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "options-vendor",
                    chunks: (chunk) => {
                        return chunk.name !== "background" && chunk.name !== "content";
                    }
                },
                styles: {
                    name: "styles",
                    test: /\.css$/,
                    chunks: "all"
                }
            }
        }
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.common.js",
            "axios$": "axios/dist/axios.js"
        },
        extensions: [".ts", ".js", ".vue"]
    }
};
