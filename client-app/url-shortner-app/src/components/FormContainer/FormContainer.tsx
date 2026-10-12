
import * as React from 'react';
import axios from 'axios';
import { serverUrl } from '../../helpers/constants';

interface IFormContainerProps {}

const FormContainer: React.FunctionComponent<IFormContainerProps> = () => {
  const [fullUrl, setFullUrl] = React.useState<string>('');

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await axios.post(`${serverUrl}/shortUrl`, {
        fullUrl: fullUrl,
      });

      setFullUrl('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-2">
      <div className="bg-banner my-8 rounded-xl bg-cover bg-center">
        <div className="w-full h-full backdrop-brightness-50 rounded-xl p-20">

          <h2 className="text-white text-4xl text-center pb-4">
            URL Shortener
          </h2>

          <p className="text-white text-center pb-2 text-xl font-extralight">
            paste your untidy link to shorten it
          </p>

          <p className="text-white text-center pb-4 text-sm font-thin">
            free tool to a shorten URL or reduce link. use our URL shortner
            to create a shortend & neat link making it easy to use
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex">
              <div className="relative w-full">

                <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none text-slate-800">
                  urlshortner.link /
                </div>

                <input
                  type="text"
                  placeholder="paste your link here"
                  required
                  className="w-full p-4 ps-32 text-sm text-gray-800 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                  value={fullUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFullUrl(e.target.value)
                  }
                />

                <button
                  type="submit"
                  className="absolute end-0 top-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-lg border border-x-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Shorten URL
                </button>

              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default FormContainer;
