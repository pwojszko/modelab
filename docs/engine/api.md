# API Reference - Engine

Detailed API documentation for the Engine library is available in the generated HTML documentation (Doxygen).

## Generating API Documentation

To generate HTML documentation:

```bash
cd engine
mkdir build
cd build
cmake ..
cmake --build . --target docs --config Release
```

Documentation will be generated in the `docs/html/` folder. Open `docs/html/index.html` in your browser.

## Documentation Requirements

- **Doxygen**: Documentation generation tool

### Installing Doxygen

**Windows**:

- Download from [doxygen.nl](https://www.doxygen.nl/download.html)
- Or use: `choco install doxygen`

**Linux**:

```bash
sudo apt-get install doxygen  # Ubuntu/Debian
sudo yum install doxygen      # RHEL/CentOS
```

**Mac**:

```bash
brew install doxygen
```

## Alternative Generation Method

You can also use Doxygen directly:

```bash
cd engine
doxygen Doxyfile
```

## Documentation Contents

The generated documentation contains:

- **Library Overview** - Introduction and architecture
- **Function List** - All available functions
- **Function Details** - Parameters, return values, examples
- **Code Examples** - Usage examples
- **Diagrams** - Structure visualization (if enabled)

## Accessing Documentation

After generation:

1. Open `engine/docs/html/index.html` in your browser
2. Documentation is interactive - you can browse functions, parameters, and examples
3. Interface is similar to Swagger UI - easy to navigate

## Integration with MkDocs

Doxygen documentation can be integrated with this MkDocs documentation through external links or by embedding generated HTML files.

## Next Steps

- [Function List](functions.md) - Overview of available functions
- [Compilation](compilation.md) - How to compile the library
- [Server Documentation](../server/index.md) - How to use the library in Python

