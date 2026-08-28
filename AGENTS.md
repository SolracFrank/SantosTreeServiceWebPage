# AGENTS.md

## Project Overview

This project is an informational website built with Astro, Tailwind CSS, TypeScript, and Supabase.

The public site is primarily content-driven. It may include pages and sections such as:

- Home
- Services
- Gallery
- FAQ
- Contact
- Basic business information
- Simple authenticated admin area

The admin area is intended only for lightweight content management, such as editing gallery images, FAQ entries, business information, hero content, service descriptions, and contact-related content.

The stack must remain lightweight. Do not introduce a custom backend unless there is a clear business requirement that cannot be handled cleanly with Supabase Auth, Supabase Postgres, Supabase Storage, or a small serverless/edge function.

Use PNPM

## Main Technology Stack

Use:

- Astro
- TypeScript
- Tailwind CSS
- Supabase JavaScript client
- Supabase Auth
- Supabase Postgres
- Supabase Storage
- Docker and Docker Compose for local development

Do not add React by default.

Add React only when a component genuinely needs client-side state or complex interactivity, for example:

- Admin CRUD forms
- Image upload previews
- Auth forms with client-side state
- Complex gallery interactions
- Rich editable UI
- Client-side validation that would be awkward in plain Astro

For static or mostly static UI, prefer `.astro` components.

## Core Architectural Principle

Prefer the simplest correct architecture.

The public website should be mostly Astro pages and Astro components. Use server-side data loading where possible. Avoid turning the whole site into a single-page application.

Use Supabase as the backend-as-a-service layer.

Use Supabase Postgres for structured editable content.

Use Supabase Storage for uploaded images and files.

Use Supabase Auth for login.

## Expected Project Structure

Use this structure unless there is a clear reason to deviate:

```txt
src/
  components/
    layout/
      Header.astro
      Footer.astro
    public/
      Hero.astro
      ServicesSection.astro
      GalleryGrid.astro
      FAQList.astro
      ContactSection.astro
    admin/
    ui/
      Container.astro
      SectionHeader.astro
      Button.astro

  layouts/
    BaseLayout.astro

  pages/
    index.astro
    gallery.astro
    faq.astro
    contact.astro
    admin/
      index.astro
      login.astro
      gallery.astro
      faq.astro

  lib/
    supabase/
      client.ts
      types.ts
      gallery.ts
      faq.ts
      auth.ts
      storage.ts
      siteSettings.ts
      contact.ts

  styles/
    global.css
```

Keep Supabase access code inside `src/lib/supabase`.

Do not scatter database calls throughout unrelated components unless the query is trivial and local to a page.

## Environment Variables

Use public environment variables only for values that are safe to expose in the browser:

```env
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
```

Do not expose Supabase service-role keys in frontend code.

Never place Supabase service-role keys in variables prefixed with `PUBLIC_`.

If a privileged operation is needed, use a server-side route, serverless function, Supabase Edge Function, or another secure backend mechanism.

## Supabase Rules

The Supabase anon key is not a secret. Security must come from Row Level Security policies, Storage policies, and correct authorization rules.

When creating tables that are writable from the app, also create or document the expected RLS policies.

Recommended initial tables:

```txt
site_settings
gallery_images
faqs
contact_messages
profiles
```

Recommended responsibilities:

```txt
site_settings:
  Stores editable global content such as business name, hero text, contact details, social links, and SEO metadata.

gallery_images:
  Stores metadata for images. Raw files must live in Supabase Storage.

faqs:
  Stores FAQ question, answer, active status, and sort order.

contact_messages:
  Stores messages submitted from the public contact form.

profiles:
  Stores app-level user metadata and roles such as admin/user.
```

Do not assume hiding buttons in the UI is enough security.

Authorization must be enforced in Supabase RLS and Storage policies.

## Astro Rules

Prefer Astro components for static or server-rendered sections.

Use framework components only when needed.

If React is added later, hydrate components deliberately using Astro directives such as:

```astro
<Component client:load />
<Component client:visible />
<Component client:idle />
```

Do not hydrate components unnecessarily.

Use semantic HTML.

Keep pages accessible.

Images must have useful `alt` text unless they are decorative.

Avoid client-side JavaScript where plain Astro and HTML are enough.

## Styling Rules

Use Tailwind CSS.

Prefer simple, readable utility classes.

Avoid premature abstraction of every small style into custom components.

