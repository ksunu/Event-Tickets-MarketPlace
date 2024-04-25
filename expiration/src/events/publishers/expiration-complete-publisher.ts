import { Subjects, Publisher, ExpirationCompleteEvent } from '@swticket/common'

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete
}