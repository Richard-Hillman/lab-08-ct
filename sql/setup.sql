DROP TABLE if EXISTS model_s CASCADE;
DROP TABLE IF EXISTS cyber_trucks CASCADE;
DROP TABLE IF EXISTS models_cybertruck;


CREATE TABLE  model_s (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  descript TEXT NOT NULL, 
  model TEXT NOT NULL,
  color TEXT NOT NULL,
  wheel_type TEXT NOT NULL,
  interior TEXT NOT NULL
);

CREATE TABLE cyber_trucks (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  descript TEXT NOT NULL,
  color TEXT NOT NULL
); 

CREATE TABLE models_cybertruck (
  model_s_id BIGINT REFERENCES model_s(id),
  cyber_trucks_id BIGINT REFERENCES cyber_trucks(id),
  PRIMARY KEY(model_s_id, cyber_trucks_id)
);
