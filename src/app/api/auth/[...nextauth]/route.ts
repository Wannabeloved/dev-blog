import { handlers } from "@/core/interface-adapters/auth/auth"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;
export const runtime = "nodejs"; // edge not working now, but if it works, it should be edge
