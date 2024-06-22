export interface CreateBookingDto {
    startDate: Date;
    endDate: Date;
    userId: number;
    cars: string[];
}
