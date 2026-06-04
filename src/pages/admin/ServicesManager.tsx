import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Loader2, Save, X, Code2, Smartphone, Server, Shield, Cpu, Layers, Video } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const iconOptions = [
  { label: 'Code', value: 'Code2', icon: Code2 },
  { label: 'Smartphone', value: 'Smartphone', icon: Smartphone },
  { label: 'Server', value: 'Server', icon: Server },
  { label: 'Shield', value: 'Shield', icon: Shield },
  { label: 'CPU', value: 'Cpu', icon: Cpu },
  { label: 'Layers', value: 'Layers', icon: Layers },
  { label: 'Video', value: 'Video', icon: Video },
];

interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  features: string[];
  tags: string[];
  display_order: number;
}

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingService?.name) return;
    
    setIsSaving(true);
    try {
      if (editingService.id) {
        const { error } = await supabase
          .from('services')
          .update(editingService)
          .eq('id', editingService.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('services')
          .insert([editingService]);
        if (error) throw error;
      }
      
      await fetchServices();
      setEditingService(null);
    } catch (error) {
      console.error('Error saving service:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setServices(services.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting service:', error);
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
          <h1 className="text-3xl font-serif font-bold tracking-tight text-white mb-2">Services Manager</h1>
          <p className="text-ns-slate">Manage the expertise and offerings shown on your agency site.</p>
        </div>
        <button 
          onClick={() => setEditingService({ icon: 'Code2', features: [], tags: [], display_order: services.length + 1 })}
          className="flex items-center gap-2 px-4 py-2 bg-ns-gold hover:bg-blue-500 text-white font-medium rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const IconComp = iconOptions.find(i => i.value === service.icon)?.icon || Code2;
          return (
            <div key={service.id} className="bg-ns-navy border border-ns-graphite rounded-2xl p-6 group hover:border-ns-graphite transition-all shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-ns-gold/10 rounded-xl border border-blue-500/20 text-ns-gold">
                  <IconComp className="w-6 h-6" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingService(service)} className="p-2 text-ns-slate hover:text-white transition-colors"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(service.id)} className="p-2 text-ns-slate hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{service.name}</h3>
              <p className="text-sm text-ns-slate line-clamp-3 mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {service.tags?.map((tag, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 bg-ns-graphite text-ns-slate rounded-md border border-ns-graphite">{tag}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-ns-navy border border-ns-graphite rounded-2xl w-full max-w-2xl shadow-2xl my-8">
            <div className="p-6 border-b border-ns-graphite flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">{editingService.id ? 'Edit Service' : 'New Service'}</h2>
              <button onClick={() => setEditingService(null)} className="text-ns-slate hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Service Name</label>
                  <input 
                    value={editingService.name || ''} 
                    onChange={e => setEditingService({...editingService, name: e.target.value})}
                    className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white focus:ring-2 focus:ring-ns-gold/50 outline-none"
                    placeholder="Web Development"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Icon</label>
                  <select 
                    value={editingService.icon || 'Code2'} 
                    onChange={e => setEditingService({...editingService, icon: e.target.value})}
                    className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white focus:ring-2 focus:ring-ns-gold/50 outline-none"
                  >
                    {iconOptions.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Description</label>
                <textarea 
                  value={editingService.description || ''} 
                  onChange={e => setEditingService({...editingService, description: e.target.value})}
                  className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white h-24 resize-none focus:ring-2 focus:ring-ns-gold/50 outline-none"
                  placeholder="Describe your service..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Features (Comma separated)</label>
                <input 
                  value={editingService.features?.join(', ') || ''} 
                  onChange={e => setEditingService({...editingService, features: e.target.value.split(',').map(s => s.trim())})}
                  className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white focus:ring-2 focus:ring-ns-gold/50 outline-none"
                  placeholder="Feature 1, Feature 2, Feature 3"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Tags (Comma separated)</label>
                  <input 
                    value={editingService.tags?.join(', ') || ''} 
                    onChange={e => setEditingService({...editingService, tags: e.target.value.split(',').map(s => s.trim())})}
                    className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white focus:ring-2 focus:ring-ns-gold/50 outline-none"
                    placeholder="React, Next.js"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ns-slate">Display Order</label>
                  <input 
                    type="number"
                    value={editingService.display_order || 0} 
                    onChange={e => setEditingService({...editingService, display_order: parseInt(e.target.value)})}
                    className="w-full bg-ns-black border border-ns-graphite rounded-xl p-3 text-white focus:ring-2 focus:ring-ns-gold/50 outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 bg-ns-black border-t border-ns-graphite flex justify-end gap-3 rounded-b-2xl">
              <button onClick={() => setEditingService(null)} className="px-6 py-2 bg-ns-graphite hover:bg-neutral-700 text-white font-medium rounded-xl transition-colors">Cancel</button>
              <button 
                onClick={handleSave}
                disabled={isSaving || !editingService.name}
                className="px-6 py-2 bg-ns-gold hover:bg-blue-500 text-white font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                <Save className="w-4 h-4" /> Save Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
