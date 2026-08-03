import express from 'express';

import * as usersController from "./controllers/users.js";
import { showHomePage } from './controllers/index.js';
import { 
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm
} from './controllers/organizations.js';

import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
} from './controllers/categories.js';


const router = express.Router();


router.get('/', showHomePage);

router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/new-organization', showNewOrganizationForm);
router.post(
    '/new-organization',
    organizationValidation,
    processNewOrganizationForm
);
router.get(
    '/edit-organization/:id',
    showEditOrganizationForm
);

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/new-project', showNewProjectForm);
router.post('/new-project', processNewProjectForm);
router.get(
    '/edit-project/:id',
    showEditProjectForm
);
router.post(
    '/edit-project/:id',
    projectValidation,
    processEditProjectForm
);


router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get(
    '/project/:projectId/assign-categories',
    showAssignCategoriesForm
);

router.get('/new-category', showNewCategoryForm);


router.post(
    '/new-category',
    categoryValidation,
    processNewCategoryForm
);

router.get(
    '/edit-category/:id',
    showEditCategoryForm
);

router.post(
    '/edit-category/:id',
    categoryValidation,
    processEditCategoryForm
);

router.post(
    '/project/:projectId/assign-categories',
    processAssignCategoriesForm
);


router.get("/register", usersController.showUserRegistrationForm);

router.post("/register", usersController.processUserRegistrationForm);


router.get(
    "/login",
    usersController.showLoginForm
);


router.post(
    "/login",
    usersController.processLoginForm
);


router.get(
    "/logout",
    usersController.processLogout
);


export default router;