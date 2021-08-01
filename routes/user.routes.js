module.exports = (app) => {
  const User = require("../models/user.model");
  const userController = require("../controllers/user.controller");
  const {check, param, query, validationResult} = require('express-validator/check');
  var router = require("express").Router();

  router.post(
    "/",
    check("name").exists().withMessage('should exist'),
    check("hobbies").isArray().withMessage('should be an Array'),
    (req, res, next) => {
      let errors = validationResult(req);
      if (!errors.isEmpty()){
        res.status(403).send({
          error: errors.mapped()
        })
        return;
      }
      next()
    },
    userController.create
  );

  router.put(
    "/:id",
    check("name").exists().withMessage('should exist'),
    check("hobbies").isArray().withMessage('should be an Array'),
    (req, res, next) => {
      let errors = validationResult(req);
      if (!errors.isEmpty()){
        res.status(403).send({
          error: errors.mapped()
        })
        return;
      }
      next()
    },
    userController.update
  );

  router.get(
    "/:id",
    userController.show
  );

  router.get(
    "/",
    query("page").isNumeric().withMessage('should be a Number'),
    (req, res, next) => {
      let errors = validationResult(req);
      if (!errors.isEmpty()){
        res.status(403).send({
          error: errors.mapped()
        })
        return;
      }
      next()
    },
    userController.index
  );

  router.delete(
    "/:id",
    userController.delete
  );

  app.use("/api/v1/users", router);
};