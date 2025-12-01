import { errorMap } from "../constants/error.js";
import { fetchGEU } from "../utils/geuApi.js";

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
    const BASE_URL = req.BASE_URL;
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