const Joi = require('joi');

const schema = {
    getCareersList: Joi.object().keys({
        search_key: Joi.string().allow(''),
        page: Joi.string().allow(''),
        limit: Joi.string().allow(''),
        career_cluster: Joi.string().allow(''),
        exams_associated: Joi.string().allow(''),
    }),
    getCareerDetails: Joi.object().keys({
        career_id: Joi.string().required(),
    }),
}

module.exports = schema;