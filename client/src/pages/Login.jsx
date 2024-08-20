import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserLoginMutation } from "../features/auth/authApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import GAuth from "../components/GAuth";
import { RiCopperCoinFill } from "react-icons/ri";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const dispatch = useDispatch()
  const nav = useNavigate();
  const [login] = useUserLoginMutation()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await login(formData).unwrap();
      console.log(formData);
      console.log(response.data);

      if (response.status === 'success') {
        dispatch(setCredentials(response?.data));

        toast.success(response.message, {
          position: "top-right"
        });
        setFormData({ email: '', password: '' });
        nav('/')
      }


    } catch (error) {
      console.log('Registration error:', error);
      toast.error(error.data?.message || 'An error occurred', {
        position: "top-right"
      });
    }

  }

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="/">
              <span className="sr-only">Home</span>
              <span className="flex items-center gap-1 bg-gradient-to-r from-blue-700 to-[#00000025] rounded-md p-2">
                <span><RiCopperCoinFill className=" text-white text-4xl" /></span><span className="text-2xl font-semibold">Expensify</span>
              </span>
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Expensify 💰 💸
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Mangae Your Expense.
              Control your Money. Start Creating your budget and save ton of money
            </p>
          </div>
        </section>

        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-0 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="/"
              >
                <span className="sr-only">Home</span>
                <span>
                  <RiCopperCoinFill className=" text-primary text-7xl" />
                </span>
              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Expensify 💰 💸
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Mangae Your Expense.
                Control your Money. Start Creating your budget and save ton of money
              </p>
            </div>

            <div className="sm:flex sm:justify-center sm:mt-10 lg:mt-0">
              <div className="shadow-2xl border lg:border-none lg:shadow-none p-8 w-[70vw] lg:w-[35vw]">
                <form onSubmit={handleSubmit}>
                  <div className="text-center space-y-2 py-5">
                    <h2 className="text-2xl font-semibold">Sign in to Expensify</h2>
                    <p>Welcome back! Please sign in to continue</p>
                  </div>
                  <div className="text-center py-4 pb-6 border-b">
                    <GAuth />
                  </div>
                  <div className="space-y-4 py-6">
                    <div className="space-y-2">
                      <h3>Email</h3>
                      <input type="email" className="border p-3 w-full" placeholder=" Johndoe@gmail.com" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <h3>Password</h3>
                      <input type="password" className="border p-3 w-full" name="password" value={formData.password} onChange={handleChange} placeholder="**********" />
                    </div>
                    <button type="submit" className="text-center p-3 bg-primary text-white text-lg uppercase w-full rounded-sm hover:bg-blue-800">Sign In</button>
                  </div>
                </form>
                <div className="">
                  Dont have an Account ? <span className="cursor-pointer hover:text-primary" onClick={() => nav('/signup')}>Sign up</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}
export default Login