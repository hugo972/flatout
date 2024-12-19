// Code generated by tygo. DO NOT EDIT.

//////////
// source: cars.go

export interface CarTire {
  brand: string;
  size: string;
}
export interface Car {
  driverId: string;
  drivetrain: string;
  enginePlacement: string;
  horsepower: number /* int */;
  id: string;
  mods: string[];
  tires: CarTire;
  title: string;
}

//////////
// source: drivers.go

export interface Driver {
  id: string;
  name: string;
}

//////////
// source: events.go

export interface Event {
  id: string;
  name: string;
  parentEventId?: string;
  time: any /* time.Time */;
  trackLayoutId: string;
}
export interface EventResult {
  id: string;
  carId: string;
  driverId: string;
  eventId: string;
  lapTime: number /* float64 */;
}
export interface EventModel {
  id: string;
  name: string;
  events: EventModelEvent[];
}
export interface EventModelEvent {
  id: string;
  name: string;
  results: EventResult[];
  time: any /* time.Time */;
  trackLayout: TrackLayout;
}

//////////
// source: images.go

export interface Image {
  data: string;
  id: string;
}

//////////
// source: tracks.go

export interface Track {
  id: string;
  name: string;
}
export interface TrackLayout {
  id: string;
  name: string;
  imageId: string;
  trackId: string;
}
