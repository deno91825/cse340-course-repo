import { 
    getAllProjects,
    getProjectDetails,
    getCategoriesByProjectId
} from '../models/projects.js';

const showProjectsPage = async (req, res) => {

    const projects = await getAllProjects();

    const title = 'Service Projects';

    res.render('projects', {
        title,
        projects
    });

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


export { 
    showProjectsPage,
    showProjectDetailsPage
};