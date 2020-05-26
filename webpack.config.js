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
            !child.name.includes("html-webpack-plugin");
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
                            hmr: process.env.NODE_ENV === "development"
                        }
                    },
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin({
            async: false,
            vue: true,
            eslint: process.env.NODE_ENV !== "development",
            eslintOptions: {
                configFile: path.resolve(process.cwd(), ".eslintrc.js")
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
                {from: "images/icon-purple-128.png", to: "icon-128.png"},
                {from: "node_modules/@fortawesome/fontawesome-free/webfonts", to: "fonts/font-awesome"}
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
