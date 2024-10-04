import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gpsluvsnfwaqjtdwcobs.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwc2x1dnNuZndhcWp0ZHdjb2JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2NzAyMjksImV4cCI6MjA0MzI0NjIyOX0.xnX8dLjOc9wb8wCwVuThJEoxCTyRPXjj5pZiBwwKZmY"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
