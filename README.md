# Av Andreas Nygård

Detta är en enkel server byggd med Express och MySQL.

## Installation

1. Klona detta repo till din lokala dator.
2. Navigera till mappen där du har klonat repositoriet.
3. Kör "npm install" för att installera alla paket.

## Konfiguration

API'et använder en MySQL-databas. Kör kommandot "npm run start" för att starta servern.

## Användning

Här beskriver jag hur du når API't:

1.  Metod: GET
    Ändpunkt: "/api/workexperience"
    Beskrivning: Hämtar alla tillgängliga arbetslivserfarenheter

2.  Metod: POST
    Ändpunkt: "/api/workexperience
    Beskrivning: Lagrar en ny arbetslivserfarenhet. Kräver att alla fält är ifyllda

3.  Metod: DELETE
    Ändpunkt: "/api/workexperience/:ID
    Beskrivning: Raderar en arbetslivserfarenhet

Ett objekt med följande format kommer returneras:

{
"companyname": "NASA",
"jobtitle": "Astronaut",
"location": "Houston",
"startdate": "2014-12-31",
"enddate": "2018-03-02",
"description": "Walked on moon"
}

Alla objekt kommer även tilldelas ett unikt id.
