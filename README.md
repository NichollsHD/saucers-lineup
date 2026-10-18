# Saucers Lineup

Lineup and defense board for the Sunday Saucers. Runs as an installable web app on Android and iPhone.

## Put it online (GitHub Pages)

1. Create a new **public** repo (for example `saucers-lineup`).
2. Upload everything in this folder: `index.html`, `manifest.webmanifest`, `sw.js`, `README.md` and the `icons` folder.
3. In the repo, go to **Settings > Pages**. Under "Build and deployment", pick **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
4. After a minute or two the page shows your link: `https://YOUR-USERNAME.github.io/saucers-lineup/`

The roster is **not** in this repo. Load it on your phone with **Restore roster** using your `saucers-roster.json` file. Keep that file out of the repo.

## Install on a phone

- **Android (Chrome):** open the link, tap the ⋮ menu, then **Install app**.
- **iPhone (Safari):** open the link, tap Share, then **Add to Home Screen**.

Open it once while you have signal so it saves itself for offline use.

## Publishing a lineup

Set the lineup on the board, tap **Publish lineup**, then Share or WhatsApp. The message includes the batting order plus a **Field view** link. Anyone who taps it sees the lineup read-only, no install needed. The lineup lives inside the link itself, so there is no server.

## Updating the app

Upload the changed files to the repo. Then open `sw.js` and bump `saucers-v1` to `saucers-v2` (and so on) so installed phones pick up the new version.
