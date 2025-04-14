require('dotenv').config();
const async = require('async');

const clubs = require('../../../models/v2/admin/clubs');

const {
    errorResponse,
    successResponse,
    successResponse1,
    successResponse2,
    fieldMissingResponse,
    tokenMissing
} = require("../../../helpers/response");
const { deleteAwsS3Url } = require('../../../helpers/aws');


/*****  Get Clubs List API *****/
exports.getClubs = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.getClubs(data, (err, dbData) => {
                if (err) {
                    console.log("Clubs listing Error--->", err)
                    return errorResponse("Database related error", callback);
                }
                else {
                    return successResponse1("Clubs List", dbData.total[0].total, dbData.clubs, callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

/*****  Update Club Status API *****/
exports.updateClubStatus = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.updateClubStatus(data, (err, dbData) => {
                if (err) {
                    console.log("Change Club Status--->", err)
                    return errorResponse("Database related error", callback);
                }
                else{
                    return successResponse2("Club updated successfully!", callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

/*****  Add Club API *****/
exports.addClub = (data, files, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.addClub(data, files, (err, dbData) => {
                if (err) {
                    console.log("Add Club Error---->", err)
                    return errorResponse("Database related error", callback);
                }
                else {
                    return successResponse2("Club added successfully!", callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

/*****  Get Club Details API *****/
exports.getClubDetails = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.getClubDetails(data, (err, dbData) => {
                if (err) {
                    console.log("Club Details Error--->", err)
                    return errorResponse("Database related error", callback);
                }
                else {
                    return successResponse("Club Details", dbData[0], callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

/*****  Edit Club Details API *****/
exports.editClubDetails = (data, files, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.editClubDetails(data, files, (err, dbData) => {
                if (err) {
                    console.log("Edit Club Details Error--->", err)
                    return errorResponse("Database related error", callback);
                }
                else{
                    return successResponse2("Club details updated successfully!", callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

/**************  Club Projects  **************/

/*****  Add Club Project API *****/
exports.addClubProject = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.addClubProject(data, (err, dbData) => {
                if (err) {
                    console.log("Add Club Projec Error---->", err)
                    return errorResponse("Database related error", callback);
                }
                else {
                    return successResponse2("Club project added successfully!", callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

/*****  Get Club Projects List API *****/
exports.getClubProjects = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.getClubProjects(data, (err, dbData) => {
                if (err) {
                    console.log("Club Projects listing Error--->", err)
                    return errorResponse("Database related error", callback);
                }
                else {
                    return successResponse1("Club Projects List", dbData.total[0].total, dbData.club_projects, callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

/*****  Get Club Project Details API *****/
exports.getClubProjectDetails = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.getClubProjectDetails(data, (err, dbData) => {
                if (err) {
                    console.log("Club Project Details Error--->", err)
                    return errorResponse("Database related error", callback);
                }
                else {
                    return successResponse("Club Project Details", dbData[0], callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

/*****  Edit Club Project Details API *****/
exports.editClubProjectDetails = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.editClubProjectDetails(data, (err, dbData) => {
                if (err) {
                    console.log("Edit Club Project Details Error--->", err)
                    return errorResponse("Database related error", callback);
                }
                else{
                    return successResponse2("Club Project details updated successfully!", callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

/**************  Club Events  **************/

/*****  Add Club Event API *****/
exports.addClubEvent = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.addClubEvent(data, (err, dbData) => {
                if (err) {
                    console.log("Add Club Event Error---->", err)
                    return errorResponse("Database related error", callback);
                }
                else {
                    return successResponse2("Club event added successfully!", callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

/*****  Get Club Events List API *****/
exports.getClubEvents = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.getClubEvents(data, (err, dbData) => {
                if (err) {
                    console.log("Club Events listing Error--->", err)
                    return errorResponse("Database related error", callback);
                }
                else {
                    return successResponse1("Club Events List", dbData.total[0].total, dbData.club_events, callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

/*****  Get Club Event Details API *****/
exports.getClubEventDetails = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.getClubEventDetails(data, (err, dbData) => {
                if (err) {
                    console.log("Club Event Details Error--->", err)
                    return errorResponse("Database related error", callback);
                }
                else {
                    return successResponse("Club Event Details", dbData[0], callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

/*****  Edit Club Event Details API *****/
exports.editClubEventDetails = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.editClubEventDetails(data, (err, dbData) => {
                if (err) {
                    console.log("Edit Club Event Details Error--->", err)
                    return errorResponse("Database related error", callback);
                }
                else{
                    return successResponse2("Club Event details updated successfully!", callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

/**************  Club QnAs  **************/

/*****  Add Club QnA API *****/
exports.addClubQnA = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.addClubQnA(data, (err, dbData) => {
                if (err) {
                    console.log("Add Club QnA Error---->", err)
                    return errorResponse("Database related error", callback);
                }
                else {
                    return successResponse2("Club QnA added successfully!", callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

/*****  Get Club QnAs List API *****/
exports.getClubQnAs = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.getClubQnAs(data, (err, dbData) => {
                if (err) {
                    console.log("Club QnAs listing Error--->", err)
                    return errorResponse("Database related error", callback);
                }
                else {
                    return successResponse1("Club QnAs List", dbData.total[0].total, dbData.club_qnas, callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

/*****  Get Club QnA Details API *****/
exports.getClubQnADetails = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.getClubQnADetails(data, (err, dbData) => {
                if (err) {
                    console.log("Club QnA Details Error--->", err)
                    return errorResponse("Database related error", callback);
                }
                else {
                    return successResponse("Club QnA Details", dbData[0], callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

/*****  Edit Club QnA Details API *****/
exports.editClubQnADetails = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.editClubQnADetails(data, (err, dbData) => {
                if (err) {
                    console.log("Edit Club QnA Details Error--->", err)
                    return errorResponse("Database related error", callback);
                }
                else{
                    return successResponse2("Club QnA details updated successfully!", callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

/**************  Club Posts  **************/

/*****  Add Club Post API *****/
exports.addClubPost = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.addClubPost(data, (err, dbData) => {
                if (err) {
                    console.log("Add Club Post Error---->", err)
                    return errorResponse("Database related error", callback);
                }
                else {
                    return successResponse2("Club Post added successfully!", callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

/*****  Get Club Posts List API *****/
exports.getClubPosts = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.getClubPosts(data, (err, dbData) => {
                if (err) {
                    console.log("Club Posts listing Error--->", err)
                    return errorResponse("Database related error", callback);
                }
                else {
                    return successResponse1("Club Posts List", dbData.total[0].total, dbData.club_posts, callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

/*****  Get Club Post Details API *****/
exports.getClubPostDetails = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.getClubPostDetails(data, (err, dbData) => {
                if (err) {
                    console.log("Club Post Details Error--->", err)
                    return errorResponse("Database related error", callback);
                }
                else {
                    return successResponse("Club Post Details", dbData[0], callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

/*****  Edit Club Post Details API *****/
exports.editClubPostDetails = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.editClubPostDetails(data, (err, dbData) => {
                if (err) {
                    console.log("Edit Club Post Details Error--->", err)
                    return errorResponse("Database related error", callback);
                }
                else{
                    return successResponse2("Club Post details updated successfully!", callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

//======================================================================================================================================

/*****  Add Club Article API *****/
exports.addClubArticle = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.addClubArticle(data, (err, dbData) => {
                if (err) {
                    console.log("Add Club Article Error---->", err)
                    return errorResponse("Database related error", callback);
                }
                else {
                    return successResponse2("Club article added successfully!", callback);
                }
            });
        }
    },
        (err, response) => {
            callback(response.dbData);
        }
    )
};
/*****  Get All Club Articles Details API *****/
exports.getClubArticles = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.getClubArticles(data, (err, dbData) => {
                if (err) {
                    console.log("Get All Club Articles Error---->", err)
                    return errorResponse("Database related error", callback);
                }
                else {
                    return successResponse("Club Articles Details", dbData, callback);
                }
            });
        }
    },
        (err, response) => {
            callback(response.dbData);
        }
    )
};
/*****  Get  Club Article Details By ID API *****/
exports.getClubArticleById = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.getClubArticleById(data, (err, dbData) => {
                if (err) {
                    console.log("Add Club Article Error---->", err)
                    return errorResponse("Database related error", callback);
                }
                else {
                    return successResponse("Club article details", dbData[0], callback);
                }
            });
        }
    },
        (err, response) => {
            callback(response.dbData);
        }
    )
};
/*****  UPDATE Club Article API *****/
exports.updateClubArticle = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.updateArticle(data, (err, dbData) => {
                if (err) {
                    console.log("Update Club Article Error---->", err)
                    return errorResponse("Database related error", callback);
                }
                else {
                    return successResponse2("Club article updated successfully!", callback);
                }
            });
        }
    },
        (err, response) => {
            callback(response.dbData);
        }
    )
};
/*****  DELETE Club Article Media  API *****/
exports.deleteArticleMediaStatus = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.deleteArticleMediaStatus(data, (err, dbData) => {
                if (err) {
                    console.log("Club article media deletedError---->", err)
                    return errorResponse("Database related error", callback);
                }
                else {
                    return successResponse2("Club article media deleted successfully!", callback);
                }
            });
        }
    },
        (err, response) => {
            callback(response.dbData);
        }
    )
};

/*****  Add Aptitude Question API *****/
exports.addAptitudeQuestion = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            clubs.addAptitudeQuestion(data, (err, dbData) => {
                if (err) {
                    console.log("Add Aptitude Question Error---->", err)
                    return errorResponse("Database related error", callback);
                }
                else {
                    return successResponse2("Aptitude Question added successfully!", callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};

/*****  Add S3 bucket url or object delete API *****/
exports.deleteS3BucketUrl = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            deleteAwsS3Url(data.oldS3Url, (err, dbData) => {
                if (err) {
                    console.log("Error while deleting the S3 bucket url---->", err)
                    return errorResponse("Database related error", callback);
                }
                else {
                    return successResponse2("deleted S3 bucket url successfully.", callback);
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
};