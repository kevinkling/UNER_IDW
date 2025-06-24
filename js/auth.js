export async function login(usuario, contrasena) {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usuario,
        password: contrasena,
      }),
    });

    if (!response.ok) {
      return null; // login inválido
    }

    const data = await response.json();
    return data; // incluye token, username, etc.
  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error);
    return null;
  }
}
