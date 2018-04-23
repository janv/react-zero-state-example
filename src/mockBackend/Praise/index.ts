import * as moment from 'moment';
import { compose, keyBy, values, uniq, filter, identity } from 'lodash/fp';
import {orderBy} from 'lodash';
import { generateId } from '../id';
import { withLatency } from '../latency';
import { User, USER, getCurrentUser } from '../User';

interface NewPraise {
  title: string
  body: string
  recipient: User
}

interface Praise extends NewPraise {
  id: string
  author: User
  likes: User[]
  createdAt: number
}

const PRAISES = keyBy('id', [
  {
    id: generateId(),
    title: 'Great job onboarding Fiona!',
    body: `Everyone loved how smoothly you lead Fiona's onboarding process.\nYou really set a great example for us all!`,
    author: USER.MARK,
    recipient: USER.MARY,
    likes: [USER.FIONA, USER.CHRIS],
    createdAt: moment().subtract(1, 'day').valueOf()
  } as Praise,
  {
    id: generateId(),
    title: 'What a start!',
    body: `You've only been here for two months, but you're already making a huge difference. Can't imagine anymore how it was without you!`,
    author: USER.MARY,
    recipient: USER.FIONA,
    likes: [USER.CHRIS, USER.MARK, USER.HEATHER, USER.MARY],
    createdAt: moment().subtract(2, 'day').valueOf()
  } as Praise,
  {
    id: generateId(),
    title: 'The strategy workshop worked wonders',
    body: 'Thank you for putting such an amazing workshop together.\nYou really made an effort to involve everyone - which really worked out well. Everyone seems super engaged and motivating to really bring our company to the next level in 2018!',
    author: USER.HEATHER,
    recipient: USER.CHRIS,
    likes: [USER.MARY, USER.MARK],
    createdAt: moment().subtract(3, 'day').valueOf()
  } as Praise,
  {
    id: generateId(),
    title: 'Everyone loved the company trip',
    body: `Your organization of our last company trip was truly outstanding.\nWe've been doing this for several years by now and it wasn't always easy - but this time it was really just an awesome trip from start to finish! Keep it up!`,
    author: USER.CHRIS,
    recipient: USER.HEATHER,
    likes: [USER.MARY, USER.MARK, USER.FIONA],
    createdAt: moment().subtract(4, 'day').valueOf()
  } as Praise,
]);

export const getById = (id:string) => withLatency(PRAISES[id])

export const getAll = (recipientId?:string) => {
  const filtered = recipientId
    ? Object.values(PRAISES).filter(p => p.recipient.id === recipientId)
    : Object.values(PRAISES)
  return withLatency(orderBy(filtered, ['createdAt'], ['desc']))
}

export const create = (praiseData:NewPraise) => {
  return getCurrentUser().then(currentUser => {
    const id = generateId();
    const praise:Praise = {
      ...praiseData,
      id,
      author: currentUser,
      likes: [],
      createdAt: moment().valueOf()
    };
    PRAISES[id] =  praise;
    return withLatency(praise);
  });
}

export const edit = (praise:Praise) => {
  PRAISES[praise.id] =  praise;
  return withLatency(praise);
}

export const remove = (id:string) => withLatency(delete PRAISES[id]);

export const like = (id:string):Promise<Praise> => getCurrentUser().then(u => {
  const praise = PRAISES[id]
  return {
    ...praise,
    likes: uniq([...praise.likes, u])
  };
});

export const unlike = (id:string):Promise<Praise> => getCurrentUser().then(u => {
  const praise = PRAISES[id]
  return {
    ...praise,
    likes: filter(l => l !== u, praise.likes)
  };
});