Create reusable UI components only when there is repeated structure, for example:

- Button
- Card
- SectionHeader
- Container
- Input
- Textarea
- AdminTable

Do not add component libraries unless explicitly requested.

Do not add animation libraries unless explicitly requested.

## Docker Rules

The project must be prepared for Docker-based development.

When asked to prepare or initialize the project, create or update:

- `Dockerfile`
- `Dockerfile.dev`
- `docker-compose.yml`
- `.dockerignore`

The development container must run Astro on host `0.0.0.0` and expose port `4321`.

The production Dockerfile may build static assets and serve them through nginx.

Do not add a local Postgres container unless the project is explicitly changed to use local Supabase or self-hosted services.

The default assumption is managed Supabase, not local Postgres.

Do not explain basic Docker usage to the user unless asked. The user already knows how to run Docker Compose.

## Code Quality Rules

Use TypeScript.

Prefer explicit types for domain data returned from Supabase.

Avoid `any` unless there is a strong reason. If `any` is used, explain the reason in a short comment.

Use small functions with clear names.

Separate data access from rendering when it improves clarity.

Do not over-engineer.

This is an informational website with a simple admin, not an enterprise application.

## UI and UX requirements

For every UI implementation or refactor:

1. Use the `ui-ux-pro-max` skill before making layout, interaction,
   responsive, accessibility, iconography, or visual hierarchy decisions.

2. After implementation, run the `web-design-guidelines` skill as a
   mandatory audit and fix all critical and high-severity findings.

3. Never use an icon as the only visible representation of information
   unless its meaning is universally recognizable in that exact context.

4. Icons that represent categories, services, payment methods, actions,
   statuses, or navigation destinations must have a visible text label.

5. Do not rely on tooltips, title attributes, placeholders, hover states,
   or aria-labels as substitutes for visible information.

6. Before implementing a component, identify:
   - its purpose;
   - the information hierarchy;
   - what each visual element means;
   - what happens on mobile;
   - what a user could misunderstand.

7. Do not invent icons or infer ambiguous meanings from screenshots.
   When the source content is ambiguous, stop and report the ambiguity.

8. Prefer recognizable official payment logos for card networks.
   Use text plus an icon for generic payment methods such as cash,
   checks, debit cards, financing, or electronic payments.

9. A component is not complete merely because it matches the screenshot.
   It must also be understandable, responsive, accessible, and semantically
   correct.

## View implementation workflow

This project uses markdown view specifications as the source of truth for pages/routes.

View specifications live in:

- `docs/ui/views/<view-name>/view.md`
- `docs/ui/components/<component-name>/component.md`
- `docs/ui/wireframes/*`
- `docs/ui/README.md`

When asked to implement, update, review, or refactor a specific component, follow this workflow:

1. Read `docs/ui/README.md`.
2. Read the target view specification in `docs/ui/views/<view-name>/view.md`.
3. Read the target component specification in `docs/ui/components/<component-name>/component.md`.
4. If the component specification references parent views or consuming components, read only those referenced specs.
5. Implement only the requested component unless the prompt explicitly asks for related files.
6. Do not invent props, variants, slots, styles, behavior, routes, copy, or data fields.
7. If the component spec is missing, incomplete, or contradicts another spec, stop and report the issue before coding.
8. Keep reusable components in `src/components`.
9. Keep layouts in `src/layouts`.
10. Keep data utilities in `src/lib`.
11. Respect the import alias `@/* -> ./src/*`.

Component output requirements:

- Define a typed `Props` interface when the component accepts props.
- Use semantic HTML.
- Preserve accessibility requirements from the spec.
- Avoid unnecessary JavaScript.
- Avoid global styles unless the spec explicitly requires them.
- Do not use `set:html` unless the spec explicitly allows it and the content source is trusted or sanitized.
- Keep the implementation scoped to the requested component.

After implementation, run validation when available:

```bash
pnpm astro check
pnpm build
```

If the project is running through Docker, use:

```bash
docker compose exec web pnpm astro check
docker compose exec web pnpm build
```

At the end of the task, report:

- Component spec read.
- Related specs read.
- Files created.
- Files modified.
- Props implemented.
- Hydration decision, if any.
- Commands executed.
- Any deviation from the spec.
- Any missing or ambiguous requirement.

## Supabase Client Rules

Create the Supabase client in:

