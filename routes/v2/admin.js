/*
 * @Author: Hitesh Sehgal
 * @Date: November 17, 2022
*/


let express = require('express'),
    router = express.Router(),
    authHandler = require('../../helpers/verifyToken');

const s3Upload = require('../../helpers/upload');
const clubs = require('../../controllers/v2/admin/clubs');

const { validateSchema, validateSchemaGet } = require('../../helpers/validation-helper');
const club_schema = require('../../validators/admin/club_validation');


/*******-------------------- Clubs Tab --------------------*******/

/* Get Clubs List */
router.get('/getClubs', validateSchemaGet(club_schema.validate_getClubs), authHandler.verifyToken, (req, res) => {
    clubs.getClubs(req.query, (data) => {
        res.send(data);
    });
});

/* Update Club Status List */
router.put('/updateClubStatus', validateSchema(club_schema.validate_updateClubStatus), authHandler.verifyToken, (req, res) => {
    clubs.updateClubStatus(req.body, (data) => {
        res.send(data);
    });
});

let new_club = s3Upload.upload1.fields([{ name: 'image', maxCount: 1 }]);
/* Add new Club */
router.post('/addClub', new_club, validateSchema(club_schema.validate_addClub), authHandler.verifyToken, (req, res) => {
    req.body.user_id = req.query.user_id;
    clubs.addClub(req.body, req.files, (data) => {
        res.send(data);
    });
});

/* Get Club Details */
router.get('/getClubDetails', validateSchemaGet(club_schema.validate_getClubDetails), authHandler.verifyToken, (req, res) => {
    clubs.getClubDetails(req.query, (data) => {
        res.send(data);
    });
});

/* Edit Club Details */
router.put('/editClubDetails', new_club, validateSchema(club_schema.validate_editClubDetails), authHandler.verifyToken, (req, res) => {
    req.body.user_id = req.query.user_id;
    clubs.editClubDetails(req.body, req.files, (data) => {
        res.send(data);
    });
});

/* Add new Club Project */
router.post('/addClubProject', validateSchema(club_schema.validate_addClubProject), authHandler.verifyToken, (req, res) => {
    clubs.addClubProject(req.body, (data) => {
        res.send(data);
    });
});

/* Get Club Projects List */
router.get('/getClubProjects', validateSchemaGet(club_schema.validate_getClubProjects), authHandler.verifyToken, (req, res) => {
    clubs.getClubProjects(req.query, (data) => {
        res.send(data);
    });
});

/* Get Club Project Details */
router.get('/getClubProjectDetails', validateSchemaGet(club_schema.validate_getClubProjectDetails), authHandler.verifyToken, (req, res) => {
    clubs.getClubProjectDetails(req.query, (data) => {
        res.send(data);
    });
});

/* Edit Club Project Details */
router.put('/editClubProjectDetails', validateSchema(club_schema.validate_editClubProjectDetails), authHandler.verifyToken, (req, res) => {
    clubs.editClubProjectDetails(req.body, (data) => {
        res.send(data);
    });
});

/* Add new Club Event */
router.post('/addClubEvent', validateSchema(club_schema.validate_addClubEvent), authHandler.verifyToken, (req, res) => {
    clubs.addClubEvent(req.body, (data) => {
        res.send(data);
    });
});

/* Get Club Events List */
router.get('/getClubEvents', validateSchemaGet(club_schema.validate_getClubEvents), authHandler.verifyToken, (req, res) => {
    clubs.getClubEvents(req.query, (data) => {
        res.send(data);
    });
});

/* Get Club Event Details */
router.get('/getClubEventDetails', validateSchemaGet(club_schema.validate_getClubEventDetails), authHandler.verifyToken, (req, res) => {
    clubs.getClubEventDetails(req.query, (data) => {
        res.send(data);
    });
});

/* Edit Club Event Details */
router.put('/editClubEventDetails', validateSchema(club_schema.validate_editClubEventDetails), authHandler.verifyToken, (req, res) => {
    clubs.editClubEventDetails(req.body, (data) => {
        res.send(data);
    });
});

/* Add new Club QnA */
router.post('/addClubQnA', validateSchema(club_schema.validate_addClubQnA), authHandler.verifyToken, (req, res) => {
    clubs.addClubQnA(req.body, (data) => {
        res.send(data);
    });
});

/* Get Club QnAs List */
router.get('/getClubQnAs', validateSchemaGet(club_schema.validate_getClubQnAs), authHandler.verifyToken, (req, res) => {
    clubs.getClubQnAs(req.query, (data) => {
        res.send(data);
    });
});

/* Get Club QnA Details */
router.get('/getClubQnADetails', validateSchemaGet(club_schema.validate_getClubQnADetails), authHandler.verifyToken, (req, res) => {
    clubs.getClubQnADetails(req.query, (data) => {
        res.send(data);
    });
});

/* Edit Club QnA Details */
router.put('/editClubQnADetails', validateSchema(club_schema.validate_editClubQnADetails), authHandler.verifyToken, (req, res) => {
    clubs.editClubQnADetails(req.body, (data) => {
        res.send(data);
    });
});

/* Add new Club Post */
router.post('/addClubPost', validateSchema(club_schema.validate_addClubPost), authHandler.verifyToken, (req, res) => {
    clubs.addClubPost(req.body, (data) => {
        res.send(data);
    });
});

/* Get Club Posts List */
router.get('/getClubPosts', validateSchemaGet(club_schema.validate_getClubPosts), authHandler.verifyToken, (req, res) => {
    clubs.getClubPosts(req.query, (data) => {
        res.send(data);
    });
});

/* Get Club Post Details */
router.get('/getClubPostDetails', validateSchemaGet(club_schema.validate_getClubPostDetails), authHandler.verifyToken, (req, res) => {
    clubs.getClubPostDetails(req.query, (data) => {
        res.send(data);
    });
});

/* Edit Club Post Details */
router.put('/editClubPostDetails', validateSchema(club_schema.validate_editClubPostDetails), authHandler.verifyToken, (req, res) => {
    clubs.editClubPostDetails(req.body, (data) => {
        res.send(data);
    });
});

//==================================================================================
/* Add new Club Article */
router.post('/add-club-article', validateSchema(club_schema.validate_addClubArticle), authHandler.verifyToken, (req, res) => {
    clubs.addClubArticle(req.body, (data) => {
        res.send(data);
    });
});

/* GET All Club Articles */
router.get('/get-club-articles', validateSchemaGet(club_schema.validate_getClubArticles), authHandler.verifyToken, (req, res) => {
    clubs.getClubArticles(req.query, (data) => {
        res.send(data);
    });
});

/* GET Club Article Details By ID*/
router.get('/get-club-article-details', validateSchemaGet(club_schema.validate_getClubArticleDetails), authHandler.verifyToken, (req, res) => {
    clubs.getClubArticleById(req.query, (data) => {
        res.send(data);
    });
});

/* UPDATE Club Article */
router.put('/update-club-article', validateSchema(club_schema.validate_updateClubArticle), authHandler.verifyToken, (req, res) => {
    clubs.updateClubArticle(req.body, (data) => {
        res.send(data);
    });
});

/* DELETE Club Article's Media Status */
router.put('/delete-article-media', validateSchemaGet(club_schema.validate_deleteClubArticleMedia), authHandler.verifyToken, (req, res) => {
    clubs.deleteArticleMediaStatus(req.query, (data) => {
        res.send(data);
    });
});


//==================================================================================



module.exports = router;