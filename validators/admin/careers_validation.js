const Joi = require('joi');

const schema = {
    validate_getCareerProfessions: Joi.object().keys({
        cluster_id: Joi.string().required()
    }),
    validate_getCareers: Joi.object().keys({
        page: Joi.string().allow(''),
        limit: Joi.string().allow(''),
        search_key: Joi.string().allow(''),
        user_id: Joi.number()
    }),
    validate_deleteCareer: Joi.object().keys({
        career_id: Joi.string().required(),
        user_id: Joi.number()
    }),
    validate_addCareer: Joi.object().keys({
        career_name_id: Joi.string().required(),
        career_cluster: Joi.string().required(),
        exams_associated: Joi.string(),
        what_they_do: Joi.string(),
        known_as: Joi.string(),
        responsibilities: Joi.string(),
        recommended_courses_and_exams: Joi.string(),
        average_salary: Joi.string(),
        // salaries: Joi.string(),
        growth: Joi.string(),
        // future_growth: Joi.string(),
        top_recruiters: Joi.string(),
        personalities: Joi.array(),
        specialisation: Joi.array(),
        education_pathway: Joi.array(),
        skills: Joi.array(),
        user_id: Joi.number()
    }),
    validate_getCareerDetails: Joi.object().keys({
        career_id: Joi.string().required(),
        type: Joi.string().required(),
        user_id: Joi.number()
    }),
    validate_editCareerDetails: Joi.object().keys({
        career_id: Joi.string().required(),
        career_name_id: Joi.string().required(),
        career_cluster: Joi.string().required(),
        exams_associated: Joi.string(),
        what_they_do: Joi.string(),
        known_as: Joi.string(),
        responsibilities: Joi.string(),
        recommended_courses_and_exams: Joi.string(),
        average_salary: Joi.string(),
        // salaries: Joi.string(),
        growth: Joi.string(),
        // future_growth: Joi.string(),
        top_recruiters: Joi.string(),
        personalities: Joi.array(),
        specialisation: Joi.array(),
        education_pathway: Joi.array(),
        skills: Joi.array(),
        user_id: Joi.number()
    })
}

module.exports = schema;