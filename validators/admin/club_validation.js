const Joi = require('joi');

const schema = {
    validate_getClubs: Joi.object().keys({
        page: Joi.string().allow(''),
        limit: Joi.string().allow(''),
        search_key: Joi.string().allow(''),
        colleges: Joi.string().allow(''),
        user_id: Joi.number()
    }),
    validate_updateClubStatus: Joi.object().keys({
        id: Joi.string().required(),
        status: Joi.string().required(),
        colleges: Joi.string().allow(''),
        user_id: Joi.number()
    }),
    validate_addClub: Joi.object().keys({
        club_id: Joi.string().required(),
        club_name: Joi.string().required(),
        topic: Joi.string().allow(''),
        image: Joi.string(),
        about_club: Joi.string().allow(''),
        rules_to_follow: Joi.string().allow(''),
        career_cluster: Joi.string().allow(''),
        club_admin: Joi.string().allow(''),
        tags: Joi.string().allow(''),
        announcements: Joi.string().allow(''),
        colleges: Joi.string().allow(''),
        user_id: Joi.number()
    }),
    validate_getClubDetails: Joi.object().keys({
        id: Joi.string().required(),
        colleges: Joi.string().allow(''),
        user_id: Joi.number()
    }),
    validate_editClubDetails: Joi.object().keys({
        id: Joi.string().required(),
        club_id: Joi.string().required(),
        club_name: Joi.string().required(),
        topic: Joi.string().allow(''),
        image: Joi.string(),
        about_club: Joi.string().allow(''),
        rules_to_follow: Joi.string().allow(''),
        career_cluster: Joi.string().allow(''),
        club_admin: Joi.string().allow(''),
        tags: Joi.string().allow(''),
        announcements: Joi.string().allow(''),
        colleges: Joi.string().allow(''),
        user_id: Joi.number()
    }),

    /**************  Club Projects  **************/
    validate_addClubProject: Joi.object().keys({
        club_id: Joi.string().required(),
        projects: Joi.array().required().items({
            title: Joi.string().required(),
            image: Joi.string(),
            body: Joi.string().allow(''),
        }),
        colleges: Joi.string().allow(''),
        user_id: Joi.number()
    }),
    validate_getClubProjects: Joi.object().keys({
        page: Joi.string().allow(''),
        limit: Joi.string().allow(''),
        search_key: Joi.string().allow(''),
        club_id: Joi.string().required(),
        colleges: Joi.string().allow(''),
        user_id: Joi.number()
    }),
    validate_getClubProjectDetails: Joi.object().keys({
        club_id: Joi.string().required(),
        project_id: Joi.string().required(),
        colleges: Joi.string().allow(''),
        user_id: Joi.number()
    }),
    validate_editClubProjectDetails: Joi.object().keys({
        club_id: Joi.string().required(),
        project_id: Joi.string().required(),
        title: Joi.string().required(),
        image: Joi.string().allow(''),
        body: Joi.string().allow(''),
        colleges: Joi.string().allow(''),
        user_id: Joi.number()
    }),

    /**************  Club Events  **************/
    validate_addClubEvent: Joi.object().keys({
        club_id: Joi.string().required(),
        events: Joi.array().required().items({
            title: Joi.string().required(),
            image: Joi.string(),
            body: Joi.string().allow(''),
        }),
        colleges: Joi.string().allow(''),
        user_id: Joi.number()
    }),
    validate_getClubEvents: Joi.object().keys({
        page: Joi.string().allow(''),
        limit: Joi.string().allow(''),
        search_key: Joi.string().allow(''),
        club_id: Joi.string().required(),
        colleges: Joi.string().allow(''),
        user_id: Joi.number()
    }),
    validate_getClubEventDetails: Joi.object().keys({
        club_id: Joi.string().required(),
        event_id: Joi.string().required(),
        colleges: Joi.string().allow(''),
        user_id: Joi.number()
    }),
    validate_editClubEventDetails: Joi.object().keys({
        club_id: Joi.string().required(),
        event_id: Joi.string().required(),
        title: Joi.string().required(),
        image: Joi.string().allow(''),
        body: Joi.string().allow(''),
        colleges: Joi.string().allow(''),
        user_id: Joi.number()
    }),

    /**************  Club QnAs  **************/
    validate_addClubQnA: Joi.object().keys({
        club_id: Joi.string().required(),
        QnAs: Joi.array().required().items({
            question: Joi.string().required(),
            answer: Joi.string().allow(''),
            image: Joi.string().allow(''),
        }),
        colleges: Joi.string().allow(''),
        user_id: Joi.number()
    }),
    validate_getClubQnAs: Joi.object().keys({
        page: Joi.string().allow(''),
        limit: Joi.string().allow(''),
        search_key: Joi.string().allow(''),
        club_id: Joi.string().required(),
        colleges: Joi.string().allow(''),
        user_id: Joi.number()
    }),
    validate_getClubQnADetails: Joi.object().keys({
        club_id: Joi.string().required(),
        qna_id: Joi.string().required(),
        colleges: Joi.string().allow(''),
        user_id: Joi.number()
    }),
    validate_editClubQnADetails: Joi.object().keys({
        club_id: Joi.string().required(),
        qna_id: Joi.string().required(),
        question: Joi.string().required(),
        answer: Joi.string().allow(''),
        image: Joi.string().allow(''),
        colleges: Joi.string().allow(''),
        user_id: Joi.number()
    }),

    /**************  Club Posts  **************/
    validate_addClubPost: Joi.object().keys({
        club_id: Joi.string().required(),
        posts: Joi.array().required().items({
            post_title: Joi.string().required(),
            post_body: Joi.string().allow(''),
            image: Joi.string().allow(''),
        }),
        colleges: Joi.string().allow(''),
        user_id: Joi.number()
    }),
    validate_getClubPosts: Joi.object().keys({
        page: Joi.string().allow(''),
        limit: Joi.string().allow(''),
        search_key: Joi.string().allow(''),
        club_id: Joi.string().required(),
        colleges: Joi.string().allow(''),
        user_id: Joi.number()
    }),
    validate_getClubPostDetails: Joi.object().keys({
        club_id: Joi.string().required(),
        post_id: Joi.string().required(),
        colleges: Joi.string().allow(''),
        user_id: Joi.number()
    }),
    validate_editClubPostDetails: Joi.object().keys({
        club_id: Joi.string().required(),
        post_id: Joi.string().required(),
        post_title: Joi.string().required(),
        post_body: Joi.string().allow(''),
        image: Joi.string().allow(''),
        colleges: Joi.string().allow(''),
        user_id: Joi.number()
    }),

    //===================================================================================================
    /**************  Club Article  **************/
    validate_addClubArticle: Joi.object().keys({
        club_id: Joi.string().required(),
        article_title: Joi.string().required(),
        article_body: Joi.string().required(),
        date_of_publication: Joi.required(),
        journal_name: Joi.string().required(),
        article_type: Joi.string().required(),
        article_related_to_field: Joi.string().required(),
        citation_text: Joi.string().required(),
        tags: Joi.string().required(),
        media_files: Joi.array().required(),
        authors: Joi.string().required(),
        user_id: Joi.number()
    }),
    validate_getClubArticles: Joi.object().keys({
        club_id: Joi.string().required(),
    }),
    validate_getClubArticleDetails: Joi.object().keys({
        article_id: Joi.string().required(),
        user_id: Joi.number()
    }),
    validate_updateClubArticle: Joi.object().keys({
        club_id: Joi.string().required(),
        article_title: Joi.string().required(),
        article_body: Joi.string().required(),
        date_of_publication: Joi.required(),
        journal_name: Joi.string().required(),
        article_type: Joi.string().required(),
        article_related_to_field: Joi.string().required(),
        citation_text: Joi.string().required(),
        tags: Joi.string().required(),
        media_files: Joi.array().required(),
        authors: Joi.string().required(),
        user_id: Joi.number(),
        article_id: Joi.string().required()
    }),
    validate_deleteClubArticleMedia: Joi.object().keys({
        media_id: Joi.string().required(),
        user_id: Joi.number()
    }),
    validate_aptitude_question: Joi.object().keys({
        class: Joi.string().required(),
        sub_category_id: Joi.number().required(),
        question: Joi.string().required(),
        questionFiles: Joi.array().required(),
        options: Joi.array().required(),
        answer : Joi.required(),
        passage_id:Joi.required()
    }),
}

module.exports = schema;