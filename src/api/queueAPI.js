import axios from "axios";

const api = axios.create({
  baseURL: "https://amachicms-be:onrender.com/api", // Adjust to your backend base URL
});

// Function to fetch the queue

export const fetchQueueUnseated = async () => {
  try {
    const response = await api.get("/queue/unseatedToday");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching queue:", error);
  }
};

// Function to add a new queue entry
export const addToQueue = async (name, phoneNumber, paxSize) => {
  try {
    const response = await api.post("/queue", {
      name,
      phoneNumber,
      paxSize: parseInt(paxSize, 10),
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to queue:", error);
    throw error;
  }
};

export const updateQueueId = async (id) => {
  try {
    const response = await api.patch(
      `/queue/${id}/seated`,
      { isSeated: true },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating queue entry seated status:", error);
    throw error;
  }
};

export default api;
