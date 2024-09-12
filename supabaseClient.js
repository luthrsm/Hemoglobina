import { createClient } from '@supabase/supabase-js';

// URL e chave da API do seu projeto Supabase
const supabaseUrl = 'https://unbcrqbkielsyyodvpso.supabase.co';  // Substitua pelo seu Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuYmNycWJraWVsc3l5b2R2cHNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU1NzUwODksImV4cCI6MjA0MTE1MTA4OX0.-ImEohudh9Hfwhc_374s4vcZmDPmb20CdEAT2ejr1ec';  // Substitua pela sua chave pública do Supabase

const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: { enabled: false } // Desativa a funcionalidade Realtime
});

export default supabase;
