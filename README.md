# Physics Practice

## Course coins and hint shops

Course pages include a browser-local **digital pet** in the bottom-right corner. Click it to open the pet room with an enlarged animated creature, level, EXP, health, mastered-question count and evolution journey. Each unique completion in the course wallet counts for 10 EXP, including previously recorded completions. The same completion ledger handles practice, challenge and written self-assessment, so replaying questions or spending coins cannot farm or remove EXP. A Level account wallets and the GCSE browser wallet produce separate pets. No additional server or storage is required; clearing the wallet resets its pet.

The pet room lets students save a name (up to 24 characters), select a starter and choose an evolution branch at 150 EXP. Spark has Solar/Storm branches, Ripple has Reef/Abyss branches, and Pebble has Crystal/Grove branches. Each branch has four evolved forms after the two starter forms and distinct artwork. Choices can be changed without resetting EXP. Profiles are saved inside the course/account wallet under its existing transaction lock and sync across tabs. Existing wallets default to Spark; no migration or progress reset is required.

Evolution thresholds are 0, 50, 150, 350, 750 and 1550 EXP for every branch. Thresholds follow `50 × (2^stage − 1)`. Levels continue after the final evolution, with level L starting at `25 × (L − 1)^2` EXP. Health stays at 100 without absence penalties. Artwork uses palette-aware SVG and respects reduced-motion settings. Run `npm run test:pet` for browser coverage of rewards, evolution, naming, all starter/branch choices, persistence, cross-tab/course isolation, shop compatibility and responsive display.

The A Level page awards 5 browser-local coins for each question's first correct completion. Practice and challenge share one reward ledger; written questions count when every self-assessment point is checked. Questions already mastered when the wallet is first created are recorded without a retroactive award. The shop sells one hint credit for 50 coins. Each question's first hint is free; its second and third hints each use one credit. Previously unlocked hints do not require another purchase.

Wallets persist in localStorage, separately for each signed-in A Level account on this browser; guest and static learners share the browser guest wallet. They do not sync across devices, can be edited by the browser owner, and disappear if site data is cleared. Progress and wallets remain separate. Failed hint requests do not spend credits. Supported browsers use Web Locks to serialize wallet changes across tabs.

Both GCSE pages share a separate browser wallet and shop, using `physics-forge-gcse-wallet-v1:browser`. A Level retains its existing `physics-forge-alevel-wallet-v1:` keys. Balances, hint credits, completion records and hint unlocks do not transfer between courses. The GCSE question workspace awards coins and redeems hints through the shared rewards adapter. Switching between separate Physics and Trilogy does not earn another reward for the same question.

## GCSE question workspace

The **Topic notes** tab contains 71 original teaching sections across all eight Physics topics, including equations with units, worked examples and guidance for all ten Physics required practicals (eight shared with Trilogy). Separate Physics-only and HT-only badges apply at section level. Course/tier filters remove inapplicable sections; search updates the matching counts for every topic. Notes filters are independent of practice and challenge settings and persist in bookmark query parameters. Open `gcse.html?course=combined#notes`, or bookmark a section such as `gcse.html#notes/forces/momentum`. The GCSE landing page links directly to notes. All content works on static hosting.

`gcse-notes-data.js` contains the original explanations and scope metadata, checked against AQA on 22 September 2026. Topic source links and Physics specification references appear in the reader. The notes are a revision aid rather than official specification text; broader practical/calculation skills are included below each topic. `gcse-views.js` coordinates Questions, Topic notes and Challenge mode, including browser Back and direct links. Notes browser checks cover every topic, filters, search, bookmarks, navigation, palette highlighting and mobile layout.

The GCSE **Challenge mode** tab follows A Level scoring: correct +5%, incorrect −10% with a zero floor, and Extreme mode resets progress to zero on an incorrect answer. Reach 100% to finish and start another round. Invalid input is not scored; a question can be submitted once before moving on. Only automatically marked numerical questions enter the pool, filtered by the challenge's course and tier. State persists in `physics-forge-gcse-challenge-v1`. First correct completions share the GCSE practice reward ledger and update question mastery. There are no hints or worked solutions in a challenge round. Test with `node tests/gcse-challenge-browser-tests.cjs`.

`gcse.html` provides topic navigation, course/tier/paper filters, search, an unfinished filter, saved drafts, worked answers and three hints per question. Open `gcse.html?course=combined` for Trilogy; separate Physics is the default. Higher includes Foundation content. Progress is stored separately from A Level in `physics-forge-gcse-progress-v1`, and the GCSE wallet is shared across the GCSE pages in the same browser. Numerical answers allow 1.5% rounding tolerance. Written explanations are explicitly self-assessed against individual marking points. All numerical, written and hint content is available on static hosting; accounts are not required.

