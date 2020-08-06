# Project (Frontend) Overview

## Project Link
- [Frontend](https://jovial-dijkstra-51d45a.netlify.app/)
- [Backend](https://to-do-list-project-2.herokuapp.com/)

## Project (Backend) Overview
- [Backend Overview](https://github.com/jordanchude/to-do-list-backend/blob/master/planning/README.md)

## Project Schedule

|  Day | Deliverable | Status
|---|---|---|
|Day 1| Project Description | Complete
|Day 1| Wireframes / Priority Matrix / Frontend Timeline| Complete
|Day 3| Core Application Structure (HTML, CSS, etc.) | Complete
|Day 4| MVP & Bug Fixes | Complete
|Day 5| Final Touches and Present | Incomplete

## Project Description

For my unit 02 project, I am going to create a to-do list tracker for a company and its employees. For the frontend, components include a responsive navigation bar, a static header/jumbotron that stays the same for every user request and promotes the app, and section that shows each employee's photo, name, and to-dos, and a footer with a copyright notice. 

## User Stories
**Users are able to...**
- Use a responsive navigation bar on desktop, tablet, and mobile to navigate to the employee list, the section to add or update an employee, and the homepage.
- Scroll down to each added employee and their corresponding to-do list to stay updated on any changes.
- Use a form under the header/jumbotron to add an employee card with their name, title, photo for the top of their to-do list.
- After creating the employee, use a link on the employee card to add a to-do item.
- Press an edit button on each created card to edit the name, photo, and title of the specified employee.
- Press a delete button on each created card to remove a card when an employee is terminated.

## Google Sheet

- [Link](https://docs.google.com/spreadsheets/d/1DRhpnHYU-LVnRYKSALXm_xbMCZ3FsTs6Zl-VJ1MU49E/edit?usp=sharing) 

## Wireframes

- [Mobile](https://github.com/jordanchude/to-do-list-frontend/blob/master/planning/wireframe-assets/mobile.pdf)
- [Tablet](https://github.com/jordanchude/to-do-list-frontend/blob/master/planning/wireframe-assets/tablet.pdf)
- [Desktop](https://github.com/jordanchude/to-do-list-frontend/blob/master/planning/wireframe-assets/desktop.pdf)

## Time/Priority Matrix 

- [Link](https://res.cloudinary.com/dpjdvsigb/image/upload/v1596220020/project-2-assets/frontend-time-priority-matrix_qddjuq.jpg)

## MVP (examples)

- Create wireframe layouts for mobile, tablet, and desktop
- Use HTML and CSS to create website hero section, employee, and footer sections
- Create navigation bar for desktop and tablet and hamburger menu for mobile navigation
- Use Bootstrap to organize content in aesthetically pleasing way
- Make website responsive for mobile, tablet, and desktop
- Test website for complete responsiveness
- Deploy website via Netlify

## PostMVP 

- Use Javascript to add aesthetically pleasing effects to website (e.g. fade in)
- Add more complex styling to the website

## Functional Components

#### MVP
| Letter | Component | Priority | Estimated Time | Time Invested |
| --- | --- | :---: |  :---: | :---: |
| A | Wireframing | M | 2hr | 1hr |
| B | Navigation Skeleton - Mobile, Tablet, and Desktop | H | 1hr | 1hr |
| C | Employee Skeleton - Mobile, Tablet, and Desktop | H | 2hr | 2hr |
| D | Footer Skeleton - Mobile, Tablet, and Desktop | H | 1hr | .5hr |
| E | Deployment | H | 1hr | .5hr |
| F | Debugging | H | 3hr | 1hr |
| G | Documentation | H | 1hr | .5hr |
| -- | Total | -- | 11hrs| 6.5hrs |

#### PostMVP
| Letter | Component | Priority | Estimated Time | Time Invested |
| --- | --- | :---: |  :---: | :---: |
| H | Design Research | L | 1hr | -hr |
| I | Navbar Styling | L | 1hr | .5hr |
| J | Hero Styling | L | 1hr | .5hr |
| K | Employee Styling | M | 1hr | .5hr |
| L | Footer Styling | L | 1hr | .5hr |
| M | Element Fade In Functionality | L | 1hr | -hr |
| N | Smooth Scrolling for Links | L | 1hr | .5hr |
| O | Refactor | M | 2hr | -hr |
| -- | Total | H | 9hrs| 2.5hrs |

## Additional Libraries
- [Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)

## Code Snippet 
- The code snippet below creates an employee by making the user entry a new object and facilitating a post request to the server to add the object to the database.

```
const createEmployee = async () => {
    const newEmployee = {
        name: $('#nameinput').val(),
        title: $('#titleinput').val(),
        photo: $('#photoinput').val()
    }

    const response = await fetch(`${URL}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEmployee)
    })

    $('#nameinput').val("")
    $('#titleinput').val("")
    $('#photoinput').val("")

    $employeeCard.empty();
    getEmployees();
}
```

## Issues and Resolutions

**ERROR**: app.js:104 Uncaught SyntaxError: Unexpected identifier              
**RESOLUTION**: Removed semi-colon after final property in the "newEmployee" object.
