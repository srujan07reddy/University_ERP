import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import type { UserRole } from '../../types';
import { RoleTabApi } from '../../api/roleTabApi';

export type RoleTabCategory = string;

export type RoleTabItem = {
  id?: string;
  tab_id: string;
  label: string;
  icon?: string;
  order?: number;
  category?: RoleTabCategory;
};

type Props = {
  role: UserRole;
  activeTabId: string;
  onChangeTabId: (tabId: string) => void;
  // Map backend tab_id -> React render function
  renderTab: (tabId: string) => React.ReactNode;
};

const sortByOrder = (a: RoleTabItem, b: RoleTabItem) => {
  const ao = typeof a.order === 'number' ? a.order : 0;
  const bo = typeof b.order === 'number' ? b.order : 0;
  return ao - bo;
};

export const RoleTabRenderer = ({ role, activeTabId, onChangeTabId, renderTab }: Props) => {
  const [loading, setLoading] = useState(true);
  const [tabs, setTabs] = useState<RoleTabItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await RoleTabApi.getByRole(role);
        const data = Array.isArray(res.data) ? res.data : res.data?.results ?? [];
        if (!mounted) return;
        setTabs(data);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || 'Failed to load role tabs');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [role]);

  const grouped = useMemo(() => {
    const map = new Map<string, RoleTabItem[]>();
    for (const t of tabs) {
      const cat = t.category || 'Base Portal';
      map.set(cat, [...(map.get(cat) || []), t]);
    }
    const out: Array<{ category: string; items: RoleTabItem[] }> = [];
    for (const [category, items] of map.entries()) {
      out.push({ category, items: items.slice().sort(sortByOrder) });
    }
    out.sort((a, b) => a.category.localeCompare(b.category));
    return out;
  }, [tabs]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center" style={{ padding: 24 }}>
        <ActivityIndicator />
        <Text className="text-slate-400 mt-3">Loading role navigation…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1" style={{ padding: 24 }}>
        <Text className="text-red-400 font-bold mb-2">Role navigation error</Text>
        <Text className="text-slate-300">{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Sidebar / menu */}
      <ScrollView showsVerticalScrollIndicator={true}>
        <View className="space-y-3">
          {grouped.map((g) => (
            <View key={g.category}>
              <Text className="text-slate-500 text-xs font-bold tracking-widest px-4" style={{ marginBottom: 8 }}>
                {g.category}
              </Text>
              <View className="space-y-2">
                {g.items.map((t) => (
                  <TouchableOpacity
                    key={t.tab_id}
                    onPress={() => onChangeTabId(t.tab_id)}
                    className={`mx-4 p-4 rounded-2xl flex-row items-center transition-all ${activeTabId === t.tab_id ? 'bg-blue-600' : 'bg-white/5'}`}
                  >
                    <Text className={`font-bold ${activeTabId === t.tab_id ? 'text-white' : 'text-slate-400'}`}>
                      {t.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Active tab renderer */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={true} contentContainerStyle={{ flexGrow: 1 }}>
        {renderTab(activeTabId)}
      </ScrollView>
    </View>
  );
};

