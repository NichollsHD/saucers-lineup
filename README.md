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

## Manager key (one-time setup)

Only someone with a manager key can edit and publish. The key is a GitHub fine-grained token that lives only on the manager's devices.

1. GitHub > profile picture > **Settings** > **Developer settings** > **Personal access tokens** > **Fine-grained tokens** > **Generate new token**.
2. Name it `Saucers publish`, pick an expiration (up to a year), and under Repository access choose **Only select repositories** > `saucers-lineup`.
3. Under **Permissions** > Repository permissions, set **Contents** to **Read and write**. Generate it and copy it (it starts with `github_pat_`).
4. In the app, open **Manager sign-in** at the bottom of the lineup page, paste the key, and tap **Unlock the board**. Repeat on each of your devices.

Never paste the key into chats or commit it to this repo.

## Publishing a lineup

Set the lineup on the board, tap **Publish lineup**, then **Publish to team**. The lineup is saved to `lineup.json` in this repo, and the team link (`https://nichollshd.github.io/saucers-lineup/`) shows it within about a minute. Anyone with the page open sees updates automatically. Use the Share or WhatsApp buttons to post the lineup text with the team link.

## Updating the app

Upload the changed files to the repo. Then open `sw.js` and bump `saucers-v1` to `saucers-v2` (and so on) so installed phones pick up the new version.

## Changelog

See [CHANGELOG.txt](CHANGELOG.txt) for every update, addition and fix.
