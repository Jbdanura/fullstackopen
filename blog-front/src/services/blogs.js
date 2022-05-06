import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async(newObject)=>{
  const config = {
    headers: {Authorization:token},
  }
  const response = await axios.post(baseUrl,newObject,config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

const like = (title,likes) => {
  const request = axios.put(`${baseUrl}/${title}/${likes}`)
  return request.then(response => response.data)
}

const remove = (title) => {
  const request = axios.delete(`${baseUrl}/${title}`)
  return request.then(response => response)
}

export default {setToken,create, getAll, update, like, remove}