import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if(decision.isDenied()) {
      if(decision.reason.isRateLimit()) {
        return res.status(429).json({msg : "Rate limit exceeded, Please try again later."});
      } else if(decision.reason.isBot()) {
        return res.status(403).json({msg : "Bot access denied."});
      } else {
        return res.status(403).json(
          {msg : "Access denied by Security Policy."}
        )
      }
      
    } 

    //  Check for spoofed bots

    if(decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        msg: "malicious bot acitivity detected."
      })
    }

    next();
  } catch (error) {
    console.log("Arcjet Protection Error:", error);
    next();
  }
};