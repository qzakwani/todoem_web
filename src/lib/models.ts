interface Model {
	id: number;
}

export interface User extends Model {
	username: string;
	name: string;
	email: string | null;
	is_email_verified: boolean;
	phone_number: string;
	is_phone_number_verified: boolean;
	date_joined: string;
}

export interface Task extends Model {
	user: number;
	task: string;
	completed: boolean;
	due: string | null;
	repeat: boolean;
	repeat_frequency: 'Daily' | 'Weekly' | 'Monthly';
	description: string;
	created_at: string;
}

export interface TaskList extends Model {
	name: string;
	completed: boolean;
	sender: number;
	receiver: number;
	tasks_num: number;
	description: string;
	created_at: string;
}

export interface TaskListTask extends Model {
	id: number;
	tasklist: number;
	task: string;
	completed: boolean;
}

export interface SentTaskList extends Model {
	name: string;
	delivered: boolean;
	sender: number;
	receiver: number;
	tasks_num: number;
	description: string;
	created_at: string;
}

export interface TempSentTaskList {
	name: string;
	receiver: number;
	description: string;
	tasks: TempSentTaskListTask[];
}

export interface TempSentTaskListTask {
	task: string;
}

export interface SentTaskListTask extends Model {
	tasklist: number;
	task: string;
}

export interface TaskGroup extends Model {
	name: string;
	purpose: string;
	creator: number;
	created_at: string;
}

export interface TaskGroupTask extends Model {
	taskgroup: number;
	task: string;
	completed: boolean;
	completed_by: number;
	created_by: number;
	comment: string | null;
	due: string | null;
	edited: boolean;
	description: string;
	last_modified: string | null;
	created_at: string;
}

export interface Lister extends Model {
	username: string;
	name: string;
}

export interface ConnectedLister extends Model {
	lister: Lister;
	date_connected: string;
}

export interface ConnectionRequest extends Model {
	sender: Lister;
	sent_at: string;
}
