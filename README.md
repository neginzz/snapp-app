# Snapp App

A ride-booking application using **React**, **TypeScript**, and **Neshan Maps API** to search locations, get directions, and assign drivers.

## Features

- Search for origin and destination locations.
- Get directions between locations using Neshan Maps.
- View a loading screen and assigned driver information.
- State management for locations using **React Context**.

## Technologies

- **React** with **TypeScript**
- **MUI** for UI components
- **Neshan Maps API** for map and direction functionalities
- **React Router** for navigation
- **React Context** for location state management
- **Vite** for development and build

## Project Structure

- **src/**: Main source folder
  - **assets/**: Static data such as drivers
  - **components/**: Reusable components (Map, DriverCard, etc.)
  - **context/**: Location context for managing origin and destination
  - **pages/**: The app's main pages (SearchLocPage, DirectionPage, etc.)
  - **App.tsx**: Main application file
  - **main.tsx**: Application entry point
  - **theme.ts**: MUI theme customization

## Browser Compatibility

- It is recommended to run this application on **Microsoft Edge** for better handling of user location access.
