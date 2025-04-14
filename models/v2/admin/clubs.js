const dbConfig = require("../../../config/dbConfig").connection;
const qb = require("../../../config/dbConfig").qb;
const async = require('async');


/***** Get Clubs *****/
exports.getClubs = async (criteria, callback) => {
    let page = criteria.page ? ((criteria.page - 1) * 10) : 0,
        limit = criteria.limit ? criteria.limit : 10;

    let conditions = "";
    criteria.search_key && criteria.search_key != '' ? conditions += ` and (c.club_id like "%${criteria.search_key}%" or c.club_name like "%${criteria.search_key}%") ` : '';

    let total = await qb.query(`SELECT count(c.id) as total FROM clubs as c where c.status != 'deleted' ${conditions}`);
    let clubs = await qb.query(`SELECT c.id, c.club_id, c.club_name, c.topic, COUNT(cq.qna_id) as total_qna, COUNT(cp.post_id) as total_posts, COUNT(ca.article_id) as total_articles, c.created_at, c.status FROM clubs as c left join club_QnA as cq on c.id = cq.club_id left join club_posts as cp on c.id = cp.club_id left join club_articles as ca on c.id = ca.club_id WHERE c.status != 'deleted' ${conditions} limit ${page},${limit}`);

    let payload = {
        total, clubs
    }
    callback(null, payload);
};

/***** Update Club Status API *****/
exports.updateClubStatus = (criteria, callback) => {
    dbConfig.query(`UPDATE clubs SET status = '${criteria.status}' WHERE id = '${criteria.id}'`, callback);
};

/***** Add new Club API *****/
exports.addClub = (criteria, files, callback) => {
    criteria.admin_id = criteria.user_id;
    delete criteria.user_id;
    delete criteria.user_type;
    criteria.status = 'active';
    let announcements = JSON.parse(criteria.announcements);
    delete criteria.announcements;

    if (Object.keys(files).length > 0) {
        criteria.image = files.image[0].location;
    }

    dbConfig.query(`INSERT into clubs SET ?`, criteria, (err, res) => {
        if (err) {
            console.log("Add Club Error--->", err);
            callback(err, null);
        }
        else {
            if (announcements && announcements.length > 0) {
                let announcement_data = [];
                announcements.forEach(element => {
                    announcement_data.push([
                        club_id = res.insertId,
                        title = element.title,
                        body = element.body,
                        status = 'active'
                    ]);
                });
                dbConfig.query(`INSERT into club_announcements (club_id, title, body, status) VALUES ?`, [announcement_data], async (announcements_err, announcements_res) => {
                    if (announcements_err) {
                        console.log("Add club announcements Err--->", announcements_err);
                        await qb.query(`DELETE from clubs where id = '${res.insertId}'`);
                        callback(announcements_err, null);
                    }
                    else {
                        callback(null, announcements_res);
                    }
                })
            }
            else {
                callback(null, "success");
            }
        }
    });
};

/***** Get Club Details *****/
exports.getClubDetails = async (criteria, callback) => {
    let club_data = await qb.query(`SELECT c.id, c.club_id, c.club_name, c.topic, c.image, c.about_club, c.rules_to_follow, c.career_cluster, IFNULL(GROUP_CONCAT(sc.name), "") as career_cluster_name, c.club_admin, c.tags, c.created_at FROM clubs as c left join syg_cluster as sc on FIND_IN_SET(sc.id, c.career_cluster) WHERE c.id = '${criteria.id}' GROUP by c.id`);

    if (club_data && club_data.length > 0) {
        club_data[0].announcements = await qb.query(`SELECT ca.id, ca.title, ca.body, ca.created_at FROM club_announcements as ca WHERE ca.club_id = '${club_data[0].id}' and ca.status = 'active'`);
    }
    callback(null, club_data);
};

