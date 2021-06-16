module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset',
        '@vue/babel-preset-jsx',
    ],
    plugins: [
        ["@babel/plugin-proposal-private-property-in-object", {"loose": true}]
    ]
}
