# TaskFlow — Component Documentation

## Shared Components

---

### Button
**Path:** `src/components/shared/Button.jsx`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | node | — | Button label |
| onClick | function | — | Click handler |
| variant | string | 'primary' | 'primary', 'secondary', 'danger' |
| type | string | 'button' | 'button', 'submit' |
| disabled | boolean | false | Disables the button |

**Usage:**
```jsx
<Button variant="primary" onClick={handleSubmit}>Save</Button>
<Button variant="secondary" onClick={handleCancel}>Cancel</Button>
<Button variant="danger" onClick={handleDelete}>Delete</Button>
```

---

### Input
**Path:** `src/components/shared/Input.jsx`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | — | Input label text |
| type | string | 'text' | Input type |
| value | string | — | Controlled value |
| onChange | function | — | Change handler |
| placeholder | string | — | Placeholder text |
| required | boolean | false | Makes field required |

**Usage:**
```jsx
<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="you@example.com"
  required
/>
```

---

### Modal
**Path:** `src/components/shared/Modal.jsx`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | — | Modal heading |
| children | node | — | Modal body content |
| onClose | function | — | Close handler |

**Usage:**
```jsx
<Modal title="New Project" onClose={() => setShowModal(false)}>
  <p>Modal content here</p>
</Modal>
```

---

### Navbar
**Path:** `src/components/shared/Navbar.jsx`

**Props:** None — uses AuthContext internally

**Description:** Top navigation bar. Shows app name, current user name, and logout button.

---

### Sidebar
**Path:** `src/components/shared/Sidebar.jsx`

**Props:** None

**Description:** Left sidebar with navigation links to Dashboard and Projects. Uses NavLink for active state highlighting.

---

### Layout
**Path:** `src/components/shared/Layout.jsx`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | node | — | Page content |

**Description:** Wraps all protected pages with Navbar + Sidebar + main content area.

---

### ProtectedRoute
**Path:** `src/components/shared/ProtectedRoute.jsx`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | node | — | Route content |

**Description:** Checks if user is logged in via AuthContext. Redirects to /login if not authenticated.

---

### Loading
**Path:** `src/components/shared/Loading.jsx`

**Props:** None

**Description:** Displays a centered spinning loader. Use during async operations.

---

### ErrorMessage
**Path:** `src/components/shared/ErrorMessage.jsx`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| message | string | — | Error text to display |

**Usage:**
```jsx
<ErrorMessage message="Invalid email or password" />
```

---

## Context

### AuthContext
**Path:** `src/context/AuthContext.jsx`

| Value | Type | Description |
|-------|------|-------------|
| currentUser | object/null | Logged in user |
| login(email, password) | function | Returns {success, message} |
| register(name, email, password) | function | Returns {success, message} |
| logout() | function | Clears user from localStorage |

---

### ProjectContext
**Path:** `src/context/ProjectContext.jsx`

| Value | Type | Description |
|-------|------|-------------|
| projects | array | All projects |
| tasks | array | All tasks |
| addProject(name, desc) | function | Creates new project |
| deleteProject(id) | function | Deletes project + its tasks |
| editProject(id, name, desc) | function | Updates project |
| addTask(projectId, title, desc, priority, dueDate) | function | Creates new task |
| updateTask(id, updates) | function | Updates task fields |
| deleteTask(id) | function | Deletes task |
| moveTask(id, newStatus) | function | Moves task between columns |
| getProjectTasks(projectId) | function | Returns tasks for a project |