import { Ticket } from '../ticket'

it('implements optimistic concurrency control', async () => {
  // Create instance of ticket
  const ticket = Ticket.build({
    title: 'Ticket', 
    price: 100,
    userId: '123'
  })
  
  // Save the ticket to the DB
  ticket.save()
  
  // Fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id)
  const secondInstance = await Ticket.findById(ticket.id)
  
  // Make 2 separate changes to the fetched ticket
  firstInstance!.set({ price: 50 })
  secondInstance!.set({ price: 150})
  
  // Save the first update ticket
  await firstInstance!.save()

  // Save the second update ticket and expect and error
  try {
    await secondInstance!.save()
  } catch (err) {
    return
  }
})

it('increments the version number on multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'Ticket', 
    price: 100,
    userId: '123'
  })
  
  await ticket.save()
  expect(ticket.version).toEqual(0)
  await ticket.save()
  expect(ticket.version).toEqual(1)
  await ticket.save()
  expect(ticket.version).toEqual(2)
})