import jwt from "jsonwebtoken";

interface IToken {
  name: string;
  email: string;
}

const createToken = (jwtPayload: IToken, secret: string, expiresIn: string) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};

export default createToken;
