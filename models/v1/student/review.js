const { connection: db } = require('../../../config/dbConfig');

const addReviewToDB = (reviewData, callback) => {
    const student_id = 1;
    const { college_id, year_of_admission, name, email, phone_number, review_type, review_title, ratings, review_detail, pro_detail, con_detail, go_anonymous } = reviewData;

    db.query(
        `SELECT review_id FROM review WHERE college_id = ? AND student_id = ?`,
        [college_id, student_id],
        (err, result) => {
            if (err) return callback(err, null);
            if (result.length > 0) return callback(null, { message: "You have already added the review" });


            db.query(
                `INSERT INTO review (college_id, student_id, year_of_admission, name, email, phone_number,review_type, review_title, ratings, review_detail,pro_detail,con_detail,go_anonymous, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?, '1')`,

                [college_id, student_id, year_of_admission, name, email, phone_number, review_type, review_title, ratings, review_detail, JSON.stringify(pro_detail), JSON.stringify(con_detail), go_anonymous],
                (err, insertResult) => {
                    if (err) return callback(err, null);
                    return callback(null, { review_id: insertResult.insertId });
                }
            );
        }
    );
};







const addDetailedReviewToDb = (reviewData, callback) => {
    const { college_id, review_id, subjective_data } = reviewData;
    const student_id = 1;


    const checkReviewIdSql = `SELECT review_id FROM review WHERE review_id = ? AND college_id = ? AND student_id = ?`;

    db.query(checkReviewIdSql, [review_id, college_id, student_id], (err, reviewResult) => {
        if (err) {
            console.error("Error checking review_id:", err);
            return callback({ statusCode: 500, statusMessage: "Database Error" }, null);
        }

        if (reviewResult.length === 0) {
            console.log("Review ID does not exist.");
            return callback(null, { statusCode: 400, message: "Please first fill the basic details before adding a detailed review." });
        }

        console.log("Review ID exists, proceeding with detailed review insertion.");
        insertDetailedReviews(review_id);
    });

    function insertDetailedReviews(review_id) {
        console.log("Inserting detailed reviews with review_id:", review_id);

        const values = subjective_data.map(({ upload_picture, subjective_review_type, ratings, detailed_review }) =>
            [review_id, college_id, student_id, upload_picture, subjective_review_type, ratings, detailed_review, '1']
        );

        console.log("Values to be inserted:", values);

        const insertSql = `
            INSERT INTO review_subjective_details 
            (review_id, college_id, student_id, upload_picture, subjective_review_type, ratings, detailed_review, status)
            VALUES ?
        `;

        db.query(insertSql, [values], (err, insertResult) => {
            if (err) {
                console.error("Error inserting detailed reviews:", err.sqlMessage);
                return callback({ statusCode: 500, statusMessage: "Database Error", error: err.sqlMessage }, null);
            }

            console.log("Detailed reviews added successfully:", insertResult.insertId);
            return callback(null);
        });
    }
};







const addBlogReviewToDb = (reviewData, callback) => {
    const student_id = 1;
    const { college_id, review_id, blogData } = reviewData;

    db.query(
        `SELECT review_id FROM review WHERE review_id = ? AND college_id = ?`,
        [review_id, college_id],
        (err, reviewResult) => {
            if (err) {
                console.error("Database Error (SELECT review_id):", err);
                return callback({ statusCode: 500, message: "Database Error" }, null);
            }

            if (reviewResult.length === 0) {
                console.log("Review ID does not exist. Please fill in the basic details first.");
                return callback({ statusCode: 400, message: "Please fill in the basic details first." }, null);
            }


            db.query(
                `SELECT blogReviewId FROM blog_review WHERE college_id = ? AND student_id = ?`,
                [college_id, student_id],
                (err, result) => {
                    if (err) {
                        console.error("Database Error (SELECT blogReviewId):", err);
                        return callback({ statusCode: 500, message: "Database Error" }, null);
                    }

                    if (result.length > 0) {

                        return callback(null, { statusCode: 400, message: "You have already added a blog review for this college" });
                    }

                    const values = blogData.map(({ blog_review_type, upload_video, video_title, review_tags, video_description, pro, con, ratings }) =>
                        [college_id, student_id, review_id, blog_review_type, upload_video, video_title, review_tags, video_description, JSON.stringify(pro), JSON.stringify(con), ratings, '1']
                    );

                    const insertSql = `
                        INSERT INTO blog_review 
                        (college_id, student_id, review_id, blog_review_type,upload_video, video_title, review_tags, video_description, pro, con, ratings,  status)
                        VALUES ?
                    `;

                    db.query(insertSql, [values], (err, insertResult) => {
                        if (err) {

                            return callback({ statusCode: 500, message: "Database Error" }, null);
                        }


                        return callback(null);
                    });
                }
            );
        }
    );
};

module.exports = { addReviewToDB, addDetailedReviewToDb, addBlogReviewToDb };
