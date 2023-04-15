const HTMLWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin     = require("compression-webpack-plugin");
const CopyPlugin            = require("copy-webpack-plugin");

const path = require('path');

const ASSET_DIR             = path.resolve(__dirname, "public");
const APP_DIR               = path.resolve(__dirname, "src");
const DIST_DIR              = path.resolve(__dirname, "dist");

const COREAPP               = "src/coreApp";
const PAGES                 = "src/pages";
const LAYOUT                = "src/layout";
const STYLES                = "src/styles";
const STORE                 = "src/store";
const CONFIGS               = "src/coreApp/config";

module.exports={
    entry:'./src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].js',
        publicPath: '/',
        assetModuleFilename : 'asset/[name][ext]',
        clean     : true,
    },
    resolve : {
        alias: {
                "build"                 : path.resolve(__dirname, `${DIST_DIR}`),
                "public"                : path.resolve(__dirname, `${ASSET_DIR}`),          
                "app"                   : path.resolve(__dirname, `${APP_DIR}`),          
                "mockAPI"               : path.resolve(__dirname, `${APP_DIR}/MockAPI`),
                "config"                : path.resolve(__dirname, `${CONFIGS}`),
                "layout"                : path.resolve(__dirname, `${LAYOUT}`),
                "pages"                 : path.resolve(__dirname, `${PAGES}`),
                "styles"                : path.resolve(__dirname, `${STYLES}`),
                "coreUI"                : path.resolve(__dirname, `${PAGES}/coreUI`),
                "store"                 : path.resolve(__dirname, `${STORE}`),
                "coreApp"               : path.resolve(__dirname, `${COREAPP}`),
                "constant"              : path.resolve(__dirname, `${COREAPP}/constants`),
                "localstorage"          : path.resolve(__dirname, `${COREAPP}/localstorage`),
                "localLogger"           : path.resolve(__dirname, `${COREAPP}/localLogger`),
                "images"                : path.resolve(__dirname, `${ASSET_DIR}/images`)
                
    
        },
        extensions: ["*",'.js', '.jsx','.svg','.png','.ico','.jpg','icon']
      },
    optimization: {
        splitChunks: {
          chunks: 'all'
        },
        minimize: true,
        chunkIds: 'named',
        concatenateModules: true,
        flagIncludedChunks: true,
    },
    plugins: [
        new HTMLWebpackPlugin({template: './public/index.html'}),
        new CompressionPlugin({algorithm: "gzip"}),
        new CopyPlugin({
        patterns: [
            { from: "public/robots.txt", to: "robots.txt" },
        ],
        }),
    ],
    module: {
        rules: [
            {test: /\.(svg|png|jpe?g|gif|txt)$/i,  type: "asset/resource" },
            {test: /\.(s[ac]|c)ss$/i,  use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]},
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env',{ targets: "defaults", "debug":true, "useBuiltIns":"usage", "corejs":3 }], ['@babel/preset-react',{runtime:"automatic"}]]
                        }
                }
            },
        ]
    },
    devServer: {
        hot: true,
        port: 80,
        open:true,
        compress: true,
        allowedHosts: "all",
        historyApiFallback: true, 
        historyApiFallback: {
          disableDotRule: true
        },
        // proxy: {       
        //     '/api': 'http://localhost:8000',          
        //    changeOrigin:true,
        // },
    },
    

}