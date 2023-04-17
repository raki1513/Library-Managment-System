const express = require("express");

const app = express();

const PORT = 8081;

const userRouter = require("./routes/users");

const booksRouter = require("./routes/books");

app.use(express.json());
// Successful Request
app.get("/", (req,res)=>{ 
   res.status(200).json ({
      success:true,
      message:"Server Started Successfully",
   });
});
// Routes
// Users Route
app.use("/users", userRouter);
// Books Route
app.use("/books", booksRouter);
// Bad Response
app.get("*",(req,res)=>{
   res.status(404).json({
      success: false,
      message: "Error ROute Not Found"
   })
});

app.listen(PORT, () => {
    console. log('Server is running at port ${PORT}');
    });
