require("dotenv").config();

const { errorResponse, successResponse } = require("../../../helpers/response");
const { addReviewToDB, addDetailedReviewToDb, addBlogReviewToDb } = require("../../../models/v1/student/review");


exports.addReview = (req, res) => {
    try {
        addReviewToDB(req, (err, result) => {
            if (err) {
                console.error("Database Error:", err);
                return errorResponse("Failed to add review", res);
            }
            return successResponse('Review added successfully!', result, res);
        });
    } catch (error) {
        console.error("Server Error:", error);
        return errorResponse("Internal Server Error", res);
    }
};

exports.addDetailedReview = (reviewData, res) => {
    try {
        addDetailedReviewToDb(reviewData, (err, result) => {
            if (err) {
                console.error("Database Error:", err);
                return errorResponse(err.statusMessage || "Failed to add review", res);
            }
            return successResponse(result.message, result, res);
        });
    } catch (err) {
        console.error("Server Error:", err);
        return errorResponse("Internal Server Error", res);
    }
};



exports.addBlogReview = (reviewData, res) => {
    addBlogReviewToDb(reviewData, (err, result) => {
        if (err) {
            return errorResponse("Failed to add review", res);
        }
        return successResponse('Blog Review added successfully!', result, res);
    });
};



