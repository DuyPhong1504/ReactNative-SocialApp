export const Fetch = () => {
  return {
    type: "FETCH",
  };
};

export const AddItem = (item) => {
  return {
    type: "ADD",
    payload: item,
  };
};
export const RemoveItem = (item) => {
  return {
    type: "REMOVE",
    payload: item,
  };
};
