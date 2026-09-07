# Prenotazioni Mago System → Google Sheets

Salva solo le richieste `booking` nel foglio di destinazione (gid 0). Configurare l'ID del documento direttamente nella copia privata di `Code.gs` su Apps Script.

Campi: ID richiesta, data ricezione (Europe/Rome), nome, email, telefono, settore, giorno preferito, fascia oraria, sito attuale, note, stato `Da confermare`.

## Attivazione

1. Dopo l'approvazione esplicita, inserire `Code.gs` nel progetto Apps Script collegato al foglio.
2. Generare una chiave casuale di almeno 32 caratteri e salvarla nelle proprietà dello script come `BOOKING_SECRET`. Non inserirla nel repository o nel codice del browser.
3. Pubblicare come app web con esecuzione come proprietario e accesso `Chiunque`. L'URL è raggiungibile pubblicamente, ma lo script accetta solo richieste con la chiave corretta e non offre una funzione di lettura dei dati. Il foglio resta privato.
4. Autorizzare Google Apps Script per l'accesso ai fogli: `openById` richiede lo scope Google Sheets, sebbene questo codice operi solo sul documento indicato.
5. In Vercel, progetto `mago-system`, ambiente Production, impostare `BOOKING_SHEETS_URL` sull'URL `/exec` della distribuzione e `BOOKING_SHEETS_SECRET` sulla stessa chiave.
6. Pubblicare la modifica del sito. Confermare il deployment e verificare un inserimento di prova nel foglio. Non considerare il collegamento attivo prima di questa verifica.

Se entrambe le variabili sono assenti, resta attivo il flusso email precedente. Se la configurazione è incompleta o Google Sheets rifiuta il salvataggio, il modulo segnala un errore e mantiene i dati per riprovare.

Le richieste ripetute con lo stesso ID e gli stessi dati non generano nuove righe. Le richieste di preventivo/consulenza continuano a usare solo l'email. La notifica email viene tentata dopo il salvataggio: un errore email viene registrato nei log Vercel, ma la prenotazione salvata resta confermata. Non è prevista una coda di ritentativi email automatica.

## Verifiche

`node --test tests/*.test.js` esegue i controlli con servizi simulati, senza inviare email né contattare il foglio.
`npm run build` compila il sito.

Documentazione: https://developers.google.com/apps-script/guides/web
