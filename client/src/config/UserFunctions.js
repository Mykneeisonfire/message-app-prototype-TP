const users = [];

export const userJoin = (id, room) => {
const user = { id, room };
users.push(user);
return (user);
}

export const currentUser = (id) => {
    return users.find(user => user.id === id);
}