import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Cambia esta ruta si tu archivo está en otro lugar
fetch('tiendas.json')
  .then(res => res.json())
  .then(async tiendas => {
    for (const tienda of tiendas) {
      try {
        await addDoc(collection(db, "tiendas"), tienda);
        console.log("Tienda subida:", tienda.nombre);
      } catch (e) {
        console.error("Error subiendo tienda:", tienda.nombre, e);
      }
    }
  });
