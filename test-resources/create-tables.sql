USE acuaterra_db;

-- Tabla de roles
CREATE TABLE IF NOT EXISTS rol
(
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS user
(
    id       INT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(100) NOT NULL,
    email    VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    dni      VARCHAR(255) NOT NULL UNIQUE,
    id_rol   INT          NOT NULL DEFAULT 1,
    FOREIGN KEY (id_rol) REFERENCES rol (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS farm
(
    id        INT AUTO_INCREMENT PRIMARY KEY,
    name      VARCHAR(100) NOT NULL,
    address   VARCHAR(256) NOT NULL,
    latitude  VARCHAR(256) NOT NULL,
    longitude VARCHAR(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS farm_user
(
    id_user INT NOT NULL,
    id_farm INT NOT NULL,
    PRIMARY KEY (id_user, id_farm),
    FOREIGN KEY (id_user) REFERENCES farm (id) ON DELETE CASCADE,
    FOREIGN KEY (id_farm) REFERENCES user (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS module
(
    id                 INT AUTO_INCREMENT PRIMARY KEY,
    name               VARCHAR(100) NOT NULL,
    location           TEXT,
    species_fish       VARCHAR(100) NOT NULL,
    fish_quantity      VARCHAR(100) NOT NULL,
    fish_age           VARCHAR(100) NOT NULL,
    dimensions         VARCHAR(100) NOT NULL,
    created_by_user_id INT          NOT NULL,
    FOREIGN KEY (created_by_user_id) REFERENCES user (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS module_user
(
    id_module INT NOT NULL,
    id_person INT NOT NULL,
    PRIMARY KEY (id_module, id_person),
    FOREIGN KEY (id_module) REFERENCES module (id) ON DELETE CASCADE,
    FOREIGN KEY (id_person) REFERENCES user (id) ON DELETE CASCADE
);

-- Tabla de hardware
CREATE TABLE IF NOT EXISTS hardware
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    description TEXT,
    id_module   INT          NOT NULL,
    FOREIGN KEY (id_module) REFERENCES module (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sensor
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    type        VARCHAR(50),
    id_hardware INT          NOT NULL,
    FOREIGN KEY (id_hardware) REFERENCES hardware (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS threshold
(
    id        INT AUTO_INCREMENT PRIMARY KEY,
    id_sensor INT NOT NULL,
    min_value DECIMAL(10, 2),
    max_value DECIMAL(10, 2),
    FOREIGN KEY (id_sensor) REFERENCES sensor (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS binnacle
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    id_module   INT  NOT NULL,
    date        DATE NOT NULL,
    description TEXT,
    FOREIGN KEY (id_module) REFERENCES module (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notification
(
    id        INT AUTO_INCREMENT PRIMARY KEY,
    id_module INT         NOT NULL,
    type      VARCHAR(50) NOT NULL,
    message   TEXT        NOT NULL,
    date_hour DATETIME    NOT NULL,
    FOREIGN KEY (id_module) REFERENCES module (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS report
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    id_module   INT  NOT NULL,
    start_date  DATE NOT NULL,
    finish_date DATE NOT NULL,
    data        JSON,
    FOREIGN KEY (id_module) REFERENCES module (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS parameter
(
    id        INT AUTO_INCREMENT PRIMARY KEY,
    id_sensor INT            NOT NULL,
    value     DECIMAL(10, 2) NOT NULL,
    date_hour DATETIME       NOT NULL,
    FOREIGN KEY (id_sensor) REFERENCES sensor (id) ON DELETE CASCADE
);
