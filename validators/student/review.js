const Joi = require("joi");

const schema = {
  reviewSchema: Joi.object({
    college_id: Joi.number().required(),
    year_of_admission: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().optional(),
    phone_number: Joi.string().required(),
    review_type: Joi.string().valid('short', 'detail', 'blog').required(),
    review_title: Joi.string().required(),
    ratings: Joi.number().min(1).max(5).required(),
    review_detail: Joi.string().required(),
    pro_detail: Joi.array().required(),
    con_detail: Joi.array().required(),
    go_anonymous: Joi.string().valid('0', '1').required(),
  }),

  detailedReviewSchema: Joi.object({
    college_id: Joi.number().integer().required(),
    review_id: Joi.number().integer().required(),
    subjective_data: Joi.array().items(
      Joi.object({
        upload_picture: Joi.string().uri().required(),
        subjective_review_type: Joi.string().required(),
        ratings: Joi.number().integer().min(1).max(5).required(),
        detailed_review: Joi.string().required(),
      })
    ).min(1).required(),
  }),


  blogReviewSchema: Joi.object({
    college_id: Joi.number().integer().required(),
    review_id: Joi.number().integer().required(),
    blogData: Joi.array().items(
      Joi.object({
        upload_video: Joi.string().uri().required(),
        video_title:Joi.string().required(),
        blog_review_type: Joi.string().required(),
        review_tags: Joi.string().required(),
        pro: Joi.array().required(),
        con: Joi.array().required(),
        ratings: Joi.number().integer().min(1).max(5).required(),
        video_description: Joi.string().required(),
      })
    ).min(1).required(),
  }),
}
module.exports = schema;
