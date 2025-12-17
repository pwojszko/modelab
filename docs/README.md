# ModelSLab Documentation

This documentation was created using [MkDocs](https://www.mkdocs.org/) with the [Material](https://squidfunk.github.io/mkdocs-material/) theme.

## Local Documentation Server

### Quick Start (Using Scripts)

**Windows**:

```bash
.\serve_docs.bat
```

**Linux/Mac**:

```bash
chmod +x serve_docs.sh
./serve_docs.sh
```

### Manual Setup

#### Install Dependencies

```bash
pip install -r requirements.txt
```

#### Run Development Server

```bash
cd ..
mkdocs serve --dev-addr 127.0.0.1:8001
```

Documentation will be available at: http://127.0.0.1:8001

### Generate Static Documentation

```bash
mkdocs build --config-file mkdocs.yml
```

Generated documentation will be in the `site/` folder.

## Publishing Documentation

### GitHub Pages (Automatic Deployment)

The project includes a GitHub Actions workflow that automatically builds and deploys the documentation to GitHub Pages whenever you push changes to the `main` branch.

#### Initial Setup

1. **Enable GitHub Pages in your repository**:

   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
   - Save the settings

2. **Update configuration** (if needed):

   - Edit `mkdocs.yml` and update the following with your actual GitHub information:
     - `site_url`: Your GitHub Pages URL (e.g., `https://your-username.github.io/modelslab`)
     - `repo_url`: Your GitHub repository URL (e.g., `https://github.com/your-username/modelslab`)
     - `repo_name`: Your repository name

3. **Push to GitHub**:

   ```bash
   git add .github/workflows/docs.yml docs/
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

4. **Monitor deployment**:
   - Go to the **Actions** tab in your GitHub repository
   - You should see the "Deploy Documentation to GitHub Pages" workflow running
   - Once complete, your documentation will be available at your GitHub Pages URL

#### Automatic Updates

After the initial setup, documentation will automatically update whenever you:

- Push changes to files in the `docs/` folder
- Push changes to the workflow file (`.github/workflows/docs.yml`)
- Manually trigger the workflow from the Actions tab

#### Manual Deployment (Alternative)

If you prefer to deploy manually instead of using GitHub Actions:

1. Install `mkdocs-material` plugin with GitHub Pages support:

```bash
pip install mkdocs-material[git]
```

2. Deploy to GitHub Pages:

```bash
mkdocs gh-deploy --config-file mkdocs.yml
```

### Other Platforms

Documentation can be hosted on any platform that supports static HTML files (Netlify, Vercel, etc.).

## Documentation Structure

- `index.md` - Home page
- `introduction/` - Project introduction
- `engine/` - C++ library documentation
- `server/` - FastAPI server documentation
- `examples.md` - Usage examples
- `development/` - Developer documentation

## Updating Documentation

1. Edit Markdown files in the `docs/` folder
2. Run `serve_docs.bat` / `serve_docs.sh` or `mkdocs serve --config-file mkdocs.yml --dev-addr 127.0.0.1:8001` (from docs folder) to see changes live
3. After completion, generate documentation: `mkdocs build --config-file mkdocs.yml` (from docs folder)
