import { fetchGEU } from "../utils/geuApi.js";
const DEEMED_BASE_URL = "https://student.geu.ac.in/";
const HILL_BASE_URL = "https://student.gehu.ac.in/";

export const circulars = async (req, res) => {
  try {
    const data = await fetchGEU("/Account/GetCircularIntention", req, {method: "post"});
    res.json({
      ...data, 
      circular: JSON.parse(data.circular)
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: errorMap[error.code] || "Failed to fetch circulars" });
  }
};

export const getCircularDetails = async (req, res) => {
  try {
    const campus = req.cookies["campus"] || "deemed";
    const BASE_URL = campus === "hill" ? HILL_BASE_URL : DEEMED_BASE_URL;
    const data = await fetchGEU("/Web_Teaching/GetCircularDetails", req, {
      method: "post",
      referer: `${BASE_URL}/Web_StudentAcademic/Cyborg_studentCircular?id=Circular/Notice`
    });

    const circulars = JSON.parse(data.state); 

    res.json({
      success: true,
      count: circulars.length,
      circulars,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: errorMap[error.code] || "Failed to fetch circular details",
    });
  }
};