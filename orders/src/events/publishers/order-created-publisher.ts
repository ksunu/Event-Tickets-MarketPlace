import { Publisher , OrderCreatedEvent, Subjects} from '@swticket/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated
}