import { useState, useEffect } from 'react';
import { Star, Check, X, Trash2, Loader2, MessageSquare } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  content: string;
  status: string;
  admin_reply?: string;
}

export default function ReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (reviewId: string) => {
    if (!replyText.trim()) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ admin_reply: replyText })
        .eq('id', reviewId);

      if (error) throw error;
      
      setReviews(reviews.map(r => r.id === reviewId ? { ...r, admin_reply: replyText } : r));
      setReplyingTo(null);
      setReplyText('');
    } catch (error) {
      console.error('Error saving reply:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      setReviews(reviews.map(r => r.id === id ? { ...r, status } : r));
    } catch (error) {
      console.error('Error updating review status:', error);
    }
  };

  const deleteReview = async (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      try {
        const { error } = await supabase
          .from('reviews')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setReviews(reviews.filter(r => r.id !== id));
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 text-ns-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold tracking-tight text-white mb-2">Reviews Manager</h1>
        <p className="text-ns-slate">Moderate and manage client testimonials displayed on the main site.</p>
      </div>

      <div className="grid gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-ns-navy border border-ns-graphite rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:border-ns-graphite">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-neutral-700'}`} />
                  ))}
                </div>
                {review.status === 'pending' && (
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium border border-orange-500/20">
                    Needs Review
                  </span>
                )}
                {review.status === 'approved' && (
                  <span className="px-2.5 py-0.5 rounded-full bg-ns-emerald/10 text-ns-emerald text-xs font-medium border border-emerald-500/20">
                    Published
                  </span>
                )}
              </div>
              <p className="text-ns-white italic">"{review.content}"</p>
              <div>
                <p className="text-sm font-medium text-white">{review.author}</p>
                <p className="text-xs text-ns-slate">{review.role}</p>
              </div>

              {review.admin_reply ? (
                <div className="mt-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-ns-gold mb-1">Your Reply</p>
                  <p className="text-sm text-ns-white italic">"{review.admin_reply}"</p>
                </div>
              ) : replyingTo === review.id ? (
                <div className="mt-4 space-y-3">
                  <textarea 
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your response..."
                    className="w-full h-24 bg-ns-black border border-ns-graphite rounded-xl p-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-ns-gold/50 focus:border-blue-500 transition-all resize-none"
                  />
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleReply(review.id)}
                      disabled={isSaving || !replyText.trim()}
                      className="px-4 py-1.5 bg-ns-gold hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2"
                    >
                      {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <MessageSquare className="w-3 h-3" />}
                      Post Reply
                    </button>
                    <button 
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyText('');
                      }}
                      className="px-4 py-1.5 bg-ns-graphite hover:bg-neutral-700 text-white text-xs font-medium rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setReplyingTo(review.id)}
                  className="mt-4 text-xs font-medium text-ns-gold hover:text-blue-300 flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Reply to this review
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 md:flex-col lg:flex-row shrink-0">
              {review.status === 'pending' && (
                <>
                  <button 
                    onClick={() => updateStatus(review.id, 'approved')}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-xl transition-colors"
                  >
                    <Check className="w-4 h-4" /> Approve
                  </button>
                  <button 
                    onClick={() => updateStatus(review.id, 'rejected')}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-ns-graphite hover:bg-neutral-700 text-white text-sm font-medium rounded-xl transition-colors"
                  >
                    <X className="w-4 h-4" /> Reject
                  </button>
                </>
              )}
              {review.status === 'approved' && (
                <button 
                  onClick={() => updateStatus(review.id, 'pending')}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-ns-graphite hover:bg-neutral-700 text-white text-sm font-medium rounded-xl transition-colors"
                >
                  <X className="w-4 h-4" /> Unpublish
                </button>
              )}
              <button 
                onClick={() => deleteReview(review.id)}
                className="p-2 text-ns-slate hover:text-red-400 hover:bg-ns-error/10 rounded-xl transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {reviews.length === 0 && (
          <div className="text-center py-20 bg-ns-navy border border-ns-graphite rounded-2xl">
            <Star className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
            <p className="text-ns-slate">No reviews found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
