### Config ESLINT plus PATTIER

https://javascript.plainenglish.io/setting-eslint-and-prettier-on-a-react-typescript-project-2021-22993565edf9

Introduction
This tutorial aims to be a definitive guide for setting up ESLint and Prettier working together on a React Typescript project.

After reading a lot of tutorials, and struggling myself into it, I decided to create this definitive guide to make life easier for anyone who needs it.

Why use ESLint and Prettier?
ESLint is one of the most popular tools for code quality rules check and code formatting.

Prettier is a code formatting tool.

So, why use Prettier if I can also format my code using just ESLint? In a short answer, because Prettier do the code formatting better than ESLint.

So, as the Prettier documentation says, use Prettier for formatting and linters for catching bugs!

Let’s start!
This article will be divided in 4 parts:

Setting up ESLint
Setting up Prettier
Checking files content
Making ESLint and Prettier work together
Setting up ESLint
If you do not have ESLint setted up into your React Typescript project, please go through this article instructions below before continuing it.

Setting ESLint on a React Typescript project (2021)
A definitive guide to set ESLint on a React Typescript project
andrebnassis.medium.com

Setting up Prettier
In the same way, if you do not have Prettier setted up into your React Typescript project, please go through this article instructions below before continuing it.

Setting Prettier on a React Typescript project (2021)
A definitive guide to set Prettier on a React Typescript project
andrebnassis.medium.com

Checking files content
To make sure that ESLint and Prettier are setted up right, let’s do a quick check over your Project files.

package.json
It should contain the follow packages over “devDependencies”:

"devDependencies": {
"@typescript-eslint/eslint-plugin": "^4.15.1",
"@typescript-eslint/parser": "^4.15.1",
"eslint": "^7.20.0",
"eslint-config-airbnb": "^18.2.1",
"eslint-import-resolver-typescript": "^2.4.0",
"eslint-plugin-import": "^2.22.1",
"eslint-plugin-jsx-a11y": "^6.4.1",
"eslint-plugin-react": "^7.22.0",
"eslint-plugin-react-hooks": "^4.2.0",
"prettier": "2.2.1"
}
PS: You can ignore the version number if it doesn’t match within the example shown above.

.prettierrc.json
It should contain the Prettier formatting rules configuration.

{
"trailingComma": "es5",
"tabWidth": 4,
"semi": false,
"singleQuote": true
}
PS: You can modify the rules as you like.

.eslintrc.json
It should contain the ESLint rules configuration.

{
   "env":{
      "browser":true,
      "es2021":true
   },
   "extends":[
      "plugin:react/recommended",
      "airbnb",
      "plugin:@typescript-eslint/recommended"
   ],
   "parser":"@typescript-eslint/parser",
   "parserOptions":{
      "ecmaFeatures":{
         "jsx":true
      },
      "ecmaVersion":12,
      "sourceType":"module"
   },
   "plugins":[
      "react",
      "@typescript-eslint",
      "react-hooks"
   ],
   "rules":{
      "no-use-before-define":"off",
      "@typescript-eslint/no-use-before-define":[
         "error"
      ],
      "react/jsx-filename-extension":[
         "warn",
         {
            "extensions":[
               ".tsx"
            ]
         }
      ],
      "import/extensions":[
         "error",
         "ignorePackages",
         {
            "ts":"never",
            "tsx":"never"
         }
      ],
      "no-shadow":"off",
      "@typescript-eslint/no-shadow":[
         "error"
      ],
      "@typescript-eslint/explicit-function-return-type":[
         "error",
         {
            "allowExpressions":true
         }
      ],
      "max-len":[
         "warn",
         {
            "code":80
         }
      ],
      "react-hooks/rules-of-hooks":"error",
      "react-hooks/exhaustive-deps":"warn",
      "import/prefer-default-export":"off",
      "react/prop-types":"off"
   },
   "settings":{
      "import/resolver":{
         "typescript":{

         }
      }
   }
}
PS: You can modify the rules as you like.

.eslintignore
It should contain what files ESLint will ignore when executed.

*.css
*.svg
PS: You can modify this file as you like.

.prettierignore
It should contain what files Prettier will ignore when executed.

node_modules
# Ignore artifacts:
build
coverage
PS: You can modify this file as you like.

Everything is setted up? Cool! Let’s move on!

