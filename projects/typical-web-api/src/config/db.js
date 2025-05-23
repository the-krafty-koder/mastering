const users = [];
const getUsers = () => {
  return users;
};

const addUser = (user) => {
  users.push(user);
};

export { getUsers, addUser };
