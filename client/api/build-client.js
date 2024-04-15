import axios from 'axios'

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // Server side
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers
    })
  } else {
    // Client side
    return axios.create({
      baseURL: '/'
    })
  }
}

export default buildClient