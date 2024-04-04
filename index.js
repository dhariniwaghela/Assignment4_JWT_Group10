//Group 10 
//Dharini Vaghela -200533763
//Nancy Dungrani-200530960

const http = require("http");
const routes = require("./routes/routes");
const server = http.createServer(routes);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});