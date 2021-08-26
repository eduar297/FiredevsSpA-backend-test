require("dotenv").config();

const { server }   = require("./app"),
  { connect } = require("./database"),
  port = process.env.PORT || "5000";

async function main() {
  await connect();
  await server.listen(port);
  console.log(`>> Backend Server On Port: ${port}`);
}

main();
