import db from './db.js';

const getAllProjects = async () => {

    const query = `
        SELECT
            projects.project_id,
            projects.organization_id,
            projects.name,
            projects.description,
            projects.date,
            projects.location,
            organizations.name AS organization_name
        FROM projects
        JOIN organizations
        ON projects.organization_id = organizations.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getProjectDetails = async (projectId) => {

    const query = `
        SELECT
            projects.project_id,
            projects.organization_id,
            projects.name,
            projects.description,
            projects.date,
            projects.location,
            organizations.name AS organization_name
        FROM projects
        JOIN organizations
        ON projects.organization_id = organizations.organization_id
        WHERE projects.project_id = $1;
    `;

    const queryParams = [projectId];

    const result = await db.query(query, queryParams);

    return result.rows.length > 0
        ? result.rows[0]
        : null;
};

const getProjectsByOrganizationId = async (organizationId) => {

    const query = `
        SELECT
            project_id,
            organization_id,
            name,
            description,
            date,
            location
        FROM projects
        WHERE organization_id = $1;
    `;

    const queryParams = [organizationId];

    const result = await db.query(query, queryParams);

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

const createProject = async (
    name,
    description,
    location,
    date,
    organizationId
) =>{
    const query =`
    INSERT INTO projects(
    organization_id,
    name,
    description,
    date,
    location
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING project_id;
    `;

    const queryParams = [
        organizationId,
        name,
        description,
        date,
        location
    ];

    const result = await db.query(query, queryParams);

    return result.rows[0].project_id
};


export { 
    getAllProjects,
    getProjectsByOrganizationId,
    getCategoriesByProjectId,
    getProjectDetails,
    createProject
};