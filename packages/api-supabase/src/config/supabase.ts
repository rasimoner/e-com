import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://imfwtcuzgkwjvvxavrmv.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltZnd0Y3V6Z2t3anZ2eGF2cm12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNDExMDUsImV4cCI6MjA2NjYxNzEwNX0.QivlSS-OyUMsxmnCSMs_Zz4Eet-2VAZpGL46w96IkL0";

export const supabase = createClient(supabaseUrl, supabaseKey);
