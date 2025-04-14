require('dotenv').config();
const commonQuery = require('./commonQuery');
const jwt = require('jsonwebtoken');
let async = require('async');
const {
    errorResponse,
    successResponse,
    successResponse1,
    successResponse2,
    fieldMissingResponse,
    tokenMissing
} = require("./response");

const auth = {
    verifyToken: (req, res, next) => {
        if (!req.headers.accesstoken) {
            return tokenMissing('Provide Access Token', res);
        }
        else {
            jwt.verify(req.headers.accesstoken, process.env.JWT_KEY, async (err, decoded) => {
                if (err) {
                    return tokenMissing('access token related error', res);
                } else {
                    let result = await commonQuery.checkAdmin('admin_id', 'syg_admin', decoded.id);
                    if (!result) {
                        return tokenMissing('User not exist!', res);
                    } else {
                        if (result[0].user_type == 'sub_admin') {
                            if (result[0].is_permission_changed === 'true') {
                                return tokenMissing('Your permissions has been changed by the Admin. Please login again!', res);
                            }
                            req.body.colleges = result[0].college_id;
                            req.query.colleges = result[0].college_id;
                            req.body.role = result[0].role;
                            req.query.role = result[0].role;
                            let role = result[0].role + "_id";
                            req.body[role] = decoded.id;
                            req.query[role] = decoded.id;
                        }
                        req.body.user_id = decoded.id;
                        req.query.user_id = decoded.id;
                        req.body.user_type = result[0].user_type;
                        req.query.user_type = result[0].user_type;
                        next();
                    }
                }
            })
        }
    },
    verifyTokenCollegeAdmin: (req, res, next) => {
        if (!req.headers.accesstoken) {
            return tokenMissing('Provide Access Token', res);
        }
        else {
            jwt.verify(req.headers.accesstoken, process.env.JWT_KEY, async (err, decoded) => {
                if (err) {
                    return tokenMissing('access token related error', res);
                } else {
                    let result = await commonQuery.checkCollegeAdmin('id', 'college_admin', decoded.id);
                    if (!result) {
                        return tokenMissing('User not exist!', res);
                    } else {
                        req.body.id = decoded.id;
                        req.query.id = decoded.id;
                        // req.body.college_id = result[0].college_id;
                        // req.query.college_id = result[0].college_id;
                        next();
                    }
                }
            })
        }
    },
    verifyTokenStudent: (req, res, next) => {
        if (!req.headers.accesstoken) {
            return tokenMissing('Provide Access Token', res);
        }
        else {
            jwt.verify(req.headers.accesstoken, process.env.JWT_KEY, async (err, decoded) => {
                if (err) {
                    return tokenMissing('access token related error', res);
                } else {
                    let result = await commonQuery.checkStudent('id', 'student_profile', decoded.id, decoded.email);
                    if (!result) {
                        return tokenMissing('User not exist!', res);
                    } else {
                        req.body.id = decoded.id;
                        req.query.id = decoded.id;
                        req.body.email = decoded.email;
                        req.query.email = decoded.email;
                        next();
                    }
                }
            })
        }
    },
    verifyTokenMentor: (req, res, next) => {
        if (!req.headers.accesstoken) {
            return tokenMissing('Provide Access Token', res);
        }
        else {
            jwt.verify(req.headers.accesstoken, process.env.JWT_KEY, async (err, decoded) => {
                if (err) {
                    return tokenMissing('access token related error', res);
                } else {
                    let result = await commonQuery.checkMentor('id', 'mentor_profile', decoded.id, decoded.email);
                    if (!result) {
                        return tokenMissing('User not exist!', res);
                    } else {
                        req.body.id = decoded.id;
                        req.query.id = decoded.id;
                        req.body.email = decoded.email;
                        req.query.email = decoded.email;
                        next();
                    }
                }
            })
        }
    },
    verifyTokenCap: (req, res, next) => {
        if (!req.headers.accesstoken) {
            return tokenMissing('Provide Access Token', res);
        }
        else {
            jwt.verify(req.headers.accesstoken, process.env.JWT_KEY, async (err, decoded) => {
                if (err) {
                    return tokenMissing('access token related error', res);
                } else {
                    let result = await commonQuery.checkCap('id', 'college_admin', decoded.id, decoded.email);
                    if (!result) {
                        return tokenMissing('User not exist!', res);
                    } else {
                        req.body.id = decoded.id;
                        req.query.id = decoded.id;
                        req.body.email = decoded.email;
                        req.query.email = decoded.email;
                        next();
                    }
                }
            })
        }
    }

};

module.exports = auth;