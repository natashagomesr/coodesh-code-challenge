const cors_proxy = require("cors-anywhere");

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 9091;

cors_proxy
  .createServer({
    originWhitelist: [],
    requireHeaders: [],
  })
  .listen(port, host, function () {
    console.log("CORS Anywhere is running on " + host + ":" + port);
  });
