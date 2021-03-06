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
	actor_id      bigserial    not null,
	doc_id        bigint       not null,
	name          varchar(128) not null,
	avatar        varchar(64)  not null,
	meta_role     smallint     not null,
	priority      smallint     not null,
	ext_strength  varchar(128) not null,
	ext_weakness  varchar(128) not null,
	int_virtue    varchar(128) not null,
	int_flaw      varchar(128) not null,
	prime_desire  varchar(128) not null,
	starting_goal varchar(128) not null,
	ultimate_goal varchar(128) not null,
	denouement    varchar(128) not null,
	created_on    timestamp    not null default current_timestamp,
	updated_on    timestamp    not null default current_timestamp,

	PRIMARY KEY (actor_id),
	FOREIGN KEY (doc_id) REFERENCES sg.document(doc_id) ON DELETE CASCADE
);

--CREATE TABLE sg.actor_relationship ();
--CREATE TABLE sg.actor_belief ();
--CREATE TABLE sg.actor_value ();
--CREATE TABLE sg.actor_routine ();
--CREATE TABLE sg.actor_duty ();

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

-- Set updated time to now for every update on sg.actor.
CREATE TRIGGER
	actor_updated_at_modtime
BEFORE UPDATE ON
	sg.actor
FOR EACH ROW EXECUTE PROCEDURE update_updated_on_column();

-- Seed data
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
