# Proj1

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.14.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Add TailwindCss 
first go to your project by :`cd my-project` then install tailwindCss using command :`npm install -D tailwindcss postcss autoprefixer`
then tap command :`npx tailwindcss init` , after go to tailwingCss.config and add this or change it if content:[] already exist:
 `content: [
    "./src/**/*.{html,ts}",
  ],` 
  After go to `style.css` and add this:
`@tailwind base;
@tailwind components;
@tailwind utilities;`

# Add Bootstrap-icons
install `bootstrap-icons` by tap command : `npm i bootstrap-icons --save` , then add this `"bootstrap-icons/font/bootstrap-icons.css"` to `styles:[]` in `angular.json` file 



