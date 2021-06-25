const withImages = require("next-images");
const webpack = require("webpack");

module.exports = withImages();

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true"
});

module.exports = withBundleAnalyzer({
    publicRuntimeConfig: {
        arenaIP: process.env.ARENA_IP
    },

    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: "raw-loader"
        });

        config.plugins.push(
            new webpack.ProvidePlugin({
                _: "lodash",
                classnames: "classnames"
            })
        );

        return config;
    },

    devIndicators: {
        autoPrerender: true
    }
});
