import axios from "axios";
import { fetchGEU } from "../utils/geuApi.js";
import qs from "qs";
import { errorMap } from "../constants/error.js";

export const profile = async (req, res) => {
  try {
    const data = await fetchGEU("/Account/GetStudentDetail", req);
    const student = JSON.parse(data.state)[0];
    res.json(student);
  } catch (err) {
    res.status(500).json({ message:  errorMap[err.code] || "Failed to fetch profile" });
  }
};

export const results = async (req, res) => {
  try {
    const data = await fetchGEU("/Account/GetResultIntension", req);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: errorMap[err.code] || "Failed to fetch results" });
  }
};

export const messages = async (req, res) => {
  try {
    const data = await fetchGEU("/Account/GetStudentMsgHistory", req);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: errorMap[err.code] || "Failed to fetch messages" });
  }
};

export const dashboardCard = async (req, res) => {
  try {
    const data = await fetchGEU("/Account/GetModalPopUpSetting", req);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: errorMap[err.code] || "Failed to fetch dashboard card" });
  }
};

export const circulars = async (req, res) => {
  try {
    const data = await fetchGEU("/Account/GetCircularIntention", req);
    res.json({
      ...data, 
      circular: JSON.parse(data.circular)
    });
  } catch (err) {
    res.status(500).json({ message: errorMap[err.code] || "Failed to fetch circulars" });
  }
};

export const getCircularDetails = async (req, res) => {
  try {
    const data = await fetchGEU("/Web_Teaching/GetCircularDetails", req, {
      method: "post",
      referer: "https://student.geu.ac.in/Web_StudentAcademic/Cyborg_studentCircular?id=Circular/Notice"
    });

    const circulars = JSON.parse(data.state); // ✅ this converts stringified JSON to real array

    res.json({
      success: true,
      count: circulars.length,
      circulars,
    });
  } catch (err) {
    res.status(500).json({
      message: errorMap[err.code] || "Failed to fetch circular details",
    });
  }
};



export const workshops = async (req, res) => {
  try {
    const data = await fetchGEU("/Account/FillWorkShop", req);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: errorMap[err.code] || "Failed to fetch workshops" });
  }
};

export const exams = async (req, res) => {
  try {
    const data = await fetchGEU("/Account/GetOnlineExamHome", req);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: errorMap[err.code] || "Failed to fetch exam data" });
  }
};

export const companies = async (req, res) => {
  try {
    const data = await fetchGEU("/Web_StudentAcademic/GetUpcomingCompany", req);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: errorMap[err.code] || "Failed to fetch company info" });
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
  } catch (err) {
    console.error("Error fetching profile image:", err);
    res.status(500).send("Failed to fetch profile image");
  }
};


