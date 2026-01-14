Task Manager Pro:

Applicazione Task Manager Full Stack sviluppata con React per il frontend e Node.js / Express / MySQL per il backend.
Il progetto è nato come esercizio frontend ed è stato progressivamente evoluto in un’applicazione completa con API REST e persistenza su database.

L’obiettivo è dimostrare buone pratiche di sviluppo, una struttura scalabile e un flusso di lavoro realistico frontend ↔ backend.

🚀 Funzionalità principali:

📋 Visualizzazione lista task da database
➕ Creazione di nuove task tramite form
❌ Eliminazione di una task
🔄 Aggiornamento stato task (todo → doing → done)
🔍 Filtro task per stato
💾 Persistenza dati su database MySQL
🎨 Stato visivo delle task gestito via CSS e Bootstrap
⏳ Gestione loading ed error state

🧱 Architettura del progetto:

/////// Frontend:

React
JavaScript (ES6)
Bootstrap
Componenti riutilizzabili
Stato centralizzato in App.jsx
Separazione tra:
    UI
    logica applicativa
    layer API

/////// Backend:

Node.js
Express
MySQL
API REST
Struttura a livelli:
    routes
    controllers
    database
    middlewares (error handling e not found)

🔗 Comunicazione Frontend ↔ Backend

Il frontend comunica con il backend tramite API REST:

GET /tasks → recupero task
POST /tasks → creazione task
PUT /tasks/:id → aggiornamento stato
DELETE /tasks/:id → eliminazione task
La logica di comunicazione HTTP è centralizzata in un API layer dedicato, mantenendo i componenti React focalizzati sulla UI.

🧠 Concetti chiave dimostrati

State management con useState
Side effects con useEffect
Lifting state up
Flusso dei dati unidirezionale
Props e callback
Immutabilità dello stato
Input controllati
Dati derivati (filteredTasks)
Rendering condizionale (loading / error / empty state)
Separazione delle responsabilità
Refactoring progressivo e pulizia del codice