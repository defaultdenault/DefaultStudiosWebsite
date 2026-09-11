# Default Studios — website

A deliberately early-2000s static website for Default Studios. Plain HTML, one stylesheet,
one script file. No build step, no dependencies, no backend to run.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Homepage — Sweeper's Luck launch news, contact box |
| `about.html` | About the studio |
| `projects.html` | Sweeper's Luck feature page + the redacted second project |
| `guestbook.html` | Guestbook — visitors sign in with GitHub to post |
| `contact.html` | Contact info and FAQ |
| `404.html` | Not-found page (GitHub Pages serves this automatically) |
| `style.css` | All the styling |
| `script.js` | Hit counter, sparkle trail, email assembly, guestbook loader |
| `guestbook-config.js` | **Fill this in** — the four giscus values (see below) |
| `giscus-theme.css` | Makes the guestbook match the rest of the site |
| `logo.svg` | Logo, redrawn as vector so it stays sharp at any size |
| `favicon.svg` | Browser tab icon |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

## Hosting it on GitHub Pages

1. Create a new **public** repository on GitHub. Name it `default-studios` (or anything you
   like). It must be public for the guestbook to work.
2. Upload every file in this folder to the repository root — not inside a subfolder.
   Either drag them into GitHub's web uploader, or from this folder run:

   ```bash
   git init && git add -A && git commit -m "Default Studios website" && git branch -M main && git remote add origin https://github.com/YOUR-USERNAME/default-studios.git && git push -u origin main
   ```

3. In the repository, go to **Settings → Pages**.
4. Under **Source**, pick **Deploy from a branch**. Set branch to `main` and folder to `/ (root)`. Save.
5. Wait about a minute. The site appears at
   `https://YOUR-USERNAME.github.io/default-studios/`

### Want the address to be `YOUR-USERNAME.github.io` instead?

Name the repository exactly `YOUR-USERNAME.github.io` and it will be served from the root
of that address instead of a subfolder.

### Custom domain (e.g. defaultstudios.com)

Buy the domain, then in **Settings → Pages → Custom domain** enter it and save. GitHub will
tell you which DNS records to add at your registrar. Tick **Enforce HTTPS** once available.

> **Note on `404.html`:** it uses root-relative paths (`/style.css`), correct for a
> `YOUR-USERNAME.github.io` site. If you host in a subfolder (`/default-studios/`), change
> those five paths in `404.html` to include the repo name, e.g. `/default-studios/style.css`.

---

## Setting up the guestbook (five minutes, one time)

GitHub Pages only serves static files — it cannot run a server or hold a database. So the
guestbook uses **giscus**, which handles the GitHub sign-in and stores every entry as a real
**GitHub Discussion** in your own repository. You own all the data, there is nothing to host,
and it costs nothing.

1. Push this site to a **public** GitHub repository (above).
2. In that repository: **Settings → General → Features**, tick **Discussions**.
3. Install the giscus app on the repository: <https://github.com/apps/giscus> —
   choose *Only select repositories* and pick this one.
4. Go to <https://giscus.app>, type your repository name into the **Repository** box, and pick
   a discussion category (**Announcements** is a good choice — it stops randoms opening new
   threads). Scroll down to the generated code block and copy these four values:

   | giscus.app shows | put it in `guestbook-config.js` as |
   | --- | --- |
   | `data-repo` | `repo` |
   | `data-repo-id` | `repoId` |
   | `data-category` | `category` |
   | `data-category-id` | `categoryId` |

5. Save `guestbook-config.js` and push. The guestbook is live.

Until those four values are filled in, the guestbook page shows a setup notice instead of a
broken widget. It also shows a short explanatory note when opened from `localhost` or a
`file://` path, because GitHub can only sign people in on the real published site.

**Moderating:** entries are ordinary GitHub Discussion comments. Go to the Discussions tab of
your repo to hide, delete or reply to any of them. Blocking a user on GitHub blocks them here too.

---

## Things you may want to edit

- **`projects.html`** — Sweeper's Luck details are filled in from the Steam page. Add
  screenshots with an `<img>` tag, and reveal Project 2 whenever you are ready.
- **`index.html`** — the three news posts near the top.
- **Tagline** — "We ship it when it is done." appears in the banner of every page.
- **Email** — assembled in `script.js` (`initMail`) and written in plain text as a fallback
  for visitors with JavaScript off. Change it in both places if it ever moves.

## Local preview

Double-click `index.html`, or serve the folder:

```bash
python -m http.server 8777
```

Everything works locally except the guestbook, which needs the published site to sign
visitors in with GitHub.

---

Copyright © Default Studios. Contact: defaultstudiossupport@gmail.com
