import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/

const schema = a.schema({
  User: a.model({
    name: a.string().required(), // Name of the User
    email: a.string().required(), // Email of the User
    // Create a hasMany relationship with quizzes
    quizzes: a.hasMany("Quiz", "userId"),
  }),

  Quiz: a.model({
    title: a.string().required(), // Title of the Quiz
    userId: a.id(), // Reference field for User
    // Create a hasMany relationship with questions
    questions: a.hasMany("Question", "quizId"),
    // Create a belongsTo relationship with User
    user: a.belongsTo("User", "userId"),
  }),

  Question: a.model({
    text: a.string().required(), // Question text
    quizId: a.id(), // Reference field for Quiz
    // Create a hasOne relationship with Option
    option: a.hasOne("Option", "questionId"),
    // Create a belongsTo relationship with Quiz
    quiz: a.belongsTo("Quiz", "quizId"),
  }),

  Option: a.model({
    questionId: a.id(), // Reference field for Question
    // Create a hasMany relationship with answers
    answers: a.hasMany("Answer", "optionId"),
    // Create a belongsTo relationship with Question
    question: a.belongsTo("Question", "questionId"),
  }),

  Answer: a.model({
    text: a.string().required(), // Answer text
    isCorrect: a.boolean().required(), // Whether the answer is correct
    optionId: a.id(), // Reference field for Option
    // Create a belongsTo relationship with Option
    option: a.belongsTo("Option", "optionId"),
  }),
}).authorization((allow) => allow.publicApiKey()); // Enables public API key authorization

export default schema;


export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
