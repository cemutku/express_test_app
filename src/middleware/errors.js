//Error Handlers

// app.use((req, res, next) => {
//   const error = new Error("Not Found");
//   error.status = 404;
//   next(error);
// });

// app.use((err, req, res, next) => {
//   console.log("dwadawdawd");
//   res.status(err.status || 500);
//   res.json({ error: { message: err.message } });

// });

function logErrors(err, req, res, next) {
  //Log errors to log file
  console.error(err.stack);
  res.status(500).send({ error: err.message });
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    //Log errors to different type of requests
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

//Client Side Error Handler and Render
// function errorHandler(err, req, res, next) {
//   res.status(500);
//   res.render("error", { error: err });
// }

module.exports = { logErrors, clientErrorHandler };
