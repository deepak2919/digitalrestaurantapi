var db=require('../config/database')
const jwt=require("../config/jwt")

const loginadmin = async (req, res) => {
  const { id, pass } = req.body;
  const sqlQuery =
    "exec sp_admin @paramid=1,@login_id='" + id + "',@login_pass='" + pass + "'";
    db.getRecordSet(sqlQuery)
    .then((results) => {
      if(results.length>0){
        const token = jwt.generateToken(results[0]);
        res.send({msg:"login success",success:true, token:token});
      }else{
        res.send({msg:"login failed",success:false});
      } 
    })
    .catch((error) => {
        console.log(error);
      res.status(500).json({ error: "Failed to reset password" });
    });
};


const loginmanager = async (req, res) => {
  const { id, pass } = req.body;
  const sqlQuery =
    "exec sp_manager @paramid=1,@login_id='" + id + "',@login_pass='" + pass + "'";
    db.getRecordSet(sqlQuery)
    .then((results) => {
      if(results.length>0){
        const token = jwt.generateToken(results[0]);
        res.send({msg:"login success",success:true, token:token});
      }else{
        res.send({msg:"login failed",success:false});
      } 
    })
    .catch((error) => {
        console.log(error);
      res.status(500).json({ error: "Failed to reset password" });
    });
};
module.exports = { loginadmin,loginmanager };
