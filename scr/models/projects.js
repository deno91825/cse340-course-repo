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

export { getAllProjects };