/*****  Edit Club Details API *****/
exports.editClubDetails = (criteria, files, callback) => {
    let setData = "";
    setData += `club_id = '${criteria.club_id}', `;
    setData += `club_name = "${criteria.club_name}", `;
    setData += `topic = "${criteria.topic}", `;
    setData += `about_club = "${criteria.about_club}", `;
    setData += `rules_to_follow = "${criteria.rules_to_follow}", `;
    setData += `career_cluster = "${criteria.career_cluster}", `;
    setData += `club_admin = "${criteria.club_admin}", `;
    setData += `tags = "${criteria.tags}"`;

    if (Object.keys(files).length > 0) {
        setData.image = files.image[0].location;
    }

    dbConfig.query(`UPDATE clubs SET ${setData} where id = '${criteria.id}'`, async (err, res) => {
        if (err) {
            console.log("Add Club Error--->", err);
            callback(err, null);
        }
        else {
            await qb.query(`UPDATE club_announcements SET status = 'deleted' where club_id = '${criteria.id}'`);
            let announcements = JSON.parse(criteria.announcements);
            if (announcements && announcements.length > 0) {
                let announcement_data = [];
                announcements.forEach(element => {
                    announcement_data.push([
                        club_id = criteria.id,
                        title = element.title,
                        body = element.body,
                        status = 'active'
                    ]);
                });
                dbConfig.query(`INSERT into club_announcements (club_id, title, body, status) VALUES ?`, [announcement_data], async (announcements_err, announcements_res) => {
                    if (announcements_err) {
                        console.log("Add club announcements Err--->", announcements_err);
                        // await qb.query(`DELETE from clubs where id = '${criteria.id}'`);
                        callback(announcements_err, null);
                    }
                    else {
                        callback(null, announcements_res);
                    }
                })
            }
            else {
                callback(null, "success");
            }
        }
    });
};

/**************  Club Projects  **************/

/***** Add new Club Project API *****/
exports.addClubProject = (criteria, callback) => {
    let projects_data = [];
    (criteria.projects).forEach(element => {
        projects_data.push([
            club_id = criteria.club_id,
            title = element.title,
            image = element.image,
            body = element.body,
            created_by = criteria.user_id,
            status = 'active'
        ]);
    });
    dbConfig.query(`INSERT into club_projects (club_id, title, image, body, created_by, status) VALUES ?`, [projects_data], callback);
};

/***** Get Club Projects *****/
exports.getClubProjects = async (criteria, callback) => {
    let page = criteria.page ? ((criteria.page - 1) * 10) : 0,
        limit = criteria.limit ? criteria.limit : 10;

    let conditions = "";
    criteria.search_key && criteria.search_key != '' ? conditions += ` and cp.title like "%${criteria.search_key}%"` : '';

    let total = await qb.query(`SELECT count(cp.project_id) as total FROM club_projects as cp where cp.club_id = '${criteria.club_id}' and cp.status = 'active' ${conditions}`);
    let club_projects = await qb.query(`SELECT cp.project_id, cp.title, cp.image, cp.body, cp.created_by, sa.name as created_by_name, cp.created_by_type, cp.created_at FROM club_projects as cp left join syg_admin as sa on cp.created_by = sa.admin_id WHERE cp.club_id = '${criteria.club_id}' and cp.status = 'active' ${conditions} limit ${page},${limit}`);

    let payload = {
        total, club_projects
    }
    callback(null, payload);
};

/***** Get Club Project Details *****/
exports.getClubProjectDetails = async (criteria, callback) => {
    dbConfig.query(`SELECT cp.project_id, cp.title, cp.image, cp.body, cp.created_by, sa.name as created_by_name, cp.created_by_type, cp.created_at FROM club_projects as cp left join syg_admin as sa on cp.created_by = sa.admin_id WHERE cp.club_id = '${criteria.club_id}' and cp.project_id = '${criteria.project_id}' and cp.status = 'active' `, callback);
};

