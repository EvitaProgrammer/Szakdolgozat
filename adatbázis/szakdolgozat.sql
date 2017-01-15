CREATE DATABASE szakdolgozat;

CREATE TABLE helyszinek(
	varos VARCHAR(100) PRIMARY KEY,
	latitude DECIMAL,
	longitude DECIMAL
);

CREATE TABLE esemenyek(
	esemeny DATE PRIMARY KEY,
	ev VARCHAR(16),
	cim VARCHAR(256)
);

CREATE TABLE szemelyek(
	id NOT NULL AUTO_INCREMENT,
	nev VARCHAR(128),
	esemeny DATE,
	url VARCHAR(256),
	helyszin VARCHAR(100),
	FOREIGN KEY (helyszin) REFERENCES helyszinek(varos),
	FOREIGN KEY (esemeny) REFERENCES esemenyek(esemeny)
);

INSERT INTO helyszinek(varos, latitude, longitude) VALUES('Szeged', 20.1486016, 46.2546312);
INSERT INTO helyszinek(varos, latitude, longitude) VALUES('Stockholm', 18.0710935, 59.3251172);
INSERT INTO helyszinek(varos, latitude, longitude) VALUES('Budapest', 19.0404707, 47.4983815);
INSERT INTO helyszinek(varos, latitude, longitude) VALUES('Tátraszéplak', 20.1864306, 49.1233184);
INSERT INTO helyszinek(varos, latitude, longitude) VALUES('Belgrád', 20.4568089, 44.8178787);
INSERT INTO helyszinek(varos, latitude, longitude) VALUES('London', -0.1276474, 51.5073219);
INSERT INTO helyszinek(varos, latitude, longitude) VALUES('Boston', -71.1219945, 42.3662654);
INSERT INTO helyszinek(varos, latitude, longitude) VALUES('Luzern', 8.3054682, 47.0505452);
INSERT INTO helyszinek(varos, latitude, longitude) VALUES('Róma', 12.47311, 41.8988173);
INSERT INTO helyszinek(varos, latitude, longitude) VALUES('Győr', 17.6346815, 47.687609);
INSERT INTO helyszinek(varos, latitude, longitude) VALUES('Göteburg', 11.9670171, 57.7072326);
INSERT INTO helyszinek(varos, latitude, longitude) VALUES('Miskolc', 20.7902158, 48.1031517);
INSERT INTO helyszinek(varos, latitude, longitude) VALUES('Beaufort', 7.2484362, 45.9458381);
INSERT INTO helyszinek(varos, latitude, longitude) VALUES('Liege', 5.5734203, 50.6451381);
INSERT INTO helyszinek(varos, latitude, longitude) VALUES('Krakkó', 19.9368564, 50.0619474);
INSERT INTO helyszinek(varos, latitude, longitude) VALUES('Párizs', 2.3514992, 48.8566101);

INSERT INTO esemenyek(esemeny, ev, cim) VALUES(?, ?, ?);

INSERT INTO szemelyek(nev, esemeny, url, helyszin) VALUES(?, ?, ?, ?);