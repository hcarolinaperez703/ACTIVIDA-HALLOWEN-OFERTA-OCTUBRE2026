/**
 * ============================================================================
 * DUELO DE OFERTAS DE HALLOWEEN – OCTUBRE
 * Archivo de Configuración de Firebase para Sincronización en Tiempo Real
 * ============================================================================
 * 
 * INSTRUCCIONES PARA CONECTAR TU PROYECTO DE FIREBASE:
 * 1. Ingresa a la consola de Firebase: https://console.firebase.google.com/
 * 2. Crea un nuevo proyecto (ejemplo: "claro-duelo-halloween").
 * 3. En la barra lateral, ve a "Compilación" -> "Firestore Database" o "Realtime Database" y actívalo.
 * 4. En la pestaña "Reglas" (Rules), coloca:
 *    rules_version = '2';
 *    service cloud.firestore {
 *      match /databases/{database}/documents {
 *        match /{document=**} {
 *          allow read, write: if true;
 *        }
 *      }
 *    }
 * 5. Ve a "Configuración del proyecto" (ícono de engranaje) -> pestaña "General".
 * 6. En "Tus apps", crea una aplicación Web ("</>") y copia las claves 'firebaseConfig'.
 * 7. Pega tus credenciales en el objeto a continuación o configúralas directamente en la app.
 */

window.FIREBASE_CONFIG = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
  databaseURL: "https://TU_PROYECTO-default-rtdb.firebaseio.com"
};

// Variable para verificar si el usuario ha configurado sus credenciales reales
window.isFirebaseConfigured = function() {
  return window.FIREBASE_CONFIG && 
         window.FIREBASE_CONFIG.apiKey && 
         window.FIREBASE_CONFIG.apiKey !== "TU_API_KEY_AQUI" &&
         window.FIREBASE_CONFIG.projectId !== "TU_PROJECT_ID";
};
