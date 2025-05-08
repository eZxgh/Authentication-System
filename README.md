<h1 align="center" id="title">Simple Node.js, express & MySQL Authentication System</h1>

<p id="description">This is a basic user authentication system built with Node.js MySQL, express and bcrypt for password hashing. It allows users to register and log in securely.</p>

  
  
<h2>Features</h2>

Here're some of the project's features:

*   \-User Registration: Stores usernames and securely hashed passwords in a MySQL database.
*   \-User Login: Validates user credentials using bcrypt.
*   \-MySQL Database Initialization: Automatically creates the required database and table if they don’t exist.
*   \-HTTP Server: Serves basic HTML pages and handles authentication requests.

<h2>Installation Steps:</h2>

<p>1. Make sure you have Node.js installed.</p>

```
You can download it from nodejs.org.
```

<p>2. Ensure you have MySQL installed and running on your machine.</p>

<p>3. Clone the repository:</p>

```
git clone https://github.com/yourusername/project-name.git
```

<p>4. Navigate to the project directory:</p>

```
cd project-name
```

<p>5. Install the required dependencies:</p>

```
npm install 
```

<p>6. Start the server:</p>

```
node app.js
```

<p>7. Open your browser and visit:</p>

```
http://localhost:3006
```

<h2>Contribution Guidelines:</h2>

Register a New User: Access the /register.html page input your desired username and password to register. To login acces the /login.html page enter your credentials to log in. After successful login you will be redirected to a success page.

  
  
<h2>Technologies used in the project:</h2>
Built with:

*   Node.js: Runtime for building the server.
*   MySQL: Database for storing user information.
*   bcrypt: Library for securely hashing passwords.
*   mysql2: MySQL database driver for Node.js.
