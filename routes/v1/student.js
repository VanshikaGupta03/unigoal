/*
 * @Author: Rajat Paliwal
 * @Date: Dec 11 2023
 */

let express = require("express"),
  router = express.Router(),
  authHandler = require("../../helpers/verifyToken");
const { validateSchema, validateSchemaGet } = require("../../helpers/validation-helper");
const careers_schema = require("../../validators/student/careers_validation");
const careersController = require("../../controllers/v1/student/careers");



/******************* Routes **********************/

/*************************  Careers APIs ***************************/

router.get(
  "/getCareersList",
  validateSchemaGet(careers_schema.getCareersList),
  authHandler.verifyTokenStudent,
  (req, res) => {
    careersController.getCareersList(req.query, (data) => {
      res.send(data);
    });
  }
);

router.get(
  "/getCareerDetails",
  validateSchemaGet(careers_schema.getCareerDetails),
  authHandler.verifyTokenStudent,
  (req, res) => {
    careersController.getCareerDetails(req.query, (data) => {
      res.send(data);
    });
  }
);

module.exports = router;
