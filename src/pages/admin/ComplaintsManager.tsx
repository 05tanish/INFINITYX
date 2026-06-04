import { useState, useEffect } from 'react';
import { AlertOctagon, MessageSquare, CheckCircle2, MoreHorizontal, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Complaint {
  id: string;
  title: string;
  user_id?: string;
  contact_email?: string;
  contact_name?: string;
  type: string;
  status: string;
  priority: string;
  created_at: string;
  content: string;
  admin_reply?: string;
}

export default function ComplaintsManager() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All Tickets');
  const [selectedTicket, setSelectedTicket] = useState<Complaint | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const { data, error } = await supabase
        .from('complaints')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComplaints(data || []);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async () => {
    if (!selectedTicket || !replyText.trim()) return;
    
    setIsReplying(true);
    try {
      const { error } = await supabase
        .from('complaints')
        .update({ 
          admin_reply: replyText,
          status: 'resolved'
        })
        .eq('id', selectedTicket.id);

      if (error) throw error;
      
      setComplaints(complaints.map(c => 
        c.id === selectedTicket.id ? { ...c, admin_reply: replyText, status: 'resolved' } : c
      ));
      setSelectedTicket(null);
      setReplyText('');
    } catch (error) {
      console.error('Error saving reply:', error);
    } finally {
      setIsReplying(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('complaints')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      setComplaints(complaints.map(c => c.id === id ? { ...c, status } : c));
    } catch (error) {
      console.error('Error updating complaint status:', error);
    }
  };

  const filteredComplaints = complaints.filter(c => {
    if (filter === 'All Tickets') return true;
    return c.status.toLowerCase() === filter.toLowerCase();
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 text-ns-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-white mb-2">Complaints & Tickets</h1>
          <p className="text-ns-slate">Handle customer support tickets, feedback, and issues.</p>
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-ns-navy border border-ns-graphite text-white text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ns-gold/50"
          >
            <option>All Tickets</option>
            <option>Open</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>

      <div className="bg-ns-navy border border-ns-graphite rounded-2xl shadow-xl overflow-hidden">
        <ul className="divide-y divide-neutral-800/50">
          {filteredComplaints.map((ticket) => (
            <li key={ticket.id} className="p-6 hover:bg-ns-graphite/30 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 p-2 rounded-xl shrink-0 ${
                    ticket.status === 'open' 
                      ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' 
                      : 'bg-ns-emerald/10 text-ns-emerald border border-emerald-500/20'
                  }`}>
                    {ticket.status === 'open' ? <AlertOctagon className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white flex items-center gap-3">
                      {ticket.title}
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded ${
                        ticket.priority === 'high' ? 'bg-ns-error/10 text-red-400 border-red-500/20' :
                        ticket.priority === 'medium' ? 'bg-ns-gold/10 text-yellow-400 border-yellow-500/20' :
                        'bg-ns-gold/10 text-ns-gold border-blue-500/20'
                      }`}>
                        {ticket.priority} Priority
                      </span>
                    </h3>
                    <p className="text-sm text-ns-slate mt-1">
                      {ticket.type} • {new Date(ticket.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:ml-4 self-start md:self-center shrink-0">
                  <button 
                    onClick={() => setSelectedTicket(ticket)}
                    className="p-2 text-ns-slate hover:text-white rounded-xl hover:bg-ns-graphite transition-colors"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </button>
                  {ticket.status === 'open' && (
                    <button 
                      onClick={() => updateStatus(ticket.id, 'resolved')}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-xl transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Resolve
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
          {filteredComplaints.length === 0 && (
            <li className="p-20 text-center text-ns-slate">
              No tickets found.
            </li>
          )}
        </ul>
      </div>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-ns-navy border border-ns-graphite rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-ns-graphite flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Ticket Details</h2>
              <button 
                onClick={() => setSelectedTicket(null)}
                className="text-ns-slate hover:text-white transition-colors"
              >
                <MoreHorizontal className="w-6 h-6 rotate-90" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-3">
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded border ${
                  selectedTicket.priority === 'high' ? 'bg-ns-error/10 text-red-400 border-red-500/20' :
                  selectedTicket.priority === 'medium' ? 'bg-ns-gold/10 text-yellow-400 border-yellow-500/20' :
                  'bg-ns-gold/10 text-ns-gold border-blue-500/20'
                }`}>
                  {selectedTicket.priority} Priority
                </span>
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded border ${
                  selectedTicket.status === 'open' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-ns-emerald/10 text-ns-emerald border-emerald-500/20'
                }`}>
                  {selectedTicket.status}
                </span>
              </div>
              
              <div>
                <h3 className="text-2xl font-serif font-bold text-white mb-1">{selectedTicket.title}</h3>
                <p className="text-sm text-ns-slate">
                  Submitted on {new Date(selectedTicket.created_at).toLocaleString()} • {selectedTicket.type}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 py-4 border-y border-ns-graphite">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ns-slate mb-1">Contact Name</p>
                  <p className="text-white font-medium">{selectedTicket.contact_name || 'Anonymous'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ns-slate mb-1">Contact Email</p>
                  <p className="text-white font-medium">{selectedTicket.contact_email || 'Not provided'}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-ns-slate mb-1">Issue Description</p>
                <div className="text-ns-white leading-relaxed bg-ns-black p-4 rounded-xl border border-ns-graphite whitespace-pre-wrap mb-6">
                  {selectedTicket.content || 'No details provided.'}
                </div>
              </div>

              {selectedTicket.admin_reply ? (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ns-gold mb-1">Your Reply</p>
                  <div className="text-ns-white leading-relaxed bg-blue-500/5 p-4 rounded-xl border border-blue-500/20 italic">
                    {selectedTicket.admin_reply}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-ns-slate mb-1">Send a Reply</p>
                  <textarea 
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your response to the client..."
                    className="w-full h-32 bg-ns-black border border-ns-graphite rounded-xl p-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-ns-gold/50 focus:border-blue-500 transition-all resize-none"
                  />
                  <p className="text-[10px] text-ns-slate italic">
                    Note: Replying will automatically mark this ticket as "Resolved".
                  </p>
                </div>
              )}
            </div>
            <div className="p-6 bg-ns-black border-t border-ns-graphite flex justify-end gap-3">
              <button 
                onClick={() => {
                  setSelectedTicket(null);
                  setReplyText('');
                }}
                className="px-6 py-2 bg-ns-graphite hover:bg-neutral-700 text-white font-medium rounded-xl transition-colors"
              >
                Close
              </button>
              {!selectedTicket.admin_reply && (
                <button 
                  onClick={handleReply}
                  disabled={isReplying || !replyText.trim()}
                  className="px-6 py-2 bg-ns-gold hover:bg-blue-500 text-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isReplying ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
                  Send Reply
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
