module.exports = (app) => {
  const User = require("../models/user.model");
  const userController = require("../controllers/user.controller");
  const {check, param, query, validationResult} = require('express-validator/check');
  var router = require("express").Router();

  /**
   * @swagger
   * /api/v1/users:
   *  post:
   *    summary: Used to create a User
   *    tags: 
   *      - User
   *    consumes:
   *      - application/json
   *    parameters:
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
   *            hobbies:
   *              type: array
   *              items:
   *                type: string
   *              example: []
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

  /**
   * @swagger
   * /api/v1/users/{id}:
   *  put:
   *    summary: Used to create a User
   *    tags: 
   *      - User
   *    consumes:
   *      - application/json
   *    parameters:
   *      - in: path
   *        name: id
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
   *            hobbies:
   *              type: array
   *              items:
   *                type: string
   *              example: []
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

    /**
   * @swagger
   * /api/v1/users/{id}:
   *  get:
   *    summary: Used to get a User
   *    tags: 
   *      - User
   *    consumes:
   *      - application/json
   *    parameters:
   *      - in: query
   *        name: id
   *        schema:
   *          type: string
   *          required: true
   *          example: 61067efba5a3ff6b349f213a
   *        description: Object id of user
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
    userController.show
  );

  /**
   * @swagger
   * /api/v1/users:
   *  get:
   *    summary: Used to get all users
   *    tags: 
   *      - User
   *    consumes:
   *      - application/json
   *    parameters:
   *      - in: query
   *        name: page
   *        schema:
   *          type: number
   *          required: true
   *        description: Object id of user
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
    userController.index
  );


  /**
   * @swagger
   * /api/v1/users/{id}:
   *  delete:
   *    summary: Used to delete a User
   *    tags: 
   *      - User
   *    consumes:
   *      - application/json
   *    parameters:
   *      - in: query
   *        name: id
   *        schema:
   *          type: string
   *          required: true
   *          example: 61067efba5a3ff6b349f213a
   *        description: Object id of user
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
    userController.delete
  );

  app.use("/api/v1/users", router);
};