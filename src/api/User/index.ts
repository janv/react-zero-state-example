import backend from '../../mockBackend';
import {EndpointFunction} from 'ladda-cache'

(<EndpointFunction>getCurrentUser).operation = 'READ';
export function getCurrentUser() {
  return backend.user.getCurrentUser();
}

(<EndpointFunction>getById).operation = 'READ';
(<EndpointFunction>getById).byId = true;
export function getById(id:string) {
  return backend.user.getById(id);
}

(<EndpointFunction>getByIds).operation = 'READ';
(<EndpointFunction>getByIds).byIds = true;
export function getByIds(ids:string[]) {
  return backend.user.getByIds(ids);
}

(<EndpointFunction>getAll).operation = 'READ';
export function getAll() {
  return backend.user.getAll();
}

(<EndpointFunction>searchByName).operation = 'READ';
export function searchByName(query:string) {
  return backend.user.searchByName(query);
}
