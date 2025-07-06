# AMA Pet Helper Chrome Extension

A Chrome extension designed to streamline the process of adding new pets to the AMA Animal Rescue website by automatically collecting pet data from Sparkie.io and autofilling WordPress forms.

## Overview

This extension helps AMA Animal Rescue staff efficiently transfer pet information from their animal management system (Sparkie.io) to their public website. It eliminates manual data entry by intercepting pet data from Sparkie and providing one-click autofill functionality for WordPress post creation.

## Features

### 🐾 **Pet Data Collection**
- Automatically intercepts pet data from Sparkie.io GraphQL API calls
- Stores pet information locally in Chrome storage
- Supports both single pet and multiple pet data collection
- Captures comprehensive pet details including photos, breed, characteristics, and intake information

### 🖥️ **User Interface**
- Clean, responsive UI built with React and Bootstrap
- Pet selection dropdown with search functionality
- Detailed pet information display with photos
- Direct links to view pets in Sparkie or on the AMA website

### 📝 **WordPress Autofill**
- One-click autofill for WordPress pet posting forms
- Automatically opens new pet post pages with pre-filled data
- Maps pet data to appropriate WordPress custom fields
- Handles date formatting and data transformation

### 🔗 **Link Management**
- Checks if pets already have pages on the AMA website
- Validates rescue links and tracks expiration dates
- Provides quick access to existing pet pages or new post creation

## Installation

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ama-pet-tool
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the extension**
   ```bash
   npm run dev
   ```

4. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder

### Environment Variables

Create a `.env` file in the root directory with the following variables:
```env
SPARKIE_IMG_PREFIX=https://your-sparkie-instance.com/images/
SPARKIE_LINK_PREFIX=https://app.sparkie.io/app/animals/
RESCUE_POST_URL_PREFIX=https://amaanimalrescue.org/pets/
RESCUE_NEW_POST_LINK=https://amaanimalrescue.org/wp-admin/post-new.php?post_type=pets
```

## Usage

### Collecting Pet Data

1. **Navigate to Sparkie.io**
   - Open the animals page in Sparkie (`https://app.sparkie.io/app/animals`)
   - The extension will automatically intercept and store pet data as you browse
   - Individual pet pages and list views are both supported

2. **Access the Extension**
   - Click the extension icon in the Chrome toolbar
   - Or use the side panel if enabled in Chrome settings
   - You'll see a list of collected pets

### Adding Pets to Website

1. **Select a Pet**
   - Choose a pet from the dropdown in the extension popup
   - Review the pet's information and photo

2. **Add to Website**
   - Click "Add to Website" if the pet doesn't have an existing page
   - The extension will open a new WordPress post page
   - Pet data will be automatically filled in the form fields

3. **Existing Pets**
   - If a pet already has a page, click "AMA Page" to view it
   - The extension automatically checks for existing pages

## Technical Details

### Architecture

- **Frontend**: React 19 with TypeScript and Bootstrap 5
- **Build System**: Webpack 5 with custom configuration
- **Extension APIs**: Chrome Extensions Manifest V3

### Key Components

#### Content Scripts
- `content.ts`: Handles data interception on Sparkie.io
- `content_wp.ts`: Manages WordPress form autofill
- `data_intercept.ts`: Injected script for GraphQL API interception
- `wordpress_fill.ts`: Handles WordPress field mapping and filling

#### Background Script
- `background.ts`: Service worker for data storage and link validation
- Manages Chrome storage operations
- Handles cross-tab communication

#### UI Components
- `Main.tsx`: Main application component
- `PetsMain.tsx`: Pet management interface
- `SinglePet.tsx`: Individual pet display
- `PetOptions.tsx`: Pet selection dropdown

### Data Flow

1. **Collection**: GraphQL responses are intercepted via injected script
2. **Storage**: Pet data is stored in Chrome's local storage
3. **Display**: React components render pet information
4. **Autofill**: WordPress forms are populated via content scripts

### Permissions

The extension requires the following permissions:
- `storage`: For local data persistence
- `activeTab`: For current tab interaction
- `sidePanel`: For side panel functionality
- `scripting`: For content script injection
- `host_permissions`: For Sparkie.io and AMA website access

## File Structure

```
src/
├── components/          # React components
│   ├── Header.tsx
│   ├── Main.tsx
│   └── Pets/
│       ├── PetOptions.tsx
│       ├── PetsMain.tsx
│       └── SinglePet/
├── scripts/            # Injected scripts
│   ├── data_intercept.ts
│   └── wordpress_fill.ts
├── util/              # Utility functions
├── background.ts      # Service worker
├── content.ts         # Sparkie content script
├── content_wp.ts      # WordPress content script
├── manifest.json      # Extension manifest
└── index.tsx         # Application entry point
```

## Development

### Building
```bash
npm run dev    # Development build with watch mode
```

### Scripts
- `dev`: Builds the extension in production mode with watch enabled
- `test`: Placeholder for test command

## Browser Support

- Chrome 88+ (Manifest V3 support required)
- Edge 88+ (Chromium-based)

## License

ISC License

## Author

Michael Alessi

---

*This extension is specifically designed for AMA Animal Rescue's workflow and integrates with their existing Sparkie.io and WordPress setup.*
