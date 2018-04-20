import { keyBy } from 'lodash/fp';
import { generateId } from '../id'
import { withLatency } from '../latency';

export interface User {
  id: string
  firstName: string
  name: string
  avatar: string
}

export const USER = {
  CHRIS: {
    id: generateId(),
    firstName: 'Chris',
    name: 'Chris the CEO',
    avatar: '/images/chris.png'
  } as User,
  MARK: {
    id: generateId(),
    firstName: 'Mark',
    name: 'Mark the Manager',
    avatar: '/images/mark.png'
  } as User,
  MARY: {
    id: generateId(),
    firstName: 'Mary',
    name: 'Mary the Manager',
    avatar: '/images/mary.png'
  } as User,
  HEATHER: {
    id: generateId(),
    firstName: 'Heather',
    name: 'Heather from HR',
    avatar: '/images/heather.png'
  } as User,
  FIONA: {
    id: generateId(),
    firstName: 'Fiona',
    name: 'Fiona from Finance',
    avatar: '/images/fiona.png'
  } as User,
  CHARLY: {
    id: generateId(),
    firstName: 'Charly',
    name: 'Charly the Coder',
    avatar: '/images/charly.png'
  } as User
}

const CURRENT_USER = USER.CHARLY;

const USERS = keyBy('id', [USER.CHRIS, USER.HEATHER, USER.MARK, USER.MARY, USER.FIONA, USER.CHARLY]);

export const getCurrentUser = () => withLatency(CURRENT_USER)
export const getById = (id:string) => withLatency(USERS[id])
export const getByIds = (ids:string[]) => withLatency(Object.values(USERS).filter(u=> ids.includes(u.id)))
export const getAll = () => withLatency(Object.values(USERS));
export const searchByName = (query:string) => Promise.resolve(
  Object.values(USERS).filter(u => !!u.name.toLowerCase().match(query))
)

