const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

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
                    {
                        loader: "css-loader",
                        options: {
                            // Do not process urls that use a root path
                            // These may be static resources that do not need
                            // to be processed by Webpack (fonts/images etc)
                            url: url => !url.startsWith('/')
                        }
                    },
                    "postcss-loader"
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
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
                    "./src/**/*.{ts,vue}",
                ],
                options: {
                    configFile: "./.eslintrc.js"
                }
            }
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
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
                {from: "fonts/google", to: "fonts/google"}
            ]
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false
        }),
        new webpack.ProgressPlugin({
            activeModules: true
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
                }
            }
        }
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js",
            // Buffer polyfill
            "buffer$": "buffer/index.js"
        },
        extensions: [".ts", ".js", ".vue"],
    }
};
