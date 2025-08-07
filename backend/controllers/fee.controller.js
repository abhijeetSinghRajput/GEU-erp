import { fetchGEU } from "../utils/geuApi.js"

import qs from "qs";

export const getFeeSubmissions = async (req, res) => {
  const { feeType = 2, duration = 0 } = req.query;

  try {
    const payload = qs.stringify({ FeeType: feeType, duration });

    const response = await fetchGEU("/Web_StudentFinance/FillHead", req, {
      method: "POST",
      customHeaders: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: payload,
    });
    const feeSubmitions = {
        ...response ,
        headdata : JSON.parse(response.headdata),
        headdatahostel : JSON.parse(response.headdatahostel),
    };
    return res.status(200).json({feeSubmitions});
  } catch (error) {
    console.error("Error fetching fee submission:", error);
    return res.status(500).json({ message: "Failed to fetch fee data" });
  }
};
