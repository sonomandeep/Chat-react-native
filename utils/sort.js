const compareUsers = (a, b) => {
  if (!a.lastMessage) return 1;
  if (!b.lastMessage) return -1;

  if (a.lastMessage.createdAt > b.lastMessage.createdAt) return -1;
  if (a.lastMessage.createdAt < b.lastMessage.createdAt) return 1;
  return 0;
};
