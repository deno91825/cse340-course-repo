import { 
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId,
    getCategoriesByProjectId,
    updateCategoryAssignments,
    createCategory,
    updateCategory
} from '../models/categories.js';

import { getProjectDetails } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters')
];

// Display all categories page
const showCategoriesPage = async (req, res) => {

    const categories = await getAllCategories();

    const title = 'Service Categories';

    res.render('categories', {
        title,
        categories
    });
};

const showAssignCategoriesForm = async (req, res) => {

    const projectId = req.params.projectId;

    const project = await getProjectDetails(projectId);

    const categories = await getAllCategories();

    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', {
        title,
        project,
        categories,
        assignedCategories
    });

};

const processAssignCategoriesForm = async (req, res) => {

    const projectId = req.params.projectId;

    const categoryIds = req.body.categoryIds || [];

    await updateCategoryAssignments(
        projectId,
        categoryIds
    );

    req.flash(
        'success',
        'Categories updated successfully!'
    );

    res.redirect(`/project/${projectId}`);

};


// Display single category details page
const showCategoryDetailsPage = async (req, res) => {

    const categoryId = req.params.id;

    const projects = await getProjectsByCategoryId(categoryId);

    const category = await getCategoryDetails(categoryId);

    const title = category.name;

    res.render('category', {
        title,
        category,
        projects
    });
};

const showNewCategoryForm = (req, res) => {

    res.render('new-category', {
        title: 'New Category'
    });

};

const processNewCategoryForm = async (req, res) => {

    const results = validationResult(req);

    if (!results.isEmpty()) {

        results.array().forEach(error => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-category');
    }

    const { name } = req.body;

    const categoryId = await createCategory(name);

    req.flash('success', 'Category added successfully!');

    res.redirect(`/category/${categoryId}`);
};

const showEditCategoryForm = async (req, res) => {

    const categoryId = req.params.id;

    const category = await getCategoryDetails(categoryId);

    res.render('edit-category', {
        title: 'Edit Category',
        category
    });

};

const processEditCategoryForm = async (req, res) => {

    const categoryId = req.params.id;

    const results = validationResult(req);

    if (!results.isEmpty()) {

        results.array().forEach(error => {
            req.flash('error', error.msg);
        });

        return res.redirect(`/edit-category/${categoryId}`);
    }

    const { name } = req.body;

    await updateCategory(categoryId, name);

    req.flash('success', 'Category updated successfully!');

    res.redirect(`/category/${categoryId}`);
};


export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
};