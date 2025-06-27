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
      return null; // Si la respuesta no es OK, retorna null
    }

    const data = await response.json();

    if (data.role !== "admin") {
      console.error("Error al intentar iniciar sesión:", "No autorizado");
      return { error: "No autorizado" };
    }

    return data; // Incluye token, username, etc.
  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error);
    return null;
  }
}
