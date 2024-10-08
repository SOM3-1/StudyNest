import { Session } from "@constants/sessions";
import { dummyUsers } from "@constants/users";
import { generateUUID } from "./uuidGenerator";
import { DateTime } from 'luxon';

export const UTA_LOCATIONS = [
    'The Commons', 
    'University Center', 
    'Library', 
    'Science Hall', 
    'Nedderman Hall', 
    'College Park Center',
    'Arlington Hall', 
    'Kalpana Chawla Hall', 
    'Vandergriff Hall', 
    'Arbor Oaks Club house',
    'Timber Brook Apartments',
    'The Lofts',
    'The Arlie Apartments',
    'Teams Online Meeting', 
];

export const generateRandomSessions = (): Session[] => {
    const sessions: Session[] = [];
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const weekends = ['Saturday', 'Sunday'];
  
    const getRandomUsers = (count: number): string[] => {
        const shuffledUsers = [...dummyUsers].sort(() => 0.5 - Math.random());
        return shuffledUsers.slice(0, count).map(user => user.iD);
    };

    const totalDays = 6; 
    const minSessionsPerDay = 3;
    const maxSessionsPerDay = 4;

    for (let day = 0; day < totalDays; day++) {
        const currentDay = DateTime.now().plus({ days: day }); 
        const sessionsToday = Math.floor(Math.random() * (maxSessionsPerDay - minSessionsPerDay + 1)) + minSessionsPerDay;

        for (let i = 0; i < sessionsToday; i++) {
            const isWeekend = currentDay.weekday >= 6;
            const dayOfWeek = isWeekend ? weekends[Math.floor(Math.random() * weekends.length)] : weekdays[Math.floor(Math.random() * weekdays.length)];

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

            const location = UTA_LOCATIONS[Math.floor(Math.random() * UTA_LOCATIONS.length)];

            const session: Session = {
                sessionId: generateUUID(),
                sessionTitle: `${creator.major} Study Session`,
                description: `A study session for ${creator.major} led by ${creator.fullName}.`,
                date: sessionStart.toISODate(),
                from: sessionStart.toFormat('HH:mm'),
                to: sessionEnd.toFormat('HH:mm'),
                location: location,
                major: creator.major,
                participantLimit: 8,
                createdBy: creator.iD,
                sessionMembers: getRandomUsers(participantCount),
            };

            sessions.push(session);
        }
    }

    return sessions;
};
