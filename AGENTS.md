# AGENTS.md

## Project Overview

This project is a simple, lightweight Todo List web application called **Aurora Todo**.

The goal is to provide users with an attractive and easy-to-use Todo app where they can create, manage, complete, edit, and delete tasks.

The application is intentionally simple. It is a frontend-only project and does not require a backend, authentication system, database, API, or complex framework.

---

## Core Technology

Use only the following technologies unless explicitly instructed otherwise:

* HTML5
* CSS3
* Vanilla JavaScript (ES6+)
* Browser LocalStorage

Do **not** introduce React, Vue, Angular, Next.js, TypeScript, Node.js backend services, databases, authentication providers, or APIs unless the project requirements are explicitly changed.

---

## Project Structure

Keep the project structure simple:

```text
to-do/
│
├── index.html
├── style.css
├── script.js
├── AGENTS.md
└── README.md
```

Additional asset folders may be added only when genuinely necessary.

Avoid creating unnecessary folders, abstractions, modules, services, or configuration files.

---

## Application Features

The application should support:

1. Add a task
2. Display tasks
3. Mark a task as completed
4. Mark a completed task as active again
5. Edit a task
6. Delete a task
7. Filter tasks:

   * All
   * Active
   * Completed
8. Display the number of remaining tasks
9. Clear completed tasks
10. Persist tasks using browser LocalStorage
11. Responsive layout for desktop, tablet, and mobile
12. Smooth, subtle UI animations

---

## Data Storage

All task data must be stored in the user's browser using LocalStorage.

Use a single clear LocalStorage key:

```javascript
const STORAGE_KEY = "aurora-todo-tasks";
```

A task should follow a simple structure similar to:

```javascript
{
  id: "unique-id",
  text: "Complete my assignment",
  completed: false,
  createdAt: "2026-09-29T20:00:00.000Z"
}
```

Do not introduce a database or server-side storage.

Users should not need an account to use the application.

---

## Design Direction

The visual identity of the application is called **Aurora Glass**.

The design should be:

* Simple
* Modern
* Clean
* Minimal
* Attractive
* Calm
* Slightly futuristic
* Easy to understand

The application should feel polished without becoming complicated.

---

## Animated Background

The background is an important part of the application's visual identity.

Use a continuously animated Aurora-style background consisting of soft, blurred gradient orbs.

The background should use slow movement rather than fast or distracting animation.

Preferred visual direction:

* Deep navy/dark background
* Blue gradients
* Purple gradients
* Subtle cyan accents
* Large blurred gradient orbs
* Slow movement
* Soft glow

The animation should run continuously.

Do not use:

* Flashing effects
* Rapid movement
* Excessive particles
* Distracting animations
* Large animated elements covering the Todo interface

The Todo interface must remain the visual focus.

---

## Glassmorphism

The main Todo container should use a subtle glass effect.

Preferred characteristics:

* Semi-transparent background
* Backdrop blur
* Soft border
* Rounded corners
* Subtle shadow

Example direction:

```css
background: rgba(...);
backdrop-filter: blur(...);
border: 1px solid rgba(...);
```

Do not overuse glassmorphism on every element.

The main application card should be the primary glass surface.

---

## Color Direction

Use a dark Aurora palette.

Suggested colors:

```css
--bg: #07111f;
--surface: rgba(10, 20, 38, 0.72);
--text: #f7f9ff;
--muted: #94a3b8;
--primary: #7c5cff;
--primary-2: #22d3ee;
--success: #34d399;
--danger: #fb7185;
```

These values may be adjusted when necessary to improve accessibility and visual consistency.

Do not introduce unrelated color palettes without a clear design reason.

---

## Typography

Use a clean modern sans-serif font.

The current preferred font is:

```text
Inter
```

Typography should prioritize:

* Readability
* Clear hierarchy
* Comfortable spacing
* Simple headings
* Minimal decorative text

---

## HTML Guidelines

Use semantic HTML wherever possible.

Prefer elements such as:

```html
<header>
<main>
<section>
<form>
<label>
<button>
<ul>
<li>
<footer>
```

Use accessible labels for form controls.

Interactive elements must use actual `<button>` or form controls instead of clickable `<div>` elements.

Do not add unnecessary HTML wrappers.

---

## CSS Guidelines

Keep CSS organized and readable.

Use CSS custom properties for reusable colors and design values.

Example:

```css
:root {
  --primary: #7c5cff;
  --text: #f7f9ff;
}
```

Prefer:

* Flexbox
* CSS Grid
* CSS transitions
* CSS animations
* Responsive media queries

Avoid unnecessary CSS frameworks.

Do not add Bootstrap, Tailwind, Material UI, or other CSS frameworks unless explicitly requested.

---

## JavaScript Guidelines

Use modern vanilla JavaScript.

Prefer:

```javascript
const
let
```

over `var`.

Use small, focused functions.

Examples:

```javascript
addTask()
deleteTask()
toggleTask()
saveTasks()
loadTasks()
render()
```

Keep DOM manipulation understandable.

Avoid unnecessarily complex state-management patterns.

Do not introduce a framework or library simply to solve a problem that can be solved cleanly with vanilla JavaScript.

---

## Task Behavior

### Adding a task

When a user enters a task:

1. Remove unnecessary whitespace.
2. Validate that the task is not empty.
3. Create a task object.
4. Add it to the task collection.
5. Save it to LocalStorage.
6. Update the UI.
7. Clear the input.

Empty tasks must not be added.

---

### Completing a task

