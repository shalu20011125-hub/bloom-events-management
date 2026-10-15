import express from 'express';
import {
  createBooking,
  getAllBookings,
  createDirectMessage,
  getDirectMessages,
  runCoordinatorEventReminderCron,
  getCoordinatorNotifications,
} from '../db/bookings.ts';
import { optionalAuth, AuthRequest } from '../middleware/auth.ts';

export const apiRouter = express.Router();

apiRouter.use(express.json());

// Health check endpoint
apiRouter.get('/health', async (_req, res) => {
  res.json({
    status: 'ok',
    database: 'Cloud SQL (PostgreSQL)',
    region: 'asia-southeast1',
    studio: 'Bloom Events - Mannar',
    timestamp: new Date().toISOString(),
  });
});

// Bookings endpoints
apiRouter.post('/bookings', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      eventType,
      eventDate,
      venueCity,
      packageTier,
      packagePriceRange,
      visionNotes,
      paymentMethod,
      depositAmountLkr,
    } = req.body;

    if (!fullName || !email || !phone || !eventType || !eventDate || !venueCity || !packageTier || !paymentMethod) {
      return res.status(400).json({ error: 'Missing required fields for event booking.' });
    }

    const booking = await createBooking({
      fullName,
      email,
      phone,
      eventType,
      eventDate,
      venueCity,
      packageTier,
      packagePriceRange: packagePriceRange || 'LKR 25,000 – 50,000',
      visionNotes,
      paymentMethod,
      depositAmountLkr: depositAmountLkr || 5000,
      userUid: req.user?.uid,
    });

    // Simulated automated emails generated as required by specs
    const customerEmailContent = {
      to: email,
      subject: `🌸 Booking Confirmed: ${eventType} Decor (${booking.bookingCode}) - Bloom Events`,
      preview: `Dear ${fullName}, your booking deposit of LKR 5,000 via ${paymentMethod} has been successfully processed!`,
      details: {
        bookingCode: booking.bookingCode,
        eventDate: booking.eventDate,
        venueCity: booking.venueCity,
        packageTier: booking.packageTier,
        depositPaid: `LKR ${booking.depositAmountLkr.toLocaleString()}`,
        balanceDue: 'Payable upon on-site floral installation completion',
        studioContact: '27 Blossom Avenue, Floral Park, Mannar | 077031423',
      },
    };

    const adminEmailContent = {
      to: 'bloomevents27@gmail.com',
      subject: `[NEW EVENT DEPOSIT PAID] ${eventType} - ${fullName} on ${eventDate}`,
      details: {
        bookingCode: booking.bookingCode,
        clientName: fullName,
        clientEmail: email,
        clientPhone: phone,
        venue: venueCity,
        package: packageTier,
        advanceDeposit: `LKR ${booking.depositAmountLkr.toLocaleString()} via ${paymentMethod}`,
        assignedCoordinators: 'Sahana (Planner) & Harish (Production)',
      },
    };

    // Run coordinator check immediately for any imminent dates
    await runCoordinatorEventReminderCron();

    res.status(201).json({
      success: true,
      booking,
      emailsDispatched: {
        customerEmail: customerEmailContent,
        adminAlertEmail: adminEmailContent,
      },
      message: 'Booking enquiry submitted and advance deposit successfully processed.',
    });
  } catch (error: any) {
    console.error('API Error creating booking:', error);
    res.status(500).json({ error: error.message || 'Failed to process event booking.' });
  }
});

apiRouter.get('/bookings', optionalAuth, async (_req, res) => {
  try {
    const list = await getAllBookings();
    res.json({ success: true, count: list.length, bookings: list });
  } catch (error: any) {
    console.error('API Error fetching bookings:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch bookings.' });
  }
});

// Direct Messages from Page 4
apiRouter.post('/messages', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All message fields (name, email, subject, message) are required.' });
    }

    const saved = await createDirectMessage({ name, email, subject, message });
    res.status(201).json({
      success: true,
      message: 'Direct message received by Bloom Events Mannar Studio team. We will respond within 4 business hours.',
      data: saved,
    });
  } catch (error: any) {
    console.error('API Error creating direct message:', error);
    res.status(500).json({ error: error.message || 'Failed to send message.' });
  }
});

apiRouter.get('/messages', async (_req, res) => {
  try {
    const messages = await getDirectMessages();
    res.json({ success: true, messages });
  } catch (error: any) {
    console.error('API Error fetching messages:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch messages.' });
  }
});

// Automated Event Reminder Notification System (Cron for Coordinators)
apiRouter.get('/coordinator/reminders', async (_req, res) => {
  try {
    const notifications = await getCoordinatorNotifications();
    res.json({ success: true, notifications });
  } catch (error: any) {
    console.error('API Error fetching reminders:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch reminders.' });
  }
});

apiRouter.post('/coordinator/trigger-cron', async (_req, res) => {
  try {
    const cronResult = await runCoordinatorEventReminderCron();
    res.json({
      success: true,
      result: cronResult,
      message: 'Daily coordinator schedule scan executed. 3-day and 1-day reminders checked against scheduled bookings.',
    });
  } catch (error: any) {
    console.error('API Error running cron:', error);
    res.status(500).json({ error: error.message || 'Failed to execute reminder cron.' });
  }
});
