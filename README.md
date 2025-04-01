# React Example Project - Setup and Customization Guide

## Getting Started

Follow these steps to set up the React example project locally.

### Prerequisites
Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. Clone the repo and navigate into the project directory:
   ```sh
   cd react-interactive-map-demo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```

### Running the Project
To start the development server, run:
```sh
npm start
```
or
```sh
yarn start
```
This will start the application on `http://localhost:3000/`.

## Customization Guide

### Updating the Map Regions
1. Download an SVG image of your country’s map.
2. Open the SVG file in a text editor.
3. Modify the regions in the SVG file to match the objects in `Map.js`.
4. Replace the existing SVG regions in `Map.js` with your updated ones.

### Updating Region Coordinates
1. Open `App.js`.
2. Replace `regionCoordinates` with the correct coordinates for your map.
3. Ensure that the region names in `regionCoordinates` match those in the `regions` list from `Map.js` (use lowercase names in `regionCoordinates`).

### Updating the Time Series Data Source
1. Locate the time series data URL in the project.
2. Replace the existing address with the URL of your own SmartMet server.

### Adjusting Map Path Rendering
If the map does not render correctly, check the return statement in `Map.js`. You may need to adjust the `path` to correctly display your new SVG regions.

