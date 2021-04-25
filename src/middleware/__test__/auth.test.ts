import AuthService from "@src/service/auth.service";
import { authMiddleware } from "../auth";

describe("AuthMiddleware", () => {
  it("Should verify a JWT token and call the next middleware", () => {
    const jwtToken = AuthService.generateToken({ data: "fake" });
    const reqFake = {
      headers: {
        "x-access-token": jwtToken,
      },
    };
    const resFake = {};
    const nextFake = jest.fn();
    authMiddleware(reqFake, resFake, nextFake);
    expect(nextFake).toHaveBeenCalled();
  });

  it("Should return UNAUTHORIZED if there is a problem on the token verification", () => {
    const reqFake = {
      headers: {
        "x-access-token": "invalid token",
      },
    };
    const sendMock = jest.fn();
    const resFake = {
      status: jest.fn(() => ({
        send: sendMock,
      })),
    };
    const nextFake = jest.fn();
    // eslint-disable-next-line @typescript-eslint/ban-types
    authMiddleware(reqFake, resFake as object, nextFake);
    expect(resFake.status).toHaveBeenCalledWith(401);
    expect(sendMock).toHaveBeenCalledWith({
      code: 401,
      error: "jwt malformed",
    });
  });

  it("Should return ANUATHORIZED middleware if theres no token", () => {
    const reqFake = {
      headers: {},
    };
    const sendMock = jest.fn();
    const resFake = {
      status: jest.fn(() => ({
        send: sendMock,
      })),
    };
    const nextFake = jest.fn();
    // eslint-disable-next-line @typescript-eslint/ban-types
    authMiddleware(reqFake, resFake as object, nextFake);
    expect(resFake.status).toHaveBeenCalledWith(401);
    expect(sendMock).toHaveBeenCalledWith({
      code: 401,
      error: "jwt must be provided",
    });
  });
});
