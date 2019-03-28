//import graphQL library from graphql-yoga
const { GraphQLServer } = require('graphql-yoga')
//install mongoose => this will connnect to the database
const mongoose = require("mongoose")
//link to database 
mongoose.connect('mongodb+srv://elvingalindo:Guateus17@cluster0-nm87b.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
//create a schema fields that we will have and their type
const Todo = mongoose.model("Todo", {
    text: String,
    complete: Boolean
})
//GraphQl Schemas (data base model or what we will store in the database)
//Schemas have types, arguments, data type and return type (!) means mandatory
//how the data is getting fetch -- returns array
//return type todo which will have required fields
const typeDefs = `
    type Query {
        hello(name: String): String!
        todos: [Todo]
    }
    type Todo {
        id: ID!
        text: String!
        complete: Boolean!
    }
    type Mutation {
        createTodo(text: String!): Todo
        updateTodo(id: ID!, complete:Boolean!): Boolean
        removeTodo(id: ID!): Boolean
    }
`
//resolvers have the same things as schemas, destructing the parameters and returns something
const resolvers = {
//Queries are read (looking at data)
//no arguments todo.find (finds all the todos and return them)
    Query: {
        hello: (_, { name }) => `Hello ${name || 'World'}`,
        todos: () => Todo.find()
    },
//Mutation is when we add, update or delete data
    Mutation: {
//(first is the parent, the second argument) => pass text and complete
        createTodo: async (_, {text}) => {
            const todo = new Todo({text, complete: false})
//.save saves it to the database
            await todo.save();
            return todo;
        },
//finds by id gets the new value of complete
        updateTodo: async (_, {id, complete}) => {
            await Todo.findByIdAndUpdate(id, {complete})
            return true;
        },
//one argument to delete
        removeTodo: async (_, { id }) => {
            await Todo.findByIdAndRemove(id)
            return true;
        }
    }
}
//connect to mongodb database and then start graphql server and run in port 4000
const server = new GraphQLServer({ typeDefs, resolvers})
mongoose.connection.once("open", function() {
    server.start(()=> console.log('Server is running on localhost:4000'))
})