import backend from '../../mockBackend';
import {EndpointFunction} from 'ladda-cache'
import { NewPraise, Praise } from '../../mockBackend/Praise';

(<EndpointFunction>getById).operation = 'READ';
(<EndpointFunction>getById).byId = true;
export function getById(id:string) {
  return backend.praise.getById(id);
}

(<EndpointFunction>getAll).operation = 'READ';
(<EndpointFunction>getAll).updateOnCreate = (args:string[], x:Praise, xs:Praise[]) =>
  !args[0] || x.recipient.id === args[0] ? [x, ...xs] : xs;
export function getAll(recipientId?:string) {
  return backend.praise.getAll(recipientId);
}

(<EndpointFunction>create).operation = 'CREATE';
export function create(praiseData:NewPraise) {
  return backend.praise.create(praiseData);
}

(<EndpointFunction>edit).operation = 'UPDATE';
export function edit(praise:Praise) {
  return backend.praise.edit(praise);
}

(<EndpointFunction>like).operation = 'COMMAND';
export function like(id:string) {
  return backend.praise.like(id);
}

(<EndpointFunction>unlike).operation = 'COMMAND';
export function unlike(id:string) {
  return backend.praise.unlike(id);
}

(<EndpointFunction>remove).operation = 'DELETE';
export function remove(id:string) {
  return backend.praise.remove(id);
}


