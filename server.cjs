const express  = require('express');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const cors     = require('cors');
const fs       = require('fs');
const path     = require('path');

const PORT        = 3000;
const JWT_SECRET  = 'clave_super_secreta_cambiar_en_produccion';
const JWT_EXPIRES = '2h';
const SALT_ROUNDS = 10;
const USERS_FILE  = path.join(__dirname, 'users.json');

function leerUsuarios() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]), 'utf8');
  }
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
}

function guardarUsuarios(usuarios) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(usuarios, null, 2), 'utf8');
}

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Formato de email inválido' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    const usuarios = leerUsuarios();
    const existe   = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existe) {
      return res.status(409).json({ error: 'El usuario ya existe' });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const nuevoUsuario = {
      id:       Date.now(),
      email:    email.toLowerCase(),
      password: passwordHash,
      creadoEn: new Date().toISOString(),
    };
    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);

    console.log(`[REGISTER] ✅ Usuario creado: ${nuevoUsuario.email}`);
    return res.status(201).json({ message: 'Usuario registrado exitosamente' });

  } catch (error) {
    console.error('[REGISTER ERROR]', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const usuarios = leerUsuarios();
    const usuario  = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const payload = { id: usuario.id, email: usuario.email };
    const token   = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    console.log(`[LOGIN] ✅ Acceso exitoso: ${usuario.email}`);
    return res.status(200).json({
      message: 'Login exitoso',
      token,
      user: { id: usuario.id, email: usuario.email },
    });

  } catch (error) {
    console.error('[LOGIN ERROR]', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token      = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    req.usuario = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
}

// GET /api/profile  (ruta protegida de ejemplo)
app.get('/api/profile', verificarToken, (req, res) => {
  res.json({
    message: 'Perfil obtenido correctamente',
    usuario: req.usuario,
  });
});

app.listen(PORT, () => {
  console.log(`\n✅  Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📁  Usuarios en: ${USERS_FILE}`);
  console.log(`📌  Endpoints:`);
  console.log(`     POST http://localhost:${PORT}/api/register`);
  console.log(`     POST http://localhost:${PORT}/api/login`);
  console.log(`     GET  http://localhost:${PORT}/api/profile  (protegida)\n`);
});
