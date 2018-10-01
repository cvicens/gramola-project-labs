import app from "./application";
// import log from "./log";
const serverPort = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.listen(serverPort, (err) => {
  if (err) {
    return console.error(err);
  }

  return console.info(`server is listening on ${serverPort}`);
});
