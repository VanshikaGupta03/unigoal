require("dotenv").config();
const async = require("async");

const careers = require("../../../models/v1/student/careers");
const { errorResponse, successResponse, successResponse1, successResponse2, successResponse3 } = require("../../../helpers/response");

/*************************  Careers APIs ***************************/

/*****  Get Careers List API *****/
exports.getCareersList = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            careers.getCareersList(data, (err, dbData, type) => {
                if (err) {
                    console.log(`Careers List err--->`, err);
                    return errorResponse("Database related error", callback);
                }
                else if (dbData && dbData.total[0].total > 0) {
                    return successResponse1("Careers List", dbData.total[0].total, dbData.careers, callback);
                }
                else {
                    errorResponse("No Career available.", callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

/*****  Get Career Details API *****/
exports.getCareerDetails = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            careers.getCareerDetails(data, (err, dbData) => {
                if (err) {
                    console.log(`Get Career Details err--->`, err);
                    return errorResponse("Database related error", callback);
                }
                else if (dbData && dbData.length) {
                    return successResponse("Career Details", dbData[0], callback);
                }
                else {
                    errorResponse("No details available.", callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};