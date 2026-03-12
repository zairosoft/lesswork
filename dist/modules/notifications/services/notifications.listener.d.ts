export declare class NotificationsListener {
    private readonly logger;
    handleCrmContactCreated(payload: {
        contactId: string;
        orgId: string;
        email: string;
    }): Promise<void>;
}
