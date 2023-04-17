const express = require("express");
const {users}= require("../data/users.json")
const router = express.Router();
// >> Getting All Users From the File 
router.get("/",(req,res)=>{
   res.status(200).json({
      success : true,
      data: users
   });
});
// >>Getting All user By id
router.get("/:id",(req,res)=>{
      const { id }= req.params;
      console.log(req.params);
      const user = users.find((each) => each.id ==id);
      if(!users){
         return res.status(404).json({
         success : false,
         message: " User Not Found"
         });
      }
      return res.status(200).json({
      success: true,
      message: "User Found",
      data: users,
         });
         });
// >> Posting Users into Servers
router.post("/:id", (req, res) => {
   const { id, name, surname, email, subscriptionType, subscriptionDate } =
      req.body;
      const user = users.find((each) => each.id === id);
         if (user) {
            return res.status(404).json({
               success: false,
               message: "User With The ID Exists",
            });
         }
         users.push({
            id,
            name,
            surname,
            email,
            subscriptionType,
            subscriptionDate,
            });
            return res.status(201).json({
              success: true,
              message: "User Added Succesfully",
              data: users,
            });
          });
//>>Putting Users into Server 
router.put("/:id", (req, res) => {
   const { id } = req.params;
   const { data } = req.body;
   const user = users.find((each) => each.id === id);
   if (!user) {
     return res.status(404).json({
       success: false,
       message: "User Doesn't Exist !!",
     });
   }
   const updateUserData = users.map((each) => {
     if (each.id === id) {
       return {
         ...each,
         ...data,
       };
     }
     return each;
   })
   return res.status(201).json({
     success: true,
     message: "User Updated !!",
     data: updateUserData,
   });
 });
//  Deleting a User from the Data Given 
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist !!",
    });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);

  return res
    .status(200)
    .json({ success: true, message: "Deleted User..", data: users });
});

// Getting Subscription details
router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User With The ID Didnt Exist",
    });
  }

  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      date = new Date();
    } else {
      date = new Date(data);
    }
    let days = Math.floor(data / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if ((user.subscriptionType = "Basic")) {
      date = date + 90;
    } else if ((user.subscriptionType = "Standard")) {
      date = date + 180;
    } else if ((user.subscriptionType = "Premium")) {
      date = date + 365;
    }
    return date;
  };
});
module.exports= router;