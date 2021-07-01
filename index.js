
if(process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}

const PORT = process.env.PORT || 3000

const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const passport = require("passport")

mongoose.connect(process.env.MONGOOSE_NET_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
  }
).then(() => console.log('DB Connected'))
 .catch(err => console.log('Err connecting to DB'))

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:8080', 'http://127.0.0.1:3000'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

app.use(passport.initialize())
app.use(passport.session())
require('./middlewares/jwt')(passport)
require('./middlewares/facebook')(passport)
require('./middlewares/google')(passport)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "web/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "web/build/index.html"));
  });
}
require('./routes/index')(app)
const server =  app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))

require('./controller/socket').initialize(server)
