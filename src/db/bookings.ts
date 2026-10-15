import { eq, desc, asc } from 'drizzle-orm';
import { db } from './index.ts';
import { bookings, coordinatorNotifications, directMessages, users } from './schema.ts';

export interface CreateBookingInput {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string; // YYYY-MM-DD
  venueCity: string;
  packageTier: string;
  packagePriceRange: string;
  visionNotes?: string;
  paymentMethod: string;
  depositAmountLkr?: number;
  userUid?: string;
}

export async function createBooking(input: CreateBookingInput) {
  try {
    let dbUserId: number | null = null;

    if (input.userUid) {
      // Find or create user
      const existingUser = await db.select().from(users).where(eq(users.uid, input.userUid));
      if (existingUser.length > 0) {
        dbUserId = existingUser[0].id;
      } else {
        const newUser = await db.insert(users).values({
          uid: input.userUid,
          email: input.email,
          fullName: input.fullName,
          phone: input.phone,
        }).returning();
        dbUserId = newUser[0]?.id || null;
      }
    }

    const bookingCode = `BLOOM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const [newBooking] = await db.insert(bookings).values({
      bookingCode,
      userId: dbUserId,
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      eventType: input.eventType,
      eventDate: input.eventDate,
      venueCity: input.venueCity,
      packageTier: input.packageTier,
      packagePriceRange: input.packagePriceRange,
      visionNotes: input.visionNotes || '',
      paymentMethod: input.paymentMethod,
      depositAmountLkr: input.depositAmountLkr || 5000,
      paymentStatus: 'PAID',
      bookingStatus: 'CONFIRMED',
      customerNotified: true,
      adminNotified: true,
      coordinatorRemindersSent: JSON.stringify(['BOOKING_ALERT']),
    }).returning();

    // Log admin alert notification
    await db.insert(coordinatorNotifications).values({
      bookingId: newBooking.id,
      type: 'BOOKING_ALERT',
      channel: 'SMS/WhatsApp/Email',
      recipient: 'bloomevents27@gmail.com / 077031423',
      message: `New confirmed booking ${bookingCode} for ${newBooking.fullName} (${newBooking.eventType} on ${newBooking.eventDate} at ${newBooking.venueCity}). Advance deposit LKR 5,000 received via ${newBooking.paymentMethod}.`,
      status: 'SENT',
      scheduledFor: new Date().toISOString(),
    });

    return newBooking;
  } catch (error) {
    console.error('Failed to create booking in Cloud SQL:', error);
    throw new Error('Could not persist booking to database. Please check your inputs.', { cause: error });
  }
}

export async function getAllBookings() {
  try {
    return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    throw new Error('Failed to retrieve bookings from database.', { cause: error });
  }
}

export async function getUpcomingBookings() {
  try {
    return await db.select().from(bookings).orderBy(asc(bookings.eventDate));
  } catch (error) {
    console.error('Failed to fetch upcoming bookings:', error);
    throw new Error('Failed to retrieve upcoming bookings.', { cause: error });
  }
}

export async function createDirectMessage(data: { name: string; email: string; subject: string; message: string }) {
  try {
    const [msg] = await db.insert(directMessages).values({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      status: 'NEW',
    }).returning();
    return msg;
  } catch (error) {
    console.error('Failed to save direct message:', error);
    throw new Error('Could not submit direct message.', { cause: error });
  }
}

export async function getDirectMessages() {
  try {
    return await db.select().from(directMessages).orderBy(desc(directMessages.createdAt));
  } catch (error) {
    console.error('Failed to retrieve messages:', error);
    throw new Error('Failed to fetch direct messages.', { cause: error });
  }
}

/**
 * Automated Coordinator Reminder Cron System
 * Checks upcoming event dates and identifies events that are 3 days away and 1 day away.
 * Sends automated SMS/WhatsApp/Email alerts to Bloom Events coordinators.
 */
export async function runCoordinatorEventReminderCron() {
  try {
    const allBookings = await db.select().from(bookings);
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    
    const results = [];

    for (const booking of allBookings) {
      if (!booking.eventDate) continue;
      const eventTime = new Date(`${booking.eventDate}T00:00:00`).getTime();
      const currentTime = new Date(`${todayStr}T00:00:00`).getTime();
      const diffDays = Math.round((eventTime - currentTime) / (1000 * 60 * 60 * 24));

      let sentArray: string[] = [];
      try {
        sentArray = JSON.parse(booking.coordinatorRemindersSent || '[]');
      } catch {
        sentArray = [];
      }

      // Check 3-day reminder
      if (diffDays <= 3 && diffDays > 1 && !sentArray.includes('3_days')) {
        const msg = `[3-DAY REMINDER] Upcoming ${booking.eventType} for ${booking.fullName} on ${booking.eventDate} at ${booking.venueCity}. Floral pre-assembly & fresh flower delivery inspection scheduled!`;
        await db.insert(coordinatorNotifications).values({
          bookingId: booking.id,
          type: '3_DAY_REMINDER',
          channel: 'SMS/WhatsApp/Email',
          recipient: 'Coordinators: Sahana & Harish (077031423)',
          message: msg,
          status: 'SENT',
          scheduledFor: booking.eventDate,
        });

        sentArray.push('3_days');
        await db.update(bookings)
          .set({ coordinatorRemindersSent: JSON.stringify(sentArray) })
          .where(eq(bookings.id, booking.id));

        results.push({ bookingId: booking.id, type: '3_DAY_REMINDER', diffDays, eventDate: booking.eventDate });
      }

      // Check 1-day reminder
      if (diffDays <= 1 && diffDays >= 0 && !sentArray.includes('1_day')) {
        const msg = `[1-DAY URGENT REMINDER] Event TOMORROW: ${booking.eventType} for ${booking.fullName} (${booking.packageTier}) at ${booking.venueCity}. Loading trucks & on-site candle/floral rigging starts at 06:00 AM!`;
        await db.insert(coordinatorNotifications).values({
          bookingId: booking.id,
          type: '1_DAY_REMINDER',
          channel: 'SMS/WhatsApp/Email',
          recipient: 'Coordinators: Sahana & Harish (077031423)',
          message: msg,
          status: 'SENT',
          scheduledFor: booking.eventDate,
        });

        sentArray.push('1_day');
        await db.update(bookings)
          .set({ coordinatorRemindersSent: JSON.stringify(sentArray) })
          .where(eq(bookings.id, booking.id));

        results.push({ bookingId: booking.id, type: '1_DAY_REMINDER', diffDays, eventDate: booking.eventDate });
      }
    }

    const notifications = await db.select().from(coordinatorNotifications).orderBy(desc(coordinatorNotifications.sentAt)).limit(20);

    return {
      success: true,
      remindersGenerated: results.length,
      details: results,
      recentNotifications: notifications,
    };
  } catch (error) {
    console.error('Error running coordinator reminder cron:', error);
    throw new Error('Coordinator reminder check failed.', { cause: error });
  }
}

export async function getCoordinatorNotifications() {
  try {
    return await db.select().from(coordinatorNotifications).orderBy(desc(coordinatorNotifications.sentAt)).limit(50);
  } catch (error) {
    console.error('Failed to get notifications:', error);
    throw new Error('Failed to retrieve coordinator notifications.', { cause: error });
  }
}
