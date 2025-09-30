-- Create enum for workshop types
CREATE TYPE workshop_type AS ENUM ('couture', 'linogravure');

-- Create enum for location types
CREATE TYPE location_type AS ENUM ('chez_moi', 'chez_participant');

-- Create enum for support types
CREATE TYPE support_type AS ENUM ('apporte', 'fourni');

-- Create time slots table
CREATE TABLE time_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workshop_type workshop_type NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  max_participants INTEGER NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create bookings table for couture workshops
CREATE TABLE bookings_couture (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  time_slot_id UUID REFERENCES time_slots(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  snack_preference TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create bookings table for linogravure workshops
CREATE TABLE bookings_linogravure (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  time_slot_id UUID REFERENCES time_slots(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  bring_support support_type NOT NULL,
  support_type_detail TEXT,
  location location_type NOT NULL,
  participant_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings_couture ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings_linogravure ENABLE ROW LEVEL SECURITY;

-- RLS Policies for time_slots (public can view, only authenticated can modify)
CREATE POLICY "Anyone can view available time slots"
  ON time_slots FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage time slots"
  ON time_slots FOR ALL
  USING (auth.role() = 'authenticated');

-- RLS Policies for bookings (public can insert, authenticated can view all)
CREATE POLICY "Anyone can create couture bookings"
  ON bookings_couture FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all couture bookings"
  ON bookings_couture FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can create linogravure bookings"
  ON bookings_linogravure FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all linogravure bookings"
  ON bookings_linogravure FOR SELECT
  USING (auth.role() = 'authenticated');

-- Function to update time slot availability
CREATE OR REPLACE FUNCTION update_slot_availability()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE time_slots
  SET is_available = false
  WHERE id = NEW.time_slot_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically mark slots as unavailable when booked
CREATE TRIGGER mark_couture_slot_unavailable
  AFTER INSERT ON bookings_couture
  FOR EACH ROW
  EXECUTE FUNCTION update_slot_availability();

CREATE TRIGGER mark_linogravure_slot_unavailable
  AFTER INSERT ON bookings_linogravure
  FOR EACH ROW
  EXECUTE FUNCTION update_slot_availability();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for time_slots updated_at
CREATE TRIGGER update_time_slots_updated_at
  BEFORE UPDATE ON time_slots
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();