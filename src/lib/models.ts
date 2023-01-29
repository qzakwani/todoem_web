export class User {
	id: number;
	username: string;
	name?: string;
	email?: string;
	is_email_verified: boolean;
	phone_number?: string;
	is_phone_number_verified: boolean;
	date_joined: string;

	constructor(
		id: number,
		username: string,
		is_email_verified: boolean,
		is_phone_number_verified: boolean,
		date_joined: string,
		name?: string,
		email?: string,
		phone_number?: string
	) {
		this.id = id;
		this.username = username;
		this.is_email_verified = is_email_verified;
		this.is_phone_number_verified = is_phone_number_verified;
		this.date_joined = date_joined;
		this.name = name;
		this.email = email;
		this.phone_number = phone_number;
	}
}

export class Task {
	id: number;
	user: number;
	task: string;
	completed: boolean;
	due?: string;
	repeat: boolean;
	repeat_frequency: 'Daily' | 'Weekly' | 'Monthly';
	description?: string;
	created_at: string;

	constructor(id: number) {
		this.id = id;
	}
}

export class TaskList {
	id: number;
	name: string;
	completed: boolean;
	sender: number;
	receiver: number;
	tasks_num: number;
	description?: string;
	created_at: string;
}

export class TaskListTask {
	id: number;
	tasklist: number;
	task: string;
	completed: boolean;
}

export class SentTaskList {
	id: number;
	name: string;
	delivered: boolean;
	sender: number;
	receiver: number;
	tasks_num: number;
	description?: string;
	created_at: string;
}

export class SentTaskListTask {
	id: number;
	tasklist: number;
	task: string;
}

export class TaskGroup {
	id: number;
	name: string;
	purpose: string;
	creator: number;
	created_at: string;
}

export class TaskGroupTask {
	id: number;
	taskgroup: number;
	task: string;
	completed: boolean;
	completed_by: number;
	created_by: number;
	comment?: string;
	due?: string;
	edited: boolean;
	description?: string;
	last_modified?: string;
	created_at: string;
}
