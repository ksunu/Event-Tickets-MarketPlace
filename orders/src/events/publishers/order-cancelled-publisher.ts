import { Publisher, OrderCancelledEvent, Subjects } from '@swticket/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled
}