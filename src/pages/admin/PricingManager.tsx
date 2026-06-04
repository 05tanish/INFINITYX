import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Loader2, Save, X, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface PricingTier {
  id: string;
  name: string;
  price_range: string;
  description: string;
  features: string[];
  cta_label: string;
  featured: boolean;
  badge: string;
  display_order: number;
}

export default function PricingManager() {
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTier, setEditingTier] = useState<Partial<PricingTier> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      const { data, error } = await supabase
        .from('pricing')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setTiers(data || []);
    } catch (error) {
      console.error('Error fetching pricing:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingTier?.name) return;
    
    setIsSaving(true);
    try {
      if (editingTier.id) {
        const { error } = await supabase
          .from('pricing')
          .update(editingTier)
          .eq('id', editingTier.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('pricing')
          .insert([editingTier]);
        if (error) throw error;
      }
      
      await fetchPricing();
      setEditingTier(null);
    } catch (error) {
      console.error('Error saving pricing tier:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pricing tier?')) return;
    
    try {
      const { error } = await supabase
        .from('pricing')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setTiers(tiers.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting pricing tier:', error);
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
          <h1 className="text-3xl font-serif font-bold tracking-tight text-white mb-2">Pricing Manager</h1>
          <p className="text-ns-slate">Manage the pricing packages and tiers shown on the website.</p>
        </div>
        <button 
          onClick={() => setEditingTier({ featured: false, cta_label: 'Start Project', features: [], display_order: tiers.length + 1 })}
          className="flex items-center gap-2 px-4 py-2 bg-ns-gold hover:bg-blue-500 text-white font-medium rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Tier
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div key={tier.id} className={`bg-ns-navy border ${tier.featured ? 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'border-ns-graphite'} rounded-2xl p-6 group hover:border-ns-graphite transition-all flex flex-col`}>
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                  {tier.featured && <span className="px-2 py-0.5 bg-ns-gold/10 text-ns-gold text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-500/20">Featured</span>}
                </div>
                <p className="text-xs text-ns-slate">{tier.price_range}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setEditingTier(tier)} className="p-2 text-ns-slate hover:text-white transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(tier.id)} className="p-2 text-ns-slate hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            
            <p className="text-sm text-ns-slate mb-6 line-clamp-2">{tier.description}</p>
            
            <ul className="space-y-2 mb-8 flex-grow">
              {tier.features?.slice(0, 4).map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-ns-slate">
                  <Check className="w-3.5 h-3.5 text-ns-gold shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
              {tier.features?.length > 4 && <li className="text-[10px] text-neutral-600">+{tier.features.length - 4} more features</li>}
            </ul>

            <div className="pt-4 border-t border-ns-graphite flex items-center justify-between">
              <span className="text-[10px] text-neutral-600">Order: {tier.display_order}</span>
              <span className="text-xs font-bold text-ns-gold">{tier.cta_label}</span>
            </div>
          </div>
        ))}
      </div>

      {editingTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-ns-navy border border-ns-graphite rounded-2xl w-full max-w-2xl shadow-2xl my-8">
            <div className="p-6 border-b border-ns-graphite flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">{editingTier.id ? 'Edit Tier' : 'New Tier'}</h2>
              <button onClick={() => setEditingTier(null)} className="text-ns-slate hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Tier Name</label>
                  <input 
                    value={editingTier.name || ''} 
                    onChange={e => setEditingTier({...editingTier, name: e.target.value})}
                    className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white focus:ring-2 focus:ring-ns-gold/50 outline-none"
                    placeholder="MVP Package"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Price Range</label>
                  <input 
                    value={editingTier.price_range || ''} 
                    onChange={e => setEditingTier({...editingTier, price_range: e.target.value})}
                    className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white focus:ring-2 focus:ring-ns-gold/50 outline-none"
                    placeholder="₹1.5L - ₹3L"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Description</label>
                <textarea 
                  value={editingTier.description || ''} 
                  onChange={e => setEditingTier({...editingTier, description: e.target.value})}
                  className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white h-20 resize-none focus:ring-2 focus:ring-ns-gold/50 outline-none"
                  placeholder="Perfect for startups..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Features (Comma separated)</label>
                <input 
                  value={editingTier.features?.join(', ') || ''} 
                  onChange={e => setEditingTier({...editingTier, features: e.target.value.split(',').map(s => s.trim())})}
                  className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white focus:ring-2 focus:ring-ns-gold/50 outline-none"
                  placeholder="Feature 1, Feature 2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">CTA Label</label>
                  <input 
                    value={editingTier.cta_label || 'Start Project'} 
                    onChange={e => setEditingTier({...editingTier, cta_label: e.target.value})}
                    className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white focus:ring-2 focus:ring-ns-gold/50 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Badge (Optional)</label>
                  <input 
                    value={editingTier.badge || ''} 
                    onChange={e => setEditingTier({...editingTier, badge: e.target.value})}
                    className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white focus:ring-2 focus:ring-ns-gold/50 outline-none"
                    placeholder="Best Value"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <label className="flex items-center gap-3 p-4 bg-ns-black border border-ns-graphite rounded-xl cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={editingTier.featured || false}
                    onChange={e => setEditingTier({...editingTier, featured: e.target.checked})}
                    className="w-5 h-5 rounded border-ns-graphite text-blue-600 focus:ring-ns-gold/50 bg-ns-navy"
                  />
                  <span className="text-sm font-medium text-white">Featured Tier</span>
                </label>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Display Order</label>
                  <input 
                    type="number"
                    value={editingTier.display_order || 0} 
                    onChange={e => setEditingTier({...editingTier, display_order: parseInt(e.target.value)})}
                    className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white focus:ring-2 focus:ring-ns-gold/50 outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 bg-ns-black border-t border-ns-graphite flex justify-end gap-3 rounded-b-2xl">
              <button onClick={() => setEditingTier(null)} className="px-6 py-2 bg-ns-graphite hover:bg-neutral-700 text-white font-medium rounded-xl transition-colors">Cancel</button>
              <button 
                onClick={handleSave}
                disabled={isSaving || !editingTier.name}
                className="px-6 py-2 bg-ns-gold hover:bg-blue-500 text-white font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                <Save className="w-4 h-4" /> Save Tier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
