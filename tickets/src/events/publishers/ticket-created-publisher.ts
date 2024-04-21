import { Publisher, Subjects, TicketCreatedEvent } from '@swticket/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}
