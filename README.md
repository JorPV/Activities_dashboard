# Activities Dashboard

A responsive dashboard for managing activities and events, with functionality to add, delete, search, and filter entries.

## Features

- View all activities in a card-based layout
- Add new activities via a modal form
- Edit existing activities inline
- Delete activities with a confirmation dialog
- Real-time search across activity names
- Filter activities by category
- Detail view for individual activities

## Tech Stack

![React](https://img.shields.io/badge/-React_18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Chakra UI](https://img.shields.io/badge/-Chakra_UI-319795?style=flat-square&logo=chakraui&logoColor=white)
![React Router](https://img.shields.io/badge/-React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

- **React 18** with React Router for navigation
- **Chakra UI** with Emotion for styling
- **React Hook Form** for form validation
- **Framer Motion** for smooth transitions
- **Vite** for development and builds

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── EditEventForm.jsx
│   ├── Navigation.jsx
│   ├── NewEventForm.jsx
│   ├── Root.jsx
│   └── ui/              # Reusable UI components
├── context/
│   └── EventsDataContext.jsx
├── pages/
│   ├── EventPage.jsx
│   └── EventsPage.jsx
└── utils/               # Data helpers (CRUD, search)
```
