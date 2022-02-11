
const Post = require('../models/Post');
const users = require('../models/User');

exports.testcreate= (req, res, next) => {
    Post.bulkCreate([
        {content: 'bonjour a tous !!!', userId: 1},
        {content: 'je suis nouveau ici', userId: 1}
      ])
      .then((newUsers) => {
        console.log(newUsers)
      })
      .catch((err) => {
        console.log("Error while users creation : ", err)
      })
}

exports.test= (req, res, next) => {
// 1:1
// Get the company linked to a given User
Post.findAll({
  where: {content: "what's up fam ?"}, include: 'users'
})
.then((findedPost) => {
  // Get the User with Company datas included
  console.log('1:',findedPost.users.name)
  // Get the company record only
  // console.log(findedUser.company)
})
.catch((err) => {
  console.log("Error while find user : ", err)
})

// 1:N
// Get the employees for a given company
users.findByPk(3, {include: ['authors']})
.then((users) => {
  // Get the Company with Users (employes) datas included
  console.log("2", users)
  // Get the Users (employes) records only
  // console.log(company.get().employes)
})
.catch((err) => {
  console.log("Error while find users : ", err)
})

}