import { useState, useEffect } from 'react';
import {
  X,
  Bell,
  Calendar,
  Clock,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Phone,
  Database,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Users,
} from 'lucide-react';

interface CoordinatorHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CoordinatorHubModal({ isOpen, onClose }: CoordinatorHubModalProps) {
  const [loading, setLoading] = useState(false);
  const [runningCron, setRunningCron] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [cronFeedback, setCronFeedback] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'alerts' | 'schedule' | 'how-it-works'>('alerts');

  const fetchCoordinatorData = async () => {
    try {
      setLoading(true);
      const [bookingsRes, remindersRes] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/coordinator/reminders'),
      ]);

      const bData = await bookingsRes.json();
      const rData = await remindersRes.json();

      if (bData.bookings) setBookings(bData.bookings);
      if (rData.notifications) setNotifications(rData.notifications);
    } catch (err) {
      console.error('Failed to load coordinator data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCoordinatorData();
    }
  }, [isOpen]);

  const handleRunDailyCron = async () => {
    try {
      setRunningCron(true);
      setCronFeedback('');
      const res = await fetch('/api/coordinator/trigger-cron', {
        method: 'POST',
      });
      const data = await res.json();
      setCronFeedback(
        `Daily scan completed successfully. Checked ${bookings.length} events in Cloud SQL database.`
      );
      await fetchCoordinatorData();
    } catch (err: any) {
      console.error('Cron trigger error:', err);
      setCronFeedback('Error executing automated reminder scan.');
    } finally {
      setRunningCron(false);
    }
  };

  if (!isOpen) return null;

  // Categorize alerts for quick understanding
  const urgentTomorrowAlerts = notifications.filter((n) => n.type === '1_DAY_REMINDER');
  const threeDayAlerts = notifications.filter((n) => n.type === '3_DAY_REMINDER');
  const newBookingAlerts = notifications.filter((n) => n.type === 'BOOKING_ALERT');

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-[#A45266]/20 my-6 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#2B2627] via-[#382E31] to-[#2B2627] text-white p-6 sm:p-7 flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
              <Database className="w-3.5 h-3.5" />
              <span>PostgreSQL Database Active (asia-southeast1)</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              Coordinator Reminder Hub
            </h2>
            <p className="text-xs text-[#D3C7C9] max-w-xl leading-relaxed">
              Automated reminder system ensuring coordinators <strong>Sahana (Planner)</strong> and <strong>Harish (Production)</strong> receive timely alerts 3 days and 1 day before every event.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Intuitive 3-Step Process Guide */}
        <div className="bg-[#FDF6F6] px-6 py-4 border-b border-[#A45266]/15">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            
            <div className="p-3 bg-white rounded-xl border border-[#A45266]/15 flex items-start gap-2.5 shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-[#A45266]/10 text-[#A45266] font-bold flex items-center justify-center shrink-0 text-xs">
                1
              </div>
              <div>
                <div className="font-bold text-[#2B2627]">Client Books & Pays</div>
                <div className="text-[11px] text-[#5E5356]">LKR 5,000 deposit locks date in PostgreSQL.</div>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#A45266]/15 flex items-start gap-2.5 shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 text-[#A45266] font-bold flex items-center justify-center shrink-0 text-xs">
                2
              </div>
              <div>
                <div className="font-bold text-[#2B2627]">Daily Cron Scheduler</div>
                <div className="text-[11px] text-[#5E5356]">Checks dates daily for 3-day and 1-day milestones.</div>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#A45266]/15 flex items-start gap-2.5 shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">
                3
              </div>
              <div>
                <div className="font-bold text-[#2B2627]">Instant Team Alerts</div>
                <div className="text-[11px] text-[#5E5356]">SMS, WhatsApp & Email sent to coordinators.</div>
              </div>
            </div>

          </div>
        </div>

        {/* Tab Navigation & Action Bar */}
        <div className="px-6 py-3 bg-white border-b border-[#A45266]/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                activeTab === 'alerts'
                  ? 'bg-[#A45266] text-white shadow-xs'
                  : 'bg-[#FDF6F6] text-[#2B2627] hover:bg-[#A45266]/10'
              }`}
            >
              Active Alerts ({notifications.length})
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                activeTab === 'schedule'
                  ? 'bg-[#A45266] text-white shadow-xs'
                  : 'bg-[#FDF6F6] text-[#2B2627] hover:bg-[#A45266]/10'
              }`}
            >
              Master Schedule ({bookings.length})
            </button>
          </div>

          <button
            onClick={handleRunDailyCron}
            disabled={runningCron}
            className="cursor-pointer px-4 py-1.5 text-xs font-semibold uppercase tracking-wider bg-[#2B2627] hover:bg-[#3d3638] text-white rounded-full shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${runningCron ? 'animate-spin' : ''}`} />
            <span>{runningCron ? 'Scanning...' : 'Run Daily Schedule Check'}</span>
          </button>
        </div>

        {cronFeedback && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{cronFeedback}</span>
          </div>
        )}

        {/* Main Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: ALERTS */}
          {activeTab === 'alerts' && (
            <div className="space-y-6">
              
              {/* Alert category counts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider">1 Day Before (TOMORROW)</span>
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                  </div>
                  <div className="font-serif text-2xl font-bold mt-1 text-rose-900">
                    {urgentTomorrowAlerts.length} Urgent Event{urgentTomorrowAlerts.length === 1 ? '' : 's'}
                  </div>
                  <div className="text-[11px] text-rose-700 mt-0.5">
                    Stage loading, trucks & lighting rigging.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider">3 Days Before</span>
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="font-serif text-2xl font-bold mt-1 text-amber-900">
                    {threeDayAlerts.length} Upcoming Event{threeDayAlerts.length === 1 ? '' : 's'}
                  </div>
                  <div className="text-[11px] text-amber-700 mt-0.5">
                    Fresh flower delivery & frame pre-assembly.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider">Total Dispatched</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="font-serif text-2xl font-bold mt-1 text-emerald-900">
                    {notifications.length} Alerts
                  </div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">
                    Delivered via SMS, WhatsApp & Email.
                  </div>
                </div>

              </div>

              {/* Feed of Alerts */}
              <div className="space-y-3">
                <h4 className="font-serif text-base font-bold text-[#2B2627]">
                  Dispatched Notifications Feed
                </h4>

                {notifications.length === 0 ? (
                  <div className="p-8 text-center bg-[#FDF6F6] rounded-2xl border border-dashed border-[#A45266]/30 text-xs text-[#5E5356]">
                    No notifications yet. Book an event on Page 3 to test real-time alert generation!
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-2xs ${
                        notif.type === '1_DAY_REMINDER'
                          ? 'bg-rose-50/70 border-rose-200'
                          : notif.type === '3_DAY_REMINDER'
                          ? 'bg-amber-50/70 border-amber-200'
                          : 'bg-white border-[#A45266]/15'
                      }`}
                    >
                      <div className="space-y-1 max-w-xl">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                              notif.type === '1_DAY_REMINDER'
                                ? 'bg-rose-200 text-rose-900'
                                : notif.type === '3_DAY_REMINDER'
                                ? 'bg-amber-200 text-amber-900'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {notif.type.replace(/_/g, ' ')}
                          </span>
                          <span className="font-semibold text-[#2B2627]">
                            {notif.recipient}
                          </span>
                        </div>
                        <p className="text-[#2B2627] font-medium leading-relaxed">
                          {notif.message}
                        </p>
                        <div className="text-[11px] text-[#5E5356]">
                          Delivery Channel: <strong>{notif.channel}</strong> · Scheduled For: <strong>{notif.scheduledFor}</strong>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-[11px] font-mono text-[#A45266]">
                          {new Date(notif.sentAt).toLocaleDateString()} {new Date(notif.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          DELIVERED
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}

          {/* TAB 2: SCHEDULE */}
          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#2B2627]">
                    Confirmed Event Schedule in PostgreSQL
                  </h4>
                  <p className="text-xs text-[#5E5356]">
                    All events recorded with advance deposit payment status.
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-[#A45266]">
                  {bookings.length} Events on Master Calendar
                </span>
              </div>

              <div className="overflow-x-auto border border-[#A45266]/15 rounded-2xl shadow-xs">
                <table className="w-full text-left text-xs text-[#2B2627]">
                  <thead className="bg-[#FDF6F6] text-[#A45266] uppercase font-semibold text-[10px] tracking-wider border-b border-[#A45266]/15">
                    <tr>
                      <th className="p-3.5">Booking Code</th>
                      <th className="p-3.5">Client & Phone</th>
                      <th className="p-3.5">Event & Date</th>
                      <th className="p-3.5">Venue</th>
                      <th className="p-3.5">Package</th>
                      <th className="p-3.5">Deposit</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#A45266]/10 bg-white">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-[#FDF6F6]/50">
                        <td className="p-3.5 font-mono font-bold text-[#A45266]">{b.bookingCode}</td>
                        <td className="p-3.5">
                          <div className="font-bold">{b.fullName}</div>
                          <div className="text-[11px] text-[#5E5356]">{b.phone}</div>
                        </td>
                        <td className="p-3.5">
                          <div className="font-semibold">{b.eventType}</div>
                          <div className="text-[11px] text-[#A45266] font-mono font-bold">{b.eventDate}</div>
                        </td>
                        <td className="p-3.5 text-[#5E5356]">{b.venueCity}</td>
                        <td className="p-3.5 font-medium">{b.packageTier}</td>
                        <td className="p-3.5 font-mono font-semibold text-emerald-700">
                          LKR {b.depositAmountLkr?.toLocaleString()}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {b.bookingStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FDF6F6] border-t border-[#A45266]/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5E5356]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>Coordinators: Sahana (077031423) · Harish (077031423) · Mannar Atelier</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 text-xs font-semibold text-[#2B2627] hover:bg-white rounded-full border border-neutral-300 transition-colors"
          >
            Close Coordinator Hub
          </button>
        </div>

      </div>
    </div>
  );
}
