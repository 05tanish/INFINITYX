import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Loader2, Image as ImageIcon, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface PortfolioItem {
  id: string;
  title: string;
  category: 'web-app' | 'mobile' | 'saas' | 'automation';
  thumbnail: string;
  tech: string[];
  description: string;
  result: string;
  display_order: number;
}

export default function PortfolioManager() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<PortfolioItem> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingItem?.title) return;
    
    setIsSaving(true);
    try {
      if (editingItem.id) {
        const { error } = await supabase
          .from('portfolio')
          .update(editingItem)
          .eq('id', editingItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('portfolio')
          .insert([editingItem]);
        if (error) throw error;
      }
      
      await fetchPortfolio();
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving portfolio item:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const { error } = await supabase
        .from('portfolio')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setItems(items.filter(i => i.id !== id));
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-white mb-2">Portfolio Manager</h1>
          <p className="text-ns-slate">Manage the case studies and projects shown on the website.</p>
        </div>
        <button 
          onClick={() => setEditingItem({ category: 'web-app', tech: [], display_order: items.length + 1 })}
          className="flex items-center gap-2 px-4 py-2 bg-ns-gold hover:bg-blue-500 text-white font-medium rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-ns-navy border border-ns-graphite rounded-2xl overflow-hidden group hover:border-ns-graphite transition-all shadow-xl">
            <div className="aspect-video relative overflow-hidden bg-ns-graphite">
              {item.thumbnail ? (
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-600">
                  <ImageIcon className="w-12 h-12" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button 
                  onClick={() => setEditingItem(item)}
                  className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-3 bg-red-500/20 backdrop-blur-md rounded-full text-ns-error hover:bg-red-500/40 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-ns-gold">{item.category}</span>
                <span className="text-[10px] text-ns-slate">Order: {item.display_order}</span>
              </div>
              <h3 className="text-lg font-bold text-white line-clamp-1">{item.title}</h3>
              <p className="text-sm text-ns-slate line-clamp-2">{item.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {item.tech?.slice(0, 3).map((t, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 bg-ns-graphite text-ns-slate rounded-md border border-ns-graphite">
                    {t}
                  </span>
                ))}
                {item.tech?.length > 3 && <span className="text-[10px] text-neutral-600">+{item.tech.length - 3}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-ns-navy border border-ns-graphite rounded-2xl w-full max-w-2xl shadow-2xl my-8">
            <div className="p-6 border-b border-ns-graphite flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">{editingItem.id ? 'Edit Project' : 'New Project'}</h2>
              <button onClick={() => setEditingItem(null)} className="text-ns-slate hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Project Title</label>
                  <input 
                    value={editingItem.title || ''} 
                    onChange={e => setEditingItem({...editingItem, title: e.target.value})}
                    className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white focus:ring-2 focus:ring-ns-gold/50 outline-none"
                    placeholder="HealthTrack SaaS"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Category</label>
                  <select 
                    value={editingItem.category || 'web-app'} 
                    onChange={e => setEditingItem({...editingItem, category: e.target.value as any})}
                    className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white focus:ring-2 focus:ring-ns-gold/50 outline-none"
                  >
                    <option value="web-app">Web App</option>
                    <option value="mobile">Mobile App</option>
                    <option value="saas">SaaS</option>
                    <option value="automation">Automation</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Thumbnail URL</label>
                <input 
                  value={editingItem.thumbnail || ''} 
                  onChange={e => setEditingItem({...editingItem, thumbnail: e.target.value})}
                  className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white focus:ring-2 focus:ring-ns-gold/50 outline-none"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Description</label>
                <textarea 
                  value={editingItem.description || ''} 
                  onChange={e => setEditingItem({...editingItem, description: e.target.value})}
                  className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white h-24 resize-none focus:ring-2 focus:ring-ns-gold/50 outline-none"
                  placeholder="Tell us about the project..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Main Result</label>
                  <input 
                    value={editingItem.result || ''} 
                    onChange={e => setEditingItem({...editingItem, result: e.target.value})}
                    className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white focus:ring-2 focus:ring-ns-gold/50 outline-none"
                    placeholder="3x MRR growth"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Display Order</label>
                  <input 
                    type="number"
                    value={editingItem.display_order || 0} 
                    onChange={e => setEditingItem({...editingItem, display_order: parseInt(e.target.value)})}
                    className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white focus:ring-2 focus:ring-ns-gold/50 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Tech Stack (Comma separated)</label>
                <input 
                  value={editingItem.tech?.join(', ') || ''} 
                  onChange={e => setEditingItem({...editingItem, tech: e.target.value.split(',').map(s => s.trim())})}
                  className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white focus:ring-2 focus:ring-ns-gold/50 outline-none"
                  placeholder="React, Next.js, Stripe"
                />
              </div>
            </div>
            <div className="p-6 bg-ns-black border-t border-ns-graphite flex justify-end gap-3 rounded-b-2xl">
              <button 
                onClick={() => setEditingItem(null)}
                className="px-6 py-2 bg-ns-graphite hover:bg-neutral-700 text-white font-medium rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving || !editingItem.title}
                className="px-6 py-2 bg-ns-gold hover:bg-blue-500 text-white font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                <Save className="w-4 h-4" /> Save Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
