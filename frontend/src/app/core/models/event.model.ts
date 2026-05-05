export interface Event {
  id: number;
  name: string;
  type: string;
  date: string;
  description?: string;
  visibility?: string;
  status?: string;
  points: number;
}