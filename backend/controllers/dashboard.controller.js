import axios from "axios";
import { fetchGEU } from "../utils/geuApi.js";
import { errorMap } from "../constants/error.js";

export const profile = async (req, res) => {
  try {
    const data = await fetchGEU("/Account/GetStudentDetail", req);
    const student = JSON.parse(data.state)[0];
    res.json(student);
  } catch (error) {
    res.status(error.status || 500).json({ message:  errorMap[error.code] || "Failed to fetch profile" });
  }
};


export const avatar = async (req, res) => {
  try {
    // Extract cookies from the incoming request
    const sessionId = req.cookies["ASP.NET_SessionId"];
    const token = req.cookies["__RequestVerificationToken"];

    if (!sessionId || !token) {
      return res.status(401).send("Authentication cookies missing");
    }

    // Make the request to GEU's image endpoint
    const imageResponse = await axios.get(
      "https://student.geu.ac.in/Account/show", 
      {
        headers: {
          Cookie: `ASP.NET_SessionId=${sessionId}; __RequestVerificationToken=${token}`,
          Referer: "https://student.geu.ac.in/",
        },
        responseType: "arraybuffer",
        withCredentials: true, // Important for session handling
      }
    );

    // Verify we received image data
    if (!imageResponse.data || imageResponse.data.length === 0) {
      return res.status(404).send("No image data received");
    }

    // Set appropriate headers
    res.set({
      "Content-Type": imageResponse.headers["content-type"] || "image/png",
      "Content-Length": imageResponse.headers["content-length"],
    });

    // Send the image data
    res.send(imageResponse.data);
  } catch (error) {
    console.error("Error fetching profile image:", error);
    res.status(error.status || 500).send("Failed to fetch profile image");
  }
};

export const getIdCard = async (req, res) => {
  try {
    const response = await fetchGEU("/Account/StudentIDCardPrint", req);
    const jsonData = JSON.parse(response);
    res.status(200).json(jsonData[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal server error."});
  }
}