const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../models/User");
const Likes = require("../models/like");
var asyncLib = require("async");
require("dotenv").config({ path: "./.env" });

exports.signup = async (req, res, next) => {
  //check if the user is already in the database
  const emailExist = await users.findOne({ where: { email: req.body.email } });
  if (emailExist) {
    return res.status(400).send("email already exist");
  }

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = users
        .create({
          name: req.body.name,
          pseudo: req.body.pseudo,
          email: req.body.email,
          password: hash,
        })
        .then(() =>
          res.status(201).json({
            message: "Utilisateur créé !",
            userId: users.id,
            token: jwt.sign({ userId: users.id }, process.env.APP_KEY, {
              expiresIn: "24h",
            }),
          })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = async (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;

  // const user = await users.findOne({ where: { email: req.body.email } });
  // if (!user) {
  //   return res.status(400).send("Email introuvable");
  // }

  // const validPass = await bcrypt.compare(req.body.password, users.password);
  // if (!validPass) {
  //   return res.staus(400).send("Mot de passe incorrect !");
  // }

  // const token = jwt.sign({ userId: users.id }, process.env.APP_KEY, {
  //   expiresIn: "24h",
  // });
  // res.header("auth-token", token).send(token);

  users
    .findOne({
      where: { email: email },
    })
    .then((users) => {
      if (users === null) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(password, users.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }

          res.status(200).json({
            pseudo: users.pseudo,
            userId: users.id,
            token: jwt.sign({ userId: users.id }, process.env.APP_KEY, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// exports.login = async (req, res, next) => {
//   let userExist = await users.findOne({ where: { email: req.body.email } });
//   if (!userExist) return res.status(400).send({ message: "email not found" });
//   let validPassword = await bcrypt.compare(
//     req.body.password,
//     userExist.password
//   );
//   if (!validPassword)
//     return res.status(400).send({ message: "Password is incorect" });
//   var newToken = jwt.sign({ userId: userExist.id }, process.env.APP_KEY, {
//     expiresIn: "24h",
//   });
//   let userId = userExist.id;
//   res.status(200).header("token", newToken).send(String(userId));
// };

exports.userid = (req, res, next) => {
  id = req.params.id;
  users.findOne({ where: { id: id } }).then((users) => {
    if (!users) {
      console.log("Not found!");
    } else {
      res.status(200).json(users);
    }
  });
};
