import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

const babelConfig = {
    presets: [
        [
            'es2015',
            {
                modules: false,
            },
        ],
    ],
    plugins: [
        'external-helpers',
    ],
};

export default {
    input: 'src/ssm.js',
    name: 'ssm',
    sourcemap: true,
    plugins: [
        babel(babelrc({
            addExternalHelpersPlugin: false,
            config: babelConfig,
            exclude: 'node_modules/**',
        })),
        uglify({}, minify),
    ],
    output: {
        file: 'dist/ssm.min.js',
        format: 'umd',
    },
};
