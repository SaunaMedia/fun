# Erik Boyfriend Simulator

Statisches Browsergame (ohne Datenbank), direkt auf GitHub + Vercel hostbar.

## Spielidee
- Du spielst aus **Amis Perspektive**.
- In der Mitte steht **Erik** als 3D-Avatar und startet traurig.
- Ziel: Erik glücklich machen und **Bretzeln sammeln**.

## Kernregeln
- Zuerst wählst du **Glücklich machen** oder **Ärgern**.
- Danach wird ein Action-Item ausgewählt und per **Tap auf Erik** ausgeführt.
- Oben werden nur **Erik-Glück (%)** und **Bretzeln** angezeigt.
- Positive Aktionen (z. B. Knuddeln, Kuss, Bier, Pizza, Aquarium) erhöhen Glück; einige geben Bretzeln.
- Ärger-Aktionen kosten immer **1 Bretzel** und machen Erik unglücklicher.
- Bei **Falsches Essen** und **Beleidigung** wird die Variante über ein Dropdown gewählt.
- Nasses Taschentuch hat eine **50% Ausweichchance**.

## UI
- Vollbild-optimiert für Handy (`100dvh`), ohne Scrolling.
- Einfache iOS/Apple-inspirierte Oberfläche.
- Titel oben: **Erik Boyfriend Simulator**.
- Erik-Avatar mit drei States: **traurig**, **glücklich**, **ärgernd** (mit Arm-Winken).
- Outfit: weißes T‑Shirt, schwarze Jeans, weiße Schuhe.
- Jede Aktion zeigt eine kurze visuelle Animation in der Szene.

## Lokal starten
```bash
python3 -m http.server 3000
```
Dann öffnen: `http://127.0.0.1:3000`

## Deploy auf Vercel
1. Dieses Verzeichnis nach GitHub pushen.
2. Repository in Vercel importieren.
3. Framework Preset: **Other** / Static.
4. Deploy starten.

Keine Server- oder Datenbank-Konfiguration nötig.
