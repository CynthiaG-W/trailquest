# TrailQuest

Find the right adventure for you.

TrailQuest is a hiking and outdoor adventure discovery platform built to help users discover trails, understand what to expect, join organised hikes, prepare for trips, and find outdoor gear shops.

The project focuses on a practical, human-centred hiking experience rather than only showing a map. It helps users answer questions like:

- Is this trail suitable for my experience level?
- What should I expect on the trail?
- Are there organised hikes I can join?
- How can I prepare for my adventure?
- Where can I find hiking gear?

## Features

### Discover

The Discover page is the main starting point in TrailQuest.

Users can:

- Browse featured trails
- Explore adventures by difficulty
- Search for trails and organised events
- Filter adventures by experience level
- View trail details
- Save trails for later
- Discover upcoming organised hikes

Difficulty levels include:

- Beginner
- Intermediate
- Advanced
- Extreme

### Organised Events

TrailQuest includes upcoming organised hiking events retrieved from the Flask backend.

Event information may include:

- Event name
- Organiser
- Date
- Time
- Location
- Difficulty
- Distance
- Description
- Pricing
- Registration information
- Source verification details

Users can also save events for later.

### Trail Details

Each trail has a dedicated details page with information such as:

- Trail name
- Location
- Difficulty
- Distance
- Estimated duration
- Match percentage
- Trail description
- Preparation tips

Users can:

- Save a trail for later
- Mark a trail as explored
- View preparation guidance
- Browse upcoming organised events

### Trail Guide

The Trail Guide helps users prepare before heading out.

It includes topics such as:

- Hiking basics
- What to pack
- Understanding trail difficulty
- Trail safety
- Planning a hike
- Difficulty-specific guidance

The guide also includes search functionality.

### Gear Directory

TrailQuest provides a curated directory of hiking and outdoor gear shops.

The MVP includes:

- Wild Springs — Parklands
- Outdoorer — Thika Road
- Going Outdoor — Galleria
- Zana Outdoors — Nairobi

TrailQuest is not an online gear marketplace. The Gear section helps users discover outdoor shops and visit their websites.

### Profile

The Profile page provides a personal hiking dashboard.

Users can see:

- Saved trails
- Saved events
- Trails explored
- Number of trails explored
- Distance covered

TrailQuest currently stores this personal activity locally using browser localStorage.

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Lucide React
- JavaScript
- CSS

### Backend

- Python
- Flask
- Flask-SQLAlchemy
- Flask-Migrate
- Flask-CORS
- PostgreSQL
- psycopg2-binary
- python-dotenv

### Development Tools

- Git
- GitHub
- VS Code
- npm
- PostgreSQL

## Project Structure

```text
trailquest/
├── backend/
│   ├── migrations/
│   ├── models/
│   │   ├── event.py
│   │   └── event_price.py
│   ├── routes/
│   │   └── events.py
│   ├── .env
│   ├── app.py
│   ├── config.py
│   ├── extensions.py
│   └── venv/
├── public/
├── src/
│   ├── components/
│   │   ├── DifficultyCard.jsx
│   │   ├── EventCard.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   └── Navigation.jsx
│   ├── data/
│   │   └── trails.js
│   ├── pages/
│   │   ├── Discover.jsx
│   │   ├── Events.jsx
│   │   ├── EventDetails.jsx
│   │   ├── TrailDetails.jsx
│   │   ├── Gear.jsx
│   │   ├── Profile.jsx
│   │   ├── TrailGuide.jsx
│   │   ├── GuideArticle.jsx
│   │   └── DifficultyGuide.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── README.md
└── public/
```

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3
- PostgreSQL

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

> If the project uses a requirements file, make sure it exists in the backend folder. If not, install the backend dependencies needed for Flask and SQLAlchemy.

## License

This project is currently unlicensed unless otherwise specified.

│   ├── App.jsx
│   ├── App.css
│   └── index.css
│
├── public/
├── .gitignore
├── package.json
└── README.md

Getting Started

Prerequisites

Make sure the following are installed:

Node.js

npm

Python 3

PostgreSQL

Git

Clone the repository

git clone <YOUR_GITHUB_REPOSITORY_URL>
cd trailquest

Frontend Setup

Install dependencies:

npm install

Start the development server:

npm run dev

Vite will provide a local development URL, usually:

http://localhost:5173

Backend Setup

Open a second terminal and move into the backend:

cd trailquest/backend

Create the virtual environment if it does not already exist:

python3 -m venv venv

Activate it on Linux/macOS:

source venv/bin/activate

On Windows:

venv\Scripts\activate

Install dependencies:

pip install Flask Flask-CORS Flask-SQLAlchemy Flask-Migrate psycopg2-binary python-dotenv

PostgreSQL Configuration

The local development database uses:

Database: trailquest
User: trailquest_user
Port: 5432

Create a .env file inside backend/:

DATABASE_URL=postgresql://trailquest_user:trailquest_dev_password@localhost:5432/trailquest

Do not commit .env to GitHub.

The project .gitignore should include:

backend/.env
backend/venv/

For production, use secure credentials and production environment variables.

Database Migrations

From the backend directory with the virtual environment activated:

flask db upgrade

After changing database models, create a migration:

flask db migrate -m "describe your change"

Then apply it:

flask db upgrade

Run the Backend

From trailquest/backend, with the virtual environment activated:

python app.py

The API runs locally at:

http://127.0.0.1:5000

Useful endpoints:

GET /
GET /api/test-db
GET /api/events/
GET /api/events/<event_id>

API Endpoints

Welcome

GET /

Returns:

{
  "message": "Welcome to the TrailQuest API"
}

Database Test

GET /api/test-db

