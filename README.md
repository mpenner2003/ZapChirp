ZapChirp is a real-time chat application built using React for the frontend and Node.js with Express and MongoDB for the backend. The application was built with the intention to support user registration, login, adding contacts, creating group chats, and real-time messaging using Socket.io.

Currently, The only criteria successfully completed is the ability to register and login.  The ability to add contacts and message people is still hindered.

Features
    User registration and login
        Registration: Users can register by providing their full name, username, email, password, and gender. The password is hashed and stored securely in the database.
        Login: Registered users can log in using their username and password. A JWT token is generated upon successful login and is used for authenticating subsequent requests.
        Logout: If users refresh the page, users can log out, which invalidates their session tokens


FEATURES THAT ARE STILL A WORK IN PROGRESS (Unfinished):
    Real-time messaging with contacts
        Messaging: Users would be able to send and receive messages in real-time using Socket.io. Messages should be stored in MongoDB.
        WebSockets: WebSocket connections are used to ensure instant delivery of messages between users.
    Add and manage contacts
        Adding Contacts: Users would add new contacts by entering the contact's name and email. Both users would see each other in their contact lists upon successful addition.
    Create and join group chats
        Group Chat Creation: Users can create group chats by selecting multiple contacts. Each group chat has a unique name and a list of members.
        Joining Group Chats: Users can join group chats they are invited to or are a member of, and start messaging in real-time.
    Responsive design
Main Code Issues:
    Issues with connecting to MongoDB.  For whatever reason, registration information is saved, but cannot be found on MongoDB.  When we try logging in, login is successful, which to us is very strange.  We have not been receiving any formal error messages in this regard when examining the server side code.
    Adding contacts feature does not work as intended.  We are unsure as to why this is happening.
    The chat function otherwise would work, but adding contacts is a barrier to that.  The program in theory should allow messages to be sent.
    At this current time, we are turning in an unfinished product.  The Backend is mostly complete, and tests have been done on it using Postman, but we have had trouble linking the frontend. Less testing was done on the frontend as we were encountering issues with linking

Installation
    Prerequisites
        Node.js and npm
        MongoDB

Backend Setup
    Clone the repository and navigate to the backend directory:

    git clone https://github.com/mpenner2003/ZapChirp.git
    cd https://github.com/mpenner2003/ZapChirp.git/Backend

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

    cd https://github.com/mpenner2003/ZapChirp.git/Frontend
    Install frontend dependencies:
        npm install

Start the frontend development server:
    npm start