When a task is completed:

* Update its `completed` value.
* Visually show it as completed.
* Apply a strikethrough to the task text.
* Update the remaining task count.
* Save the updated tasks to LocalStorage.

---

### Editing a task

Users should be able to edit an existing task.

Do not allow a task to be saved with an empty title.

---

### Deleting a task

Deleting a task should remove it from the task collection and LocalStorage.

The UI should update immediately.

---

### Filtering

The filters should display:

```text
All
Active
Completed
```

Filtering must not modify or delete the underlying task data.

---

## LocalStorage Rules

Always save changes after modifying tasks.

Examples of operations that require saving:

* Adding
* Editing
* Completing
* Uncompleting
* Deleting
* Clearing completed tasks

When loading data, handle invalid or missing LocalStorage data gracefully.

The application should still work if LocalStorage is empty.

---

## Responsive Design

The application must work well on:

* Desktop
* Laptop
* Tablet
* Mobile

On smaller screens:

* Reduce padding where appropriate.
* Allow the task input and button to stack.
* Keep task actions accessible.
* Prevent horizontal scrolling.
* Maintain readable text sizes.

Do not create a separate mobile application.

---

## Accessibility

Accessibility is part of the implementation.

Use:

* Semantic HTML
* Proper labels
* Descriptive `aria-label` attributes where needed
* Keyboard-accessible buttons
* Visible focus states
* Sufficient color contrast

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Users who prefer reduced motion should not be subjected to unnecessary animations.

---

## Animations

Animations should enhance the experience rather than distract from task management.

Use subtle animations for:

* Aurora background
* Adding tasks
* Hover states
* Completing tasks
* Toast notifications
* Small UI transitions

Avoid:

* Flashing
* Rapid movement
* Excessive bouncing
* Constant movement of task content
* Animating every element simultaneously

The background can remain continuously animated, but it should be slow and subtle.

---

## Error Handling

The application should gracefully handle common problems.

Examples:

* Empty task submission
* Empty edited task
* Invalid LocalStorage data
* Missing LocalStorage data

Show short, understandable messages to the user.

Do not expose technical errors to the user unless necessary.

Use `console.error()` for useful development debugging information.

---

## User Experience

The Todo app should feel immediate.

When a user performs an action:

```text
User action
    ↓
Update application data
    ↓
Save to LocalStorage
    ↓
Update interface
```

Avoid unnecessary loading screens because this is a local frontend application.

---

## Performance

Keep the application lightweight.

Avoid unnecessary:

* Dependencies
* JavaScript libraries
* Network requests
* Large images
* Heavy animations
* External APIs

The app should work without an internet connection after its external font dependency has been cached or removed.

Prefer CSS-generated visual effects instead of large background images.

---

## Security

Do not use `innerHTML` with raw user-provided task text.

Prefer:

```javascript
element.textContent = task.text;
```

User-entered task content should always be treated as untrusted input.

Do not execute user-entered text as JavaScript or HTML.

---

## Dependencies

The project should have no JavaScript dependencies.

Do not add npm packages unless explicitly requested.

The application should be runnable simply by opening:

```text
index.html
```

A development server such as VS Code Live Server may be used, but it should not be required for the application's basic functionality.

---

## Browser Support

Target modern browsers:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari

Use standard web APIs supported by modern browsers.

---

## Development Workflow

Before changing the project:

1. Understand the existing implementation.
2. Preserve working functionality.
3. Make the smallest reasonable change.
4. Test the affected functionality.
5. Check responsive behavior when UI changes are made.
6. Avoid unrelated refactoring.

Do not rewrite the entire project when a small change is sufficient.

---

## Testing Checklist

Before considering a feature complete, verify:

### Tasks

* [ ] Add a task
* [ ] Prevent empty tasks
* [ ] Complete a task
* [ ] Uncomplete a task
* [ ] Edit a task
* [ ] Delete a task
* [ ] Clear completed tasks

### Filters

* [ ] All displays all tasks
* [ ] Active displays incomplete tasks
* [ ] Completed displays completed tasks

### Persistence

* [ ] Tasks remain after page refresh
* [ ] Completed status remains after refresh
* [ ] Edited tasks remain after refresh
* [ ] Deleted tasks remain deleted after refresh

### UI

* [ ] Desktop layout works
* [ ] Mobile layout works
* [ ] Buttons are usable
* [ ] Input is usable
* [ ] Animations are smooth
* [ ] Reduced-motion preference is respected

---

## Scope Control

This is intentionally a **basic Todo application**.

Do not add the following unless explicitly requested:

* Authentication
* User accounts
* Backend
* Database
* REST API
* GraphQL
* Cloud synchronization
* Social login
* Team collaboration
* Real-time updates
* Payments
* Notifications
* AI features
* Complex state management
* React
* Next.js
* TypeScript
* Node.js backend

Future versions may introduce these features, but they are outside the current project scope.

---

## Definition of Done

A feature is complete when:

1. It works correctly.
2. It works after refreshing the browser where persistence applies.
3. It does not break existing Todo functionality.
4. It works on mobile and desktop where applicable.
5. It follows the Aurora Glass design.
6. It uses simple vanilla HTML/CSS/JavaScript.
7. It does not introduce unnecessary dependencies or complexity.

---

## Guiding Principle

**Keep it simple, beautiful, fast, and useful.**

When choosing between a complicated implementation and a simple implementation that satisfies the requirement, choose the simple implementation.

The Todo app should feel like a polished small product—not a complicated software system.