/*****  Edit Club Project Details API *****/
exports.editClubProjectDetails = (criteria, callback) => {
    let setData = "";
    setData += `title = '${criteria.title}', `;
    setData += `image = "${criteria.image}", `;
    setData += `body = "${criteria.body}"`;

    dbConfig.query(`UPDATE club_projects SET ${setData} where club_id = '${criteria.club_id}' and project_id = '${criteria.project_id}'`, callback);
};

/**************  Club Events  **************/

/***** Add new Club Event API *****/
exports.addClubEvent = (criteria, callback) => {
    let events_data = [];
    (criteria.events).forEach(element => {
        events_data.push([
            club_id = criteria.club_id,
            title = element.title,
            image = element.image,
            body = element.body,
            hosted_by = criteria.user_id,
            status = 'active'
        ]);
    });
    dbConfig.query(`INSERT into club_events (club_id, title, image, body, hosted_by, status) VALUES ?`, [events_data], callback);
};

/***** Get Club Events *****/
exports.getClubEvents = async (criteria, callback) => {
    let page = criteria.page ? ((criteria.page - 1) * 10) : 0,
        limit = criteria.limit ? criteria.limit : 10;

    let conditions = "";
    criteria.search_key && criteria.search_key != '' ? conditions += ` and cp.title like "%${criteria.search_key}%"` : '';

    let total = await qb.query(`SELECT count(cp.event_id) as total FROM club_events as cp where cp.club_id = '${criteria.club_id}' and cp.status = 'active' ${conditions}`);
    let club_events = await qb.query(`SELECT cp.event_id, cp.title, cp.image, cp.body, cp.hosted_by, sa.name as hosted_by_name, cp.hosted_by_type, cp.created_at FROM club_events as cp left join syg_admin as sa on cp.hosted_by = sa.admin_id WHERE cp.club_id = '${criteria.club_id}' and cp.status = 'active' ${conditions} limit ${page},${limit}`);

    let payload = {
        total, club_events
    }
    callback(null, payload);
};

/***** Get Club Event Details *****/
exports.getClubEventDetails = async (criteria, callback) => {
    dbConfig.query(`SELECT cp.event_id, cp.title, cp.image, cp.body, cp.hosted_by, sa.name as hosted_by_name, cp.hosted_by_type, cp.created_at FROM club_events as cp left join syg_admin as sa on cp.hosted_by = sa.admin_id WHERE cp.club_id = '${criteria.club_id}' and cp.event_id = '${criteria.event_id}' and cp.status = 'active' `, callback);
};

/*****  Edit Club Event Details API *****/
exports.editClubEventDetails = (criteria, callback) => {
    let setData = "";
    setData += `title = '${criteria.title}', `;
    setData += `image = "${criteria.image}", `;
    setData += `body = "${criteria.body}"`;

    dbConfig.query(`UPDATE club_events SET ${setData} where club_id = '${criteria.club_id}' and event_id = '${criteria.event_id}'`, callback);
};

/**************  Club QnAs  **************/

/***** Add new Club QnA API *****/
exports.addClubQnA = (criteria, callback) => {
    let qnas_data = [];
    (criteria.QnAs).forEach(element => {
        qnas_data.push([
            club_id = criteria.club_id,
            question = element.question,
            answer = element.answer,
            image = element.image,
            added_by = criteria.user_id,
            added_by_type = 'admin',
            status = 'active'
        ]);
    });
    dbConfig.query(`INSERT into club_QnA (club_id, question, answer, image, added_by, added_by_type, status) VALUES ?`, [qnas_data], callback);
};

/***** Get Club QnAs *****/
exports.getClubQnAs = async (criteria, callback) => {
    let page = criteria.page ? ((criteria.page - 1) * 10) : 0,
        limit = criteria.limit ? criteria.limit : 10;

    let conditions = "";
    criteria.search_key && criteria.search_key != '' ? conditions += ` and cp.question like "%${criteria.search_key}%"` : '';

    let total = await qb.query(`SELECT count(cp.qna_id) as total FROM club_QnA as cp where cp.club_id = '${criteria.club_id}' and cp.status = 'active' ${conditions}`);
    let club_qnas = await qb.query(`SELECT cp.qna_id, cp.question, cp.image, cp.answer, cp.added_by, sa.name as added_by_name, cp.created_at FROM club_QnA as cp left join syg_admin as sa on cp.added_by = sa.admin_id WHERE cp.club_id = '${criteria.club_id}' and cp.status = 'active' ${conditions} limit ${page},${limit}`);

    let payload = {
        total, club_qnas
    }
    callback(null, payload);
};

