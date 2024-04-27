import Router from "next/router"
import useRequest from "../../hooks/use-request"

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: { ticketId: ticket.id },
    onSuccess: (order) => Router.push('/orders/[orderId]', `/orders/${order.id}`)
  })

  return (
    <div>
      <h2>Ticket info</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Ticket</th>
            <th>Price</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ticket.title}</td>
            <td>€ {ticket.price.toFixed(2)}</td>
            <td className="d-flex justify-content-center">
              <button onClick={() => doRequest()} className="btn btn-primary">Purchase</button>
            </td>
          </tr>
        </tbody>
      </table>
      {errors}
    </div>
  )
}

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query
  const { data } = await client.get(`/api/tickets/${ticketId}`)

  return { ticket: data }
}

export default TicketShow