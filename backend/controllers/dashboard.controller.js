import axios from "axios";
import { fetchGEU } from "../utils/geuApi.js";

export const profile = async (req, res) => {
  try {
    const data = await fetchGEU("/Account/GetStudentDetail");
    const student = JSON.parse(data.state)[0];
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile", error: err.message });
  }
};

export const results = async (req, res) => {
  try {
    const data = await fetchGEU("/Account/GetResultIntension");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch results", error: err.message });
  }
};

export const messages = async (req, res) => {
  try {
    const data = await fetchGEU("/Account/GetStudentMsgHistory");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages", error: err.message });
  }
};

export const dashboardCard = async (req, res) => {
  try {
    const data = await fetchGEU("/Account/GetModalPopUpSetting");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch dashboard card", error: err.message });
  }
};

export const circulars = async (req, res) => {
  try {
    const data = await fetchGEU("/Account/GetCircularIntention");
    res.json({
      ...data, 
      circular: JSON.parse(data.circular)
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch circulars", error: err.message });
  }
};

export const workshops = async (req, res) => {
  try {
    const data = await fetchGEU("/Account/FillWorkShop");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch workshops", error: err.message });
  }
};

export const exams = async (req, res) => {
  try {
    const data = await fetchGEU("/Account/GetOnlineExamHome");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch exam data", error: err.message });
  }
};

export const companies = async (req, res) => {
  try {
    const data = await fetchGEU("/Web_StudentAcademic/GetUpcomingCompany");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch company info", error: err.message });
  }
};



export const avatar = async (req, res) => {
  try {
    const imageResponse = await axios.get("https://student.geu.ac.in/Account/show", {
      headers: {
        Cookie: `ASP.NET_SessionId=${process.env.sessionId}; __RequestVerificationToken=${process.env.token}`,
      },
      responseType: "arraybuffer",
    });

    // Set content-type header
    res.set("Content-Type", "image/png");

    // Send raw image buffer
    res.send(imageResponse.data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to fetch profile");
  }
};