/***** Get Club QnA Details *****/
exports.getClubQnADetails = async (criteria, callback) => {
    dbConfig.query(`SELECT cp.qna_id, cp.question, cp.image, cp.answer, cp.added_by, sa.name as added_by_name, cp.created_at FROM club_QnA as cp left join syg_admin as sa on cp.added_by = sa.admin_id WHERE cp.club_id = '${criteria.club_id}' and cp.qna_id = '${criteria.qna_id}' and cp.status = 'active' `, callback);
};

/*****  Edit Club QnA Details API *****/
exports.editClubQnADetails = (criteria, callback) => {
    let setData = "";
    setData += `question = '${criteria.question}', `;
    setData += `answer = "${criteria.answer}", `;
    setData += `image = "${criteria.image}"`;

    dbConfig.query(`UPDATE club_QnA SET ${setData} where club_id = '${criteria.club_id}' and qna_id = '${criteria.qna_id}'`, callback);
};

/**************  Club Posts  **************/

/***** Add new Club Post API *****/
exports.addClubPost = (criteria, callback) => {
    let posts_data = [];
    (criteria.posts).forEach(element => {
        posts_data.push([
            club_id = criteria.club_id,
            post_title = element.post_title,
            post_body = element.post_body,
            image = element.image,
            status = 'active'
        ]);
    });
    dbConfig.query(`INSERT into club_posts (club_id, post_title, post_body, image, status) VALUES ?`, [posts_data], callback);
};

/***** Get Club Posts *****/
exports.getClubPosts = async (criteria, callback) => {
    let page = criteria.page ? ((criteria.page - 1) * 10) : 0,
        limit = criteria.limit ? criteria.limit : 10;

    let conditions = "";
    criteria.search_key && criteria.search_key != '' ? conditions += ` and cp.post_title like "%${criteria.search_key}%"` : '';

    let total = await qb.query(`SELECT count(cp.post_id) as total FROM club_posts as cp where cp.club_id = '${criteria.club_id}' and cp.status = 'active' ${conditions}`);
    let club_posts = await qb.query(`SELECT cp.post_id, cp.post_title, cp.post_body, cp.image, cp.created_at FROM club_posts as cp WHERE cp.club_id = '${criteria.club_id}' and cp.status = 'active' ${conditions} limit ${page},${limit}`);

    let payload = {
        total, club_posts
    }
    callback(null, payload);
};

/***** Get Club Post Details *****/
exports.getClubPostDetails = async (criteria, callback) => {
    dbConfig.query(`SELECT cp.post_id, cp.post_title, cp.post_body, cp.image, cp.created_at FROM club_posts as cp WHERE cp.club_id = '${criteria.club_id}' and cp.post_id = '${criteria.post_id}' and cp.status = 'active' `, callback);
};

/*****  Edit Club Post Details API *****/
exports.editClubPostDetails = (criteria, callback) => {
    let setData = "";
    setData += `post_title = '${criteria.post_title}', `;
    setData += `post_body = "${criteria.post_body}", `;
    setData += `image = "${criteria.image}"`;

    dbConfig.query(`UPDATE club_posts SET ${setData} where club_id = '${criteria.club_id}' and post_id = '${criteria.post_id}'`, callback);
};

//==============================================================================================================

