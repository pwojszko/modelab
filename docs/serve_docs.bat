@echo off
echo Installing MkDocs dependencies...
pip install -r requirements.txt

echo.
echo Starting MkDocs development server...
echo Documentation will be available at http://127.0.0.1:8001
echo Press Ctrl+C to stop the server.
echo.
mkdocs serve --config-file mkdocs.yml --dev-addr 127.0.0.1:8001

