CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    CONSTRAINT uk_users_email UNIQUE (email)
);

CREATE TABLE shelters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL
);

CREATE TABLE animals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    species VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    shelter_id INTEGER NOT NULL,
    CONSTRAINT fk_animals_shelter
        FOREIGN KEY (shelter_id)
        REFERENCES shelters(id)
        ON DELETE CASCADE
);

CREATE TABLE adoptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    animal_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_adoptions_animal UNIQUE (animal_id),
    CONSTRAINT fk_adoptions_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_adoptions_animal
        FOREIGN KEY (animal_id)
        REFERENCES animals(id)
        ON DELETE CASCADE
);

CREATE TABLE donations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    shelter_id INTEGER NOT NULL,
    amount NUMERIC(10,2) NOT NULL CHECK (amount > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_donations_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_donations_shelter
        FOREIGN KEY (shelter_id)
        REFERENCES shelters(id)
        ON DELETE CASCADE
);

CREATE TABLE visits (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    shelter_id INTEGER NOT NULL,
    visit_date TIMESTAMP NOT NULL,
    CONSTRAINT fk_visits_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_visits_shelter
        FOREIGN KEY (shelter_id)
        REFERENCES shelters(id)
        ON DELETE CASCADE
);

-- Recommended indexes for better query performance
CREATE INDEX idx_animals_shelter_id ON animals(shelter_id);
CREATE INDEX idx_adoptions_user_id ON adoptions(user_id);
CREATE INDEX idx_adoptions_animal_id ON adoptions(animal_id);
CREATE INDEX idx_donations_user_id ON donations(user_id);
CREATE INDEX idx_donations_shelter_id ON donations(shelter_id);
CREATE INDEX idx_visits_user_id ON visits(user_id);
CREATE INDEX idx_visits_shelter_id ON visits(shelter_id);
CREATE INDEX idx_visits_date ON visits(visit_date);