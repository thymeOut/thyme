const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const port = process.env.PORT || 3000;
const { db } = require("./db");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, rootResolver } = require("./graphql");
const {
  models: { User },
} = require("./db");
// some good ol' logging middleware
app.use(morgan("dev"));

// serving up some sweet static files
app.use(express.static(path.join(__dirname, "../public")));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = new ApolloServer({
  typeDefs,
  resolvers: rootResolver,
  context: async ({ req }) => {
    return {
      ...req,
      user:
        req && req.headers.authorization
          ? await User.findByToken(req.headers.authorization)
          : null,
    };
  },
});

server.applyMiddleware({ app });

// app.get("*", function (req, res) {
//   console.log("fljkhewlkfajhelkjrhg");
//   res.sendFile(path.join(__dirname, "../public/index.html"));
// });

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

const init = async () => {
  try {
    await db.sync();
    app.listen(port, function () {
      console.log("listening on port ", port);
    });
  } catch (error) {
    console.log("uh oh-> ", error);
  }
};
init();
