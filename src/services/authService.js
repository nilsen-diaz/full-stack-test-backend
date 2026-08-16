const API_BASE = 'http://localhost:3000';


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

export async function fetchProtected(endpoint) {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}
