document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    if (!response.ok) {
      throw new Error('Credenciales incorrectas');
    }

    const data = await response.json();
    console.log('Login exitoso:', data);

    // Guardar el token en sessionStorage
    sessionStorage.setItem('accessToken', data.token);

    // Redirigir al panel de administración
    window.location.href = 'gestion.html';

  } catch (error) {
    document.getElementById('mensaje').textContent = error.message;
  }
});
