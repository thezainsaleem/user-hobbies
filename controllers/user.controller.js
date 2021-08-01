const User = require("../models/user.model");
const Hobby = require("../models/hobby.model");

exports.create = async (req, res) => {
  try{
    let {
      name,
      hobbies
    } = req.body;
    try{
      let user = await User.create({
        name: name,
        hobbies: hobbies
      });
      res.send(user)
    }
    catch(err){
      res.status(500).send({
        error: err.message
      });
    }
  }
  catch(e){
    console.error(e.trace);
    res.status(500).send({
      error: "Internal Error"
    })
  }
}

exports.update = async (req, res) => {
  try{
    let{
      id
    } = req.params;

    let {
      name,
      hobbies
    } = req.body;
    try{
      let user = await User.findByIdAndUpdate(
        {
          _id: id
        },
        {
        name: name,
        hobbies: hobbies
        },
        {
          new: true
        });
      res.status(user ? 200 : 404).send(user)
    }
    catch(err){
      res.status(500).send({
        error: err.message
      });
    }
  }
  catch(e){
    console.error(e.trace);
    res.status(500).send({
      error: "Internal Error"
    })
  }
}

exports.show = async (req, res) => {
  try{
    let{
      id
    } = req.params;
    let user = await User.findOne(
      {
        _id: id
      });
    res.status(user ? 200 : 404).send(user)
  }
  catch(e){
    console.error(e.trace);
    res.status(500).send({
      error: "Internal Error"
    })
  }
}

exports.index = async (req, res) => {
  try{
    let {
      page
    } = req.query;

    let queryParams = {};
    let paginationParams = {
      page: page
    };

    let users = await User.paginate(queryParams, paginationParams);
    res.send(users)
  }
  catch(e){
    console.error(e.trace);
    res.status(500).send({
      error: "Internal Error"
    })
  }
}

exports.delete = async (req, res) => {
  try{
    let {
      id
    } = req.params;
    let status = 200;

    try{
      let user = await User.findByIdAndDelete(id);
      await Hobby.deleteMany({
        _id: {
          $in: user.hobbies
        }
      })
      if (!user)
        status = 404;
      res.status(status).send(user);
    }
    catch(err){
      res.status(403).send({
        error: err.message
      })

    }
  }
  catch(e){
    console.error(e.trace);
    res.status(500).send({
      error: "Internal Error"
    })
  }
}