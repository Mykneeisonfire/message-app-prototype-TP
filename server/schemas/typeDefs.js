const { gql } = require("apollo-server-express");

const typeDefs = gql`
type Chat {
    _id: ID
    chatName: String
    users: String
    latestMessage:String
    createdAt: String
}

type Message {
    _id: ID
    sender: String
    content: String
    chat: String
    createdAt: String
}

type Suggestion {
    _id: ID
    author: String
    content: String
    createdAt: String
}

type Query {
    chat: [Chat]
    message: [Message]
    suggestions: [Suggestion]
}

type Mutation {
    addSuggestion(author: String, suggestion: String) Suggestion
}
`;

module.exports = typeDefs;