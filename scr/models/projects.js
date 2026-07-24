import db from './db.js';

const getAllProjects = async () => {

    const query = `
        SELECT
            project_id,
            organization_id,
            name,
            description,
            date,
            location
        FROM projects;
    `;

    const result = await db.query(query);

    return result.rows;
};


const getCategoriesByProjectId = async (projectId) => {

    const query = `
        SELECT
            categories.category_id,
            categories.name
        FROM categories
        JOIN project_categories
        ON categories.category_id = project_categories.category_id
        WHERE project_categories.project_id = $1;
    `;

    const queryParams = [projectId];

    const result = await db.query(query, queryParams);

    return result.rows;
};


export { 
    getAllProjects,
    getCategoriesByProjectId
};