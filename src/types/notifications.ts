export interface Notification {
    android?: Record<string, unknown>;
    body?: string;
    title?: string;
}

export interface RemoteMessage {
    notification?: Notification;
}