/***** Add new Article API *****/
exports.addClubArticle = (criteria, callback) => {
    let media_files = []
    let article = { ...criteria }
    delete article.media_files
    delete article.user_id

    dbConfig.query(`INSERT INTO club_articles SET ?`, article, (error, result) => {
        if (error) return callback(error)
        let articleId = result.insertId;

        for (let i = 0; i < criteria.media_files.length; i++) {
            const media = criteria.media_files[i]["media"]
            media_files.push([articleId, media])
        }
        dbConfig.query(`INSERT INTO club_articles_media (article_id,media) VALUES ?`, [media_files], callback)

    })
};

/***** GET All Club Articles  API *****/
exports.getClubArticles = (criteria, callback) => {
    dbConfig.query(`SELECT c.article_id,c.article_title,c.authors, GROUP_CONCAT(DISTINCT CASE WHEN m.status = 'active' THEN m.media ELSE NULL END  ORDER BY m.article_id DESC SEPARATOR ',') AS Media FROM club_articles c LEFT JOIN club_articles_media m ON c.article_id = m.article_id WHERE club_id = ${criteria.club_id} AND c.status='active' GROUP BY c.article_id `, callback)
};

/***** GET Club Article By ID API *****/
exports.getClubArticleById = (criteria, callback) => {
    dbConfig.query(`SELECT c.article_id,c.article_title,c.authors, GROUP_CONCAT(DISTINCT CASE WHEN m.status = 'active' THEN m.media ELSE NULL END  ORDER BY m.article_id DESC SEPARATOR ',') AS Media FROM club_articles c LEFT JOIN club_articles_media m ON c.article_id = m.article_id WHERE c.article_id = ${criteria.article_id} AND c.status='active' GROUP BY c.article_id `, callback)
};

/***** UPDATE Article API *****/
exports.updateArticle = async (criteria, callback) => {
    // let authors = JSON.parse(req.authors)
    let article = { ...criteria }
    delete article.media_files
    delete article.user_id
    delete article.mediaStatus
    delete article.article_id
    delete article.media_status

    dbConfig.query(`UPDATE club_articles SET ? WHERE article_id='${criteria.article_id}'`, article, async (err, res) => {
        if (err) callback(err)
        callback(null, res)
    })
    let values = []
    for (let i = 0; i < criteria.media_files.length; i++) {
        if (criteria.media_files[i]["media_status"] == "added") {

            values.push([criteria.media_files[i]["media"], criteria.article_id])
        }

    }
    dbConfig.query(`INSERT INTO club_articles_media (media,article_id) VALUES ?`, [values], (err, res1) => { console.log(err, res1) })

}

/***** DELETE Article Media API *****/
exports.deleteArticleMediaStatus = (criteria, callback) => {
    dbConfig.query(`UPDATE club_articles_media SET status="deleted" WHERE media_id=${criteria.media_id}`, callback)
}

/***** add aptitude question API *****/
exports.addAptitudeQuestion = (criteria, callback) => {
    // console.log(criteria);
  
    // tables ->
    // psy_aptitude_ques_ans_cat
    //psy_aptitude_question_options
    // psy_aptitude_question_files
  
    let object1 = {
      class: criteria.class,
      sub_category_id: criteria.sub_category_id,
      question: criteria.question,
      answer: criteria.answer.value,
      answer_type: criteria.answer.type,
      passage_id: criteria.passage_id ? criteria.passage_id : '',
      options: JSON.stringify(criteria.options)
    };
  
    // insert data into psy_aptitude_ques_ans_cat table
    dbConfig.query(`INSERT into psy_aptitude_ques_ans_cat SET ?`, object1, (err, res) => {
        if (err) {
          console.log("Add Aptitude question Error--->", err);
          callback(err, null);
        } else {
          let arrayFiles = criteria.questionFiles;
          if (arrayFiles.length) {
            // insert data into psy_aptitude_question_files table
            dbConfig.query(
              `INSERT INTO psy_aptitude_question_files (question_id, file) VALUES ?`,
              [arrayFiles.map((ele) => [res.insertId, ele])],
              (er, resp) => {
                if (er) return callback(er, null);
                callback(null, resp);
              }
            );
          } else {
            callback(null, res);
          }
        }
      });
};