import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID or guest UUID
  email: text('email').notNull(),
  fullName: text('full_name'),
  phone: text('phone'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  bookingCode: text('booking_code').notNull().unique(),
  userId: integer('user_id').references(() => users.id),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  eventType: text('event_type').notNull(),
  eventDate: text('event_date').notNull(),
  venueCity: text('venue_city').notNull(),
  packageTier: text('package_tier').notNull(),
  packagePriceRange: text('package_price_range').notNull(),
  visionNotes: text('vision_notes'),
  paymentMethod: text('payment_method').notNull(),
  depositAmountLkr: integer('deposit_amount_lkr').notNull().default(5000),
  paymentStatus: text('payment_status').notNull().default('PAID'),
  bookingStatus: text('booking_status').notNull().default('CONFIRMED'),
  coordinatorRemindersSent: text('coordinator_reminders_sent').notNull().default('[]'),
  customerNotified: boolean('customer_notified').notNull().default(true),
  adminNotified: boolean('admin_notified').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

export const directMessages = pgTable('direct_messages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull().default('NEW'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const coordinatorNotifications = pgTable('coordinator_notifications', {
  id: serial('id').primaryKey(),
  bookingId: integer('booking_id').references(() => bookings.id),
  type: text('type').notNull(), // '3_DAY_REMINDER' | '1_DAY_REMINDER' | 'BOOKING_ALERT'
  channel: text('channel').notNull(), // 'SMS/WhatsApp/Email'
  recipient: text('recipient').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull().default('SENT'),
  scheduledFor: text('scheduled_for').notNull(),
  sentAt: timestamp('sent_at').defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  notifications: many(coordinatorNotifications),
}));
