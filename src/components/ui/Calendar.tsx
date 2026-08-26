import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme';

interface CalendarProps {
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
  markedDates?: string[];
}

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export const Calendar = ({ selectedDate, onDateSelect, markedDates = [] }: CalendarProps) => {
  const [currentMonth] = useState(new Date());
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const formatDate = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  return (
    <View className="bg-white rounded-2xl p-4 mb-4">
      <Text className="text-slate-800 text-lg font-bold text-center mb-4">
        {MONTHS[month]} {year}
      </Text>

      <View className="flex-row justify-between mb-2">
        {DAYS.map((day) => (
          <Text key={day} className="text-slate-400 text-xs font-medium w-[13%] text-center">{day}</Text>
        ))}
      </View>

      <View className="flex-row flex-wrap">
        {Array.from({ length: firstDay }).map((_, i) => (
          <View key={`empty-${i}`} className="w-[13%] h-10" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = formatDate(day);
          const isSelected = dateStr === selectedDate;
          const isMarked = markedDates.includes(dateStr);

          return (
            <TouchableOpacity
              key={day}
              onPress={() => onDateSelect(dateStr)}
              className="w-[13%] h-10 items-center justify-center"
            >
              <View className={`w-8 h-8 rounded-full items-center justify-center ${isSelected ? 'bg-blue-600' : isMarked ? 'bg-blue-100' : ''}`}>
                <Text className={`text-sm ${isSelected ? 'text-white font-bold' : isMarked ? 'text-blue-600 font-medium' : 'text-slate-600'}`}>
                  {day}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
