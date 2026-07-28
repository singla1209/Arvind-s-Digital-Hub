import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://evmlvpcnzgufvfoxqcid.supabase.co";

const supabaseKey = "YOUR_PUBLISHABLE_KEY";

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);
