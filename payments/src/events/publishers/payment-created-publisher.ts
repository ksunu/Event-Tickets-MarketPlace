import { Subjects, Publisher, PaymentCreatedEvent } from '@swticket/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated
}
