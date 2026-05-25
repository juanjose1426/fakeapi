import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ivewnflhuhnentxyokav.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2ZXduZmxodWhuZW50eHlva2F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NDc2MTIsImV4cCI6MjA5NTIyMzYxMn0.OqCGEW26sA2sI_Z6OySdYCdSQSxiiXkVi2NK9vBJccQ';

export const supabase = createClient(supabaseUrl, supabaseKey);