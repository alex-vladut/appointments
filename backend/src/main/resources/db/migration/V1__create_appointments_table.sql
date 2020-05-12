CREATE TABLE IF NOT EXISTS appointment
(
    id              UUID PRIMARY KEY,
    title           VARCHAR(250)             NOT NULL,
    start_date_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date_time   TIMESTAMP WITH TIME ZONE NOT NULL,
    version         INT                      NOT NULL DEFAULT 0
)