# Date Invitation Website

An interactive and playful website to ask someone out on a date. The "No" button runs away when you try to click it, making it impossible to decline!

## Features

- Beautiful gradient backgrounds
- Evasive "No" button that moves when hovered
- "Yes" button grows larger with each "No" attempt
- Confetti celebration animation on acceptance
- Fully responsive design
- Smooth animations and transitions

## Project Structure

```
WillYouGoOutWithMe
├─ .npmrc
├─ .prettierignore
├─ .prettierrc
├─ eslint.config.js
├─ LICENSE
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ app.d.ts
│  ├─ app.html
│  ├─ lib
│  │  ├─ assets
│  │  │  └─ favicon.svg
│  │  ├─ index.ts
│  │  └─ texts.json
│  ├─ routes
│  │  ├─ +server.ts
│  │  └─ [lang]
│  │     ├─ +layout.svelte
│  │     ├─ +layout.ts
│  │     └─ +page.svelte
│  └─ style
│     ├─ styles.css
│     └─ _variables.css
├─ static
│  └─ robots.txt
├─ svelte.config.js
├─ tailwind.config.js
├─ tsconfig.json
└─ vite.config.ts

```

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deploy to Vercel

### Option 1: Using Vercel CLI

1. Install Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Option 2: Using Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will automatically detect the Svelte project and configure it
6. Click "Deploy"

### Option 3: Deploy from Local Directory

1. Go to [vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm install -g vercel`
3. Run `vercel` in the project directory
4. Follow the prompts

## Customization

### Colors and Styles

Edit `src/styles/_variables.css` to customize:

- Colors
- Spacing
- Border radius
- Shadows
- Transitions
- Font sizes

### Content

Edit `src/App.svelte` to customize:

- The main question text
- Button labels
- Success message
- "No" button text variations

## Technologies Used

- **Svelte 5** - Reactive UI framework
- **Vite** - Build tool and dev server
- **CSS Custom Properties** - For theming and variables
- **Vanilla CSS** - No CSS frameworks, pure custom styles

## Browser Support

Works on all modern browsers:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

Feel free to use this project for your own romantic endeavors!
