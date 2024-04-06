import axios from 'axios'

const local = window.location.href.includes('localhost')

const config = {
  baseURL: local ? 'http://localhost:2020/api/v1' : 'https://pesisnet-3a367fb30c25.herokuapp.com/api/v1'
}

var ax = axios.create(config)

export default ax
