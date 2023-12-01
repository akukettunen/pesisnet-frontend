import axios from 'axios'

const config = {
  baseURL: 'http://localhost:2020/api/v1'
}

var ax = axios.create(config)

export default ax
