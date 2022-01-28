# city-life
S2I JS Advanced Project

## Screenshot

![Screenshoot](https://github.com/kalaioryo/city-life/blob/main/src/img/ScreenshotApp.png)

## Informazioni sul progetto

L'app consente di ottenere i dati dall'[API gratuita di Teleport](https://developers.teleport.org/api/getting_started/)

Ho configurato Webpack in modo che abbia sia una modalità developer sia una modalita production abbia la propria fonte.

Non è necessario usare il file .env e le variabili d'ambiente dato che l'API non la richiede, ho comunque installato lo stesso `dotenv-webpack` sia a dimostrazione di aver compreso il funzionamento, sia per un possibile arricchimento futuro dell'app con ulteriori API esterne.

Rinominare il file `.env.example` in `.env`, inserire la tua API_KEY in `"Inserire qui la tua API_KEY"`.

Trovi come recuperarlo all'inizio del codice commentato in `index.js` o in `index_dev.js`


## Built With

- Lodash
- Axios

## Iniziare

Per ottenere una copia locale 

### Prerequisiti

  - npm

    ```
    npm i latest-version
    ```

### Installazione

  1. Clona il repository
    
    gh repo clone kalaioryo/city-life
    

  2. installa i pacchetti NPM

    npm install

  3. Build dalla fonte

    
    npm run build
   

## Utilizzo

Inserire nell'input il nome della città interessata in inglese come da esempio

verranno riportati tutti i valori suddivisi in categorie riguardanti la qualità della città scelta, più un piccolo sommario;

è possibile ridurre il numero delle informazioni tramite i relativi button `Less`

## Licenza

Distribuito con licenza MIT

## Contatti

Link progetto: [City Life](https://city-life.netlify.app/)

Portfolio: [antonio-iorio.netlify.app](https://antonio-iorio.netlify.app/
)

  

