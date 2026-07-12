import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Header } from '../components/ui/Header';
import { Card } from '../components/ui/Card';
import { MOCK_DATA } from '../services/mockData';

export default function EvolutionsScreen() {
  return (
    <View className="flex-1 bg-slate-50">
      <Header title="Evoluções" />
      
      <ScrollView className="flex-1 px-6 py-4">
        <Text className="text-slate-800 text-lg font-semibold mb-6">Linha do Tempo</Text>
        
        {MOCK_DATA.evolutions.map((evo, index) => (
          <View key={evo.id} className="mb-8 flex-row">
            <View className="items-center mr-4">
              <View className="w-4 h-4 rounded-full bg-blue-600" />
              {index !== MOCK_DATA.evolutions.length - 1 && (
                <View className="w-0.5 h-full bg-slate-200 mt-2" />
              )}
            </View>
            <Card className="flex-1">
              <View className="flex-row justify-between mb-2">
                <Text className="text-slate-800 font-bold">{evo.professionalName}</Text>
                <Text className="text-slate-400 text-xs">{evo.date}</Text>
              </View>
              <Text className="text-slate-600 leading-5 mb-3">{evo.description}</Text>
              {evo.photos.length > 0 && (
                <View className="flex-row space-x-2">
                  {evo.photos.map((p, i) => (
                    <View key={i} className="w-16 h-16 bg-slate-200 rounded-lg overflow-hidden">
                      {/* Image would be here */}
                    </View>
                  ))}
                </View>
              )}
            </Card>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
