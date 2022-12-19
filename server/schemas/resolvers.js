const { Chat } = require('../models/Chat');
const { Message } = require('../models/Message');
const { User } = require('../models/User');
const { Suggestion } = require('../models/Suggestion');

const resolvers = {
    Query: {
        getsuggestions: {
            suggestions: [Suggestion]
        }
    },

    Mutation: {
        addSuggestion: {
            id,
            author,
            content
          }
    },


}

module.exports = resolvers;