const express = require('express');
const router = express.Router();

const schema = require("../../../validators/student/review");
const { validateSchema } = require("../../../helpers/validation-helper");
const { addReview, addDetailedReview, addBlogReview } = require("../../../controllers/v1/student/review");

router.post(
    "/addReview",
    validateSchema(schema.reviewSchema),
    (req, res) => {
        addReview(req.body, (data) => {
            res.send(data);
        });
    }
);

router.post(
    "/detailedReview",
    validateSchema(schema.detailedReviewSchema),
    (req, res) => {
        addDetailedReview(req.body, (data) => {
            res.send(data);
        });
    }
);

router.post(
    "/blogReview",
    validateSchema(schema.blogReviewSchema),
    (req, res) => {
        addBlogReview(req.body, (data) => {
            res.send(data);
        });
    }
);

module.exports = router;
