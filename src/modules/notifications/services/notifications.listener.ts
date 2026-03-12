import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class NotificationsListener {
  private readonly logger = new Logger(NotificationsListener.name);

  @OnEvent('crm.contact.created')
  async handleCrmContactCreated(payload: {
    contactId: string;
    orgId: string;
    email: string;
  }): Promise<void> {
    this.logger.log(
      `crm.contact.created received: contact=${payload.contactId} org=${payload.orgId} email=${payload.email}`,
    );
  }
}

