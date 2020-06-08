const graphql = require('graphql');
const _ = require('lodash');
const currencies = require('../data/currency');
const models = require('../models/models');

const {
  GraphQLObjectType, GraphQLID, GraphQLString,
  GraphQLList,
  GraphQLSchema
} = graphql;


const LoanType = new GraphQLObjectType({
  name: 'Loan',
  fields: () => ({
    id: {type: GraphQLID},
    creditor: {type: PersonType},
    lender: {type: PersonType},
    amount: {type: GraphQLFloat},
    currency: {type: CurrencyType}
  })
});


const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString}
  })
});


const CurrencyType = new GraphQLObjectType({
  name: 'Currency',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    symbol: {type: GraphQLString}
  })
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    person: {
      type: PersonType,
      args: {id: {type: GraphQLID}},
      resolve: (parent, args) => ({
        // data resolver
      })
    },
    currency: {
      type: CurrencyType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return models.Currency.findOne({ _id: args.id });
      }
    },
    currencyList: {
      type: new GraphQLList(CurrencyType),
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return currencies;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCurrency: {
      type: CurrencyType,
      args: {
        name: {type: GraphQLString},
        symbol: {type: GraphQLString}
      },
      resolve(parent, args) {
        let currency = new models.Currency({
          name: args.name,
          symbol: args.symbol
        });
        currency.save();
        return currency;
      }
    }
  }
});


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
