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

### GitHub Pages

1. Install `mkdocs-material` plugin with GitHub Pages support:

```bash
pip install mkdocs-material[git]
```

2. Configure GitHub Actions (optional) or use:

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

