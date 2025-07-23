import Vapi from "@vapi-ai/web";
/**
 * This file initializes the Vapi SDK with the API key from environment variables.
 * Ensure that the NEXT_PUBLIC_VAPI_API_KEY is set in your environment.
 */
if (!process.env.NEXT_PUBLIC_VAPI_API_KEY) {
  throw new Error(
    "NEXT_PUBLIC_VAPI_API_KEY is not set in the environment variables."
  );
}
export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);
