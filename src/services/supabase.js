import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://atkekervqrtyhulonkwq.supabase.co";
export const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0a2VrZXJ2cXJ0eWh1bG9ua3dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY2OTk2MzEsImV4cCI6MjAxMjI3NTYzMX0.4GNd0z55NsFsE25PcP1wg5c3a4WEhxN5bRZQt7essak";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
