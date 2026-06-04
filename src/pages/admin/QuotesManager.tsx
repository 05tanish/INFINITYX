import { useState, useEffect } from 'react';
import { FileText, Send, Download, MoreHorizontal, Clock, DollarSign, Loader2, CheckCircle2, Mail, Phone } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Quote {
  id: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  service: string;
  amount: string;
  status: string;
  description?: string;
  admin_reply?: string;
  created_at: string;
}

export default function QuotesManager() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSavingReply, setIsSavingReply] = useState(false);

  useEffect(() => {
    fetchQuotes();
  }, []);

  useEffect(() => {
    if (selectedQuote) {
      setReplyText(selectedQuote.admin_reply || '');
    }
  }, [selectedQuote]);

  const fetchQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveReply = async () => {
    if (!selectedQuote) return;
    setIsSavingReply(true);
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ admin_reply: replyText })
        .eq('id', selectedQuote.id);

      if (error) throw error;
      setQuotes(quotes.map(q => q.id === selectedQuote.id ? { ...q, admin_reply: replyText } : q));
      setSelectedQuote({ ...selectedQuote, admin_reply: replyText });
    } catch (error) {
      console.error('Error saving reply:', error);
    } finally {
      setIsSavingReply(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      setQuotes(quotes.map(q => q.id === id ? { ...q, status } : q));
    } catch (error) {
      console.error('Error updating quote status:', error);
    }
  };

  const totalPending = quotes
    .filter(q => q.status === 'pending')
    .reduce((acc, q) => acc + (parseFloat(q.amount.replace(/[^0-9.]/g, '')) || 0), 0);

  const awaitingResponse = quotes.filter(q => q.status === 'sent').length;
  const acceptedThisMonth = quotes.filter(q => q.status === 'accepted').length;

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
          <h1 className="text-3xl font-serif font-bold tracking-tight text-white mb-2">Quotes & Proposals</h1>
          <p className="text-ns-slate">Generate, send, and track project quotes for prospective clients.</p>
        </div>
        <button className="px-4 py-2 bg-ns-gold hover:bg-blue-500 text-white font-medium rounded-xl transition-colors flex items-center gap-2">
          <FileText className="w-4 h-4" /> New Quote
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-ns-navy border border-ns-graphite p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-ns-gold/10 rounded-xl border border-blue-500/20 text-ns-gold">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-ns-slate">Total Value (Pending)</p>
            <p className="text-2xl font-serif font-bold text-white">${totalPending.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-ns-navy border border-ns-graphite p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20 text-orange-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-ns-slate">Awaiting Response</p>
            <p className="text-2xl font-serif font-bold text-white">{awaitingResponse} Quotes</p>
          </div>
        </div>
        <div className="bg-ns-navy border border-ns-graphite p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-ns-emerald/10 rounded-xl border border-emerald-500/20 text-ns-emerald">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-ns-slate">Accepted this month</p>
            <p className="text-2xl font-serif font-bold text-white">{acceptedThisMonth} Quotes</p>
          </div>
        </div>
      </div>

      <div className="bg-ns-navy border border-ns-graphite rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-ns-slate">
            <thead className="text-xs uppercase bg-ns-black/50 text-ns-slate border-b border-ns-graphite">
              <tr>
                <th className="px-6 py-4 font-medium">Quote ID</th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Service</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50">
              {quotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-ns-graphite/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-white text-xs truncate max-w-[100px]">{quote.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{quote.client_name}</div>
                    <div className="text-xs text-ns-slate">{quote.client_email}</div>
                  </td>
                  <td className="px-6 py-4">{quote.service}</td>
                  <td className="px-6 py-4 font-medium text-ns-white">{quote.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${
                      quote.status === 'accepted' ? 'bg-ns-emerald/10 text-ns-emerald border-emerald-500/20' :
                      quote.status === 'sent' ? 'bg-ns-gold/10 text-ns-gold border-blue-500/20' :
                      'bg-orange-500/10 text-orange-400 border-orange-500/20'
                    }`}>
                      <span className="capitalize">{quote.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setSelectedQuote(quote)}
                        title="View Details" 
                        className="p-2 text-ns-slate hover:text-white rounded-lg hover:bg-ns-graphite transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      {quote.status === 'pending' && (
                        <button 
                          onClick={() => updateStatus(quote.id, 'sent')}
                          title="Mark as Sent" 
                          className="p-2 text-ns-slate hover:text-ns-gold rounded-lg hover:bg-ns-graphite transition-colors"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                      {quote.status === 'sent' && (
                        <button 
                          onClick={() => updateStatus(quote.id, 'accepted')}
                          title="Mark as Accepted" 
                          className="p-2 text-ns-slate hover:text-ns-emerald rounded-lg hover:bg-ns-graphite transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                      <button title="Download PDF" className="p-2 text-ns-slate hover:text-white rounded-lg hover:bg-ns-graphite transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {quotes.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-ns-slate">
                    No quotes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote Details Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-ns-navy border border-ns-graphite rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-ns-graphite flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Quote Details</h2>
              <button 
                onClick={() => setSelectedQuote(null)}
                className="text-ns-slate hover:text-white transition-colors"
              >
                <MoreHorizontal className="w-6 h-6 rotate-90" />
              </button>
            </div>
            <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ns-slate mb-1">Client Name</p>
                  <p className="text-white font-medium">{selectedQuote.client_name}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ns-slate mb-1">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border capitalize ${
                    selectedQuote.status === 'accepted' ? 'bg-ns-emerald/10 text-ns-emerald border-emerald-500/20' :
                    selectedQuote.status === 'sent' ? 'bg-ns-gold/10 text-ns-gold border-blue-500/20' :
                    'bg-orange-500/10 text-orange-400 border-orange-500/20'
                  }`}>
                    {selectedQuote.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ns-slate mb-1">Email Address</p>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-medium">{selectedQuote.client_email}</p>
                    <a 
                      href={`mailto:${selectedQuote.client_email}?subject=Project Quote - NorthernStar`}
                      className="p-1.5 bg-ns-gold/10 text-ns-gold rounded-md hover:bg-blue-500/20 transition-colors"
                      title="Send Email"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ns-slate mb-1">Phone Number</p>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-medium">{selectedQuote.client_phone || 'Not provided'}</p>
                    {selectedQuote.client_phone && (
                      <a 
                        href={`tel:${selectedQuote.client_phone}`}
                        className="p-1.5 bg-ns-emerald/10 text-ns-emerald rounded-md hover:bg-emerald-500/20 transition-colors"
                        title="Call Client"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ns-slate mb-1">Service Requested</p>
                  <p className="text-white font-medium">{selectedQuote.service}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ns-slate mb-1">Estimated Amount</p>
                  <p className="text-white font-bold text-xl">{selectedQuote.amount}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-ns-slate mb-1">Project Description</p>
                <p className="text-ns-white leading-relaxed bg-ns-black p-4 rounded-xl border border-ns-graphite">
                  {selectedQuote.description || 'No description provided.'}
                </p>
              </div>

              <div className="pt-4 border-t border-ns-graphite">
                <p className="text-xs font-bold uppercase tracking-wider text-ns-slate mb-3">Admin Notes / Remarks</p>
                <textarea 
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Add internal notes or record your response here..."
                  className="w-full bg-ns-black border border-ns-graphite rounded-xl p-4 text-sm text-white focus:ring-1 focus:ring-ns-gold outline-none min-h-[100px] transition-all"
                />
                <div className="mt-3 flex justify-end">
                  <button 
                    onClick={saveReply}
                    disabled={isSavingReply || replyText === selectedQuote.admin_reply}
                    className="px-4 py-2 bg-ns-gold/10 text-ns-gold hover:bg-ns-gold/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                  >
                    {isSavingReply ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                    Save Notes
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 bg-ns-black border-t border-ns-graphite flex justify-end gap-3">
              <button 
                onClick={() => setSelectedQuote(null)}
                className="px-6 py-2 bg-ns-graphite hover:bg-neutral-700 text-white font-medium rounded-xl transition-colors"
              >
                Close
              </button>
              {selectedQuote.status !== 'accepted' && (
                <button 
                  onClick={() => {
                    const nextStatus = selectedQuote.status === 'pending' ? 'sent' : 'accepted';
                    updateStatus(selectedQuote.id, nextStatus);
                    setSelectedQuote(null);
                  }}
                  className="px-6 py-2 bg-ns-gold hover:bg-blue-500 text-white font-medium rounded-xl transition-colors"
                >
                  Mark as {selectedQuote.status === 'pending' ? 'Sent' : 'Accepted'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
