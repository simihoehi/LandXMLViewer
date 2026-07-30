# LandXML Geländeviewer

Eine einzelne Web-App (kein Server, kein Backend nötig), die eine LandXML-Datei
mit einer Surface (TIN, dreiecksvermaschtes Geländemodell) direkt im Browser
lädt und in 3D darstellt – auch am Handy, per Touch drehbar/zoombar.

## Enthaltene Dateien
- `index.html` – die eigentliche App (HTML + JavaScript, lädt Three.js über ein CDN)
- `manifest.json` – macht die Seite auf dem Handy "installierbar" (Symbol am Homescreen)
- `sw.js` – Service Worker, cached die App-Hülle fürs Offline-Öffnen
- `icon.svg` – App-Icon

## 1. Auf GitHub veröffentlichen (GitHub Pages)
1. Neues Repository auf github.com anlegen (z. B. `landxml-viewer`), öffentlich (public).
2. Diese vier Dateien (`index.html`, `manifest.json`, `sw.js`, `icon.svg`) in das Repo hochladen
   (im Browser: "Add file" → "Upload files", oder per `git push`).
3. Im Repo: Settings → Pages → unter "Build and deployment" als Source "Deploy from a branch"
   wählen, Branch `main`, Ordner `/ (root)`, speichern.
4. Nach ca. 1–2 Minuten ist die Seite erreichbar unter:
   `https://<dein-github-benutzername>.github.io/landxml-viewer/`

## 2. Als App aufs Handy holen
- iPhone (Safari): Seite öffnen → Teilen-Symbol → "Zum Home-Bildschirm"
- Android (Chrome): Seite öffnen → Menü (⋮) → "App installieren" bzw. "Zum Startbildschirm hinzufügen"

Danach startet die Seite wie eine eigene App, ohne Adressleiste.

## 3. Benutzung
- "Datei öffnen" tippen und die LandXML-Datei (.xml) vom Handy auswählen.
- Die Datei wird komplett lokal im Browser verarbeitet – es wird nichts hochgeladen.
- Unten am Bildschirmrand lässt sich das Sheet nach oben ziehen: dort stehen
  Kennzahlen (Punkte, Dreiecke, Höhen min/max, Grundfläche) sowie Einstellungen.

## Wichtiger Hinweis zur Koordinatenreihenfolge
Die LandXML-Spezifikation sieht als Standard für `<P>`-Punkte die Reihenfolge
**Hochwert, Rechtswert, Höhe** (Northing, Easting, Elevation) vor. Manche
Export-Programme (abhängig von Land/Einstellung) schreiben stattdessen
**Rechtswert, Hochwert, Höhe**. Wirkt das geladene Gelände seitenverkehrt oder
verzerrt, in den Einstellungen auf "Hochwert/Rechtswert (E,N,Z)" umschalten.

## Grenzen dieser Version
- Es wird nur die TIN-Oberfläche (`<Surfaces><Surface><Definition><Pnts>/<Faces>`)
  gelesen – keine Bruchkanten (Breaklines), Böschungen, Alignments oder Punktcodes.
- Die Flächenberechnung ist eine reine 2D-Grundflächen-Näherung über die Dreiecke
  und setzt voraus, dass die Datei-Einheit Meter ist (bei Fuß-Einheiten entsprechend
  umrechnen).
- Getestet mit Three.js r160 über das jsdelivr-CDN; ohne Internetverbindung beim
  ersten Aufruf funktioniert die App nicht (danach, dank Service Worker, auch offline,
  solange derselbe Browser/dasselbe Gerät verwendet wird).