Used to verify that Flask can connect to PostgreSQL.

Get Upcoming Events

GET /api/events/

Returns upcoming events ordered by date.

Get Individual Event

GET /api/events/<event_id>

Returns the details of a specific event.

Data Storage

TrailQuest currently uses two forms of storage.

PostgreSQL

The Flask backend uses PostgreSQL for organised event data.

Main tables include:

events

event_prices

Browser localStorage

Personal user activity is currently stored locally in the browser.

The application uses:

trailquest_saved_trails
trailquest_saved_events
trailquest_explored_trails

This allows users to save trails, save events, and track explored trails without requiring authentication.

Current limitation

Because this information is stored in localStorage, it is tied to the user's browser/device. It is not yet synced to a user account or cloud database.

Application Routes

TrailQuest uses React Router.

/                          Discover
/events                    Events
/events/:id                Event Details
/trails/:id                Trail Details
/gear                      Gear
/profile                   Profile
/guide                     Trail Guide
/guide/:slug               Guide Article
/guide/difficulty/:level   Difficulty Guide

Design System

TrailQuest uses a warm outdoor-inspired visual identity.

Colour palette

Deep Pine       #18382F
Forest          #21483B
Sage            #9CAF88
Terracotta      #C97855
Warm Sand       #F3EEE4
Warm White      #F7F3EA

Typography

DM Sans — interface and body text

Playfair Display — selected headings

Design direction

The visual direction combines modern outdoor-brand aesthetics, editorial layouts, earthy tones, and Kenyan outdoor-adventure context.

The goal is to feel adventurous without becoming overly technical or generic.

User Experience

TrailQuest is built around:

Find the right adventure for you.

The platform focuses on helping users make informed hiking choices rather than simply displaying locations on a map.

The experience is organised around:

Discover — Find trails and adventures.

Understand — Learn about difficulty and trail expectations.

Prepare — Use the Trail Guide before going.

Join — Discover organised hiking events.

Track — Save trails and events and record explored trails.

Gear up — Find outdoor gear shops.

Search

The Discover page supports URL-based search.

Examples:

/?q=Karura

Difficulty filtering:

/?difficulty=Beginner

Search can match against trail and event information including names, locations, difficulty, descriptions, and organisers.

Search results can include both trails and events.

Responsive Design

TrailQuest is designed for desktop and mobile screens.

The application includes:

Responsive layouts

Mobile navigation

Stacked mobile cards

Responsive trail and event sections

Mobile-friendly buttons and controls

Responsive Profile content

Responsive Trail Guide content

Running the Full Application Locally

Use two terminals.

Terminal 1 — Backend

cd ~/Desktop/projects/trailquest/backend
source venv/bin/activate
python app.py

Terminal 2 — Frontend

cd ~/Desktop/projects/trailquest
npm run dev

Then open the Vite URL shown in the frontend terminal.

The frontend communicates with:

http://127.0.0.1:5000

for the local Flask API.

Development Workflow

Create a feature branch:

git checkout -b feature/your-feature-name

Check changes:

git status

Stage changes:

git add .

Commit:

git commit -m "Describe your change"

Push the branch:

git push origin feature/your-feature-name

Testing Checklist

Discover

Search

Clear search

Difficulty filtering

Trail navigation

Save trail

Unsave trail

Upcoming events

Events

Event listing

Event details

Event pricing

Save event

Remove saved event

Registration links

Trail Details

Trail information

Save trail

Mark as explored

Explored state persists

Trail Guide links

Events navigation

Profile

Saved trails

Saved events

Explored trails

Trails explored count

Distance covered

Remove saved items

Trail Guide

Guide search

Guide articles

Difficulty guides

Navigation

Mobile layout

Gear

Gear directory

Shop links

Responsive layout

Responsive

Desktop

Mobile

Navigation

No horizontal overflow

Buttons remain usable

Current MVP Limitations

TrailQuest is currently an MVP.

The following features are not yet implemented:

User authentication

Cloud-synced user profiles

User accounts

Event booking inside TrailQuest

Online payments

Real-time trail conditions

Automated event ingestion

User-generated trail reviews

User ratings

Advanced personalised recommendations

Admin dashboard

Production-grade event verification workflow

The current application focuses on validating the core discovery and adventure-planning experience.

Future Improvements

Potential future development includes:

User Accounts

Allow users to create accounts and sync:

Saved trails

Saved events

Explored trails

Hiking history

Experience level

Personalised Recommendations

Use user preferences and hiking history to recommend:

Suitable trails

Upcoming events

New challenges

Progression opportunities

Event Management

Allow verified organisers to:

Submit events

Update event information

Manage registrations

Provide pricing

Maintain event verification

Trail Community

Potential future features:

Trail reviews

Photos

Ratings

Hiking stories

Community recommendations

Advanced Trail Data

Potential integrations include:

Elevation profiles

Weather information

Trail conditions

GPX routes

Estimated difficulty based on terrain

Safety alerts

Project Goal

TrailQuest aims to make outdoor adventure more approachable by helping people move from:

“I want to go hiking.”

to:

“I know where to go, what to expect, how to prepare, and which adventure is right for me.”

Status

TrailQuest MVP — Functional

The current MVP includes:

React frontend

Flask backend

PostgreSQL database

Event API

Trail discovery

Event discovery

Search

Difficulty filtering

Saved trails

Saved events

Explored trail tracking

Profile activity

Trail Guide

Gear directory

Responsive desktop/mobile experience

Author

Cynthia Wangui

TrailQuest was built as an outdoor adventure discovery platform focused on making hiking more accessible, understandable, and easier to plan.

License

This project is currently for educational and portfolio purposes.
