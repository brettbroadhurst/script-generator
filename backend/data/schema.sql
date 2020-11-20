CREATE SCHEMA sg;

CREATE TABLE sg.document ( 
	doc_id bigserial not null,
	title varchar(64) not null,
	medium smallint,
	format smallint,
	genre smallint,
	created_on timestamp not null default current_timestamp,
	updated_on timestamp not null default current_timestamp,

	PRIMARY KEY (doc_id)
);

CREATE TABLE sg.scene (
	scene_id bigserial not null,
	doc_id bigserial not null,
	title varchar(64) not null,

	PRIMARY KEY (scene_id),
	FOREIGN KEY (doc_id) REFERENCES sg.document(doc_id)
);

CREATE TABLE sg.actor (
	actor_id bigserial not null,
	doc_id bigserial not null,
	name varchar(128) not null,

	PRIMARY KEY (actor_id),
	FOREIGN KEY (doc_id) REFERENCES sg.document(doc_id)
);
