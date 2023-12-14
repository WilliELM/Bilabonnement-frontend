# Bilabonnement-frontend

Official frontend for 3. Semester Project ( Bilabonnement ) 

# Indhold

- Introduktion
- Rapport
- Installation
- Contribute
- Contributors

👇 Nedenfor kan du se vores løsning på en applikation til bilabonnement 👇

For at dataen bliver loaded på siden, skal du dog access vores backend først  <BR>

[API/Backend](https://bilabonnementapi.azurewebsites.net/)

Du kan derefter klikke ind på vores frontend<BR>

[Frontend](https://bilabonnement-jcu7.onrender.com/)

Vores rapport kan downloades her [Bilabonnement PDF](https://github.com/WilliELM/Bilabonnement-frontend/files/13677360/Samlet-Rapport-Bilabonnement-m.-rettelser.docx-4.pdf)

I rapporten kan du også finde forklaringer på vores kodeafsnit.


## ⬇️ Vi har brugt de følgende dependencies i projektet⬇️
```
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@mui/material": "^5.14.20",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.6.2",
    "chart.js": "^4.4.1",
    "react": "^18.2.0",
    "react-chartjs-2": "^5.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.12.0",
    "react-router-dom": "^6.20.1",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"

```
## ⬇️ Folder struktur ⬇️
```
Bilabonnement-frontend/ 
  frontend-bilabonnement/ 
    |-- public/ 
    |-- src/ 
    |   |-- components/ 
    |   |  |-- datalists/
    |   |  |  |--Customers/
    |   |  |  |--cars/ 
    |   |  |  |--damagereportsList/ 
    |   |  |  |--dataPage/
    |   |  |  |--subscriptionList/
    |   |  |-- websiteComponents/
    |   |  |  |--landingPage/
    |   |  |  |  |--alarms/ 
    |   |  |  |--management/ 
    |   |  |  |--navBar/
    |-- App.js 
    |-- .gitignore 
    |-- package.json 
    |-- README.md 
    |-- ... 
```
## Installation
Først skal du sørge for, at du har Node.js og npm installeret på din computer. Hvis ikke, kan du downloade dem fra [Node.js officielle hjemmeside](https://nodejs.org/).


Når Node.js og npm er installeret, skal du udføre følgende kommandoer i terminalen for at installere dependencies:

```bash
npm install
```
Når installationen er færdig, kan du starte app'en ved at køre følgende kommando:

```bash
npm run start
```
Dette starter udviklingsserveren, og du kan åbne app'en i din browser ved at gå til http://localhost:3000/.

## Contribute

For at "contribute" til projektet, skal du lave et nyt issue, tilknytte en branch og herefter checkout til branchen i dit IDE-miljø. Løs herefter dit issue og push det til issue-branchen.
CI-flowet vil herefter merge din løsning ind på master branchen og slette din issue-branch. 

🎉 Happy coding! 🎉

# Contributors
by `@Fredvigsoe`, `@Jeppneu123` and `@WilliELM`
