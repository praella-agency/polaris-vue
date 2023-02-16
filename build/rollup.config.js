// rollup.config.js
import fs from 'fs';
import path from 'path';
import vue from 'rollup-plugin-vue';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import terser  from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import scss from 'rollup-plugin-scss';
import autoprefixer from 'autoprefixer';
import minimist from 'minimist';

// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs.readFileSync('./.browserslistrc')
    .toString()
    .split('\n')
    .filter((entry) => entry && entry.substring(0, 2) !== 'ie');

// Extract babel preset-env config, to combine with esbrowserslist
const babelPresetEnvConfig = require('../babel.config')
    .presets.filter((entry) => entry[0] === '@babel/preset-env')[0][1];

const argv = minimist(process.argv.slice(2));

const projectRoot = path.resolve(__dirname, '..');

const baseConfig = {
    input: 'src/entry.js',
    plugins: {
        preVue: [
            alias({
                entries: [
                    {
                        find: '@',
                        replacement: `${path.resolve(projectRoot, 'src')}`,
                    },
                ],
            }),
        ],
        replace: {
            'process.env.NODE_ENV': JSON.stringify('production'),
            preventAssignment: true,
        },
        vue: {
            css: true,
            template: {
                isProduction: true,
            }
        },
        postVue: [
            resolve({
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
            }),
            commonjs(),
        ],
        babel: {
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
            babelHelpers: 'bundled',
        }
    },
};

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
    'vue'
];

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
    // Provide global variable names to replace your external imports
    vue: 'Vue',
};
const buildFormats = [];
    // Customize configs for individual targets
    if (!argv.format || argv.format === 'es') {
        const esConfig = {
            ...baseConfig,
            input: 'src/entry.esm.js',
            external,
            output: {
                file: 'dist/vue/polaris-vue.esm.js',
                format: 'esm',
                exports: 'named',
            },
            plugins: [
                replace(baseConfig.plugins.replace),
                ...baseConfig.plugins.preVue,
                vue(),
                ...baseConfig.plugins.postVue,
                babel({
                    ...baseConfig.plugins.babel,
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                ...babelPresetEnvConfig,
                                targets: esbrowserslist,
                            },
                        ],
                    ],
                }),
                scss({
                    processor: () => postcss([autoprefixer()]),
                    outputStyle: 'compressed',
                    includePaths: [
                        path.join(__dirname, '../../node_modules/'),
                        'node_modules/'
                    ]
                }),
                commonjs()
            ],
        };
        buildFormats.push(esConfig);
    }

    if (!argv.format || argv.format === 'cjs') {
        const umdConfig = {
            ...baseConfig,
            external,
            output: {
                compact: true,
                file: 'dist/vue/polaris-vue.ssr.js',
                format: 'cjs',
                name: 'PolarisVue',
                exports: 'auto',
                globals,
            },
            plugins: [
                replace(baseConfig.plugins.replace),
                ...baseConfig.plugins.preVue,
                vue(),
                ...baseConfig.plugins.postVue,
                babel(baseConfig.plugins.babel),
                scss({
                    processor: () => postcss([autoprefixer()]),
                    outputStyle: 'compressed',
                    includePaths: [
                        path.join(__dirname, '../../node_modules/'),
                        'node_modules/'
                    ]
                }),
                commonjs()
            ],
        };
        buildFormats.push(umdConfig);
    }

    if (!argv.format || argv.format === 'umd') {
        const unpkgConfig = {
            ...baseConfig,
            external,
            output: {
                compact: true,
                file: 'dist/vue/polaris-vue.min.js',
                format: 'umd',
                name: 'PolarisVue',
                exports: 'auto',
                globals,
            },
            plugins: [
                replace(baseConfig.plugins.replace),
                ...baseConfig.plugins.preVue,
                vue(),
                ...baseConfig.plugins.postVue,
                babel(baseConfig.plugins.babel),
                terser({
                    output: {
                        ecma: 5,
                    },
                }),
                scss({
                    processor: () => postcss([autoprefixer()]),
                    outputStyle: 'compressed',
                    includePaths: [
                        path.join(__dirname, '../../node_modules/'),
                        'node_modules/'
                    ]
                }),
                commonjs()
            ],
        };
        buildFormats.push(unpkgConfig);
    }


// Export config
export default buildFormats;
