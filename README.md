## react-multipage

  A react multipage application

## Structure

  ```
  .
  ├── cli                      # Compile, etc. Some scripts
  ├── config                   # Project environment-specific configuration settings
  ├── mock                     # Mock data API
  ├── src                      # Application source code
  │   ├── components           # Generic React Components (generally Dumb components)
  │   ├── modules              # View modules
  │   ├── static               # Static assets (not imported anywhere in source code)
  │   ├── themes               # Application-wide styles (generally settings)
  │   ├── utils                # util tools
  │   └── index.ejs            # HTML template
  └── tests                    # Unit tests(WIP..)
  ```

## Usage

```bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# serve with hot reload at localhost:3000 and api serve at localhost:3001
npm run mock

# compile files for production
npm run compile

# test, clean, and compile
npm run build

```

## License

MIT
