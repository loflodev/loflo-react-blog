import { ChangeEvent, useContext, useState } from "react";
import { emailChecker, passwordChercker } from "../helpers/utils";
import { register } from "../services/authentication";
import HeaderContext from "../context/HeaderProvider";
import { ErrorMessage } from "../helpers/types";

interface RegisterFormType {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  errorMessage: {
    username: ErrorMessage;
    email: ErrorMessage;
    password: ErrorMessage;
  };
  inputFocus: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}

const RegisterForm = () => {
  const { setToggle } = useContext(HeaderContext);

  const [registerForm, setRegisterForm] = useState<RegisterFormType>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    errorMessage: {
      username: undefined,
      email: undefined,
      password: undefined,
    },
    inputFocus: {
      username: "ring-gray-300",
      email: "ring-gray-300",
      password: "ring-gray-300",
      confirmPassword: "ring-gray-300",
    },
  });

  const [canRegister, setCanRegister] = useState<boolean>(false);

  const handleSignInForm = (event: ChangeEvent<HTMLInputElement>) => {
    setRegisterForm((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const email = emailChecker(registerForm.email);
    const password = passwordChercker(
      registerForm.password,
      registerForm.confirmPassword
    );

    setRegisterForm((prevData) => {
      return {
        ...prevData,
        errorMessage: {
          username:
            prevData.username.length < 3 ? "username is too short" : undefined,
          email: !email.isValid ? email.message : undefined,
          password: !password.isValid ? password.message : undefined,
        },
        inputFocus: {
          username:
            prevData.username.length < 3 ? "ring-red-600" : "ring-gray-300",
          email: !email.isValid ? "ring-red-600" : "ring-gray-300",
          password: !password.isValid ? "ring-red-600" : "ring-gray-300",
          confirmPassword: !password.isValid ? "ring-red-600" : "ring-gray-300",
        },
      };
    });

    setCanRegister(
      registerForm.username.length > 3 && email.isValid && password.isValid
    );

    if (canRegister) {
      await register({
        username: registerForm.username,
        authentication: {
          email: registerForm.email,
          password: registerForm.password,
        },
      });

      setRegisterForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        errorMessage: {
          username: undefined,
          email: undefined,
          password: undefined,
        },
        inputFocus: {
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
      });

      setToggle(false);
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="/admin" method="POST">
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
            </div>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="username"
                onChange={(event) => handleSignInForm(event)}
                autoComplete="off"
                required
                className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${registerForm.inputFocus.username} focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                value={registerForm.username}
              />
            </div>
            {!canRegister && (
              <p className="text-red-600">
                {registerForm.errorMessage.username}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
            </div>

            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                onChange={(event) => handleSignInForm(event)}
                autoComplete="email"
                required
                className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${registerForm.inputFocus.email} focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                value={registerForm.email}
              />
            </div>
            {!canRegister && (
              <p className="text-red-600">{registerForm.errorMessage.email}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                onChange={(event) => handleSignInForm(event)}
                autoComplete="current-password"
                required
                className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${registerForm.inputFocus.password} focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                value={registerForm.password}
              />
            </div>
            {!canRegister && (
              <p className="text-red-600">
                {registerForm.errorMessage.password}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={(event) => handleSignInForm(event)}
                autoComplete="current-password"
                required
                className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${registerForm.inputFocus.password} sm:text-sm sm:leading-6`}
                value={registerForm.confirmPassword}
              />
            </div>
            {!canRegister && (
              <p className="text-red-600">
                {registerForm.errorMessage.password}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              // disabled={!isDisabled}
              onClick={(event) => handleSubmit(event)}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
