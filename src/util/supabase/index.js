import { createClient } from "@supabase/supabase-js";
import { SUPABSE_CREDS } from "../../constant";

export const supabase = createClient(
  `${SUPABSE_CREDS.COMMON_URL}`,
  `${SUPABSE_CREDS.PUBLIC_API_KEY}`
);
