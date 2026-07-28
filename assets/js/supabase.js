import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://evmlvpcnzgufvfoxqcid.supabase.co";

const supabaseKey = "sb_publishable_AV0IPwKlo_BICRrbN_4egA_9XBxi_Jf";

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);
