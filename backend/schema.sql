-- 1. USERS TABLE: Stores user accounts and household details
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,             -- Unique ID for each user
    email VARCHAR(100) UNIQUE NOT NULL,     -- Email for secure login; must be unique
    password_hash CHAR(60) NOT NULL,        -- Securely stored password (use hashing like bcrypt)
    first_name VARCHAR(50),
    household_size INTEGER DEFAULT 1,       -- Used for calculating consumption per capita
    target_daily_usage_L DECIMAL(10, 2) DEFAULT 300.00, -- User-defined conservation goal
    date_joined TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- 2. USAGE_LOG TABLE: Stores the main daily water consumption data
CREATE TABLE Usage_Log (
    log_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE, -- Foreign Key linking to Users
    log_date DATE NOT NULL,                  -- The specific day the usage occurred
    total_usage_L DECIMAL(10, 2) NOT NULL,   -- The total water used that day (in Liters)
    log_source VARCHAR(50) DEFAULT 'Manual_Input', -- e.g., 'Manual_Input', 'Simulated_Meter'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- Constraint to ensure one total log per user per day:
    UNIQUE (user_id, log_date)
);


-- 3. APPLIANCE_USAGE TABLE (Optional, but recommended for detailed analysis)
-- This table allows for granular breakdown of water use by appliance type.
CREATE TABLE Appliance_Usage (
    appliance_log_id SERIAL PRIMARY KEY,
    usage_log_id INTEGER NOT NULL REFERENCES Usage_Log(log_id) ON DELETE CASCADE, -- Links to the daily log
    appliance_type VARCHAR(50) NOT NULL,     -- e.g., 'Shower', 'Toilet', 'Washing_Machine'
    volume_L DECIMAL(10, 2) NOT NULL,        -- Volume consumed by this specific event/appliance
    log_time TIME WITH TIME ZONE,            -- Time of the usage event
    notes TEXT
);