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

const assignCategoryToProject = async (projectId, categoryId) => {

    const query = `
        INSERT INTO project_categories
        (project_id, category_id)
        VALUES ($1, $2);
    `;

    const queryParams = [
        projectId,
        categoryId
    ];

    await db.query(query, queryParams);

};

const updateCategoryAssignments = async (projectId, categoryIds) => {

    const deleteQuery = `
        DELETE FROM project_categories
        WHERE project_id = $1;
    `;

    await db.query(deleteQuery, [projectId]);


    for (const categoryId of categoryIds) {

        await assignCategoryToProject(
            projectId,
            categoryId
        );

    }

};

const createCategory = async (name) => {

    const query = `
        INSERT INTO categories
        (name)
        VALUES ($1)
        RETURNING category_id;
    `;

    const queryParams = [name];

    const result = await db.query(query, queryParams);

    return result.rows[0].category_id;
};


const updateCategory = async (id, name) => {

    const query = `
        UPDATE categories
        SET name = $1
        WHERE category_id = $2;
    `;

    const queryParams = [name, id];

    await db.query(query, queryParams);
};


export { 
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId,
    getCategoriesByProjectId,
    updateCategoryAssignments,
    createCategory,
    updateCategory
};