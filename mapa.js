const map = L.map('map').setView([25.67, -100.30], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const iconoTienda = L.icon({
  iconUrl: 'assets/pin4.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30]
});

const marcadores = new Map();

const tarjeta = document.getElementById("tarjetaTienda");
const nombreTienda = document.getElementById("nombreTienda");
const descripcionTienda = document.getElementById("descripcionTienda");
const encargadoTienda = document.getElementById("encargadoTienda");
const botonAgendar = document.getElementById("botonAgendar");
const imagenTienda = document.getElementById("imagenTienda");

fetch('tiendas.json')
  .then(res => res.json())
  .then(tiendas => {
    tiendas.forEach(tienda => {
      if (tienda.lat && tienda.lng && tienda.codigo) {
        const marker = L.marker([tienda.lat, tienda.lng], { icon: iconoTienda })
          .addTo(map)
          .bindPopup(`<strong>${tienda.nombre}</strong><br>${tienda.descripcion || ""}`);
        marcadores.set(tienda.codigo.toUpperCase(), { marker, data: tienda });
      }
    });
  });

window.buscarTienda = function () {
  const codigo = document.getElementById("buscarCodigo").value.trim().toUpperCase();
  const obj = marcadores.get(codigo);
  if (obj) {
    const { marker, data } = obj;
    map.setView(marker.getLatLng(), 15);
    marker.openPopup();

    nombreTienda.textContent = data.nombre || "";
    descripcionTienda.textContent = data.descripcion || "";
    encargadoTienda.textContent = data.encargado ? `Encargado: ${data.encargado}` : "";
    imagenTienda.src = data.imagen || "assets/default.jpg";

    botonAgendar.onclick = () => {
      window.location.href = `agenda.html?codigo=${encodeURIComponent(data.codigo)}`;
    };

    tarjeta.style.display = "block";
    document.body.classList.add("tarjeta-abierta");
  } else {
    alert("Tienda no encontrada: " + codigo);
    tarjeta.style.display = "none";
    document.body.classList.remove("tarjeta-abierta");
  }
};

map.on('click', () => {
  tarjeta.style.display = "none";
  document.body.classList.remove("tarjeta-abierta");
});
