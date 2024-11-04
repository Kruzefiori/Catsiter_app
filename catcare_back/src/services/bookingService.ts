import { PrismaClient, Prisma, bookingStatus } from "@prisma/client";


interface visits {
    visitDate: string;
    status?: string;
    notes?: string;
}

interface bookingInfo {
    visits: visits[];
    requesterId: number; // user who is requesting
    requestedId: number // user who is requested
    startDate: string // date and time of the service starts
    endDate: string // date and time of the service ends
    generalNotes?: string;
}

class BookingService {
    prisma = new PrismaClient();

    async createBooking(body: bookingInfo) {
        const { visits, requesterId, requestedId, startDate, endDate, generalNotes } = body;
        // Create a booking
        const booking = await this.prisma.booking.create({
            data: {
                requesterId: requesterId,
                requestedId: requestedId,
                startDate: (new Date(startDate)).toISOString(),
                endDate: (new Date(endDate)).toISOString(),
                totalVisits: visits.length,
                generalNotes: generalNotes,
            }
        });

        // Create visits
        visits.forEach(async (visit) => {
            await this.prisma.visit.create({
                data: {
                    visitDate: (new Date(visit.visitDate)).toISOString(),
                    bookingId: booking.id,
                }
            });
        });

        return booking;
    }

    async updateBooking(bookingId: number, body: bookingInfo) {
        const { visits, requesterId, requestedId, startDate, endDate, generalNotes } = body;

        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId }
        });

        if (!booking) {
            throw new Error("Booking not found");
        }

        if (booking.status !== "PENDING") {
            //update status to pending
            await this.prisma.booking.update({
                where: { id: bookingId },
                data: { status: "PENDING" }
            });
        }

        // Update booking
        const update = await this.prisma.booking.update({
            where: { id: bookingId },
            data: {
                requesterId: requesterId ? requesterId : booking.requesterId,
                requestedId: requestedId ? requestedId : booking.requestedId,
                startDate: startDate ? startDate : booking.startDate,
                endDate: endDate ? endDate : booking.endDate,
                totalVisits: visits.length,
                generalNotes: generalNotes ? generalNotes : booking.generalNotes,
            }
        });

        // Delete all visits
        await this.prisma.visit.deleteMany({
            where: {
                bookingId: bookingId
            }
        });

        // Create visits
        visits.forEach(async (visit) => {
            await this.prisma.visit.create({
                data: {
                    visitDate: visit.visitDate,
                    bookingId: bookingId,
                    visitNotes: visit.notes ? visit.notes : "",
                }
            });
        });

        return update;
    }

    async getBookingByRequesterAndStatus(userId: number, status: bookingStatus ) {
        return await this.prisma.booking.findMany({
            where: {
                requesterId: userId,
                status: status
            },
        });
    }

    async getBookingByRequestedAndStatus(userId: number, status: bookingStatus) {
        return await this.prisma.booking.findMany({
            where: {
                requestedId: userId,
                status: status
            },
        });
    }

    async answerBooking(bookingId: number, status: bookingStatus) {
        if(status === "ACCEPTED") {
            return await this.acceptBooking(bookingId);
        }
        await this.rejectBooking(bookingId);
    }

    async acceptBooking(bookingId: number) {
        return await this.prisma.booking.update({
            where: { id: bookingId },
            data: { status: "ACCEPTED" }
        });
    }

    async rejectBooking(bookingId: number) {
        return await this.prisma.booking.update({
            where: { id: bookingId },
            data: { status: "REJECTED" }
        });
    }    

    async getPendingVisitByUserId(userId: number) {
        return await this.prisma.visit.findMany({
            where: {
                status: "PENDING"
            },
            orderBy: {
                visitDate: 'asc'
            }
        });
    }

    async answerVisit(body : {visitId: number, status: string , visitNotes: string | undefined}) {
        if(body.status === "DONE") {
            return await this.prisma.visit.update({
                where: { id: body.visitId },
                data: { status: "DONE", visitNotes: body.visitNotes ? body.visitNotes : "" }
            });
        }
        return await this.prisma.visit.update({
            where: { id: body.visitId },
            data: { status: "CANCELLED", visitNotes: body.visitNotes ? body.visitNotes : "" }
        });
    }

    async getVisitsByBookingId(bookingId: number) {
        return await this.prisma.visit.findMany({
            where: {
                bookingId: bookingId
            },
            include: {
                booking: true
            }
        });
    }
}



export default new BookingService();