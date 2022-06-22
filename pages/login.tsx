import useAuth from "hooks/useAuth";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [login, setLogin] = useState(true);

  const { signIn, signUp, loading } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    if (login) {
      signIn(email, password);
    } else {
      signUp(email, password);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex h-screen w-screen bg-black md:bg-transparent relative flex-col md:items-center md:justify-center">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />
      {/* form */}
      <form
        className="mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:px-14 md:max-w-md z-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl text-white">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", { required: true, minLength: 4 })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <button
          className="bg-[#e50914] w-full py-3 rounded font-semibold"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>
        <div className="text-[gray]">
          New to Netflix?{" "}
          <button
            type="submit"
            className="text-white hover:underline"
            onClick={() => setLogin(false)}
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
