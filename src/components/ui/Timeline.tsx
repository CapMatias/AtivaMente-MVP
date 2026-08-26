import React from 'react';
import { View, Text, Image } from 'react-native';
import { COLORS } from '../../constants/theme';

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  photos?: string[];
  attachments?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline = ({ items }: TimelineProps) => {
  return (
    <View className="px-1">
      {items.map((item, index) => (
        <View key={item.id} className="mb-6 flex-row">
          <View className="items-center mr-4">
            <View className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white" style={{ elevation: 2 }} />
            {index !== items.length - 1 && (
              <View className="w-0.5 flex-1 bg-slate-200 mt-1" style={{ minHeight: 60 }} />
            )}
          </View>

          <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
            <View className="flex-row justify-between mb-2">
              <Text className="text-slate-800 font-bold">{item.title}</Text>
              <Text className="text-slate-400 text-xs">{item.date}</Text>
            </View>
            <Text className="text-slate-600 leading-5 mb-3">{item.description}</Text>

            {item.photos && item.photos.length > 0 && (
              <View className="flex-row flex-wrap gap-2 mb-2">
                {item.photos.map((photo, i) => (
                  <Image key={i} source={{ uri: photo }} className="w-20 h-20 rounded-xl" resizeMode="cover" />
                ))}
              </View>
            )}

            {item.attachments && item.attachments.length > 0 && (
              <View className="flex-row flex-wrap gap-2">
                {item.attachments.map((file, i) => (
                  <View key={i} className="flex-row items-center bg-slate-100 px-3 py-1.5 rounded-lg">
                    <Text className="text-slate-500 text-xs mr-1">📄</Text>
                    <Text className="text-slate-600 text-xs">{file}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};
