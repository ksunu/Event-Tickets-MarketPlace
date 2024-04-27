const OrderIndex = ({ orders }) => {
  return (
    <div className="mt-4">
      <h2>History</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Ticket</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map(order => (
              <tr key={order.id}>
                <td>{order.ticket.title}</td>
                <td>{order.status}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders')

  return { orders: data}
}

export default OrderIndex