const pool = require('../db'); /* Traigo la conexión a la BD */


const getEmpleados = async (req, res, next) => {
    try {
        const allEmpleados = await pool.query('SELECT * FROM empleado')
        res.json(allEmpleados.rows);
    } catch (error) {
        next(error); /* Ya que el servidor podría caerse o puede ocurrir otro tipo de error */
    }
};

const getEmpleado = async (req, res, next) => { 
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM empleado WHERE id = $1", [id]);
    
        if (result.rows.length === 0) /* Cuando le envío un id que no existe, me devuelve una lista vacía */
          return res.status(404).json({ message: "Empleado no encontrado" });
    
        res.json(result.rows[0]);
      } catch (error) {
        next(error);
      }
};

const createEmpleado = async (req, res, next) => {
    try {
        const { cedula, nombres, apellidos, correo } = req.body; /* request.body me permite conocer la info que me estén enviando las aplicaciones cliente */


        const result = await pool.query("INSERT INTO empleado (cedula, nombres, apellidos, correo) VALUES ($1, $2, $3, $4) RETURNING *", [ /* RETURNING *: quiero que el objeto me retorne todos los campos que han sido insertados*/
            cedula,
            nombres,
            apellidos,
            correo
        ]);

        res.json(result.rows[0]);
    } catch (error) { /* Maejador de errores, en caso de que se inserte mal un dato */
        next(error);
    }
};

const deleteEmpleado = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM empleado WHERE id = $1", [id]); /* uso returning para que me devuelva la tarea que he eliminado */

        if (result.rowCount === 0) /* Cuando le envío un id que no existe, me devuelve una lista vacía */
          return res.status(404).json({ message: "Empleado no encontrado" });

        /* return res.json(result.rows[0]); */
        return res.status(200).json({ message: "Empleado eliminado"});
    } catch (error) {
        next(error);
    }
};

const updateEmpleado = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { cedula, nombres, apellidos, correo } = req.body;
  
      const result = await pool.query(
        "UPDATE Empleado SET cedula = $1, nombres = $2, apellidos = $3, correo = $4 WHERE id = $5 RETURNING *",
        [cedula, nombres, apellidos, correo, id]
      );
  
      if (result.rows.length === 0)
        return res.status(404).json({ message: "Empleado no encontrado" });
  
      return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
  };

module.exports = {
    getEmpleados,
    getEmpleado,
    createEmpleado,
    deleteEmpleado,
    updateEmpleado
};
