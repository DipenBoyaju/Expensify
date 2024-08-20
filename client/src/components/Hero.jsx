import dashboard from '../assets/images/dashboard.png'
import { useCheckUserQuery } from '../features/auth/authApi';

const Hero = () => {
  const { data } = useCheckUserQuery();
  return (
    <section className="bg-gray-50 flex flex-col items-center">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Mangae Your Expense.
            <strong className="font-extrabold text-primary sm:block"> Control your Money. </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Start Creating your budget and save ton of money
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-800 focus:outline-none focus:ring active:bg-blue-800 sm:w-auto"
              href={`${!data ? '/signin' : '/dashboard'}`}
            >
              {
                !data ? 'Get Started' : 'Dashboard'
              }
            </a>
          </div>
        </div>
      </div>
      <div className="-mt-20 lg:-mt-32 rounded-xl border-2  overflow-hidden h-auto lg:w-[1000px] sm:mx-20 mb-20">
        <img src={dashboard} alt="" className='w-full h-auto' />
      </div>
    </section>
  )
}
export default Hero