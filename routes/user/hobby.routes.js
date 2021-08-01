module.exports = (app) => {
  const Hobby = require("../../models/hobby.model");
  const hobbyController = require("../../controllers/user/hobby.controller");
  const {check, param, query, validationResult} = require('express-validator/check');
  var router = require("express").Router({mergeParams: true});

  router.post(
    "/",
    check("name").exists().trim().withMessage('should exist'),
    check("passionLevel").isIn(Hobby.passionLevelValues).trim().withMessage(`should be one of these values ${Hobby.passionLevelValues}`),
    check("year").isLength({ min: 4, max: 4 }).trim().withMessage('should be 4 character long'),
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
    hobbyController.create
  );

  router.put(
    "/:id",
    check("name").exists().trim().withMessage('should exist'),
    check("passionLevel").isIn(Hobby.passionLevelValues).trim().withMessage(`should be one of these values ${Hobby.passionLevelValues}`),
    check("year").isLength({ min: 4, max: 4 }).trim().withMessage('should be 4 character long'),
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
    hobbyController.update
  );

  router.get(
    "/:id",
    hobbyController.show
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
    hobbyController.index
  );

  router.delete(
    "/:id",
    hobbyController.delete
  );

  app.use("/api/v1/users/:user_id/hobbies/", router);
};