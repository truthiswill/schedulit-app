const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const myEnv = dotenv.config();
dotenvExpand(myEnv);

const { httpServer, initializeApp } = require('./app');

initializeApp().then(() => {
  httpServer.listen(process.env.PORT || 3000, () =>
    console.log('Listening on PORT', process.env.PORT || 3000))
}
);
