import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://metroevxpxoyajxznvrq.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ldHJvZXZ4cHhveWFqeHpudnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzMDA0NjMsImV4cCI6MjAzNDg3NjQ2M30.xUtDC66A1qa-mn86h4EHc_sUF6S40WP1UxrG9qugRAk";

export const supabase = createClient(supabaseUrl, supabaseKey);
