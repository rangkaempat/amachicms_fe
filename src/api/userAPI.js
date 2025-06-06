import axios from "axios";

const api = axios.create({
  baseURL: "https://amachicms-be.onrender.com/api", // Adjust to match your backend base URL
});

// Function to register a new user
export const registerUser = async (username, password, role_id) => {
  try {
    const response = await api.post("/user/register", {
      username,
      password,
      role_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Function to log in a user
export const loginUser = async (username, password) => {
  try {
    const response = await api.post(
      "/user/login",
      { username, password },
      { withCredentials: true }
    );
    return response.data; // Returns token and user data
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Function to request password reset
export const requestPasswordReset = async (email) => {
  try {
    const response = await api.post("/user/passwordReset/request", { email });
    return response.data;
  } catch (error) {
    console.error("Error requesting password reset:", error);
    throw error;
  }
};

// Function to reset password using token
export const resetPassword = async (resetToken, newPassword) => {
  try {
    const response = await api.post("/user/passwordReset", {
      resetToken,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

// Function to update user role
export const updateUserRole = async (userId, newRoleId) => {
  try {
    const response = await api.put("/user/updateRole", { userId, newRoleId });
    return response.data;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};

export const fetchUser = async () => {
  try {
    const response = await api.get("/user/getUser", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null; // Return null if authentication fails
  }
};

export const logout = async () => {
  try {
    await api.post("/user/logout", {}, { withCredentials: true });
    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    return false; // Return null if authentication fails
  }
};

export default api;
