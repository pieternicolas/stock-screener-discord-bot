const admins = [
  {
    id: '378183563490754561',
    name: 'ray',
  },
  {
    id: '381109866837835776',
    name: 'kopet',
  },
];

export const usernameCheck = (id: string) => {
  return admins.find((item) => item.id === id);
};
