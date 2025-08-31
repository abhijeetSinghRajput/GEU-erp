import { fetchGEU } from "../utils/geuApi.js";

export const circulars = async (req, res) => {
  try {
    const data = await fetchGEU("/Account/GetCircularIntention", req);
    res.json({
      ...data, 
      circular: JSON.parse(data.circular)
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: errorMap[err.code] || "Failed to fetch circulars" });
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
  } catch (error) {
    res.status(error.status || 500).json({
      message: errorMap[err.code] || "Failed to fetch circular details",
    });
  }
};