```txt
src/lib/supabase/client.ts
```

Expected behavior:

- Read `PUBLIC_SUPABASE_URL`.
- Read `PUBLIC_SUPABASE_ANON_KEY`.
- Do not crash the public site if the variables are missing during initial scaffolding.
- Prefer fallback placeholder data during early development if Supabase is not configured.
- Log clear warnings in development when Supabase variables are missing.
- Never use a service-role key in this client.

## Data Access Rules

Create data access files such as:

```txt
src/lib/supabase/gallery.ts
src/lib/supabase/faq.ts
src/lib/supabase/siteSettings.ts
src/lib/supabase/contact.ts
src/lib/supabase/auth.ts
src/lib/supabase/storage.ts
```

Expected first read functions:

```ts
getActiveGalleryImages();
getActiveFaqs();
getSiteSettings();
```

Expected first write function:

```ts
createContactMessage();
```

Admin mutations should be added later, after auth and authorization are correctly designed.

## Public Pages

Create or maintain these public routes:

```txt
/
  Home page with hero, services summary, gallery preview, FAQ preview, and contact CTA.

/gallery
  Public gallery page.

/faq
  Public FAQ page.

/contact
  Contact page with form markup and later Supabase persistence.
```

The public pages should work with placeholder content even before Supabase credentials are configured.

## Admin Pages

Create admin pages only after the public structure and Supabase read layer are stable.

Expected future routes:

```txt
/admin
/admin/login
/admin/gallery
/admin/faq
```

The admin area must require authentication.

Do not rely only on client-side route hiding.

Admin writes must be protected by Supabase RLS policies and/or server-side authorization.

## Dependency Rules

Do not add dependencies casually.

Allowed initial dependencies:

```txt
@supabase/supabase-js
@astrojs/tailwind
tailwindcss
```

Add React only when there is a concrete component that requires it.

Do not add UI libraries, animation libraries, state management libraries, form libraries, or schema validation libraries unless the current implementation genuinely benefits from them.

If adding a dependency, state why it is necessary.

## Testing and Validation

If Docker files were changed, also verify that the Docker development setup builds successfully.

Do not leave TypeScript errors.

Do not leave broken routes.

Do not leave unused imports.

Do not leave placeholder TODO comments unless they are useful and specific.

## Definition of Done

A task is considered complete when:

- The app builds without TypeScript errors.
- The public page involved renders correctly.
- Docker development files exist when project scaffolding is requested.
- No secret keys are exposed.
- Supabase calls are centralized or clearly justified.
- UI remains responsive on mobile and desktop.
- The change does not introduce unnecessary dependencies.
- Any new database table or storage bucket includes notes for required RLS or Storage policies.
- Any assumption made by the agent is written clearly in the final response.

## Agent Behavior

Before making broad changes, inspect the existing file structure.

Prefer small, incremental patches.

Do not rewrite the entire project unless explicitly instructed.

When making assumptions, write them down briefly in the final response.

When adding dependencies, explain why they are necessary.

If a requirement can be solved with Astro and Supabase alone, do not introduce a custom backend.

When asked to prepare the project, create the actual project files instead of giving the user manual setup instructions.

When asked about Docker, do not explain basic Docker Compose usage unless explicitly requested.

## Codebase Memory

Before broad repository searches, use `codebase-memory-mcp`.

For non-trivial tasks:

- Use `list_projects` to identify the current project.
- Use `get_architecture` or `get_graph_schema` for structure.
- Use `search_graph` to locate symbols.
- Use `trace_call_path` for dependencies and call chains.
- Use `detect_changes` for Git change impact.

Verify critical findings directly in source files before editing.

## Resource usage marker

When a user message contains the exact text `PROJECT-JIME-USER` anywhere,
the first line of the final response MUST report the resources actually used
during the current turn.

Build the first line using these tokens, in this exact order:

1. Always include `PROJECT-JIME-AGENT`.
2. Append `PROJECT-JIME-SKILL` only if a skill was actually loaded or applied.
3. Append `PROJECT-JIME-MCP` only if at least one MCP tool call completed
   successfully.

Separate tokens with a comma and one space.

After the token line, continue with the normal response and complete the user's
task.

Do not report a skill or MCP merely because it is installed, configured, or
available. Built-in tools such as Read, Edit, Write, Glob, Grep, Bash, and LSP
do not count as skills or MCP usage.
