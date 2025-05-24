import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Cable } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputError from '@/components/InputError.tsx';
import { useState } from 'react';
import { useNavigate } from 'react-router';

type Inputs = {
  username: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = ({ username, password }) => {
    if (username === 'admin' && password === 'admin') {
      navigate('/dashboard');
    } else {
      setMessage('Invalid credentials');
    }
  };

  return (
    <div className="flex min-h-full flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div className="flex items-center gap-x-2">
              <Cable className="size-12" />
              <span className="text-xl font-bold">UPSGuard</span>
            </div>
            <h2 className="mt-8 text-2xl leading-9 font-bold tracking-tight text-gray-900">
              Real-time UPS Monitoring
            </h2>
          </div>

          <div className="mt-10">
            <div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                action="#"
                method="POST"
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm leading-6 font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <Input
                      {...register('username', { required: true })}
                      className="h-11"
                      id="username"
                      type="text"
                      autoComplete="off"
                    />
                    {errors.username && (
                      <InputError
                        className="mt-2"
                        message="This field is required"
                      />
                    )}
                    {message && (
                      <InputError className="mt-2" message={message} />
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm leading-6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <Input
                      {...register('password', { required: true })}
                      className="h-11"
                      id="password"
                      type="password"
                    />
                    {errors.password && (
                      <InputError
                        className="mt-2"
                        message="This field is required"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <Button className="h-11 w-full cursor-pointer" size="lg">
                    Login
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden h-screen w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/ups.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
