# مؤسسة قِمَمُ الأندلس — Jekyll + Decap CMS

A fully editable Arabic (RTL) landing page for Qimaam Al-Andalus, built with **Jekyll** and
**Decap CMS**, designed to be hosted for free on **GitHub Pages**. Every piece of text and
every image on the page — nav links, hero copy, stats, prize details, judges, course cards,
radio schedule, teacher profiles, gallery photos, contact info, footer — is editable from a
visual CMS dashboard at `/admin`, with **no code changes required**.

---

## 1. How the content is organized

| Content type | Where it lives | How it's edited |
|---|---|---|
| One-off sections (hero, nav, stats, prize intro, radio intro, footer, etc.) | `_data/*.yml` | Decap CMS **"أقسام الصفحة الرئيسية"** — one form per section |
| Repeatable items (judges, teachers, courses, gallery photos, testimonials, results rows, radio programs, achieved projects, prize participants) | `_judges/`, `_teachers/`, `_courses/`, `_gallery/`, `_testimonials/`, `_results/`, `_programs/`, `_projects_achieved/`, `_participants/` | Decap CMS collections — add / edit / delete / reorder entries freely |
| Images | uploaded through the CMS media picker | stored in `assets/uploads/` |

The Jekyll templates (`_layouts/`, `_includes/`) only loop over this data — a non-developer
never has to touch an `.html` or `.liquid` file to update copy or photos.

---

## 2. Local preview (optional, requires Ruby)

```bash
bundle install
bundle exec jekyll serve
# open http://localhost:4000
```

To try the CMS locally without GitHub auth, run in a second terminal:

```bash
npx decap-server
```

...and in `admin/config.yml`, uncomment `local_backend: true` (and you can leave the
`backend:` block as-is; it's ignored while `local_backend` is on).

---

## 3. Deploying to GitHub Pages

1. Create a new **public** GitHub repository and push this project to its `main` branch.
2. In the repo, go to **Settings → Pages → Build and deployment** and set **Source** to
   **"GitHub Actions"**. The included workflow at `.github/workflows/deploy.yml` will build
   the Jekyll site and deploy it automatically on every push to `main` — it sets the correct
   `baseurl` for you, so you don't need to edit `_config.yml` for this path.
3. Wait for the "Build and deploy Jekyll site to GitHub Pages" action to finish (Actions tab),
   then open the URL shown in **Settings → Pages**.

> If you instead use the classic **"Deploy from a branch"** Pages source, update
> `_config.yml`:
> - `url:` → `https://<your-username>.github.io`
> - `baseurl:` → `/<your-repo-name>` (or `""` if the repo is named `<your-username>.github.io`,
>   or if you're using a custom domain)

---

## 4. Turning on the CMS (`/admin`) — connecting GitHub auth

Decap CMS needs an OAuth step so editors can log in with their GitHub account and commit
changes straight to your repo. Two ways to set this up:

### Option A — quickest (uses Netlify's free shared OAuth proxy)
This does **not** require hosting your site on Netlify — Netlify's OAuth proxy is a free
public service other static hosts commonly use for exactly this purpose.

1. Go to [app.netlify.com](https://app.netlify.com) → **Sites** → **Add new site** →
   **"Import an existing project"** and link the *same* GitHub repo. (You're only using
   Netlify to generate OAuth credentials — you can ignore/disable its own deploys, since
   GitHub Actions is already deploying the real site.)
2. In that Netlify site: **Site configuration → Identity** isn't needed for this method —
   instead go to **Site configuration → Access & security → OAuth** (or the legacy path
   **User settings → Applications → OAuth Applications**) and follow Netlify's
   ["Authentication for the Git backend"](https://decapcms.org/docs/github-backend/) guide
   to register a GitHub OAuth App pointing back at your Netlify site's auth callback.
3. In `admin/config.yml`, confirm:
   ```yaml
   backend:
     name: github
     repo: your-username/your-repo-name
     branch: main
     base_url: https://api.netlify.com
     auth_endpoint: auth
   ```
4. Update `repo:` to your actual `owner/repo-name` and commit.
5. Visit `https://<your-pages-url>/admin/` and click **Login with GitHub**.

### Option B — self-hosted OAuth provider (no Netlify account)
Deploy a small, free OAuth proxy such as
[`decap-cms-oauth-provider`](https://github.com/decaporg/decap-cms-oauth-provider) to Vercel
or Cloudflare Workers (a few minutes, one GitHub OAuth App to register), then point
`base_url` in `admin/config.yml` at that deployed URL instead of `https://api.netlify.com`.

Full walkthrough: <https://decapcms.org/docs/github-backend/>

**Important:** whichever option you choose, only people you grant **write access to the
GitHub repo** can log in and publish changes — this is what keeps `/admin` safe to leave
public.

---

## 5. Editing content day-to-day

1. Go to `https://<your-site>/admin/`.
2. Log in with GitHub.
3. Pick a section under **"أقسام الصفحة الرئيسية"** to edit fixed sections (hero text,
   nav links, stats numbers, footer, etc.), or pick a collection (**لجنة التحكيم**,
   **المشايخ**, **الدورات المنفذة**, **معرض الصور**, etc.) to add/edit/remove repeatable
   cards.
4. Click an image field to upload/replace a photo or icon straight from your device.
5. Click **Save** (draft) or **Publish** — this commits directly to the GitHub repo, which
   triggers the GitHub Actions workflow and republishes the live site within a minute or two.

No developer involvement, no code edits, no local setup needed for routine content updates.

---

## 6. Replacing the placeholder visuals

Every image referenced in `_data/*.yml` and in the collection entries currently points to a
placeholder generated for this build (flat icon circles, labeled color blocks for photos) so
the site renders correctly out of the box. Replace them section-by-section through the CMS
media picker whenever real photography/logo assets are ready — no path or filename changes
are required elsewhere.

---

## 7. Project structure

```
_config.yml              site settings, collections, defaults
Gemfile                  Ruby gems (github-pages gem = same versions GH Pages uses)
index.html               assembles all sections in order
_data/                   editable singleton sections (hero, nav, stats, footer, ...)
_layouts/default.html    page shell (head, nav, footer, scripts)
_includes/               one template per section, reading from _data / collections
_courses/ _judges/ _gallery/ _testimonials/ _teachers/ _programs/
_results/ _video_gallery/ _participants/ _projects_achieved/
                          repeatable collections (each item = one .md file with front matter)
assets/css/style.css     all styling (RTL, brand colors, responsive)
assets/js/main.js        nav toggle, counters, testimonial slider, player UI
assets/images/           placeholder icons/photos (replace via CMS)
assets/uploads/          CMS media upload destination
admin/index.html         loads the Decap CMS app
admin/config.yml         defines every editable field shown in the CMS
.github/workflows/deploy.yml   builds & deploys to GitHub Pages on every push
```

---

## 8. Brand tokens (already wired into `assets/css/style.css`)

| Token | Value | Usage |
|---|---|---|
| Primary cyan | `#00A4CC` | buttons, icons, section highlights |
| Secondary pink | `#E72483` | Women's Courses section only |
| Accent gold | `#D4AF37` | Prize badges/medals |
| Dark navy | `#1A2732` | body text, footer background |
| Backgrounds | `#ffffff` / `#f9f9f9` | main / alternating sections |
| Fonts | Cairo (display), Tajawal (body) | loaded from Google Fonts |
