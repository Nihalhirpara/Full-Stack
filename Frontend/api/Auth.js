import AxiosWrapper from "../services/ApiConfig";

export const RegisterUser = async (body) => {
  return AxiosWrapper.post({
    endpoint: "register", // ✅ FIXED here
    body,
  });
};

export const LoginUser = async (body) => {
  return AxiosWrapper.post({
    endpoint: "login", // ✅ FIXED here
    body,
  });
};
