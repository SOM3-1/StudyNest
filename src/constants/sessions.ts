export interface Session {
    sessionId: string; 
    sessionTitle: string; 
    description: string; 
    date: string;
    location: string;
    major: string;
    participantLimit: number;
    createdBy: string;
    sessionMembers: string[]; 
    from: string;
    to: string;
  }