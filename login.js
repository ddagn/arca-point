document.getElementById("login").addEventListener("click", () => {
  const numeroEmpleado = document.getElementById("numeroEmpleado").value.trim();

  if (numeroEmpleado === "") {
    alert("Por favor ingresa tu número de empleado.");
    return;
  }

  // Guardar el número de empleado en sessionStorage (por si lo necesitas después)
  sessionStorage.setItem("numeroEmpleado", numeroEmpleado);

  // Redirigir al panel principal
  window.location.href = "home.html";
});

