export interface Session {
    sessionId: string; 
    sessionTitle: string; 
    description: string; 
    from: string;
    to: string;
    location: string;
    major: string;
    participantLimit: number;
    createdBy: string;
    sessionMembers: string[];
  }