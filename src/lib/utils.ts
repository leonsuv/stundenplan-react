import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const loggedOutBearer = "Bearer ";

export interface EventDay {
  Date: string; 
  Event: Event[];
}

export interface Event {
  Title: string;
  Kind: string; 
  Teacher: string;
  Starttime: Time;
  Endtime: Time;
  Rooms: string[];
}

interface Time {
  Hour: string; 
  Minute: string;
}

export interface Contact {
  CardTitle: string;
  information: {
    Name: string;
    Email: string;
    Organisation: string;
    Telefonzentrale: string;
    Ort: string;
  };
}
