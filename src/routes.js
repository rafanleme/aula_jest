const express = require("express");

const managerValidator = require("./validators/manager");
const managementValidator = require("./validators/management");
const condominiumValidator = require("./validators/condominium");

const ManagerController = require("./controllers/ManagerController");
const ManagementController = require("./controllers/ManagementController");
const CondominiumController = require("./controllers/CondominiumController");
const routes = express.Router();

//public routes
routes.post("/managers", managerValidator.create, ManagerController.store);

//private routes rules=manager
routes.get("/condominiums", CondominiumController.index);

routes.post(
  "/condominiums/:condominiumId/managers/:managerId",
  managementValidator.create,
  ManagementController.store
);
routes.patch(
  "/condominiums/:condominiumId/managers/:managerId",
  managementValidator.create,
  ManagementController.update
);

routes.post(
  "/condominiums",
  condominiumValidator.create,
  CondominiumController.store
);

module.exports = routes;
