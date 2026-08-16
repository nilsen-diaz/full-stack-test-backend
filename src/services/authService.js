const API_BASE = 'http://localhost:3000';

// ─────────────────────────────────────────────────────────────
//  REGISTRO
// ─────────────────────────────────────────────────────────────
export async function registerUser(email, password) {
  try {
    const response = await fetch(`${API_BASE}/api/register`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return response.ok
      ? { ok: true,  message: data.message }
      : { ok: false, error:   data.error || 'Error al registrar' };
  } catch (err) {
    console.error('[registerUser] Error de red:', err);
    return { ok: false, error: 'No se pudo conectar con el servidor' };
  }
}

// ─────────────────────────────────────────────────────────────
//  LOGIN  — devuelve token + user para el AuthContext
// ─────────────────────────────────────────────────────────────
export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE}/api/login`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return response.ok
      ? { ok: true,  user: data.user, token: data.token }
      : { ok: false, error: data.error || 'Credenciales inválidas' };
  } catch (err) {
    console.error('[loginUser] Error de red:', err);
    return { ok: false, error: 'No se pudo conectar con el servidor' };
  }
}

// ─────────────────────────────────────────────────────────────
//  LLAMADA AUTENTICADA  — para rutas protegidas
// ─────────────────────────────────────────────────────────────
export async function fetchProtected(endpoint) {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}
