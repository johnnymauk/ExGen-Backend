CREATE TABLE musclegroup(
	musclegroup_id INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR NOT NULL UNIQUE,
	PRIMARY KEY(musclegroup_id)
);

CREATE TABLE focus(
	focus_id INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR NOT NULL UNIQUE,
	PRIMARY KEY(focus_id)
);

CREATE TABLE difficulty(
	difficulty_id INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR NOT NULL UNIQUE,
	val	INT NOT NULL UNIQUE,
	PRIMARY KEY(difficulty_id)
);

CREATE TABLE equipment(
	equipment_id INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR NOT NULL UNIQUE,
	PRIMARY KEY(equipment_id)
);

CREATE TABLE impact(
	impact_id INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR NOT NULL UNIQUE,
	val INT NOT NULL UNIQUE,
	PRIMARY KEY(impact_id)
);

CREATE TABLE intensity(
	intensity_id INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR NOT NULL UNIQUE,
	val INT NOT NULL UNIQUE,
	PRIMARY KEY(intensity_id)
);

CREATE TABLE tag(
	tag_id INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR NOT NULL UNIQUE,
	PRIMARY KEY(tag_id)
);

CREATE TABLE account(
	account_id INT GENERATED ALWAYS AS IDENTITY,
	email VARCHAR NOT NULL UNIQUE,
	password CHAR(60) NOT NULL,
	fname VARCHAR NOT NULL,
	lname VARCHAR NOT NULL,
	PRIMARY KEY(account_id)
);

CREATE TABLE muscle(
	muscle_id INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR NOT NULL UNIQUE,
	musclegroup_id INTEGER,
	PRIMARY KEY(muscle_id),
	CONSTRAINT fk_musclegroup
		FOREIGN KEY(musclegroup_id)
			References musclegroup(musclegroup_id)
			ON DELETE SET NULL
);	

CREATE TABLE exercise(
	exercise_id INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR NOT NULL UNIQUE,
	isCompound BOOLEAN NOT NULL,
	description TEXT,
	difficulty_id INT,
	impact_id INT,
	intensity_id INT,
	PRIMARY KEY(exercise_id),
	CONSTRAINT fk_difficulty
		FOREIGN KEY(difficulty_id)
			REFERENCES difficulty(difficulty_id)
			ON DELETE SET NULL,
	CONSTRAINT fk_impact
		FOREIGN KEY(impact_id)
			REFERENCES impact(impact_id)
			ON DELETE SET NULL,
	CONSTRAINT fk_intensity
		FOREIGN KEY(intensity_id)
			REFERENCES intensity(intensity_id)
			ON DELETE SET NULL
);

CREATE TABLE exerciseequipment(
	exercise_id INT NOT NULL,
	equipment_id INT NOT NULL,
	PRIMARY KEY(exercise_id, equipment_id),
	CONSTRAINT fk_exercise
		FOREIGN KEY(exercise_id)
			REFERENCES exercise(exercise_id)
			ON DELETE CASCADE,
	CONSTRAINT fk_equipment
		FOREIGN KEY(equipment_id)
			REFERENCES equipment(equipment_id)
			ON DELETE CASCADE
);

CREATE TABLE exercisefocus(
	exercise_id INT NOT NULL,
	focus_id INT NOT NULL,
	PRIMARY KEY(exercise_id, focus_id),
	CONSTRAINT fk_exercise
		FOREIGN KEY(exercise_id)
			REFERENCES exercise(exercise_id)
			ON DELETE CASCADE,
	CONSTRAINT fk_focus
		FOREIGN KEY(focus_id)
			REFERENCES focus(focus_id)
			ON DELETE CASCADE
);

CREATE TABLE exercisemuscle(
	exercise_id INT NOT NULL,
	muscle_id INT NOT NULL,
	isPrimary BOOLEAN NOT NULL,
	PRIMARY KEY(exercise_id, muscle_id),
	CONSTRAINT fk_exercise
		FOREIGN KEY(exercise_id)
			REFERENCES exercise(exercise_id)
			ON DELETE CASCADE,
	CONSTRAINT fk_muscle
		FOREIGN KEY(muscle_id)
			REFERENCES muscle(muscle_id)
			ON DELETE CASCADE
);

CREATE TABLE exercisetag(
	exercise_id INT NOT NULL,
	tag_id INT NOT NULL,
	PRIMARY KEY(exercise_id,tag_id),
	CONSTRAINT fk_exercise
		FOREIGN KEY(exercise_id)
			REFERENCES exercise(exercise_id)
			ON DELETE CASCADE,
	CONSTRAINT fk_tag
		FOREIGN KEY(tag_id)
			REFERENCES tag(tag_id)
			ON DELETE CASCADE
);

CREATE TABLE program(
	program_id INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR NOT NULL,
	account_id INT NOT NULL,
	PRIMARY KEY(program_id),
	UNIQUE(name, account_id),
	CONSTRAINT fk_account
		FOREIGN KEY(account_id)
			REFERENCES account(account_id)
			ON DELETE CASCADE
);

CREATE TABLE programexercise(
	program_id INT NOT NULL,
	exercise_id INT NOT NULL,
	place INT NOT NULL,
	reps INT,
	weight INT,
	PRIMARY KEY(program_id, exercise_id, place),
	CONSTRAINT fk_program
		FOREIGN KEY(program_id)
			REFERENCES program(program_id)
			ON DELETE CASCADE,
	CONSTRAINT fk_exercise
		FOREIGN KEY(exercise_id)
			REFERENCES exercise(exercise_id)
			ON DELETE CASCADE
);

CREATE TABLE template(
	template_id INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR NOT NULL,
	ispublic BOOLEAN NOT NULL,
	created_by INT,
	PRIMARY KEY(template_id),
	CONSTRAINT fk_account
		FOREIGN KEY(created_by)
			REFERENCES account(account_id)
			ON DELETE SET NULL
);

CREATE TABLE filter(
	filter_id INT GENERATED ALWAYS AS IDENTITY,
	hashed CHAR(32),
	details JSON NOT NULL,
	PRIMARY KEY(filter_id)
);

CREATE TABLE templatefilter(
	template_id INT,
	filter_id INT,
	place INT,
	PRIMARY KEY(template_id, filter_id, place),
	CONSTRAINT fk_template
		FOREIGN KEY(template_id)
			REFERENCES template(template_id)
			ON DELETE CASCADE,
	CONSTRAINT fk_filter
		FOREIGN KEY(filter_id)
			REFERENCES filter(filter_id)
			ON DELETE CASCADE
);