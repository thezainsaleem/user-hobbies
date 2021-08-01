const mongoose = require('mongoose');
if (process.env.ENVIRONMENT!="production"){
  require('dotenv').config()
}

mongoose.connect(
  process.env.MONGO_CONNECTION_STRING,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const faker = require('faker');
const User = require('../models/user.model')
const Hobby = require('../models/hobby.model')

export const seedUsersWithHobbies = async () => {
  try{
    const quatity = 10;
    const users = [];
    for(let i=0; i < quatity; i++){
      let hobbies = []
      for(let j=0; j<2; j++){
        hobbies.push(
          (
            await Hobby.create({
              name: faker.name.findName(),
              passionLevel: "High",
              year: "1994"
            })
          )._id
        )
      }
      users.push(await User.create({
        name: faker.name.findName(),
        hobbies: hobbies
      }))
    }
    return users;
  }
  catch(err){
    console.error(err.stack)
  }
}


(async () => {
  let users = await seedUsersWithHobbies();
  console.log(`Done! ${users.length} users created!`);
  process.exit(1);
})();
