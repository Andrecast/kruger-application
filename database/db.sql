CREATE TABLE empleado(
    id SERIAL PRIMARY KEY,
    cedula INT NOT NULL,
    nombres VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE
);