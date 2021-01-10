const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRouter");
const pageRoutes = require("./routes/pageRouter");
const itemRoutes = require("./routes/itemRouter");
const jwt = require("./_helpers/jwt");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//connect to the database
mongoose
  .connect(process.env.DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(cors({allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'}));
app.use(jwt());

app.use("/pages", pageRoutes);
app.use("/users", userRoutes);
app.use("/items", itemRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
