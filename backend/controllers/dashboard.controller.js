import axios from "axios";
import { fetchGEU } from "../utils/geuApi.js";
import { errorMap } from "../constants/error.js";
import FormData from "form-data";

export const profile = async (req, res) => {
  try {
    const data = await fetchGEU("/Account/GetStudentDetail", req);
    const student = JSON.parse(data.state)[0];
    res.json(student);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: errorMap[error.code] || "Failed to fetch profile" });
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
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    const { file } = req;
    const sessionId = req.cookies["ASP.NET_SessionId"];
    const token = req.cookies["__RequestVerificationToken"];
    if (!sessionId || !token) {
      throw new Error("Credentials are missing");
    }

    if (!file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const extension = file.mimetype === "image/png" ? "png" : "jpg";
    const formData = new FormData();
    formData.append("helpSectionImages", file.buffer, {
      filename: `avatar.${extension}`,
      contentType: file.mimetype,
    });

    const response = await axios.post(
      "https://student.geu.ac.in/Web_StudentAcademic/UploadStudentImg_ostulgn",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Cookie: `ASP.NET_SessionId=${sessionId}; __RequestVerificationToken=${token}`,
          Origin: "https://student.geu.ac.in",
          Referer:
            "https://student.geu.ac.in/Web_StudentAcademic/Cyborg_StudentLogin_DocumentUpload?id=Enrollment%20Form",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error uploading avatar:", error?.response?.data || error);
    res.status(500).json({ message: "Internal server error" });
  }
};
