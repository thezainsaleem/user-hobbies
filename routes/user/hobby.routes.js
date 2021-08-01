module.exports = (app) => {
  const Hobby = require("../../models/hobby.model");
  const hobbyController = require("../../controllers/user/hobby.controller");
  const {check, param, query, validationResult} = require('express-validator/check');
  var router = require("express").Router({mergeParams: true});

  /**
   * @swagger
   * /api/v1/users/{userId}/hobbies/:
   *  post:
   *    summary: Used to create a Hobby
   *    tags: 
   *      - Hobby
   *    consumes:
   *      - application/json
   *    parameters:
   *      - in: query
   *        name: userId
   *        schema:
   *          type: string
   *          required: true
   *          example: 61067efba5a3ff6b349f213a
   *        description: Object id of user
   *      - in: body
   *        name: user
   *        description: Creates new user into database
   *        schema:
   *          type: object
   *          required:
   *            - name
   *          properties:
   *            name:
   *              type: string
   *              example: John Doe
   *            passionLevel:
   *              type: string
   *              example: "High"
   *            year:
   *              type: string
   *              example: 1994
   *    responses:
   *      '200':
   *        description: Successful
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   */
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

  /**
   * @swagger
   * /api/v1/users/{userId}/hobbies/{id}:
   *  put:
   *    summary: Used to create a Hobby
   *    tags: 
   *      - Hobby
   *    consumes:
   *      - application/json
   *    parameters:
   *      - in: query
   *        name: userId
   *        schema:
   *          type: string
   *          required: true
   *          example: 61067efba5a3ff6b349f213a
   *        description: Object id of user
   *      - in: query
   *        name: id
   *        schema:
   *          type: string
   *          required: true
   *          example: 61067efba5a3ff6b349f213a
   *        description: Id of hobby
   *      - in: body
   *        name: user
   *        description: Creates new user into database
   *        schema:
   *          type: object
   *          required:
   *            - name
   *          properties:
   *            name:
   *              type: string
   *              example: John Doe
   *            passionLevel:
   *              type: string
   *              example: "High"
   *            year:
   *              type: string
   *              example: 1994
   *    responses:
   *      '200':
   *        description: Successful
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   */
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

  /**
   * @swagger
   * /api/v1/users/{userId}/hobbies/{id}:
   *  get:
   *    summary: Used to create a Hobby
   *    tags: 
   *      - Hobby
   *    consumes:
   *      - application/json
   *    parameters:
   *      - in: query
   *        name: userId
   *        schema:
   *          type: string
   *          required: true
   *          example: 61067efba5a3ff6b349f213a
   *        description: Object id of user
   *      - in: query
   *        name: id
   *        schema:
   *          type: string
   *          required: true
   *          example: 61067efba5a3ff6b349f213a
   *        description: Id of hobby
   *    responses:
   *      '200':
   *        description: Successful
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   */
  router.get(
    "/:id",
    hobbyController.show
  );

  /**
   * @swagger
   * /api/v1/users/{userId}/hobbies:
   *  post:
   *    summary: Used to create a Hobby
   *    tags: 
   *      - Hobby
   *    consumes:
   *      - application/json
   *    parameters:
   *      - in: query
   *        name: userId
   *        schema:
   *          type: string
   *          required: true
   *          example: 61067efba5a3ff6b349f213a
   *        description: Object id of user
   *      - in: query
   *        name: page
   *        schema:
   *          type: number
   *          required: true
   *        description: page number
   *    responses:
   *      '200':
   *        description: Successful
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   */
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


  /**
   * @swagger
   * /api/v1/users/{userId}/hobbies/{id}:
   *  delete:
   *    summary: Used to delete a Hobbyy
   *    tags: 
   *      - Hobby
   *    consumes:
   *      - application/json
   *    parameters:
   *      - in: query
   *        name: userId
   *        schema:
   *          type: string
   *          required: true
   *          example: 61067efba5a3ff6b349f213a
   *        description: Object id of user
   *      - in: query
   *        name: id
   *        schema:
   *          type: string
   *          required: true
   *        description: Object id of hobby
   *    responses:
   *      '200':
   *        description: Successful
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   */

  router.delete(
    "/:id",
    hobbyController.delete
  );

  app.use("/api/v1/users/:user_id/hobbies/", router);
};