const { Router } = require('express');
const { getEmpleados, getEmpleado, createEmpleado, deleteEmpleado, updateEmpleado } = require('../controllers/info.controllers');

const router = Router(); /* Este objero Router me va a permitir crear varias URL */

router.get("/admin", getEmpleados);

router.get("/admin/:id", getEmpleado);

router.post("/admin", createEmpleado);

router.delete("/admin/:id", deleteEmpleado);

router.put("/admin/:id", updateEmpleado);

module.exports = router;