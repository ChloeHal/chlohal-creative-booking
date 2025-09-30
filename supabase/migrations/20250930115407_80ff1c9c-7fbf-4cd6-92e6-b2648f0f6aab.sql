-- Fix security warnings by setting search_path on functions

-- Recreate update_slot_availability function with security definer and search_path
CREATE OR REPLACE FUNCTION update_slot_availability()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE time_slots
  SET is_available = false
  WHERE id = NEW.time_slot_id;
  RETURN NEW;
END;
$$;

-- Recreate update_updated_at_column function with security definer and search_path
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;