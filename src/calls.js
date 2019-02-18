import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://fastapp.pythonanywhere.com/api',
  withCredentials: true
});

export const getMembers = () => {
  return instance.get('/members')
}

export const getMember = (id) => {
  return instance.get('/member/' + id)
}

export const getEvents = () => {
  return instance.get('/events')
}

export const getEvent = (id) => {
  return instance.get('/event/' + id)
}

export const getTypes = () => {
  return instance.get('/types')
}

export const signIn = (data) => {
  return instance.post('/signin', data)
}

export const addEvent = (data) => {
  return instance.post('/event', data)
}

export const addMember = (data) => {
  return instance.post('/member', data)
}
