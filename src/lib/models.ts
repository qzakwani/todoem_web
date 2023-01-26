export interface User {
	id: number;
	username: string;
	name?: string;
	email?: string;
	is_email_verified: boolean;
	phone_number?: string;
	is_phone_number_verified: boolean;
	date_joined: string;
}

export interface Task {
	id: number;
	user: number;
	task: string;
	completed: boolean;
	due?: string;
	repeat: boolean;
	repeat_frequency: 'Daily' | 'Weekly' | 'Monthly';
	description?: string;
	created_at: string;
}

export interface TaskList {
	id: number;
	name: string;
	completed: boolean;
	sender: number;
	receiver: number;
	tasks_num: number;
	description?: string;
	created_at: string;
}

export interface TaskListTask {
	id: number;
	tasklist: number;
	task: string;
	completed: boolean;
}

export interface SentTaskList {
	id: number;
	name: string;
	delivered: boolean;
	sender: number;
	receiver: number;
	tasks_num: number;
	description?: string;
	created_at: string;
}

export interface SentTaskListTask {
	id: number;
	tasklist: number;
	task: string;
}

export interface TaskGroup {
	id: number;
	name: string;
	purpose: string;
	creator: number;
	created_at: string;
}

export interface TaskGroupTask {
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
