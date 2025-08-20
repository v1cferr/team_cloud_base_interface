export interface Room {
  id: number;
  name: string;
  projectId?: number;
}

export interface CreateRoomRequest {
  name: string;
  projectId: number;
}
