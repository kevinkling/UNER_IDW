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
      return null;
    }

    const data = await response.json();

    const userResponse = await fetch(`https://dummyjson.com/users/${data.id}`);
    const userData = await userResponse.json();

    if (userData.role !== "admin") {
      console.error("Error al intentar iniciar sesión:", "No autorizado");
      return { error: "No autorizado" };
    }

    // Datos combinados: login + datos del usuario
    return {
      ...data,
      role: userData.role,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
    };
  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error);
    return null;
  }
}
