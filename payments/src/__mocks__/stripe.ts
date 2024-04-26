export const stripe = {
  charges: {
    create: jest.fn().mockResolvedValue({
      id: '12345'
    })
  }
}