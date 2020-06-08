const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/loans?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to the database');
});
// mongoose.connect('mongodb+srv://test:test@cluster0-syq86.mongodb.net/gql-demo?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.once('open', () => {
//   console.log('Connected to the database');
// });

app.listen(4000, () => {
  console.log('Running on 4000');
});

app.use('/graphql/', graphqlHTTP({
  schema,
  graphiql: true
}));
