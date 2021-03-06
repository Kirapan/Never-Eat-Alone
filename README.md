# Never-Eat-Alone
Never-Eat-Alone enables users to connect to business professionals nearby to expand their network, obtain career advice, understand other industries, explore business opportunities or even secure next promotion over lunch. Build in React and Node.js and integrated Google Maps and Foursquare API.

## Main contributors
[Xiaoqi Pan](https://github.com/Kirapan), 
[Michael Rychly](https://github.com/michaelrychly) 

## Getting Started

1. Install dependencies using the `npm install` command.
2. cd /server and run the knex migration using `knex migrate:latest` plus seed the database using `knex seed:run`
3. cd /server and start the web server using `npm start`.
4. Open another terminal, cd /client and start the web client using the `npm start`. The app will be served at <http://localhost:3000/>.
5. Go to <http://localhost:3000/> in your browser.

## Client Dependencies

- axios
- jquery
- material-ui
- node-sass
- npm
- react
- react-bootstrap
- react-bootstrap-tabs
- react-bootstrap-time-picker
- react-day-picker
- react-dom
- react-form
- react-foursquare
- react-geosuggest
- react-google-maps
- react-router-dom
- react-scripts
- sass
- sass-loader

## Server Dependencies

- express
- ws
- bcrypt
- body-parser
- cors
- faker
- jsonwebtoken
- knex
- knex-logger
- pg
- morgan

## Final Product

!["URL Homepage"](https://github.com/Kirapan/Never-Eat-Alone/blob/master/docs/Home.png?raw=true)
!["URL Users"](https://github.com/Kirapan/Never-Eat-Alone/blob/master/docs/Find.png?raw=true)
!["URL Restaurant"](https://github.com/Kirapan/Never-Eat-Alone/blob/master/docs/Restaurant.png?raw=true)
!["URL Messages"](https://github.com/Kirapan/Never-Eat-Alone/blob/master/docs/Messages.png?raw=true)
!["URL Favorites"](https://github.com/Kirapan/Never-Eat-Alone/blob/master/docs/Favorites.png?raw=true)
!["URL Signup"](https://github.com/Kirapan/Never-Eat-Alone/blob/master/docs/Signup.png?raw=true)

## Room for improvement

- implement the following functionality: user profile pages, redux, matching algorythm, realtime messaging
