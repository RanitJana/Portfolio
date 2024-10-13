
# Portfolio

## Description
It is a web application that allows users to create and customize their own portfolios. Unlike traditional portfolio sites that focus on a single individual, this platform enables anyone to modify and manage their own information, creating a personalized portfolio that showcases their skills, projects, and experiences.

## Features
- **User Authentication**: Secure registration and login system.
- **Customizable Portfolio**: Users can modify their information.
- **Image Upload**: Integrate images using Cloudinary for storage and management.
- **Responsive Design**: The application is mobile-friendly and adapts to different screen sizes.

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime for building the server-side logic.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing user data and portfolio information.
- **Mongoose**: ODM library for MongoDB to model data.
- **bcryptjs**: For hashing passwords.
- **jsonwebtoken**: For secure user authentication.
- **multer**: For handling file uploads.
- **nodemailer**: For sending email notifications.

### Frontend
- **React**: Frontend library for building user interfaces.
- **React Router**: For routing and navigation.
- **Axios**: For making HTTP requests to the backend.
- **react-toastify**: For user notifications.
- **Tsparticles**: For particle effects in the background.
- **marked**: For parsing Markdown content.
- **Dompurify**: For sanitizing HTML content.
- **[Dev icons](https://devicon.dev/)**: For programming icons.

## Installation

### Prerequisites
- Node.js
- MongoDB (local or Atlas)
- Docker (optional)

### Clone the Repository
```bash
git clone https://github.com/RanitJana/Portfolio
cd portfolio
```

### Environmental Files
Create a `.env` file in both the `server` and `client` directories.

#### Server `.env` :
```bash
PORT=5000
MONGODB_URI=***
WHITELISTED_URI=http://localhost:5173,http://localhost:5174
REFRESH_TOKEN_SECRET=***
REFRESH_TOKEN_EXP=***
ACCESS_TOKEN_SECRET=***
ACCESS_TOKEN_EXP=***
CLOUDINARY_NAME=***
CLOUDINARY_API_KEY=***
CLOUDINARY_API_SECRET=***
EMAIL_PASS=***
EMAIL_USER=***
```

#### Client `.env` :
```bash
VITE_BACKEND_URI=http://localhost:5000/api
VITE_DEFAULT_ADMIN_ID=66e87dc46dc628f026c72195
```

### Running the Application
Currently in the `/portfolio` directory.

#### Without Docker
1. **Open the first terminal:**
   ```bash
   cd server
   bash start
   ```
   
2. **Open the second terminal:**
   ```bash
   cd client
   bash start
   ```

3. **Visit the application:**
   Open your browser and go to `http://localhost:5173`.

#### With Docker
To run the application using Docker, use the following command:
```bash
docker compose up
```
**Visit the application:**
   Open your browser and go to `http://localhost:5173`.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request if you would like to contribute.

## Contact
Your contact information or links to your profile for users who may have questions or feedback.
### Instructions:
- Replace the placeholders (`***`) in the `.env` sections with your actual configuration values before starting the program.
- EMAIL_PASS is the app password that you'll get from google manage account. EMAIL_USER is the same email account ( eg. abcd@gmail.com ).