
# README for Fullstack Web Project: A09 Movie Promotion

## Project Overview
🎥 The **A09 Movie Promotion Website** is a fullstack web application designed to promote and provide detailed information about movies. The platform caters to both users and administrators, ensuring a rich, personalized user experience and efficient content management capabilities for administrators. 🌟

---

## Features

### For Users:
- **Account Registration**: Users can create an account on the website to log in and access personalized features such as saving favorite movies and tracking new releases.
- **Login/Logout**: Users can log into the system to use personalized features and log out when they are finished.
- **Movie Search**: Users can search for movies based on various criteria such as title, genre, release year, or popularity.
- **Detailed Movie Information**: Users can view comprehensive details about movies, including synopsis, cast, director, trailer, and reviews from other users.
- **Movie Reviews**: Users can leave comments and ratings for movies to share their opinions with the community.
- **Wishlist**: Users can add or remove movies from their wishlist for easier tracking and revisiting.
- **Feedback Submission**: Users can send feedback to the website administrators to help improve their experience.

### For Administrators:
- **Content Management**: Admins can add, edit, or delete movie-related information, including descriptions, trailers, posters, and other details.
- **Comment Moderation**: Admins can review and delete user comments that violate website policies.
- **Reports and Analytics**: Admins can view reports on user numbers, visits, comments, and other statistics to evaluate website performance.
- **Featured Movies Management**: Admins can add or remove movies from the homepage recommendations to help users discover new or highlighted films.
- **User Feedback Management**: Admins can view and respond to user feedback to improve service quality.

---

## Technologies Used

### Frontend:
- **React.js**: A JavaScript library for building user interfaces based on UI components. React is suitable for creating SPA (Single Page Applications), ensuring a seamless user experience.
- **Bootstrap**: A CSS framework for creating responsive and mobile-first designs.
- **Tailwind CSS**: A utility-first CSS framework for customizing individual UI components.
- **JavaScript**: Used for dynamic interactivity and SPA functionality.

### Backend:
- **Spring Boot**: A Java framework for creating standalone, production-ready applications. It simplifies configuration and accelerates development.
- **Spring Security**: Provides robust authentication and authorization features, protecting against attacks such as CSRF and clickjacking.
- **JWT (JSON Web Token)**: Used for secure user authentication and role-based access control.
- **Java 8+**: Provides the foundation for backend logic.

### Database:
- **MySQL**: A reliable, high-performance relational database used to store movie data, user information, and other application data.

---

## Project Structure
- **Frontend**: `A09_FINAL`
- **Backend**: `movie-app`
- **Database**: `finalA09.sql`

---

## Getting Started
### Installation Steps
1. Clone the repository.
2. Set up the MySQL database using the `finalA09.sql` file.
3. Configure backend properties (e.g., database URL, username, password).
4. Run the backend using Spring Boot.
5. Navigate to the frontend directory (`A09_FINAL`) and install dependencies using:
   ```bash
   yarn install
   ```
6. Start the frontend development server:
   ```bash
   yarn/yarn install
   ```
7. Access the application in your browser.

---



