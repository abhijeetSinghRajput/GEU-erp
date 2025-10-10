import { clsx } from "clsx";
import {
  parse,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
} from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const validateLoginForm = (formData, onError) => {
  let valid = true;
  const newErrors = {
    studentId: "",
    password: "",
    captcha: "",
    form: "",
  };

  if (!formData.studentId.trim()) {
    newErrors.studentId = "Student ID is required";
    valid = false;
  }

  if (!formData.password.trim()) {
    newErrors.password = "Password is required";
    valid = false;
  }

  if (!formData.captcha.trim()) {
    newErrors.captcha = "Captcha is required";
    valid = false;
  }

  onError(newErrors);
  return valid;
};

export const formatRelativeDate = (dateString) => {
  try {
    // Parse the date string in dd/MM/yyyy format
    const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
    const now = new Date();

    const minutes = differenceInMinutes(now, parsedDate);
    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    const hours = differenceInHours(now, parsedDate);
    if (hours < 24) {
      return `${hours} hr ago`;
    }

    const days = differenceInDays(now, parsedDate);
    if (days < 7) {
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }

    const weeks = differenceInWeeks(now, parsedDate);
    if (weeks < 4) {
      return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
    }

    const months = differenceInMonths(now, parsedDate);
    if (months < 12) {
      return `${months} month${months !== 1 ? "s" : ""} ago`;
    }

    const years = differenceInYears(now, parsedDate);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Return the original string if formatting fails
  }
};

// Helper function to download blob
export const  downloadBlob = (blob, filename) => {
  // Helper function to detect Android WebView
  const isAndroidWebView = () => {
    return (
      window.Android && typeof window.Android.downloadBase64 === "function"
    );
  };
  if (isAndroidWebView()) {
    // Android WebView download
    const reader = new FileReader();
    reader.onload = function () {
      const base64Data = reader.result.split(",")[1];
      window.Android.downloadBase64(
        base64Data,
        blob.type || "application/octet-stream",
        filename
      );
    };
    reader.readAsDataURL(blob);
  } else {
    // Web browser download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }
};
