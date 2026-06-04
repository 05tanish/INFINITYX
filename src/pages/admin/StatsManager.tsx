import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Loader2, Save, X, CheckCircle2, Users, Clock, Shield, TrendingUp, Zap, Target } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const iconOptions = [
  { label: 'Check Circle', value: 'CheckCircle2', icon: CheckCircle2 },
  { label: 'Users', value: 'Users', icon: Users },
  { label: 'Clock', value: 'Clock', icon: Clock },
  { label: 'Shield', value: 'Shield', icon: Shield },
  { label: 'Trending Up', value: 'TrendingUp', icon: TrendingUp },
  { label: 'Zap', value: 'Zap', icon: Zap },
  { label: 'Target', value: 'Target', icon: Target },
];

interface Stat {
  id: string;
  label: string;
  value: string;
  suffix: string;
  icon: string;
  display_order: number;
}

export default function StatsManager() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStat, setEditingStat] = useState<Partial<Stat> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('stats')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setStats(data || []);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingStat?.label || !editingStat?.value) return;
    
    setIsSaving(true);
    try {
      if (editingStat.id) {
        const { error } = await supabase
          .from('stats')
          .update(editingStat)
          .eq('id', editingStat.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('stats')
          .insert([editingStat]);
        if (error) throw error;
      }
      
      await fetchStats();
      setEditingStat(null);
    } catch (error) {
      console.error('Error saving stat:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this stat?')) return;
    
    try {
      const { error } = await supabase
        .from('stats')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setStats(stats.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting stat:', error);
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
          <h1 className="text-3xl font-serif font-bold tracking-tight text-white mb-2">Agency Metrics</h1>
          <p className="text-ns-slate">Manage the key performance indicators and stats shown on the site.</p>
        </div>
        <button 
          onClick={() => setEditingStat({ icon: 'CheckCircle2', display_order: stats.length + 1 })}
          className="flex items-center gap-2 px-4 py-2 bg-ns-gold hover:bg-blue-500 text-white font-medium rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Metric
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const IconComp = iconOptions.find(i => i.value === stat.icon)?.icon || CheckCircle2;
          return (
            <div key={stat.id} className="bg-ns-navy border border-ns-graphite rounded-2xl p-6 group hover:border-ns-graphite transition-all shadow-xl text-center relative">
              <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setEditingStat(stat)} className="p-1.5 text-ns-slate hover:text-white transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleDelete(stat.id)} className="p-1.5 text-ns-slate hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
              <div className="inline-flex p-3 bg-ns-gold/10 rounded-xl border border-blue-500/20 text-ns-gold mb-4">
                <IconComp className="w-6 h-6" />
              </div>
              <div className="text-3xl font-serif font-bold text-white mb-1">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-ns-slate">
                {stat.label}
              </div>
              <div className="mt-4 text-[10px] text-neutral-600">Order: {stat.display_order}</div>
            </div>
          );
        })}
      </div>

      {editingStat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-ns-navy border border-ns-graphite rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-ns-graphite flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">{editingStat.id ? 'Edit Metric' : 'New Metric'}</h2>
              <button onClick={() => setEditingStat(null)} className="text-ns-slate hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Metric Label</label>
                <input 
                  value={editingStat.label || ''} 
                  onChange={e => setEditingStat({...editingStat, label: e.target.value})}
                  className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white focus:ring-2 focus:ring-ns-gold/50 outline-none"
                  placeholder="Projects Delivered"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Value</label>
                  <input 
                    value={editingStat.value || ''} 
                    onChange={e => setEditingStat({...editingStat, value: e.target.value})}
                    className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white focus:ring-2 focus:ring-ns-gold/50 outline-none"
                    placeholder="150"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Suffix</label>
                  <input 
                    value={editingStat.suffix || ''} 
                    onChange={e => setEditingStat({...editingStat, suffix: e.target.value})}
                    className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white focus:ring-2 focus:ring-ns-gold/50 outline-none"
                    placeholder="+"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Icon</label>
                  <select 
                    value={editingStat.icon || 'CheckCircle2'} 
                    onChange={e => setEditingStat({...editingStat, icon: e.target.value})}
                    className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white focus:ring-2 focus:ring-ns-gold/50 outline-none"
                  >
                    {iconOptions.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Display Order</label>
                  <input 
                    type="number"
                    value={editingStat.display_order || 0} 
                    onChange={e => setEditingStat({...editingStat, display_order: parseInt(e.target.value)})}
                    className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white focus:ring-2 focus:ring-ns-gold/50 outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 bg-ns-black border-t border-ns-graphite flex justify-end gap-3 rounded-b-2xl">
              <button onClick={() => setEditingStat(null)} className="px-6 py-2 bg-ns-graphite hover:bg-neutral-700 text-white font-medium rounded-xl transition-colors">Cancel</button>
              <button 
                onClick={handleSave}
                disabled={isSaving || !editingStat.label || !editingStat.value}
                className="px-6 py-2 bg-ns-gold hover:bg-blue-500 text-white font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                <Save className="w-4 h-4" /> Save Metric
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
