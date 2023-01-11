INSERT INTO users (username, email, password, registration_timestamp)
VALUES (${username}, ${email}, ${password}, now())
ON CONFLICT(username) DO NOTHING
RETURNING id;
