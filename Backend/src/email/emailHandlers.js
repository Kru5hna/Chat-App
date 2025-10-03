import { createWelcomeEmailTemplate } from "./emailTemplate.js";
import {resendClient, sender} from "../lib/resend.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
   console.log(`Sending welcome email to ${name} at ${email}`);
   // Here you would integrate with an email service provider

   const {data, error}= await resendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Welcome to Chat Application! 🎉",
      html: createWelcomeEmailTemplate(name, clientURL),
   });
   if(error){
      console.error("Error sending email:", error);
      throw new Error("Failed to send welcome email");
   }
   console.log("Welcome email sent successfully:", data);
   return data;
}  