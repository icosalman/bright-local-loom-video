# Loom Video Script Generator & Client Audit Vault (Local SEO)

A complete Local SEO audit intelligence and 2 to 3-minute Loom video script generator with automatic Markdown (.md) parsing, teleprompter studio, and permanent client history vault.

* **Repository:** [https://github.com/icosalman/bright-local-loom-video](https://github.com/icosalman/bright-local-loom-video)
* **Live Web App (via GitHub Pages):** `https://icosalman.github.io/bright-local-loom-video/`

---

## 🗄️ Permanent Client Audit Storage System

To ensure all past and present client audit data stays permanently saved and live:

1. **Master Database (`clients_history.json`):**
   * Stores all audited client profiles, location metrics, geo-grid findings, on-page flaws, and 4-phase growth plans in one standardized master JSON vault.
   * Includes complete production data for **Rhynehart Roofing, Inc.** (Amarillo, TX).
2. **Individual Client Audits (`clients/` folder):**
   * Every client gets a dedicated markdown file inside `clients/` (e.g. `clients/rhynehart_roofing_amarillo.md`) containing their full audit summary, key findings, and spoken script.
3. **Browser Vault & Teleprompter (`index.html`):**
   * Automatically synchronizes with local storage.
   * Offers 1-click **Backup JSON** and **Restore JSON** to migrate client history across devices without data loss.

---

## 🚀 How to Use the Studio

### 1. Interactive Browser App (`index.html`)
Double-click `index.html` to open it in any browser:
* **Drag-and-Drop Any .MD Audit:** Drag any Local SEO audit markdown report into the dropzone to auto-extract business info, scores, 1-mile grid drop-offs, and technical flaws.
* **1-Click Rhynehart Demo:** Click **"⚡ Load Rhynehart Audit"** in the top bar.
* **Teleprompter Studio:** Full-screen high-contrast teleprompter with auto-scroll and font scaling for seamless Loom recording.
* **1-Click Copy & Export:** Copy full script with visual cues, copy spoken-only words, or download as `.md`.

### 2. Node.js Command Line Generator (`cli_generator.js`)
```bash
# Generate script for Rhynehart Roofing
node cli_generator.js "Rhynehart Roofing Local Seo Audit Report.md"

# Generate script for any new client audit report
node cli_generator.js "path/to/audit.md" "output_script.md"
```

---

## ☁️ How to Push & Keep Data Always Live on GitHub

We have configured the Git repository and created a 1-click push script:

### Method A: Double-Click `push_to_github.bat`
1. Double-click **`push_to_github.bat`** in this folder.
2. It automatically stages all new client `.md` files, updates `clients_history.json`, commits, and pushes to `https://github.com/icosalman/bright-local-loom-video`.

### Method B: One-Time GitHub Authentication (10 Seconds)
If you haven't authenticated GitHub CLI on your computer yet:
1. Open PowerShell or Terminal and run:
   ```bash
   gh auth login
   ```
2. Select **GitHub.com** &rarr; **HTTPS** &rarr; **Login with a web browser**.
3. Enter the one-time code shown in terminal and authorize.
4. Run `git push -u origin main` or double-click `push_to_github.bat`. All files will be live on GitHub immediately!

---

## 🌐 Enabling Free 24/7 Live Web Hosting (GitHub Pages)

To make your Loom Script Builder accessible anywhere on the web:
1. Go to your repository: [https://github.com/icosalman/bright-local-loom-video](https://github.com/icosalman/bright-local-loom-video)
2. Click **Settings** &rarr; **Pages** (on the left menu).
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Within 1 minute, your tool is live at:  
   👉 `https://icosalman.github.io/bright-local-loom-video/`
