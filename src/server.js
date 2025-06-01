const port = process.env.PORT || 5000;

const app = require("./app");
const knex = require("./db/connection");

const listener = () => console.log(`Listening on Port ${port}!`);

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(port, listener);
  })
  .catch(console.error);
