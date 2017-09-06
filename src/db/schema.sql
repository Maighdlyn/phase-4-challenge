CREATE TABLE albums (
  id SERIAL,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  user_id SERIAL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  join_date DATE DEFAULT CURRENT_DATE,
  photo VARCHAR(255) DEFAULT '/pictures/profile.jpg'
);
