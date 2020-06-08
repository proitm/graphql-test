const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: String,
});

const CurrencySchema = new Schema({
  name: String,
  symbol: String,
});

const LoanSchema = new Schema({
  creditor: mongoose.ObjectId,
  lender: mongoose.ObjectId,
  currency: mongoose.ObjectId,
  amount: Number
});

module.exports = {
  Person: new mongoose.model('Person', PersonSchema),
  Currency: new mongoose.model('Currency', CurrencySchema),
  Loan: new mongoose.model('Loan', LoanSchema)
}
