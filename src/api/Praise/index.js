import backend from '../../mockBackend';

getById.operation = 'READ';
getById.byId = true;
export function getById(id) {
  return backend.praise.getById(id);
}

getAll.operation = 'READ';
getAll.updateOnCreate = (args, x, xs) =>
  !args[0] || x.recipient.id === args[0] ? [x, ...xs] : xs;
export function getAll(recipientId = null) {
  return backend.praise.getAll(recipientId);
}

create.operation = 'CREATE';
export function create(praiseData) {
  return backend.praise.create(praiseData);
}

edit.operation = 'UPDATE';
export function edit(praise) {
  return backend.praise.edit(praise);
}

like.operation = 'COMMAND';
export function like(id) {
  return backend.praise.like(id);
}

unlike.operation = 'COMMAND';
export function unlike(id) {
  return backend.praise.unlike(id);
}

remove.operation = 'DELETE';
export function remove(id) {
  return backend.praise.remove(id);
}


