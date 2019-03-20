require('dotenv').config();
const { app, initializeApp } = require('./app');

initializeApp().then(() =>
  app.listen(process.env.PORT || 3000, () =>
    console.log('Listening on PORT', process.env.PORT || 3000)
  )
);