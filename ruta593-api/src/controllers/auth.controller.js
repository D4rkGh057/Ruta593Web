const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const JWT_SECRET = 'ruta593-secret-key';

exports.register = async (req, res) => {
    try {
        const { nombre, apellido, telefono, email, password } = req.body;

        // Verificar si el usuario ya existe
        const userExists = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear nuevo usuario
        const newUser = await pool.query(
            'INSERT INTO usuarios (nombre, apellido, telefono, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, nombre, apellido, telefono, email',
            [nombre, apellido, telefono, email, hashedPassword]
        );

        // Generar token
        const token = jwt.sign(
            { id: newUser.rows[0].id },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            token,
            user: {
                id: newUser.rows[0].id,
                nombre: newUser.rows[0].nombre,
                apellido: newUser.rows[0].apellido,
                telefono: newUser.rows[0].telefono,
                email: newUser.rows[0].email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Verificar contraseña
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Generar token
        const token = jwt.sign(
            { id: user.rows[0].id },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: user.rows[0].id,
                nombre: user.rows[0].nombre,
                apellido: user.rows[0].apellido,
                telefono: user.rows[0].telefono,
                email: user.rows[0].email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await pool.query(
            'SELECT id, nombre, apellido, telefono, email FROM usuarios WHERE id = $1',
            [req.user.id]
        );

        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}; 