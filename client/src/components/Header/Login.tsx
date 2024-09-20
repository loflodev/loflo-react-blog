import { useState, ChangeEvent, useContext, useEffect } from "react";
import { login } from "../../services/authentication";
import HeaderContext from "../../context/HeaderProvider";
import { ErrorMessage } from "../../helpers/types";
import { emailChecker } from "../../helpers";

type SignInFormType = {
  email: string;
  password: string;
  errorMessage: {
    email: ErrorMessage;
    password: ErrorMessage;
  };
  inputFocus: {
    email: string;
    password: string;
  };
};

const SignIn = () => {
  const { setShowRegistration, setToggle } = useContext(HeaderContext);
  const [canRegister, setCanRegister] = useState<boolean>(false);
  const [reload, setReload] = useState(false);
  const [incorrectCredentials, setIncorrectCredentials] =
    useState<ErrorMessage>();

  const [signInForm, setSignInForm] = useState<SignInFormType>({
    email: "",
    password: "",
    errorMessage: {
      email: undefined,
      password: undefined,
    },
    inputFocus: {
      email: "ring-gray-300",
      password: "ring-gray-300",
    },
  });

  // const isDisabled = Boolean(signInForm.email && signInForm.password);

  const handleSignInForm = (event: ChangeEvent<HTMLInputElement>) => {
    setSignInForm((prevSignData) => ({
      ...prevSignData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const email = emailChecker(signInForm.email);

    setSignInForm((prevData) => {
      return {
        ...prevData,
        email: email.isValid ? email.input : "",
        password: prevData.password.length < 3 ? "" : prevData.password,
        errorMessage: {
          email: email.isValid ? undefined : "Email is incorrect",
          password:
            prevData.password.length < 3 ? "Password is too short" : undefined,
        },
        inputFocus: {
          email: email.isValid ? "ring-gray-300" : "ring-red-600",
          password:
            prevData.password.length < 3 ? "ring-red-600" : "ring-gray-300",
        },
      };
    });

    setCanRegister(email.isValid && Boolean(signInForm.password));
    console.log(canRegister);

    try {
      if (canRegister) {
        const userData = await login(signInForm);

        setIncorrectCredentials("Incorrect email or password");

        if (userData) {
          window.localStorage.setItem(
            "loggedUserInfo",
            JSON.stringify(userData)
          );

          setIncorrectCredentials(undefined);
          setSignInForm({
            email: "",
            password: "",
            errorMessage: {
              email: undefined,
              password: undefined,
            },
            inputFocus: {
              email: "ring-gray-300",
              password: "ring-gray-300",
            },
          });

          setReload(true);
          setToggle(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    reload && window.location.reload();
  }, [reload]);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                onChange={(event) => handleSignInForm(event)}
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={signInForm.email}
              />
            </div>
            {!canRegister && (
              <p className="text-red-600">{signInForm.errorMessage.email}</p>
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
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                onChange={(event) => handleSignInForm(event)}
                autoComplete="current-password"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={signInForm.password}
                required
              />
            </div>
            {!canRegister && (
              <p className="text-red-600">{signInForm.errorMessage.password}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={(event) => handleSubmit(event)}
            >
              Sign in
            </button>
            {incorrectCredentials && (
              <p className="text-red-600">{incorrectCredentials}</p>
            )}
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <button
            onClick={() => setShowRegistration(true)}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            {" " + "Sign up now"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
