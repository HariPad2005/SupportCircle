import Constants from 'expo-constants';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = Constants.expoConfig.extra.SUPABASE_URL;
const supabaseAnonKey = Constants.expoConfig.extra.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