Making ESLint and Prettier work together
After setting up Prettier and ESLint, you will see that if you execute both, they will start to fight against each other in relation to the formatting rules.

On terminal, executing Prettier and ESLint commands to automatically fix the code on our ‘App.tsx’ file:

npx eslint src/App.tsx --quiet --fix
npx prettier --write src/App.tsx
ESLint and Prettier overriding the formatting rules applied:


Prettier and ESLint outputs for App.tsx file
To solve this problem, we can set the ESLint to use only Prettier for the formatting rules and avoid those conflicting rules upon each other. So, let’s do this!

Step 1. Disabling ESLint formatting rules
The first thing to do is to disable all the ESLint formatting rules.

Install the package eslint-config-prettier
npm install --save-dev eslint-config-prettier
Configure eslint-config-prettier on ‘.eslintrc.json’ file
On the ‘.eslintrc.json’ file, over “extends”, add the follow:

"extends":[
...
"prettier",
"prettier/prettier",
"prettier/react",
"prettier/@typescript-eslint"
]
So, running again the ESLint and Prettier commands:

npx eslint src/App.tsx --quiet --fix
npx prettier --write src/App.tsx
See?! ESLint stopped to use the formatting rules.

Step 2. Make ESLint use Prettier rules
Now, let’s make ESLint use Prettier rules as formatting rules.

Install package eslint-plugin-prettier
npm install --save-dev eslint-plugin-prettier
Configure eslint-plugin-prettier on ‘.eslintrc.json’ file
On the ‘.eslintrc.json’ file, add the follow:

— Over “extends” section, add as the last extension:

"extends":[
...
"plugin:prettier/recommended"
]
Note 1: This turns on the rule provided by eslint-plugin-prettier plugin, which runs Prettier from within ESLint.

Note 2: You can also remove “prettier” from “extends”, since “plugin:prettier/recommended” already does it behind the scenes.

Now running just the ESLint command:

npx eslint src/App.tsx --quiet --fix
See?! ESLint used the Prettier configuration as the formatting rules! Yay!

Conclusion
ESLint and Prettier stop fighting and became best friends, running in harmony!

Also note that if your code doesn’t follow some of the Prettier formatting rules, ESLint will also point out as an ‘prettier/prettier’ rule error.

For example, if we change the import ‘react’ for “react” and run the ESLint command just to check if the rules are being applied (without automatically fix it):

npx eslint src/App.tsx --quiet
We will get the follow error:


Cool, right? Hope you enjoy!

VS Code: execute ESLint + Prettier with auto fix in a file when save
As a plus, I will show you how to configure auto-fix on VS Code, but is an optional step, if you want to run ESLint + Prettier with auto-fix every time you save your code.

Create a ‘.vscode’ folder on the root of the project
Create a ‘settings.json’ file inside .vscode/ folder and insert the follow code on it:

.vscode/settings.json
{
"editor.defaultFormatter": "dbaeumer.vscode-eslint",
"editor.formatOnSave": true,
"eslint.alwaysShowStatus": true,
"editor.codeActionsOnSave": {
"source.fixAll.eslint": true
}
}
Install VS Code ESLint extension
You can go to VS Code ‘Extensions’ section and install it manually:


ESLint Extension for VSCode
Or launch VS Code Quick Open (Ctrl+P) AND Run the follow command:

ext install dbaeumer.vscode-eslint
Allow ESLint extension usage on VS Code:
For the first time that you are using it, ESLint extension will be blocked. You should then allow it by:

1. Click on the status bar icon.


ESLint status bar icon on VSCode
2. A popup will appears. Select ‘Allow’ option.


ESLint extension popup content on first use.
Done! Now every file saved will fix the code and format it with the ESLint + Prettier rules that can be fixed automatically.

BUG: no formatting JSON files when saving
If ESLint extension may have a bug when trying to format JSON files.


VSCode ESLint extension bug message
Luckily, we can solve it by setting another extension on ‘.vscode/settings.json’ just for the ‘.json’ files.

Extension options:

Prettier extension (need to have it installed):
"esbenp.prettier-vscode"
VSCode JSON built-in extension (no need to install it):
"vscode.json-language-features"
Example using Prettier extension:

{
"editor.defaultFormatter": "dbaeumer.vscode-eslint",
"editor.formatOnSave": true,
"eslint.alwaysShowStatus": true,
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
"[json]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
 }
}

