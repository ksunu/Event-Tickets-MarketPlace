import { Publisher, Subjects, TicketUpdatedEvent } from '@swticket/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
}
