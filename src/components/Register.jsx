import { useForm } from "react-hook-form";
import { useAuth } from "../utils/useAuth";

export const Register = () => {
  const { error, loading, registerUser, message } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleRegisterUser = async (credentials) => {
    console.log(credentials);
    await registerUser({
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
      password: credentials.password,
      registeredDevice: 1,
      phoneNumber: credentials.phoneNumber,
      referralCode: null,
    });
    reset();
  };
  return (
    <div>
      <div className="flex items-center justify-center flex-col my-2">
        {error && (
          <p className="m-1 text-red-500 text-xs md:text-sm font-semibold">
            {error}
          </p>
        )}
        {message && (
          <p className="m-1 text-green-500 text-xs md:text-sm font-semibold">
            {message}
          </p>
        )}
      </div>
      <form
        className="mx-4 px-4 py-8 md:m-0 md:p-7 grid justify-center items-center border border-gray-200 rounded-xl bg-gray-200 "
        onSubmit={handleSubmit(handleRegisterUser)}
      >
        <div className="grid gap-6" id="form">
          <div className="w-full flex gap-3">
            <div>
              <input
                className="capitalize shadow-2xl p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-[#035ec5] placeholder:text-black rounded-lg"
                type="text"
                placeholder="First Name"
                id="firstName"
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />
              {errors.firstName && (
                <p className="m-1 text-red-500 text-xs block">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <input
                className="p-3 capitalize shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5] rounded-lg"
                type="text"
                placeholder="Last Name"
                id="Last-Name"
                {...register("lastName", {
                  required: "Last Name is required",
                })}
              />
              {errors.lastName && (
                <p className="m-1 text-red-500 text-xs">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-6 w-full">
            <div>
              <input
                className="p-3 shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px] rounded-lg"
                type="Email"
                placeholder="Email"
                autoComplete="on"
                id="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email address!",
                  },
                })}
              />
              {errors.email && (
                <p className="m-1 text-red-500 text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full">
            <input
              autoComplete="on"
              className="p-3 glass shadow-2xl  w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5] rounded-lg"
              type="password"
              placeholder="Password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 7,
                  message: "Password must be at least of 7 characters",
                },
              })}
            />
            {errors.password && (
              <p className="m-1 text-red-500 text-xs">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <input
              autoComplete="on"
              className="p-3 glass shadow-2xl  w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5] rounded-lg"
              type="tel"
              placeholder="Phone Number"
              id="phoneNumber"
              {...register("phoneNumber", {
                required: "Phone Number is required",
                minLength: {
                  value: 10,
                  message: "Please enter a valid 10 digit phone number",
                },
                maxLength: {
                  value: 10,
                  message: "Please enter a valid 10 digit phone number",
                },
              })}
            />
            {errors.phoneNumber && (
              <p className="m-1 text-red-500 text-xs">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <button
            disabled={loading}
            className="bg-slate-800 text-gray-200 rounded-xl outline-none glass shadow-2xl  w-full p-3 hover:bg-slate-950 hover:text-gray-100 duration-300 tracking-wider font-bold"
            type="submit"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};
