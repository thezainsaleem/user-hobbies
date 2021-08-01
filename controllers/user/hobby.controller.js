const Hobby = require("../../models/hobby.model");
const User = require("../../models/user.model");
const constants = require("../constants")

exports.create = async (req, res) => {
  try{
    let {
      user_id
    } = req.params;
    let {
      name,
      passionLevel,
      year
    } = req.body;

    try{
      let user = await User.findOne({
        _id: user_id
      })
      let hobby = null;
      if (!user)
        res.status(404).send(null)
      try{
        hobby = await Hobby.create({
          name: name,
          passionLevel: passionLevel,
          year: year
        });
      }
      catch(err){
        res.status(500).send({
          error: err.message
        });
      }
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $push: {
            hobbies: hobby._id
          }
        },
        {
          new: true
        })
      res.send(hobby)
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
      id,
      user_id
    } = req.params;

    let {
      name,
      passionLevel,
      year
    } = req.body;
    try{
      let hobby = await Hobby.findByIdAndUpdate(
        id,
        {
        name: name,
        passionLevel: passionLevel,
        year: year
      },
      {
        new: true
      });
      res.status(hobby ? 200 : 404).send(hobby)
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
    let hobby = await Hobby.findOne(
      {
        _id: id
      });
    res.status(hobby ? 200 : 404).send(hobby)
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
      user_id
    } = req.params;

    let {
      page
    } = req.query;
    let user = await User.findOne({
      _id: user_id
    });
    if (!user)
      res.status(404).send([])

    let queryParams = {
      _id: {
        $in: user.hobbies
      }
    };
    let paginationParams = {
      page: page
    };

    
    console.log(user.hobbies)
    let hobbies = await Hobby.paginate(queryParams, paginationParams);
    res.send(hobbies);
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

    try{
      let hobby = await Hobby.findByIdAndDelete(id);
      await User.updateOne({
        _id: user_id
      },
      {
        $pull: {
          hobbies: hobby._id
        }
      })
      res.status(hobby ? 200 : 404).send(hobby);
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