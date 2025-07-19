import ratelimit from "../config/upstash.js";

export const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit-key");
    if (!success) {
      return res.status(429).json({ message: "Too many request! Please try again later" });
    }
    next();
  } catch (error) {
    console.log("Error", error);
    next(error);
  }
};
