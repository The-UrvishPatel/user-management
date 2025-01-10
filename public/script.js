// Base URL for the API
const API_BASE = "http://localhost:3000/api";

/**
 * Function to handle API errors and display the error message.
 *
 * @param {string} error - The error message to display.
 */
const handleError = (error) => {
  document.getElementById("response").innerText = `Error: ${error}`;
};

/**
 * Function to fetch and display all users from the API.
 * It listens for a click event on the "Get All Users" button.
 */
document
  .getElementById("getUsersButton")
  .addEventListener("click", async () => {
    try {
      // Fetching users from the API
      const response = await fetch(`${API_BASE}/users`);
      const users = await response.json();
      const usersList = document.getElementById("usersList");
      usersList.innerHTML = ""; // Clear the previous list

      // Checking if the API returns an array of users
      if (Array.isArray(users)) {
        users.forEach((user) => {
          // Creating list items for each user and displaying their details
          const listItem = document.createElement("li");
          listItem.innerText = `${user.name} (${user.email}) - ${user.role}`;
          usersList.appendChild(listItem);
        });
      } else {
        handleError("Failed to load users.");
      }
    } catch (error) {
      handleError(error.message); // Handle any errors during the fetch
    }
  });

/**
 * Function to create a new user by submitting the form.
 * It listens for the submit event on the "Create User" form.
 */
document
  .getElementById("createUserForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Preventing the default form submission

    // Getting the user input from the form fields
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;

    try {
      // Sending a POST request to create a new user
      const response = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role }), // Sending user data as JSON
      });

      const result = await response.json();

      if (response.status === 201) {
        // If user creation is successful
        document.getElementById("response").innerText =
          "User created successfully!";
        document.getElementById("createUserForm").reset(); // Reset form fields
      } else {
        // If there's an error in user creation
        document.getElementById("response").innerText =
          result.message || "Failed to create user.";
      }
    } catch (error) {
      handleError(error.message); // Handle any errors during the fetch
    }
  });

/**
 * Function to delete a user by ID.
 * It listens for a click event on the "Delete User" button.
 */
document
  .getElementById("deleteUserButton")
  .addEventListener("click", async () => {
    const userId = document.getElementById("userIdToDelete").value;

    if (!userId) {
      // If no user ID is entered
      document.getElementById("response").innerText =
        "Please enter a user ID to delete.";
      return;
    }

    try {
      // Sending a DELETE request to delete the user by ID
      const response = await fetch(`${API_BASE}/users/${userId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.status === 200) {
        // If user deletion is successful
        document.getElementById("response").innerText =
          "User deleted successfully!";
      } else {
        // If there's an error in user deletion
        document.getElementById("response").innerText =
          result.message || "Failed to delete user.";
      }
    } catch (error) {
      handleError(error.message); // Handle any errors during the fetch
    }
  });
