import db from './db.js';

const getAllCategories = async () => {

    const query = `
        SELECT category_id, name
        FROM categories;
    `;

    const result = await db.query(query);

    return result.rows;
};


const getCategoryDetails = async (categoryId) => {

    const query = `
        SELECT category_id, name
        FROM categories
        WHERE category_id = $1;
    `;

    const queryParams = [categoryId];

    const result = await db.query(query, queryParams);

    return result.rows.length > 0 
        ? result.rows[0] 
        : null;
};


const getProjectsByCategoryId = async (categoryId) => {

    const query = `
        SELECT
            projects.project_id,
            projects.name,
            projects.description
        FROM projects
        JOIN project_categories
        ON projects.project_id = project_categories.project_id
        WHERE project_categories.category_id = $1;
    `;

    const queryParams = [categoryId];

    const result = await db.query(query, queryParams);

    return result.rows;
};


export { 
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId
};