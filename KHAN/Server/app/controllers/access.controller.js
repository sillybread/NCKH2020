const db = require("../models");
const Room = require("../models/room.model");
const Access = db.access;
const Nontification = db.nontification;
//get Access
exports.getAccess = (req, res) => {
  Access.find({ room: req.body.room_id ,accepted: true},'role _id user')
    .populate("user",'fullname avatar _id  username')
    .exec((err, result) => {
      if (err) {
        res.status(400).send({ messageError: err });
        return;
      }
      res.status(200).send(result);
    });
};

//add Access
exports.addAccess = (req, res) => {
  const newAccess = new Access({
    room: req.body.room_id,
    user: req.body.user_id,
    role: req.body.role,
  });
  newAccess
    .save()
    .then((access) => {
      const newNontification = new Nontification({
        user: req.body.user_id,
        content: "Lời mời cộng tác",
        type:"Invite access",
        ref:"Access",
        obj_id: access._id
      });
      newNontification.save().then((nontification)=>{
        req.io.to('user'+newNontification.user).emit('notification', newNontification);
        res.status(200).send({ message: "Add Success" });
        
      }).catch(err=>{
        res.status(400).send({ messageError1: err });
      })
      
    })
    .catch((err) => {
      res.status(400).send({ messageError2: err });
    });
};
//edit Access
exports.editAccess = (req, res) => {
  Access.findById(req.body.access_id).exec((err, access) => {
    if (err) {
      res.status(400).send({ messageError: err });
      return;
    }
    access.role = req.body.role;
    access
      .save()
      .then(() => {
        req.io.to('room'+access.room).emit('access',{message:'edit',data:{access}})
        res.status(200).send({ message: "Edit success" });
      })
      .catch((err) => {
        res.status(400).send({ messageError: err });
      });
  });
};
//del Access
exports.deleteAccess = (req, res) => {
  Access.findById(req.body.access_id).exec((err,access) => {
    if (err) {
      res.status(400).send({ messageError: err });
      return;
    }
    Access.deleteOne({_id:access._id}).exec((err2)=>{
      if (err2) {
        res.status(400).send({ messageError: err });
        return;
      }
      req.io.to('room'+access.room).emit('access',{message:'delete',data:{access}})
      res.status(200).send({ message: "Delete success" });
    })
    
  });
};
//reply Access

exports.replyAccess = (req,res)=>{
  if(req.body.accepted!=null && req.body.accepted){
    Access.findById(req.body.access_id).exec((err, access) => {
      if (err) {
        res.status(400).send({ messageError: err });
        return;
      }
      access.accepted = req.body.accepted;
      access
        .save()
        .then(() => {
          
          req.io.to('user'+access.user).emit('access',{message:'add',data:{access}})
          req.io.to('room'+access.room).emit('access',{message:'accepted',data:{access}})
          res.status(200).send({ message: "Accepted" });
        })
        .catch((err) => {
          res.status(400).send({ messageError: err });
        });
    });
  }else{
    Access.deleteOne({ _id: req.body.access_id }).exec((err) => {
      if (err) {
        res.status(400).send({ messageError: err });
        return;
      }
      res.status(200).send({ message: "Declined" });
    });
  }
  
}