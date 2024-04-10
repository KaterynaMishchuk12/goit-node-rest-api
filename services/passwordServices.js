import bcrypt from "bcrypt";

export const creatHashPassword = async (password) => {
  const result = await bcrypt.hash(password, 10);
  const compareResult = await bcrypt.compare(password, result);
  return compareResult;
};
// не впевнена, що цей сервіс потрібен
