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
	next_id    bigserial   default null,
	doc_id     bigserial   not null,
	title      varchar(64) not null,
	location   varchar(64) not null,
	time       varchar(64) not null,
	setup      varchar     not null,
	action     varchar     not null,
	conclusion varchar     not null,
	created_on timestamp   not null default current_timestamp,
	updated_on timestamp   not null default current_timestamp,

	PRIMARY KEY (scene_id),
	FOREIGN KEY (next_id) REFERENCES sg.scene,
	FOREIGN KEY (doc_id) REFERENCES sg.document(doc_id)
);

-- Actor represents a character in a story.
CREATE TABLE sg.actor (
	actor_id bigserial not null,
	doc_id bigserial not null,
	name varchar(128) not null,

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
