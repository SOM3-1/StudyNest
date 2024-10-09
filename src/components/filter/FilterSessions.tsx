import React, { useState, useCallback, useEffect } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { DateTime } from 'luxon';
import { homeScreenStyles } from '@components/home/homeScreenStyles';

interface FilterSessionsProps {
  onSearch: (searchTerm: string, selectedDate: string | null) => void;
  searchTerm: string;
  selectedDate: string | null;
}

export const FilterSessions: React.FC<FilterSessionsProps> = ({ onSearch, searchTerm, selectedDate }) => {
  const [searchInput, setSearchInput] = useState(searchTerm || '');
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    setSearchInput(searchTerm); 
  }, [searchTerm]);

  const debounceSearch = useCallback(
    (text: string) => {
      const handler = setTimeout(() => {
        onSearch(text, selectedDate);
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    },
    [selectedDate, onSearch]
  );

  const handleSearchChange = (text: string) => {
    setSearchInput(text);
    debounceSearch(text);
  };

  const handleDateChange = (event: any, date?: Date | null) => {
    setShowDatePicker(false);
    if (date) {
      const isoDate = DateTime.fromJSDate(date).toISODate() || DateTime.now().toISODate();
      onSearch(searchInput, isoDate); 
    }
  };

  return (
    <View style={homeScreenStyles.filterContainer}>
      <TextInput
        style={homeScreenStyles.input}
        placeholder="Search by title, major, location..."
        value={searchInput} 
        onChangeText={handleSearchChange}
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <MaterialIcons name="calendar-today" size={30} color="black" />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate ? DateTime.fromISO(selectedDate).toJSDate() : new Date()} 
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()} 
        />
      )}
    </View>
  );
};
