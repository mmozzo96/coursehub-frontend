# CourseHub frontend

Simple frontend project developed for a technical assignment

## CourseHub

The assignent had the following requirements:

### Course List

-   Fetch and display a list of available courses from the backend (ServiceNow or custom backend).
-   Display course details (Title, Description, Duration).

### Provide options for subscribing to a course:

-   Option 1: Use a traditional "Subscribe" button.
-   Option 2 (Optional): Implement a drag-and-drop mechanism where learners can drag courses into a subscription basket or area to subscribe.

### Subscription Feature

-   Basic: Clicking the "Subscribe" button or dropping a course into the basket should:
    -   Create a new subscription record.
    -   Display the subscribed course in the learner's "My Courses" or subscription basket.
-   Optional (Advanced): Provide feedback (e.g., visual highlights) when using drag-and-drop.

### My Courses

-   Display all the courses the learner has subscribed to by fetching data from the backend.
-   Optionally, provide a way to unsubscribe from courses.

## Backend

The backend is built on a ServiceNow instance that is bound to expire, so many features may not be working if testing without connecting to a diffent instance or refreshing the one this project is connected to.

## Hosting

The website is hosted at [https://main--coursehubmichelemozzo.netlify.app/](https://main--coursehubmichelemozzo.netlify.app/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
