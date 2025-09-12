import { Code } from "lucide-react";
import React from "react";
import { CodeBlock } from "@/components/ui/code-block";

const TechnicalDeepDive = () => {
  return (
    <section id="technical" className="space-y-6">
      <div className="flex items-center gap-3">
        <Code className="w-6 h-6 text-primary" />
        <h3>Technical Deep Dive</h3>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-4">Core fetchGEU Utility</h4>
          <p className="text-muted-foreground mb-4">
            The heart of our system is the fetchGEU utility that handles all
            communication with GEU servers:
          </p>
            <div className="w-full max-w-full overflow-x-auto rounded-md">
            <CodeBlock
              filename="backend/utils/geuApi.js"
              language="js"
              code={`export const fetchGEU = async (endpoint, req, options = {}) => {
  // Extract session cookies from request
  const sessionId = req.cookies["ASP.NET_SessionId"];
  const token = req.cookies["__RequestVerificationToken"];

  if (!sessionId || !token) {
    throw new Error("Credentials are missing");
  }

  const {
    method = "get",
    data = {},
    customHeaders = {},
    referer = "https://student.geu.ac.in",
    responseType = "json",
  } = options;

  // Determine content type and encoding
  const isFormEncoded = customHeaders["Content-Type"] === 
    "application/x-www-form-urlencoded";

  const defaultHeaders = {
    "Content-Type": isFormEncoded 
      ? "application/x-www-form-urlencoded" 
      : "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Origin": "https://student.geu.ac.in",
    "Referer": referer,
    "Cookie": req.headers.cookie || 
      \`ASP.NET_SessionId=\${sessionId}; __RequestVerificationToken=\${token}\`,
    ...customHeaders,
  };

  try {
    const res = await axios({
      method,
      url: \`https://student.geu.ac.in\${endpoint}\`,
      headers: defaultHeaders,
      data: method === "post" && data
        ? isFormEncoded ? qs.stringify(data) : data
        : undefined,
      responseType,
    });

    // Detect session expiry (GEU redirects to login)
    if (typeof res.data === "string" && 
        res.data.includes("<title>Graphic Era")) {
      throw new Error("❌ Invalid session or redirected to login page.");
    }

    return res.data;
  } catch (error) {
    console.error(\`❌ Error fetching from \${endpoint}:\`, error);
    throw error;
  }
};`}
            />
          </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Session Management Strategy</h4>
          <div className="w-full max-w-full overflow-x-auto rounded-md">
            <CodeBlock
            language="js"
            filename="backend/contollers/auth.controller.js"
            code={`// Authentication flow
export const login = async (req, res) => {
  const { studentId, password, captcha, formToken } = req.body;
  const sessionId = req.cookies["ASP.NET_SessionId"];
  const cookieToken = req.cookies["__RequestVerificationToken"];

  // Validate all required tokens and credentials
  if (!studentId || !password || !captcha || !sessionId || 
      !cookieToken || !formToken) {
    return res.status(400).json({ 
      message: "Missing credentials or tokens" 
    });
  }

  // Create form data exactly as GEU expects
  const formData = new URLSearchParams();
  formData.append("hdnMsg", "GEU");
  formData.append("checkOnline", "0");
  formData.append("__RequestVerificationToken", formToken);
  formData.append("UserName", studentId);
  formData.append("Password", password);
  formData.append("clientIP", "");
  formData.append("captcha", captcha);

  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar, withCredentials: true }));

  const response = await client.post("https://student.geu.ac.in/", 
    formData, {
    maxRedirects: 0,
    validateStatus: (status) => status >= 200 && status < 400,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer": "https://student.geu.ac.in/",
      "Origin": "https://student.geu.ac.in",
      "Cookie": \`ASP.NET_SessionId=\${sessionId}; __RequestVerificationToken=\${cookieToken}\`,
    },
  });

  // Success is indicated by redirect to dashboard
  const isSuccess = response.status === 302 && 
    response.headers.location === "/Account/Cyborg_StudentMenu";

  if (isSuccess) {
    // Store session cookies for future requests
    const setCookies = response.headers["set-cookie"];
    if (setCookies) {
      setCookies.forEach((cookie) => {
        const [key, value] = cookie.split(";")[0].split("=");
        res.cookie(key, value, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        });
      });
    }
    return res.status(200).json({ message: "✅ Login successful" });
  } else {
    return res.status(401).json({ 
      message: extractLoginError(response.data) 
    });
  }
};`}
          />
        </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Error Handling & Resilience</h4>
          <div className="w-full max-w-full overflow-x-auto rounded-md">
            <CodeBlock
            language="js"
            code={`// Comprehensive error handling
try {
  const result = await fetchGEU(endpoint, req, options);
  
  // Parse JSON responses safely
  const data = JSON.parse(result.state || "[]");
  const dtLecture = JSON.parse(result.dtLecture || "[]");
  
  res.status(200).json({ state, data, dtLecture });
  
} catch (error) {
  // Map specific error codes to user-friendly messages
  const errorMessage = errorMap[error.code] || 
    "Failed to fetch data from GEU";
    
  res.status(error.status || 500).json({ 
    message: errorMessage 
  });
}

// Error mapping for better UX
export const errorMap = {
  'ECONNREFUSED': 'GEU servers are currently unavailable',
  'ETIMEDOUT': 'Request timed out - please try again',
  'ENOTFOUND': 'Cannot connect to GEU servers',
  'SESSION_EXPIRED': 'Your session has expired - please login again',
};`}
          />
        </div>
      </div>
    </section>
  );
};

export default TechnicalDeepDive;
