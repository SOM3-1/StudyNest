import { Session } from "@constants/sessions";
import { dummyUsers } from "@constants/users";
import { generateUUID } from "./uuidGenerator";
import { DateTime } from 'luxon';
import { trackSessionCreation } from "src/analytics/trackEvent";
import { PickerTypes } from "@ourtypes/pickerTypes";

export const UTA_LOCATIONS: PickerTypes[] = [
    { label: 'Select Location', value: '' },
    { label: 'The Commons', value: 'The Commons' },
    { label: 'University Center', value: 'University Center' },
    { label: 'Library', value: 'Library' },
    { label: 'Science Hall', value: 'Science Hall' },
    { label: 'Nedderman Hall', value: 'Nedderman Hall' },
    { label: 'College Park Center', value: 'College Park Center' },
    { label: 'Arlington Hall', value: 'Arlington Hall' },
    { label: 'Kalpana Chawla Hall', value: 'Kalpana Chawla Hall' },
    { label: 'Vandergriff Hall', value: 'Vandergriff Hall' },
    { label: 'Arbor Oaks Club house', value: 'Arbor Oaks Club house' },
    { label: 'Timber Brook Apartments', value: 'Timber Brook Apartments' },
    { label: 'The Lofts', value: 'The Lofts' },
    { label: 'The Arlie Apartments', value: 'The Arlie Apartments' },
    { label: 'Teams Online Meeting', value: 'Teams Online Meeting' },
];

export const generateRandomSessions = (): Session[] => {
    const sessions: Session[] = [];
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const weekends = ['Saturday', 'Sunday'];

    const getRandomUsers = (count: number, excludeUserId: string): string[] => {
        const shuffledUsers = dummyUsers.filter(user => user.iD !== excludeUserId).sort(() => 0.5 - Math.random());
        return shuffledUsers.slice(0, count).map(user => user.iD);
    };

    const totalDays = 10;
    const minSessionsPerDay = 3;
    const maxSessionsPerDay = 4;
    const daysInPast = 3

    for (let day = -daysInPast; day < totalDays; day++) { 
        const currentDay = DateTime.now().plus({ days: day });
        const sessionsToday = Math.floor(Math.random() * (maxSessionsPerDay - minSessionsPerDay + 1)) + minSessionsPerDay;

        for (let i = 0; i < sessionsToday; i++) {
            const isWeekend = currentDay.weekday >= 6;
            const sessionDuration = isWeekend ? 90 : Math.random() < 0.5 ? 30 : 60;

            let sessionStart;
            if (isWeekend) {
                sessionStart = currentDay.set({ hour: Math.floor(Math.random() * 3 + 10), minute: 0 });
            } else {
                sessionStart = currentDay.set({ hour: Math.floor(Math.random() * 3 + 17), minute: 0 });
            }
            const sessionEnd = sessionStart.plus({ minutes: sessionDuration });

            const creator = dummyUsers[Math.floor(Math.random() * dummyUsers.length)];
            const participantCount = Math.floor(Math.random() * 7) + 2;

            const location = UTA_LOCATIONS[Math.floor(Math.random() * (UTA_LOCATIONS.length - 1)) + 1];

            const session: Session = {
                sessionId: generateUUID(),
                sessionTitle: `${creator.major} Study Session`,
                description: `A study session for ${creator.major} led by ${creator.fullName}.`,
                from: sessionStart.toISO(),
                to: sessionEnd.toISO(),
                location: location.value,
                major: creator.major,
                participantLimit: 8,
                createdBy: creator.iD,
                sessionMembers: getRandomUsers(participantCount, creator.iD),
            };

            sessions.push(session);
            trackSessionCreation(session, creator.fullName);
        }
    }

    return sessions;
};
