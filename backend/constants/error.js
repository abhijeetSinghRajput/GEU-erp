export const errorMap = {
  ETIMEDOUT: "⏳ Timeout: The server took too long to respond.",
  ECONNREFUSED: "🚫 Connection refused: Unable to reach the server.",
  ECONNRESET: "🔄 Connection reset: Unexpected socket closure.",
  ENOTFOUND: "🌐 Host not found: Invalid server address.",
  EAI_AGAIN: "🔁 DNS Lookup failed: Try again shortly.",
  EADDRINUSE: "⚠️ Port conflict detected.",
  EPIPE: "🧯 Broken pipe: Socket write failure.",
  ENETUNREACH: "📡 Network unreachable: Check your connection.",
  EHOSTUNREACH: "🚫 Host unreachable: Server might be offline.",
  EPROTO: "🔐 Protocol error: SSL/TLS issue.",
  ECONNABORTED: "⛔ Connection aborted: Likely timeout.",
};
