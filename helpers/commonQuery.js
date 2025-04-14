const dbConfig = require("../config/dbConfig").qb;
const qb = require("../config/dbConfig").qb;


/***** Check Admin *****/
exports.checkAdmin = async (key, tablename, value) => {
  let data = await dbConfig.query(`select ${key}, user_type, role, college_id, is_permission_changed from ${tablename} where ${key} = '${value}'`);
  return data;
};

/***** Save Task Status History *****/
exports.saveTaskHistory = async (criteria) => {
  console.log(`SELECT id from assigned_task_details where college_id = '${criteria.college_id}' and module = '${criteria.module}' and sub_admin_id = '${criteria.updated_by}'`);
  let task_id = await qb.query(`SELECT id from assigned_task_details where college_id = '${criteria.college_id}' and module = '${criteria.module}' and sub_admin_id = '${criteria.updated_by}'`);
  criteria.task_id = task_id[0].id;  

  let history_id = await qb.query(`INSERT INTO assigned_task_status_history(task_id, college_id, module, task_status, updated_by, user_type, role) VALUES (${criteria.task_id}, ${criteria.college_id}, "${criteria.module}", "${criteria.task_status}", ${criteria.updated_by}, "${criteria.user_type}", "${criteria.role}")`, criteria);
  return history_id.insertId;
};

/******* Sub-Admin conditions for adding data *******/
exports.addDatabySubAdmin =  async function (delete_table, module, criteria, data) {
  let table = "";
  if(criteria.user_type === 'sub_admin' && ((criteria.role === 'content_manager' && criteria.type === 'draft') || criteria.role === 'team_lead' || criteria.role === 'intern')){
    table = "_copy";
    if(criteria.type && (criteria.type === 'draft' || criteria.type === 'submitted')){
      delete_table != "" ? dbConfig.query(`DELETE from ${delete_table} where college_id = '${criteria.college_id}' and role = '${criteria.role}' and updated_by = '${criteria.user_id}'`) : true;
        if(criteria.type === 'submitted'){
            dbConfig.query(`UPDATE assigned_task_details SET task_status = 'in_review' where college_id = '${criteria.college_id}' and module = '${module}' and sub_admin_id = '${criteria.user_id}'`);
        }
        else{
          dbConfig.query(`UPDATE assigned_task_details SET task_status = 'in_progress' where college_id = '${criteria.college_id}' and module = '${module}' and sub_admin_id = '${criteria.user_id}'`);
        }
    }
    data.role = criteria.role;
    data.content_status = (criteria.role === 'intern') ? '0' : (criteria.role === 'team_lead') ? '1' : '2';
    data.updated_by = criteria.user_id;
    data.task_status = criteria.type;
    // data.task_status = criteria.user_idcriteria[criteria.role + "_id"];
  }
  return {table, data};
}

/******* Sub-Admin conditions for adding multiple data *******/
exports.addMultipleDatabySubAdmin =  async function (criteria, data) {
  let table = "", keys = "";
  if(criteria.user_type === 'sub_admin' && ((criteria.role === 'content_manager' && criteria.type === 'draft') || criteria.role === 'team_lead' || criteria.role === 'intern')){
    table = "_copy";
    keys = ", role, content_status, updated_by";
    data.map(item => {
        item.push(
            role = criteria.role,
            content_status = (criteria.role === 'intern') ? '0' : (criteria.role === 'team_lead') ? '1' : '2',
            updated_by = criteria.user_id
            // updated_by = criteria.user_idcriteria[criteria.role + "_id"]
        );
    });
  }
  return { table, keys, data };
};

/******* Sub-Admin conditions for adding data using json object *******/
exports.addObjectDatabySubAdmin =  async function (criteria, data) {
  let table = "";
  if(criteria.user_type === 'sub_admin' && ((criteria.role === 'content_manager' && criteria.type === 'draft') || criteria.role === 'team_lead' || criteria.role === 'intern')){
    table = "_copy";
    data.role = criteria.role;
    data.content_status = (criteria.role === 'intern') ? '0' : (criteria.role === 'team_lead') ? '1' : '2';
    data.updated_by = criteria.user_id;
  }
  return { table, data };
};

/***** Check Admin *****/
exports.checkCollegeAdmin = async (key, tablename, value) => {
  let data = await dbConfig.query(`select ${key},college_id from ${tablename} where ${key} = '${value}'`);
  return data;
};

/***** Check student *****/
exports.checkStudent = async (key, tablename, value, email) => {
  let data = await dbConfig.query(`select ${key}, email from ${tablename} where ${key} = '${value}' and email = '${email}'`);
  return data;
};

/***** Check mentor *****/
exports.checkMentor = async (key, tablename, value, email) => {
  let data = await dbConfig.query(`select ${key}, email from ${tablename} where ${key} = '${value}' and email = '${email}'`);
  return data;
};

/***** Check cap *****/
exports.checkCap = async (key, tablename, value, email) => {
  let data = await dbConfig.query(`select ${key}, email from ${tablename} where ${key} = '${value}' and email = '${email}'`);
  return data;
};