import Link from 'next/link'

const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map(ticket => (
    <tr key={ticket.id}>
      <td>{ticket.title}</td>
      <td>€ {ticket.price.toFixed(2)}</td>
      <td>
        <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
          View
        </Link>
      </td>
    </tr>
  ))
  
  return (
    <div>
      <h1>Tickets</h1>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {ticketList}
        </tbody>
      </table>
    </div>
  )
}

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets')

  return{ tickets: data }
}

export default LandingPage