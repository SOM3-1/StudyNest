import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { AppState } from '@ourtypes/AppState';
import { homeScreenStyles } from './homeScreenStyles';
import { DisplaySessions } from './DisplaySessions';
import { getAvailableAndSortedSessions } from '@components/helpers/sessionUtils';
import { DateTime } from 'luxon';
import { requestNotificationsPermission } from '@services/notifications/notificationPermissionService';
import { FilterSessions } from '@components/filter/FilterSessions';
import { theme } from 'src/utils/theme';
import { AddButton } from './AddButton';
import { NoSessions } from 'src/commom/NoSessions';

export const Home: React.FC = () => {
  const sessions = useSelector((state: AppState) => state.sessions);
  const loggedInUser = useSelector((state: AppState) => state.loggedInUser);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredSessions, setFilteredSessions] = useState(sessions);

  useEffect(() => {
    requestNotificationsPermission();
  }, []);

  const sortedSessions = useMemo(() => getAvailableAndSortedSessions(sessions), [sessions]);

  useEffect(() => {
    setIsLoading(true);

    const filterTimeout = setTimeout(() => {
      const filtered = sortedSessions.filter(session => {
        const sessionDate = DateTime.fromISO(session.from).toISODate();

        const matchesDate = selectedDate ? sessionDate === selectedDate : true;

        const matchesSearch =
          session.sessionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          session.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
          session.location.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesDate && matchesSearch;
      });

      setFilteredSessions(filtered);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(filterTimeout);
  }, [sortedSessions, searchTerm, selectedDate]);

  const handleSearchAndFilter = (newSearchTerm: string, newSelectedDate: string | null) => {
    setSearchTerm(newSearchTerm);
    setSelectedDate(newSelectedDate);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedDate(null);
  };

  return (
    <View style={homeScreenStyles.container}>

      <FilterSessions
        onSearch={handleSearchAndFilter}
        searchTerm={searchTerm}
        selectedDate={selectedDate}
      />

      {(searchTerm || selectedDate) && (
        <TouchableOpacity
          onPress={handleClearFilters}
          style={homeScreenStyles.clearButton}
        >
          <Text style={homeScreenStyles.clearButtonText}>Clear Filters</Text>
        </TouchableOpacity>
      )}

      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.blue} />
      ) : filteredSessions.length > 0 ? (
        <DisplaySessions sessions={filteredSessions} loggedInUser={loggedInUser} />
      ) : (<NoSessions/>
      )}
      <AddButton />
    </View>
  );
};
