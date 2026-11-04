# Loom Video Script Generator (Local SEO Audit Edition)

A high-converting 2 to 3-minute Loom video pitch script generator with automatic Markdown (.md) audit parsing, interactive teleprompter, and client history vault.

---

## 🚀 How to Use the Tool

### Option 1: Interactive Browser Tool (Recommended)
Double-click `index.html` to open it in any modern browser (Chrome, Edge, Brave, etc.):
* **100% Offline & Local:** No servers or installation required.
* **Drag-and-Drop .MD Files:** Drop any Local SEO Audit markdown report (like `Rhynehart Roofing Local Seo Audit Report.md`) directly into the dropzone. The tool will parse the business name, owner names, city, scores, geo-grid radius drop-off, website technical flaws, reviews, and competitors automatically!
* **1-Click Rhynehart Demo:** Click **"⚡ Load Rhynehart Audit"** in the top bar to immediately inspect the live Rhynehart Roofing script.
* **Teleprompter Studio:** Click **"Teleprompter Mode"** for a full-screen, high-contrast teleprompter with auto-scroll and font-size controls for effortless Loom recording.
* **1-Click Copy & Export:**
  - Copy Full Script (with on-screen visual cues and timestamps)
  - Copy Spoken Voiceover Only
  - Download as `.md` file
* **Client History Vault:** Automatically saves past audited clients in browser LocalStorage, with search, restore, and JSON export/backup.

---

### Option 2: Command Line (Node.js CLI)
You can also generate scripts directly from the terminal using Node.js:

```bash
# Generate script for Rhynehart Roofing
node cli_generator.js "Rhynehart Roofing Local Seo Audit Report.md"

# Generate script for any custom audit file
node cli_generator.js "path/to/any_audit_report.md" "output_loom_script.md"
```

---

## 📁 Included Files in this Folder

| File | Purpose |
| :--- | :--- |
| **`index.html`** | The complete interactive single-page Web App & Loom Script Studio. |
| **`cli_generator.js`** | Node.js automation script that parses markdown audits and writes Loom scripts to disk. |
| **`Rhynehart Roofing Local Seo Audit Report.md`** | The comprehensive BrightLocal audit report for Rhynehart Roofing. |
| **`Rhynehart_Roofing_Loom_Script.md`** | Pre-generated 2 to 3-minute production Loom script ready for recording. |
| **`README.md`** | Documentation and usage instructions. |

---

## ⏱️ Script Timing & Psychology Framework

| Timestamp | Section | Visual Cue (What to Show on Screen) | Purpose |
| :--- | :--- | :--- | :--- |
| **0:00 - 0:20** | Personal Hook & Context | Webcam bubble over Google Business Profile 4.9★ rating | Build instant trust & establish local credibility. |
| **0:20 - 0:55** | Rank Map Visibility Snapshot | BrightLocal Local Search Grid map (green shop vs red city) | Highlight lost revenue & competitor dominance. |
| **0:55 - 1:35** | Website & Technical Audit | Chrome DevTools (0 H1s, duplicate page typo, missing address) | Show concrete, undeniable on-page flaws. |
| **1:35 - 2:00** | Two Simple Reasons Rankings Drop | BrightLocal score (45/100) vs competitor content depth | Reframe problem as simple, solvable levers. |
| **2:00 - 2:35** | 4-Phase Growth Roadmap | 4-Phase Roadmap graphic / action plan on screen | Present structured solution & agency expertise. |
| **2:35 - 2:50** | Friendly, Zero-Pressure Close | Webcam + Calendar booking link on screen | Low-friction CTA for a 10-minute screen-share. |

