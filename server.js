/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Jay Kalpesh SHukla Student ID: 143368231 Date: 03-02-2025
*
********************************************************************************/
const projectData = require("./modules/projects");

const express = require('express'); 
const app = express(); 
const HTTP_PORT = process.env.PORT || 8080; 

app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));


projectData.initialize().then(() => {
    app.get("/", (req, res) => {
        res.send("Assignment 2: Jay Kalpesh Shukla - 143368231");
    });
    
    app.get("/solutions/projects", async (req, res) => {
          const projects = await projectData.getAllProjects();
          res.json(projects);
    });

    app.get("/solutions/projects/id-demo", async (req, res) => {
        const projectId = "3"; 
        try {
          const project = await projectData.getProjectById(projectId);
          res.json(project);
        } catch (error) {
          res.status(404).send(error.message || "Project not found");
        }
    });
      
    app.get("/solutions/projects/sector-demo", async (req, res) => {
        const sector = "ind"; 
        try {
          const projects = await projectData.getProjectsBySector(sector);
          res.json(projects);
        } catch (error) {
          res.status(404).send(error.message || "Projects not found");
        }
    });
});