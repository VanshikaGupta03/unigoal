const dbConfig = require("../../../config/dbConfig").connection;
const qb = require("../../../config/dbConfig").qb;

// ******************** Careers APIS   ********************************//

/***** Get Careers List *****/
exports.getCareersList = async (criteria, callback) => {
  let limit = criteria.limit ? criteria.limit : 10,
    page = criteria.page ? ((criteria.page - 1) * criteria.limit) : 0;   

  let conditions = "";
  criteria.search_key && criteria.search_key != '' ? conditions += ` and (scp.name like "%${criteria.search_key}%") ` : '';

  conditions += criteria.career_cluster ? ` and c.career_cluster IN (${criteria.career_cluster})` : "";
  conditions += criteria.exams_associated ? ` and FIND_IN_SET(${criteria.exams_associated}, c.exams_associated)` : "";

  let total = await qb.query(`SELECT count(c.career_id) as total FROM careers as c left join syg_career_professions as scp on c.career_name_id = scp.id WHERE c.status != 'deleted' ${conditions}`);

  let careers =  await qb.query(`SELECT c.career_id, c.career_unique_id, IFNULL(scp.name, "") as career_name, IFNULL(sc.name, "") as career_cluster, (select GROUP_CONCAT(syg_entrance_exam.name) from syg_entrance_exam where FIND_IN_SET(syg_entrance_exam.id, c.exams_associated)) as exams_associated, c.average_salary, c.status, (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', cs.specialisation_id, 'specialisation_name', cs.specialisation_name)) FROM career_specialisations cs WHERE cs.career_id = c.career_id) AS specialisations FROM careers as c left join syg_cluster as sc on c.career_cluster = sc.id left join syg_career_professions as scp on c.career_name_id = scp.id WHERE c.status != 'deleted'  ${conditions} group by c.career_id order by c.career_id desc limit ${page},${limit}`);

  let payload = {
      total, careers
  }
  callback(null, payload);
};
  
/***** Get Career Details *****/
exports.getCareerDetails = async (criteria, callback) => {
    let career_data = await qb.query(`SELECT c.career_id, c.career_unique_id, c.career_name_id, IFNULL(scp.name, "") as career_name, c.career_cluster, sc.name as career_cluster_name, c.average_salary, c.exams_associated, GROUP_CONCAT(syg_entrance_exam.name) as exam_associated_name, c.what_they_do, c.known_as, c.responsibilities, c.recommended_courses_and_exams, c.growth, c.top_recruiters FROM careers as c left join syg_cluster as sc on c.career_cluster = sc.id left join syg_career_professions as scp on c.career_name_id = scp.id left join syg_entrance_exam on FIND_IN_SET(syg_entrance_exam.id, c.exams_associated) where c.career_id = '${criteria.career_id}'`);

    if(career_data && career_data.length > 0){
        career_data[0].personalities = await qb.query(`SELECT cp.personality_id, cp.full_name, cp.image, cp.summary, cp.status FROM career_personalities as cp WHERE cp.career_id = '${criteria.career_id}' and cp.status != 'deleted'`);
    
        career_data[0].specialisation = await qb.query(`SELECT cs.specialisation_id, cs.specialisation_name, cs.summary, cs.status FROM career_specialisations as cs WHERE cs.career_id = '${criteria.career_id}' and cs.status != 'deleted'`);
    
        career_data[0].education_pathway = await qb.query(`SELECT cep.pathway_id, cep.pathway_title, cep.summary, cep.status FROM career_education_pathways as cep WHERE cep.career_id = '${criteria.career_id}' and cep.status != 'deleted'`);
    
        career_data[0].skills = await qb.query(`SELECT cs.skill_id, cs.skill_name, cs.summary, cs.status FROM career_skills as cs WHERE cs.career_id = '${criteria.career_id}' and cs.status != 'deleted'`);
    }    

    callback(null, career_data);
};