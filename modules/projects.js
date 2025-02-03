/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Jay Kalpesh Shukla Student ID: 143368231 Date: 03-02-2025
*
********************************************************************************/

const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

function initialize() {
    return new Promise((resolve, reject) => {
      try {
        projects = projectData.map((project) => {
          const sector = sectorData.find((sector) => sector.id === project.sector_id);
          return { ...project, sector: sector ? sector.sector_name : "Unknown"};
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  function getAllProjects() {
    return new Promise((resolve, reject) => {
      try {
        resolve(projects);
      } catch (error) {
        reject(error);
      }
    });
  }


function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    try {
      const project = projects.find((p) => p.id === projectId);
      if (project) {
        resolve(project);
      } else {
        reject(`Project not found with id: ${projectId}`);
      }
    } catch (error) {
      reject(error);
    }
  });
}

function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
      try {
        const lowSector = sector.toLowerCase();
        const matchProj = projects.filter((project) =>
          project.sector.toLowerCase().includes(lowSector)
        );
        if (matchProj.length > 0) {
          resolve(matchProj);
        } else {
          reject(`No projects found for sector: ${sector}`);
        }
      } catch (error) {
        reject(error);
      }
    });
}
  
module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };


// Testing the functions
/*async function test() {
    try {
      // Initialize the projects array
      await initialize();
      console.log("Initialization complete.");
  
      const projectById = await getProjectById(3);
      console.log("Project by ID (3):", projectById);

      const projectsBySector = await getProjectsBySector("Agriculture");
      console.log("Projects by Sector (Agriculture):", projectsBySector);
  
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
 
  test();*/
  