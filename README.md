### Config ESLINT plus PATTIER

https://javascript.plainenglish.io/setting-eslint-and-prettier-on-a-react-typescript-project-2021-22993565edf9

.eslintignore

*.css
*.svg

.eslintrc.json

{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier" // prettier
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "ecmaFeatures": {
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "react", "prettier"], // prettier
  "rules": {
    "@typescript-eslint/no-explicit-any": "off"
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  }
}


.prettierignore

node_modules
# Ignore artifacts:
build
coverage

.prettierrc

{
  "printWidth": 80,
  "tabWidth": 2,
  "singleQuote": true,
  "semi": true,
  "trailingComma": "all"
}

Instalar plugins do VS Code: ESlint, Editor Config e Prettier Code Formatter