The bank contains 400 original questions: 215 calculations from 43 families with five deterministic numerical variants each, plus 185 individual written questions. Each of the eight separate Physics topics has 50 questions before filtering. Trilogy excludes Physics-only questions and Space physics, leaving 296 questions. This is a practice bank, not exhaustive specification coverage. Course and Higher-tier labels are independent. See [GCSE specification mapping](gcse-specification.md) for the source links and counts. Biology and chemistry remain future work.

`npm test` includes bank structure, boundary-label and numerical answer spot-checks. `npm run test:gcse` checks the actual GCSE workspace in Edge, including marking, self-assessment, filtering, persistence, coins and hint purchases.

Run `node tests/rewards-browser-tests.cjs` for the reward/shop browser checks (uses the workspace Playwright installation and Microsoft Edge).

AQA A Level Physics practice with student accounts, teacher-only class progress and topic notes. Questions are original practice material, not official or endorsed AQA questions.

## Start locally

Use Node.js 24 or later. Dependencies are installed in this workspace; on a fresh installation run `npm ci`. Run `./start.ps1` in PowerShell or `npm start`. Both load an optional `.env` file. The PowerShell launcher also finds the portable Node runtime in this workspace. No build step is required.

Open the URL printed by the server (normally http://127.0.0.1:3000). Opening index.html directly or using a static-only host will not support accounts.

The local-file preview's **Skip for now** button opens the workspace preview server at `http://127.0.0.1:3001/#guest`. Start that preview with `$env:PORT='3001'; ./start.ps1` in PowerShell. For another port, open the URL printed by your server directly and choose Skip there. If you see a server connection error, make sure you are using the Node app URL, not a file URL or Live Server/static preview.

1. On first start, use the private first-teacher setup link printed in the terminal. It contains the setup key stored in data/setup-key.txt. Keep this link private; it stops working once the first teacher is created.
2. Create your teacher account, then open Gradebook to find your class code.
3. Select **Create account**, then choose **Student** or **Teacher**. Students enter their class code, name, email and password.
4. Teachers enter their name, email, password and a teacher invitation. An existing teacher generates a single-use invitation in **Gradebook > Invite a teacher** and shares it privately. Invitations expire after seven days. The first teacher can instead enter the setup key from `data/setup-key.txt`, or use the setup link above. Each teacher has a separate class code and sees only their own students.

Passwords must contain 12 to 128 characters. Selecting Teacher at login does not grant teacher permissions.

For a temporary preview, choose **Skip for now** at the bottom of the login screen. Guest sessions can practise questions, use hints and read notes without registering or setting up a teacher. They cannot access the gradebook or connect Microsoft. Guest progress survives refreshes in that session but is deleted on leaving guest mode or cleaned up on the next request after its 12-hour expiry. Guests never appear in a teacher's class.

## Microsoft 365 sign-in

Microsoft sign-in is implemented but stays disabled until your school administrator configures a single-tenant Microsoft Entra app. Password sign-in remains available.

1. In the Microsoft Entra admin centre, open App registrations and register Physics Practice for accounts in your school's directory only (single tenant).
2. Add a **Web** redirect URI: `http://localhost:3000/api/microsoft/callback` for local testing, or `https://YOUR-SCHOOL-HOST/api/microsoft/callback` for deployment. The Node server handles authentication, so do not register this as a SPA. Leave implicit grant and public-client flows disabled.
3. Record the Directory (tenant) ID and Application (client) ID. Create a client secret under Certificates & secrets; use its **value**, not its ID. Record its expiry and arrange rotation.
4. Populate a private `.env` in this folder using `.env.example` as the template. Set `MICROSOFT_TENANT_ID`, `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` and `MICROSOFT_REDIRECT_URI`. For HTTPS set `SECURE_COOKIES=1`. Never put the secret in JavaScript, Git, screenshots or chat.
5. Restart with `./start.ps1` or `npm start`. Open the website using the exact hostname and port in the callback URL: `localhost` and `127.0.0.1` are not interchangeable for cookies. Your administrator may need to approve consent or enterprise-app assignments under school policy.

Registration reference: [Microsoft app registration guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app). Callback configuration: [Microsoft redirect URI requirements](https://learn.microsoft.com/en-us/entra/identity-platform/reply-url).

Existing students and teachers first sign in with their site password, then select **Connect Microsoft 365**. This preserves their account, class, progress and personalised questions. Afterwards they can choose **Sign in with Microsoft 365**. Teacher permissions must already have been granted locally; Microsoft email addresses or role claims never grant teacher access automatically.

New students select **Create account**, choose **Student**, enter their class code, then choose **Join with Microsoft 365**. They do not need to fill in the local name, email or password fields. They receive a student account, with their name and email from Microsoft where available. New Microsoft-only accounts have no usable local password. An existing matching email requires explicit connection from the existing account, not automatic merging.

The implementation uses OpenID Connect authorization code flow with PKCE, state, nonce and signature/issuer/audience/expiry checks. Only the configured tenant is accepted; identity links use immutable tenant/object IDs, not email addresses. It requests only `openid profile email`, not mailbox, file or Graph access, and does not retain Microsoft access or refresh tokens. See [Microsoft authorization code flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow) and [identity claims reference](https://learn.microsoft.com/en-us/entra/identity-platform/id-token-claims-reference).

Signing out ends the Physics Practice session, not the user's wider Microsoft session. Account selection is requested on each Microsoft sign-in. Linking expires after ten minutes and fails if the original local session has signed out. Each site account supports one Microsoft identity; reassignment/unlinking is not exposed in the UI. Restrict enterprise-app assignments if tenant guests should not use the site.

Live tenant authentication requires your administrator's configuration and has not been tested against your school's tenant. Automated tests use simulated Microsoft responses and locally signed tokens.

## Included

Signed-in teachers can switch between **Student view** and **Teacher view** above the navigation. Student view hides the gradebook and teacher administration; returning to Teacher view restores access. The preference is saved per teacher in the current browser tab across refreshes. This is a display preview, not impersonation: practice and progress remain on the teacher's own account. Student and guest accounts cannot switch to teacher access; server-side permissions are unchanged.

Challenge questions default to the AS/A2 core topics, including Practical Skills. Select **Include optional modules** in the left-hand topic panel to add Astrophysics, Medical physics, Engineering physics, Turning points and Electronics. The selection is saved for the current challenge; a new challenge defaults to core only. Turning optional modules off replaces an optional question immediately without changing the progress score. On mobile, the topic panel appears above the question.

**Challenge mode** gives one automatically marked calculation or multiple-choice question at a time. A correct answer adds 5 percentage points; an incorrect answer subtracts 10, with a floor of zero. Extreme mode changes the incorrect-answer penalty to a reset to zero. Changing the toggle keeps current progress and changes the penalty for subsequent submissions. Reach 100% to complete a challenge and start a new one. Invalid or empty inputs do not change progress, and each question can be submitted only once before moving on. Challenge state is saved per account; guest state follows the usual temporary-session expiry. Attempts appear in the existing progress records. Written self-assessments are excluded from challenge scoring.

- 1,458 questions across 14 topics: 103 per topic, with 119 in Practical Skills. Calculation families have ten related practice variants; written concepts have short, reasoning and extended versions. This is not 1,458 unrelated scenarios or exhaustive specification coverage.
- All questions displayed initially, with topic, difficulty, search and unfinished filters.
- Personalised calculation values generated from each account's private, persistent seed. Values and answers remain stable across sessions and devices. Physical constants and written-response examples remain fixed. Finite ranges mean some students can still share values; this reduces answer copying, not eliminates it.
- Server-checked numerical answers (1.5% tolerance), multiple choice and worked solutions. Written answers are explicitly self-assessed; mastery is not an exam grade or an award of method marks.
- Up to three cumulative hints per question, persisted across logins. Teachers can see hint counts and solution views.
- Teacher gradebook with class summaries, individual responses, attempts, mastery, last activity and CSV export.
- Automatically saved drafts and progress in a local SQLite database, shared across devices using the same server and account. Earlier anonymous browser-local progress is not automatically imported.
- Topic notes with locally rendered LaTeX, linked from every question. Core notes were guided by the supplied A Level Physics Notes and Practicals PDFs; optional-topic summaries are supplementary. The source PDFs are not published by this server.
- Practical Skills questions on experimental planning, required-practical methods, graphs, uncertainty, analysis and evaluation, including Paper 3A-style tasks.
- Light/dark themes and responsive layouts.

## Hosting for students

The local URL is only accessible on the server computer. Deploy this Node application on a school-approved server with HTTPS and persistent storage to give students a shared URL. Static hosting alone is insufficient.

Set HOST and PORT for the hosting environment (for example HOST=0.0.0.0 behind an approved reverse proxy). Set SECURE_COOKIES=1 when using HTTPS. Do not expose the application over plain HTTP outside local testing. It uses HttpOnly, SameSite session cookies, scrypt password hashes, server-side role checks, CSRF protection and basic authentication rate limits.

Keep the data directory private and backed up. It contains personal information, password hashes, sessions and progress; it is excluded from Git and cannot be downloaded through the application. Stop the server before copying SQLite files for a simple consistent backup, or use SQLite's online backup tools. Do not remove this directory when deploying updates.

Before school-wide use, arrange approved hosting, data retention and account administration. Local email verification, password recovery, class transfers and multi-class membership are not implemented. Each student currently belongs to one teacher. Teacher-created accounts should receive unique initial passwords through an approved private channel.

## GitHub Pages preview

GitHub Pages can host a static, local-browser version of this project. Publish the repository with GitHub Pages and open its `*.github.io` URL. The page automatically enters local browser mode: questions, notes, challenge mode and progress work, but progress is stored only in that browser. There are no accounts, shared classes, teacher gradebook, server-checked answers or Microsoft sign-in in this mode. Do not use it for private student data.

The Enquiries form on the static site opens a pre-addressed email to `enquiry@physicsforge.co.uk`; students need a configured mail app to send it. Direct server-side email requires an approved form provider or SMTP service and must not expose credentials in GitHub Pages files.

The full account-based application still requires the Node server and persistent SQLite storage described above. GitHub Pages does not run `server.cjs`.

## Tests

Run `npm test`. Tests in `tests/` use temporary databases and cover login roles, access restrictions, class isolation, CSRF, answer checking, hint limits, persistence, personalised banks, LaTeX parsing, Microsoft linking and OIDC token validation.

Run `npm run test:browser` for all browser suites, or `node tests/browser-tests.cjs` for the main workflow checks. These developer tests use Playwright installed under ../.runtime/tools and the existing Windows Edge installation. Screenshots are generated in `artifacts/screenshots/`, which is excluded from Git.

Run `node tests/microsoft-browser-tests.cjs` for Microsoft-specific browser workflows using a simulated provider, including account linking and password-free class signup. Challenge checks can be run with `node tests/challenge-browser-tests.cjs`.

The older standalone HTML tests are archived in `tests/legacy/` for reference only; use the active suites above for the account-based application.

## Project structure

- Root: application source, question banks, notes, configuration and server launcher.
- `tests/`: active server and browser tests; `tests/legacy/` contains historical standalone checks.
- `tools/`: development utilities, including `read-pdfs.mjs` for extracting local PDF text.
- `artifacts/`: disposable generated output, excluded from Git. Browser tests recreate the screenshots directory as needed.
- `vendor/`: locally served KaTeX assets and their licence.
- `data/`: private accounts and progress. Never delete this folder during cleanup.
- `node_modules/`: installed server dependencies.

Old screenshots, temporary browser profiles and unused output files have been removed. Existing server log files may remain while a running process holds them open; new manually redirected logs should be placed in `artifacts/logs/`.

## Content maintenance

The supplied `AQA-7407-7408-PH.pdf` (cover version 2.1, July 2022) further supplements all twelve guides with page-referenced apparatus advice and alternative analyses. Additions include two-light-gate free fall, reciprocal-frequency string graphs, comparison-wire measurements, loaded-syringe gas analysis, balance-gradient unit conversion and gamma distance-offset fitting. Data recording and uncertainty guidance also draws on handbook pages 37-47. Existing safety restrictions remain; apparatus-specific sample settings are not universal instructions. The handbook PDF itself is not served.

Practical Skills includes detailed guides for all twelve required practicals, with apparatus, variables, numbered methods, analysis, uncertainty and safety sections. These are original summaries guided by the supplied N. Dwyer `A Level Physics Practicals.pdf`, with page references on each guide. Supplementary methods are explicitly labelled where the older worksheet collection lacks a current required activity; scope was checked against [AQA practical assessment](https://www.aqa.org.uk/subjects/physics/a-level/physics-7408/specification/practical-assessment) and [apparatus set-up guides](https://www.aqa.org.uk/resources/science/as-and-a-level/physics-7407-7408/teach/practicals-apparatus-set-up-guides). Worksheet errors are not reproduced: examples include the exact diffraction-angle geometry and the Celsius value of absolute zero. These notes do not replace supervised practical work or school risk assessments.

The notes also incorporate the uploaded `A Level Textbook.pdf`. Despite its filename, this is the AQA AS/A-level Physics specification, version 1.2, not a textbook. Original summaries expand all 14 topic pages with 29 additional teaching sections and a revision-checkpoint section per topic. New sections cite specification sections and PDF page numbers; Practical Skills covers all twelve required-practical contexts. The uploaded PDF is not served or copied into the site, and these revision summaries do not claim exhaustive or independently verified current specification coverage.

Question IDs are persistent progress keys. Preserve them when updating wording, and use new IDs when changing the assessed task. The server loads questions.js, extra-calculations.js, extra-explanations.js and practical-questions.js through bank.cjs; it never serves the answer bank directly. Calculation parameters must keep displayed values, units, methods and expected answers consistent. Topic notes live in notes.js; authored equations use LaTeX delimiters.

Review new material against the current AQA specification and teacher judgement before classroom assessment.
