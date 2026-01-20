export interface User {
  id: number;
  email: string;
}

export interface Task {
  id: number;
  user_id: number;
  title: string;
}
