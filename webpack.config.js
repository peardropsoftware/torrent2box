const path = require("path");
const Webpack = require("webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");

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
                use: {
                    loader: "ts-loader",
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                        transpileOnly: true
                    }
                }
            },
            {
                // HTML
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
                            // These are static resources that do not need
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
        new CopyWebpackPlugin({
            patterns: [
                {from: "images/icon-green-128.png", to: "icon-128.png"},
                "options.html",
                "manifest.json",
                "images/**/*",
                "fonts/**/*"
            ]
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false
        }),
        new Webpack.ProgressPlugin({
            activeModules: true
        }),
    ],
    optimization: {
        minimize: false,
        splitChunks: {
            cacheGroups: {
                backgroundVendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "background-vendor",
                    chunks: (chunk) => {
                        return chunk.name === "background";
                    }
                },
                contentVendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "content-vendor",
                    chunks: (chunk) => {
                        return chunk.name === "content";
                    }
                },
                optionsVendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "options-vendor",
                    chunks: (chunk) => {
                        return chunk.name === "options";
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
