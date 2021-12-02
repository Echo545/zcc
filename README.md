# Zendesk Ticket Viewer

This is a lightweight ticket viewer created for the Zendesk internship coding challenge. The aim of this application is to provide a fast and user friendly way of viewing an account's tickets and associated comments.

<br>

Built using Svelte and Bootstrap 5.

<br>

## Setup


### Installation
Install dependencies with
```
npm install
```

### Authentication
Replace `{YOUR_DOMAIN}` in `Auth.js` with the your ZenDesk domain, ie `https://example.zendesk.com`

Replace `{YOUR_TOKEN}` in `Auth.js` with your OAuth token.

<br>

## Usage
Run development enviroment with
```
npm run dev
```
Or build to production using
```
npm run build
```

The Ticket Viewer will load all tickets for your account in pages of 25 tickets at a time. Naviage between the pages with the buttons below the table.

<br>

## Testing


Unit tests are located in ```App.spec.js``` and are written using Testing Library with the Svelte Testing Framework.


Run unit tests using
```
npm run test
```

### Note about tests:

These tests were designed for an account that has been loaded with [these tickets](https://gist.github.com/svizzari/c7ffed8e10d3a456b40ac9d18f34289c). If you account has different tickets, then edit the constants at the top of the test accordingly.


