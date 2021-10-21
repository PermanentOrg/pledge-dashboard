# Pledge Dashboard
*Editor for pledge/donation data stored in Firebase*

___

## History


This was built off an Angular dashboard starter template as a way to (relatively) safely edit pledge data as stored in the [Firebase Realtime Database](https://firebase.google.com/docs/database), which is their big nasty JSON tree-based product. Their Cloud Firestore product is their newer database product which is more conventionally document-based but did not exist at the time!

The project makes heavy use of the AngularFire library which provides helpers and wrappers for Firebase products.

Since all pledge campaign data is stored in Firebase, there is no accompanying backend for this dashboard. All edits are done directly in Firebase, using their security rules and authentication to allow editing of the data that the general public does not have permission to do.

Most specific questions about any of the pledge campaign functionality can probably be answered by the [Realtime Database docs](https://firebase.google.com/docs/database) and the [Cloud Function triggers docs](https://firebase.google.com/docs/functions/database-events). Data is written directly to the database by `web-app` (and also by this app!) and validated by schema and security rules set inside Firebase. When data is created or updated, Firebase triggers certain Cloud Functions we have set up that aggregate data, send emails– executed any arbitrary Javascript that we've registered.

## Usage

__NOTE: THIS PROJECT'S DEPENDENCIES REQUIRE NODE 10.X, USE `n` OR `nvm` TO SWITCH VERSIONS BEFORE INSTALLING OR BUILDING__

This app was previously deployed on our IP-whitelisted `devops` server, and just like `web-app` or any non-SSR Angular app, compiles down to static assets. These can be thrown anywhere that allows for redirecting all paths that don't resolve to a file to `index.html` to allow Angular to route request properly. The Apache configs for `web-app` should be basically identical.

It was previously deployed via the included script `deploy.sh`. This may or may not be useful! Nothing crazy going on there, but it's there :).

In a pinch, the app can be run locally via `npm start` which starts the `ng serve` dev server, but by default this uses the `dev` credentials from `environment.ts`. You can override the configuration with the `--prod` flag which *should* pull from `environment.prod.ts`, and thusly, use production data.

## Authentication

Accounts are managed in each Firebase project dashboard. There is no account creation functionality in the app, and I believe that functionality is disabled outside of the dashboard as currently configured. The same security rules that protect the data in production protect the data here.

Currently, the rules allow for anyone authenticated with an account to edit data. Very few accounts exist and only privileged users have accounts in the first place, so this should be sufficient, but you can update these rules in the Firebase dashboard if needed.


## Hosting/Deploying

To deploy this project, you'll need to use the [Firebase CLI](https://firebase.google.com/docs/cli). For Permanent developers, you need to authenticate with the Firebase CLI. From there you can run `firebase deploy --project ${PROJECT ID}`, substituting the correct Firebase project ID.


*original README from dashboard template preserved below*

# [Light Bootstrap Dashboard Angular](https://demos.creative-tim.com/light-bootstrap-dashboard-angular2/dashboard)
[![version][version-badge]][CHANGELOG] ![license][license-badge]

![alt text](src/assets/img/opt_lbd_angular_thumbnail.jpg)

**[Light Bootstrap Dashboard Angular](https://demos.creative-tim.com/light-bootstrap-dashboard-angular2/dashboard)** is an admin dashboard template designed to be beautiful and simple. It is built on top of Bootstrap 3, using [Light Bootstrap Dashboard](https://www.creative-tim.com/product/light-bootstrap-dashboard) and it is fully responsive. It comes with a big collections of elements that will offer you multiple possibilities to create the app that best fits your needs. It can be used to create admin panels, project management systems, web applications backend, CMS or CRM.

The product represents a big suite of front-end developer tools that can help you jump start your project. We have created it thinking about things you actually need in a dashboard. Light Bootstrap Dashboard Angular 2 contains multiple handpicked and optimized plugins. Everything is designed to fit with one another. As you will be able to see, the dashboard you can access on Creative Tim is a customization of this product.

It comes with 6 filter colors for the sidebar (“black”, “azure”,”green”,”orange”,”red”,”purple”) and an option to have a background image.

Special thanks go to: Robert McIntosh for the notification system Chartist for the wonderful charts We are very excited to share this dashboard with you and we look forward to hearing your feedback!

## Links:

+ [Live Preview](https://demos.creative-tim.com/light-bootstrap-dashboard-angular2/dashboard)
+ [Light Bootstrap Dashboard PRO Angular](https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-angular2/?ref=lbd-angular-github) ($49)

## Quick Start:

Quick start options:

+ [Download from Github](https://github.com/creativetimofficial/light-bootstrap-dashboard-angular2/archive/master.zip).
+ [Download from Creative Tim](https://www.creative-tim.com/product/light-bootstrap-dashboard-angular2).
+ Clone the repo: `git clone https://github.com/creativetimofficial/light-bootstrap-dashboard-angular2.git`.

## Terminal Commands

1. Install NodeJs from [NodeJs Official Page](https://nodejs.org/en).
2. Open Terminal
3. Go to your file project
4. Run in terminal: ```npm install -g @angular/cli```
5. Then: ```npm install```
6. And: ```ng serve```
7. Navigate to `http://localhost:4200/`

### What's included

Within the download you'll find the following directories and files:
```
light-bootstrap-dashboard-angular
├── CHANGELOG.md
├── LICENSE.md
├── README.md
├── angular.json
├── documentation
│   ├── css
│   └── tutorial-lbd-angular2.html
├── e2e
├── karma.conf.js
├── package-lock.json
├── package.json
├── protractor.conf.js
├── src
│   ├── app
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app.routing.ts
│   │   ├── home
│   │   │   ├── home.component.css
│   │   │   ├── home.component.html
│   │   │   ├── home.component.spec.ts
│   │   │   └── home.component.ts
│   │   ├── icons
│   │   │   ├── icons.component.css
│   │   │   ├── icons.component.html
│   │   │   ├── icons.component.spec.ts
│   │   │   └── icons.component.ts
│   │   ├── layouts
│   │   │   └── admin-layout
│   │   │       ├── admin-layout.component.html
│   │   │       ├── admin-layout.component.scss
│   │   │       ├── admin-layout.component.spec.ts
│   │   │       ├── admin-layout.component.ts
│   │   │       ├── admin-layout.module.ts
│   │   │       └── admin-layout.routing.ts
│   │   ├── lbd
│   │   │   ├── lbd-chart
│   │   │   │   ├── lbd-chart.component.html
│   │   │   │   └── lbd-chart.component.ts
│   │   │   └── lbd.module.ts
│   │   ├── maps
│   │   │   ├── maps.component.css
│   │   │   ├── maps.component.html
│   │   │   ├── maps.component.spec.ts
│   │   │   └── maps.component.ts
│   │   ├── notifications
│   │   │   ├── notifications.component.css
│   │   │   ├── notifications.component.html
│   │   │   ├── notifications.component.spec.ts
│   │   │   └── notifications.component.ts
│   │   ├── shared
│   │   │   ├── footer
│   │   │   │   ├── footer.component.html
│   │   │   │   ├── footer.component.ts
│   │   │   │   └── footer.module.ts
│   │   │   └── navbar
│   │   │       ├── navbar.component.html
│   │   │       ├── navbar.component.ts
│   │   │       └── navbar.module.ts
│   │   ├── sidebar
│   │   │   ├── sidebar.component.html
│   │   │   ├── sidebar.component.ts
│   │   │   └── sidebar.module.ts
│   │   ├── tables
│   │   │   ├── tables.component.css
│   │   │   ├── tables.component.html
│   │   │   ├── tables.component.spec.ts
│   │   │   └── tables.component.ts
│   │   ├── typography
│   │   │   ├── typography.component.css
│   │   │   ├── typography.component.html
│   │   │   ├── typography.component.spec.ts
│   │   │   └── typography.component.ts
│   │   ├── upgrade
│   │   │   ├── upgrade.component.css
│   │   │   ├── upgrade.component.html
│   │   │   ├── upgrade.component.spec.ts
│   │   │   └── upgrade.component.ts
│   │   └── user
│   │       ├── user.component.css
│   │       ├── user.component.html
│   │       ├── user.component.spec.ts
│   │       └── user.component.ts
│   ├── assets
│   │   ├── css
│   │   ├── fonts
│   │   ├── img
│   │   └── sass
│   │       ├── lbd
│   │       └── light-bootstrap-dashboard.scss
│   ├── environments
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.css
│   ├── test.ts
│   └── tsconfig.json
├── tslint.json
└── typings.json

```
## Useful Links

More products from Creative Tim: <https://www.creative-tim.com/bootstrap-themes>

Tutorials: <https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w>

Freebies: <https://www.creative-tim.com/products>

Affiliate Program (earn money): <https://www.creative-tim.com/affiliates/new>

Social Media:

Twitter: <https://twitter.com/CreativeTim>

Facebook: <https://www.facebook.com/CreativeTim>

Dribbble: <https://dribbble.com/creativetim>

Google+: <https://plus.google.com/+CreativetimPage>

Instagram: <https://instagram.com/creativetimofficial>

[CHANGELOG]: ./CHANGELOG.md

[version-badge]: https://img.shields.io/badge/version-1.5.0-blue.svg
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
