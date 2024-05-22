# **Instruction**

**Step - 1:** Create a file named `.env` in the root directory and add the following environment variables

```
    NODE_ENV=development
    PORT=5000
    DATABASE_URL=add the database url from mongodb atlas

```

<br>

**Step - 2:** Run `npm i` to install the dependencies

<br>

**Step - 3:** In VS Code, open command palette (Command + Shift + P) and look for Preferences: Open User Settings (JSON). Then change the editor’s default formatter and add an extra config to format code when we save files:

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  ...
}
```

You should also install the eslint and prettier extensions for vs code

<br>

**Step - 4:** Run `npm run start:dev` and we are ready to go!

```
 //Product routes: http://localhost:5000/api/products
 //Order routes: http://localhost:5000/api/orders
```

<br>
**Deployed Link:**

```
 //Live Server: https://assignment-two-backend.vercel.app/
```

<br>
