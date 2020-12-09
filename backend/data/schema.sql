-- data/schema.sql - Database definitions
-- Written by Brett Broadhurst <brettbroadhurst@gmail.com>
--

CREATE SCHEMA sg;

-- Document represents a container for all scenes
-- and characters. Perhaps a better name would be story?
CREATE TABLE sg.document ( 
	doc_id     bigserial   not null,
	title      varchar(64) not null,
	medium     smallint    not null default 0,
	format     smallint    not null default 0,
	genre      smallint    not null default 0,
	created_on timestamp   not null default current_timestamp,
	updated_on timestamp   not null default current_timestamp,

	PRIMARY KEY (doc_id)
);

-- Scene represents a container for all scene data in a document/story.
CREATE TABLE sg.scene (
	scene_id   bigserial   not null,
	doc_id     bigserial   not null,
	order_idx  bigserial   not null, 
	title      varchar(64) not null,
	setting    smallint    not null,
	location   varchar(64) not null,
	time       varchar(64) not null,
	setup      varchar     not null,
	action     varchar     not null,
	conclusion varchar     not null,
	created_on timestamp   not null default current_timestamp,
	updated_on timestamp   not null default current_timestamp,

	PRIMARY KEY (scene_id),
	FOREIGN KEY (doc_id) REFERENCES sg.document(doc_id) ON DELETE CASCADE
);

-- Actor represents a character in a story.
CREATE TABLE sg.actor (
	actor_id bigserial    not null,
	doc_id   bigint       not null,
	name     varchar(128) not null,

	PRIMARY KEY (actor_id),
	FOREIGN KEY (doc_id) REFERENCES sg.document(doc_id)
);

-- Change updated time when an update occurs on a table row.
-- Should be executed in a trigger for all tables that need
-- a changing timestamp for updates.
CREATE FUNCTION update_updated_on_column() RETURNS trigger
	LANGUAGE plpgsql
	as $$
BEGIN
	NEW.updated_on = NOW();
	RETURN NEW;
END;
$$;

-- Set updated time to now for every update on sg.document.
CREATE TRIGGER
	document_updated_at_modtime
BEFORE UPDATE ON
	sg.document
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-- Set updated time to now for every update on sg.scene.
CREATE TRIGGER
	scene_updated_at_modtime
BEFORE UPDATE ON
	sg.scene
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

INSERT INTO sg.document(
	title,
	medium,
	format,
	genre
) VALUES (
	'Test Document',
	1,
	1,
	1
);

INSERT INTO sg.scene(
	doc_id,
	title,
	setting,
	location,
	time,
	setup,
	action,
	conclusion
) VALUES (
	1,
	'Test Scene',
	1,
	'Location',
	'Time',
	'This is a setup',
	'This is the action',
	'This is the conclusion'
);

INSERT INTO sg.scene(
	doc_id,
	title,
	setting,
	location,
	time,
	setup,
	action,
	conclusion
) VALUES (
	1,
	'Test Scene 2',
	1,
	'Location 2',
	'Time 2',
	'This is a setup 2',
	'This is the action 2',
	'This is the conclusion 2'
);
