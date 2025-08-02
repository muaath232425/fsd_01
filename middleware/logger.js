module.exports = (req, res, next) => {
  console.log("logger visited time : ", new Date().toLocaleString());

  req.key = "access key";
 
  next();
};
