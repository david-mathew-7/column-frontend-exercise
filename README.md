## Overview
This project is a React application designed to provide a dashboard for notices to manage their content with enhanced searching by title. It utilizes Firebase Firestore for data storage and retrieval, showcasing proficiency in React, state management, and asynchronous data fetching.

## Prerequisites
- Node.js (version as per your development environment, specify the version you are using)
- npm (or yarn, based on your preference)
- Firebase account and Firebase project setup
- Firebase Firestore SDK
- React
- Jest for testing

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>` 

2. Install dependencies:

    `npm install` 
    
3. Start the local development server:
    
    `npm run start` 
    
4.  Access the application at `http://localhost:3000`

5.  Access the Firebase emulator UI at `http://localhost:4000`
    

##  Features

-   Search functionality to find notices by title with a debounced effect.
-   Display of search results with notice details including title, publication date, and content.
-   Notices being listed in descending order of their publication date.
-   Pagination support to handle multiple notices, showing 10 notices per page.
-   Handling of loading states and error responses.
-   A responsive and visually appealing user interface with toasts.
-   Creating new notices in the firebase collection by a form
-   Details of a single notice by route 
-   Testing coverage of the implemented functionalities

## Testing
Run the test suite using:
`npm test` 


## Future Enhancements
-   Adding a filter to search notices by date of publication.

## Author

David Mathew