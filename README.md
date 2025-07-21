# Mini Backend for LMS
This is a basic Python Flask backend for delivering structured content, managing user data, and supporting real-time chat interactions. It handles JSON-based content, profile settings, and message formats like audio, text, markdown, and LaTeX. See [Installation](#installation-and-usage) and [How to Apply](#how-to-apply) for setup.

## Project Overview
The system delivers content through an interactive chat interface, using modular JSON files with different content types.


<!-- The project aims to build a dynamic learning platform where courses are delivered via AI agents and tutors through **chatbots that support realtime audio input/output, plain text, markdown and latex messages** and **lesson pages**. The course content is stored as JSON objects describing lessons with various content types (look [Course Structure](#course-structure)) : -->

- #### Plain Text, Markdown and LaTeX - Example Idea :
    Stars hold themselves up against gravity by internal pressure. For a star with **mass $$\( M \)$$** and **radius $$\( R \)$$**, a simplified estimate of the central pressure $$\( P_c \)$$ is :
$P_c \approx \frac{3}{8 \pi} \frac{G M^2}{R^4}$

- #### Videos, Images and Gifs - Example Idea :

    <div style="text-align:center">
        <img src="backend/Assets/Readme/example_1.png" alt="just for example" width="63%" />
    </div>

- #### Diagrams - Example Idea :
    <div style="text-align:center">
        <img src="backend/Assets/Readme/example_3.png" alt="just for example" width="63%" />
    </div>

- #### Interactive Visuals and Quizzes - Example Idea :
    <div style="text-align:center">
        <img src="backend/Assets/Readme/example_2.png" alt="just for example" width="63%" />
    </div>


## Backend Endpoints
These endpoints are available and active just for your testing whenever you run ```main.py``` : 

| Method | Endpoint                     | Description                                     | Args Needed                    |
|--------|------------------------------|-------------------------------------------------|--------------------------------|
| POST   | `/api/<course_id>/delivery/` | Send chatbot message (text input)               | lesson_id (str), user_id (int) |
| GET    | `/api/<course_id>/delivery/` | Get conversation history (array of messages)    | lesson_id (str), user_id (int) |
| GET    | `/api/<course_id>/lesson/`   | Get specific lesson content                     | lesson_id (str), user_id (int) |
| GET    | `/api/<course_id>`           | Get course json, including lesson placeholders  | user_id (int)                  |
| PUT    | `/api/profile/`              | Update user profile information                 | user_id (int)                  |

## WebSocket Events
These events are neccessary for sending and receiving realtime audio :

| Event Name     | Direction      | Description                                                         | Payload Type |
|----------------|----------------|---------------------------------------------------------------------|--------------|
| `audio_input`  | Client → Server | Stream chunks of recorded audio **while recording** (e.g. PCM)     | Binary blob  |
| `audio_output` | Server → Client | Stream generated/processed audio chunks **while AI model outputs** | Binary blob  |



## Frontend Tasks (What We Want)

<!-- At least 300 points needed, complete as much as you can. -->
- [ ] Build a **dynamic JSON renderer** that takes the course JSON and renders lessons sequentially (sample JSONs are available in [Files](./Files/) Directory)
<!-- - [ ] Render content types accordingly as described in [Project Overview](#project-overview) (100 points) -->
- [ ] Implement basic profile update UI that has these options :
  - Firstname
  - Lastname
  - Email
  - Gender
<!-- - [ ] Implement [endpoints](#backend-endpoints) for tasks above (15 poitns each) -->
<!-- - [ ] Use image and video files that are available in ```Assets``` Directory (20 points) -->
- [ ] Ensure smooth lesson **navigation bar for course contents** and state management
- [ ] Create chatbot that shows texts and elements in message blob while it plays response audio and writing its transcript
<!-- - [ ] Implement [socket](#websocket-events) events for tasks above (200 points) -->
<!-- - [ ] do [application](#how-to-apply) steps (10 points) -->

## How to Apply

- Fork the repo and implement a demo frontend (React, Angular, or your choice)
- Use the provided backend endpoints to fetch data and send messages
- Focus on clean, modular, and maintainable code
- Show ability to handle asynchronous operations and real-time updates (socket programming)
- Commit your changes and pull request to this project
- Contact us on telegram via ```@ramtinkosari```, feel free to ask about steps

<!-- ## Course Structure (and JSON)
Consider that you are showing course page which has :
1. Course Overview Page
2. Modules and Units Navigation Bar
3. User Profile Picture in Top Right of the Page

Each course has this structure :
```mermaid

#### Response JSON of ```/api/<course_id>/``` :
When you request ```/api/<course_id>/``` with ```GET``` method, it will give you json like :
```json
{
    "overview": "Markdown overview page",
    "modules": [
        {
            "name": "Module 1",
            "units": [
                {
                    "name": "Unit 1"
                }
            ]
        },
        {
            "name": "Module 1",
            "units": [
                {
                    "name": "Unit 5"
                },
                {
                    "name": "Unit 6"
                },
                {},
                {},
                {}
            ]
        },
        {},
        {},
        {}
    ]
}
```
:warning: You should render ```modules``` in navigation bar and ```overview``` on a page, next to navigation bar !

#### Response JSON of ```/api/<course_id>/delivery/``` :
When you request ```/api/<course_id>/delivery/``` with ```GET``` method, it will give you json like :
```json
{
    "progress": "Unit 5",
    "messages": [
        {
            "role": "user",
            "text": "...",
            "timestamp": "2025-07-10 14:27:35"
        },
        {
            "role": "tutor",
            "text": "...",
            "timestamp": "2025-07-10 14:27:42"
        },
        {},
        {},
        {}
    ]
}
```
:warning: Consider that ```user``` messages must be at right and ```tutor``` messages at left !

#### Response JSON of ```/api/<course_id>/lesson/``` :
When you request ```/api/<course_id>/lesson/``` with ```GET``` method, it will give you json like :
```json
{
    "page_contents": [
        {
            "type": "markdown",
            "content": "# Lesson Title\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            "type": "image",
            "content": "Assets/example.png"
        },
        {
            "type": "latex",
            "content": "\frac{dP}{dr} = -\frac{G M(r) \rho(r)}{r^2}"
        },
        {
            "type": "video",
            "content": "Assets/example.mp4"
        },
        {
            "type": "quiz",
            "content": {
                "deadline" : "2025-10-20 23:00:00",
                "questions": [
                    {
                        "type": "checkbox",
                        "question": "which option is correct ?",
                        "options": [
                            {
                                "name": "option 1"
                            },
                            {
                                "name": "option 2"
                            },
                            {
                                "name": "option 3"
                            },
                            {
                                "name": "option 4"
                            }
                        ]
                    },
                    {
                        "type": "text",
                        "question": "Explain what is concept",
                        "words-count-limit-min": 30,
                        "words-count-limit-max": 50
                    },
                    {},
                    {},
                    {}
                ]
            }
        }
    ]
}
```
:warning: ```page_contents``` items must be visualized in order according to their types !
-->
## Installation and Usage
to install necessary packages simply do :
```bash
pip3 install flask flask-cors
```
then run mini-backend by :
```
python3 main.py
```


Here’s an updated version of your **README** section that includes **frontend installation and usage instructions** alongside the backend:

---

## Installation and Usage

### Backend

to install necessary packages simply do :

```bash
pip3 install flask flask-cors
```

Then run the mini-backend using:

```bash
python3 backend/main.py
```

---

### Frontend (Vite + React)

First, make sure you have **Node.js** and **npm** installed.
Then navigate to the `frontend/` directory and install all dependencies listed in `package.json`:

```bash
cd frontend
npm install
```

To start the frontend development server:

```bash
npm run dev
```

Once the server is running, open your browser and go to:

```
http://localhost:5173/
```

This will load the frontend interface.

---