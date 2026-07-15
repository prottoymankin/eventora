export type Booking = {
  _id: string;

  userId: string;
  userName: string;

  organizerId: string;
  organizerName: string;

  eventId: string;
  eventTitle: string;

  ticketPrice: number;

  bookingStatus: string;

  createdAt: string;
};

export type CreateBooking = Omit<Booking, "_id">;