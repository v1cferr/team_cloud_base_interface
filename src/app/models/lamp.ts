export interface Lamp {
  id: number;
  name: string;
  isOn?: boolean;
  status?: boolean;
  roomId?: number;
  roomName?: string;
}

export interface CreateLampRequest {
  name: string;
  roomId: number;
}
