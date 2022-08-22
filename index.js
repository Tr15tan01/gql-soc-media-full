const { ApolloServer, gql } = require('apollo-server')
require('dotenv').config()
const mongoose = require('mongoose')

const Post = require('./models/Post')

const port = process.env.PORT
const uri = process.env.MONGO_URI

const typeDefs = gql`

type Post {
    id: ID!
    body: String
    createdAt: String
    username: String
}

type Query {
    getPosts: [Post]
}
`

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = Post.find()
                return posts
            } catch (err) {
                throw new Error(err)
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => {
        console.log('👌 connected to database 📅')
        return server.listen({ port })
    })
    .then(({ url }) => {
        console.log(`🚀  Server ready 🌊 at ${url}`);
    });


