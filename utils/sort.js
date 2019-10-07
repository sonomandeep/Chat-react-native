export const compareUsers = (a, b) => {
  if (!a.lastMessage) return 1;
  if (!b.lastMessage) return -1;

  return new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt);
};
