import express from 'express';

import * as usersController from "./controllers/users.js";
import { showHomePage } from './controllers/index.js';
import { 
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
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
router.get(
    '/new-organization',
    usersController.requireRole("admin"),
     showNewOrganizationForm);

router.post(
    '/new-organization',
    usersController.requireRole("admin"),
    organizationValidation,
    processNewOrganizationForm
);
router.get(
    '/edit-organization/:id',
    usersController.requireRole("admin"),
    showEditOrganizationForm
);

router.post(
    '/edit-organization/:id',
    usersController.requireRole("admin"),
    organizationValidation,
    processEditOrganizationForm
);

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/new-project',usersController.requireRole("admin"), showNewProjectForm);
router.post('/new-project', usersController.requireRole("admin"),  processNewProjectForm);
router.get(
    '/edit-project/:id',
    usersController.requireRole("admin"),
    showEditProjectForm
);
router.post(
    '/edit-project/:id',
    usersController.requireRole("admin"),
    projectValidation,
    processEditProjectForm
);


router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get(
    '/project/:projectId/assign-categories',
    usersController.requireRole("admin"),
    showAssignCategoriesForm
);

router.get('/new-category', usersController.requireRole("admin"),  showNewCategoryForm);


router.post(
    '/new-category',
    usersController.requireRole("admin"),
    categoryValidation,
    processNewCategoryForm
);

router.get(
    '/edit-category/:id',
    usersController.requireRole("admin"),
    showEditCategoryForm
);

router.post(
    '/edit-category/:id',
    usersController.requireRole("admin"),
    categoryValidation,
    processEditCategoryForm
);

router.post(
    '/project/:projectId/assign-categories',
    usersController.requireRole("admin"),
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

router.get(
    "/dashboard",
    usersController.requireLogin,
    usersController.showDashboard
);

router.get(
    "/users",
    usersController.requireRole("admin"),
    usersController.showUsersPage
);

export default router;