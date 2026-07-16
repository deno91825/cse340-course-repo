CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(100) NOT NULL,
    logo_filename VARCHAR(200) NOT NULL
);

INSERT INTO organizations(name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders','A nonprofit focused on improving community infrastructure through sustainable construction projects.','info@brightfuturebuilders.org','brightfuture-logo.png'),
('GreenHarvest Growers','An urban farming collective promoting food sustainability and education in local neighborhoods.','contact@greenharvest.org','greenharvest-logo.png'),
('UnityServe Volunteers','A volunteer coordination group supporting local charities and service initiatives.','hello@unityserve.org','unityserve-logo.png');


CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,

    FOREIGN KEY (organization_id)
        REFERENCES organizations(organization_id)
);

CREATE TABLE project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY(project_id, category_id),

    FOREIGN KEY(project_id)
        REFERENCES projects(project_id),

    FOREIGN KEY(category_id)
        REFERENCES categories(category_id)
);

INSERT INTO categories(name)
VALUES
('Education'),
('Health'),
('Environment');

INSERT INTO projects
(organization_id, name, description)
VALUES

(1,
'Park Cleanup',
'Join us to clean up local parks and make them beautiful!'),

(3,
'Food Drive',
'Help collect and distribute food to those in need.'),

(2,
'Community Tutoring',
'Volunteer to tutor students in various subjects.');

INSERT INTO project_categories
(project_id, category_id)
VALUES

(1,3),
(2,2),
(3,1);

ALTER TABLE projects
ADD COLUMN date DATE;

ALTER TABLE projects
ADD COLUMN location VARCHAR(100);

UPDATE projects
SET
date = '2026-08-15',
location = 'Central Park'
WHERE project_id = 1;

UPDATE projects
SET
date = '2026-08-20',
location = 'Community Center'
WHERE project_id = 2;

UPDATE projects
SET
date = '2026-08-25',
location = 'City Library'
WHERE project_id = 3;