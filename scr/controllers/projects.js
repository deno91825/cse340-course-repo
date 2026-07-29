import { 
    getAllProjects,
    getProjectDetails,
    getCategoriesByProjectId,
    createProject
} from '../models/projects.js';

import { getAllOrganizations } from '../models/organizations.js';
import { body, validationResult } from 'express-validator';

const projectValidation = [

    body('name')
        .trim()
        .notEmpty()
        .withMessage('Project name is required')
        .isLength({ min: 3, max: 200 })
        .withMessage('Project name must be between 3 and 200 characters'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ max: 1000 })
        .withMessage('Description cannot exceed 1000 characters'),

    body('location')
        .trim()
        .notEmpty()
        .withMessage('Location is required')
        .isLength({ max: 200 })
        .withMessage('Location cannot exceed 200 characters'),

    body('date')
        .notEmpty()
        .withMessage('Date is required')
        .isISO8601()
        .withMessage('Invalid date format'),

    body('organizationId')
        .notEmpty()
        .withMessage('Organization is required')
        .isInt()
        .withMessage('Invalid organization')
];

const showProjectsPage = async (req, res) => {

    const projects = await getAllProjects();

    const title = 'Service Projects';

    res.render('projects', {
        title,
        projects
    });

};

const showNewProjectForm = async (req, res) => {

    const organizations = await getAllOrganizations();

    const title = 'New Service Project';

    res.render('new-project', {
        title,
        organizations
    });

};

const processNewProjectForm = async (req, res) => {

    const {
        organizationId,
        name,
        description,
        location,
        date
    } = req.body;


    await createProject(
        name,
        description,
        location,
        date,
        organizationId
    );


    req.flash('success', 'Project added successfully!');

    res.redirect('/projects');

};

const showProjectDetailsPage = async (req, res) => {

    const projectId = req.params.id;

    const project = await getProjectDetails(projectId);

    const categories = await getCategoriesByProjectId(projectId);

    const title = project.name;

    res.render('project', {
        title,
        project,
        categories
    });

};

const showEditProjectForm = async (req, res) => {

    const projectId = req.params.id;

    const project = await getProjectDetails(projectId);

    const title = `Edit ${project.name}`;

    res.render('edit-project', {
        title,
        project
    });

};

const processEditProjectForm = async (req, res) => {

    const projectId = req.params.id;

    const {
        name,
        description,
        location,
        date,
        organizationId
    } = req.body;


    await updateProject(
        projectId,
        name,
        description,
        location,
        date,
        organizationId
    );


    req.flash(
        'success',
        'Project updated successfully!'
    );


    res.redirect(`/project/${projectId}`);
};


export { 
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation
}; 