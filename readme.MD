# Todo Application (MERN Stack)

Welcome to the Todo Application! This project is built using the MERN stack (MongoDB, Express.js, React, Node.js) and provides users with a simple yet effective way to manage their tasks. Follow the instructions below to set up and run the app locally.

---
## 🚀 How to Run the Application

### Backend (Node.js)

1. **Navigate to the Backend Directory**  
   Open a terminal and navigate to the server directory of the project.

2. **Install Dependencies**  
   Run the following command to install all required Node.js packages:  
   ```bash
   npm install
   ```
3. **Add .env File**    
   Create env file in your server directory and add the following variables:  
   1. MongoDB connection string - grab this from mongoDB atlas -
        ```env
        MONGODB_URI=your_connection_string
        ```
   2. Port number you want your server on -  
        ```env
        PORT=8000
        ```
   3. Origins - to avoid cors error add your fronted url - 
        ```env
        ALLOWED_ORIGINS=http://localhost:5173
        ```
   **Visit sample.env file for reference**   
4. **Start server - with this command**
   ```bash
   npm run dev
   ```   
### Frontend (React - vite) 

1. **Navigate to the Frontend Directory**  
   Open a terminal and navigate to the frontend directory of the project.

2. **Install Dependencies**  
   Run the following command to install all required packages:  
   ```bash
   npm install
   ```
3. **Add .env File**    
   Create .env file in your client directory and add the following variables:  
   Add your backend Url 
   ```env
   VITE_BACKEND_URL=http://localhost:8000
   ```
   **Visit sample.env file for Reference**
4. **Start React App**  
   Run the following command to start your react app -
   ```bash
   npm run dev
   ```
## Features

1. **Create Todos with Priority**  
   Users can create new tasks and assign different priority levels to organize their work effectively.
   
2. **Edit Functionality**  
   Click on any todo to edit its content. The intuitive interface allows easy modification of existing tasks.

3. **Priority-based Sorting**  
   Organize your tasks efficiently by sorting them according to their priority levels.

4. **Delete Tasks**  
   Remove unwanted or completed tasks from your list with a simple delete operation.

5. **Mark as Read**  
   Keep track of your progress by marking completed todos as read.






   
   