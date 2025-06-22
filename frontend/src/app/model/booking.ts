

export class Booking {
  bookingId?: number;
  username: string = '';
  flightCode: string = '';
  flightName: string = '';
  origin: string = '';
  destination: string = '';
  arrivalTime: string = '';
  departureTime: string = '';
  baseFare: number = 0;
  seat: number = 0;
  checkInBaggageLimit: number = 0;
  cabinBaggageLimit: number = 0;
  status: string = '';
  totalFare: number = 0;
  bookDate: string = '';
  bookedAt: string = '';
}
