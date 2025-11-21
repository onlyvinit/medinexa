import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverSourceMaps: false,
  },
};

export const config = {
  server: {
    port: process.env.PORT || "5000",
    mongoUri: process.env.MONGO_URI || "",
    jwtSecret: process.env.JWT_SECRET || "",
    jwtExpire: process.env.JWT_EXPIRE || "15m",
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "",
    jwtRefreshExpire: process.env.JWT_REFRESH_EXPIRE || "1d",
    emailHost: process.env.EMAIL_HOST || "",
    emailPort: process.env.EMAIL_PORT || "587",
    emailUser: process.env.EMAIL_USER || "",
    emailPass: process.env.EMAIL_PASS || "",
    emailFrom: process.env.EMAIL_FROM || "",
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || "12"),
    maxLoginAttempts: parseInt(process.env.MAX_LOGIN_ATTEMPTS || "5"),
    lockoutTime: parseInt(process.env.LOCKOUT_TIME || "7200000"),
    rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW || "900000"),
    rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "5"),
    adminEmail: process.env.ADMIN_EMAIL || "",
    adminPassword: process.env.ADMIN_PASSWORD || "",
  },

  public: {
    nodeEnv: process.env.NODE_ENV || "development",
    frontendUrl:
      process.env.NEXT_PUBLIC_FRONTEND_URL ||
      process.env.FRONTEND_URL ||
      "http://localhost:3000",
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  },
} as const;

export const getServerConfig = () => {
  if (typeof window !== "undefined") {
    throw new Error("Server config cannot be accessed on the client side");
  }
  return config.server;
};

export const getPublicConfig = () => config.public;

export default nextConfig;
