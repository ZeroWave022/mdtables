module.exports = {
    env: {
        "browser": true,
        "es2021": true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:vue/vue3-recommended",
        "@nuxtjs/eslint-config-typescript",
        "prettier"
    ],
    overrides: [
        {
            env: {
                "node": true
            },
            files: [
                ".eslintrc.{js,cjs}"
            ],
            parserOptions: {
                sourceType: "script"
            }
        }
    ],
    parser: "vue-eslint-parser",
    parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
        parser: "@typescript-eslint/parser",
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".vue"]
    },
    plugins: [
        "@typescript-eslint",
        "vue"
    ],
    ignorePatterns: [
        ".eslintrc.cjs",
        "nuxt.config.ts",
        "tailwind.config.js"
    ],
    rules: {
    }
}
