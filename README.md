ZapChirp

ZapChirp is a real-time JavaScript chat application built using React for the frontend and Node.js with Express and MongoDB for the backend. The application supports user registration, login, adding contacts, creating group chats, and real-time messaging using Socket.io.

Current Status

Completed Features

    User Registration and Login
    Registration: Users can register by providing their full name, username, email, password, and gender. Passwords are hashed and stored securely in the database.
    Login: Registered users can log in using their username and password. A JWT token is generated upon successful login and is used for authenticating subsequent requests.
    Logout: Users can log out, which invalidates their session tokens.
    
In Progress

    Real-time Messaging with Contacts
    Messaging: Users can send and receive messages in real-time using Socket.io. Messages should be stored in MongoDB.
    WebSockets: WebSocket connections are used to ensure instant delivery of messages between users.
    Add and Manage Contacts
    Adding Contacts: Users can add new contacts by entering the contact's name and email. Both users will see each other in their contact lists upon successful addition.
    Create and Join Group Chats
    Group Chat Creation: Users can create group chats by selecting multiple contacts. Each group chat will have a unique name and a list of members.
    Joining Group Chats: Users can join group chats they are invited to or are a member of and start messaging in real-time.
    Responsive Design
    
Known Issues

    Current Known Issues
    MongoDB Connection Issues:
        Registration information is saved but cannot be found on MongoDB.
        Successful login despite the above issue.
        No formal error messages received when examining the server-side code.

Adding Contacts:

    This feature does not work as intended, preventing the ability to test the chat functionality.

Frontend and Backend Linking:

    Difficulty in linking the frontend to the backend.
    Less thorough frontend testing due to these issues.
    
Testing

Frontend Testing

    Challenges: Encountered multiple issues while manually running the code through the terminal in VS Code, which hindered thorough testing with Jest.
Backend Testing

    Performed using Postman, with satisfactory results for backend functionalities.

Installation and Setup:

    Prerequisites:
    
    Node.js and npm
    MongoDB

    Backend Setup:
    
    Clone the repository and navigate to the backend directory:
    
    git clone https://github.com/mpenner2003/ZapChirp.git
    cd ZapChirp/Backend
    
    Install backend dependencies:
    
    npm install
    
    Create a .env file in the backend directory and add the following environment variables:
    
        MONGO_DB_URL=mongodb://localhost:27017/zapchirp
        
        JWT_SECRET=your_jwt_secret
        
        NODE_ENV=development
    
    Start the backend server:
    
        npm start
    
    Frontend Setup
    
        Navigate to the frontend directory:
    
        cd ZapChirp/Frontend
    
    Install frontend dependencies:
    
        npm install
    
    Start the frontend development server:
    
        npm start
