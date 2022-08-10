import { useState, useEffect, React } from 'react';
import { ReactComponent as LoadingIcon } from '../assets/icons/loadingIcon.svg';
import cryingPikachu from '../assets/icons/cryingPikachu.png'

const LoadingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 60000);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="fixed my-[42vh] px-auto mx-[45vw] w-[10vw] h-[16vh] bg-inherit flex flex-col">
          <LoadingIcon className="animate-spin-slow h-[10vh] w-[10vh] bg-inherit rounded-full mx-auto" alt="loading" />
          <h1 className="text-[6vh] font-bold mx-auto">Loading...</h1>
        </div>
        ) : (
        <div className="fixed my-[37vh] w-screen h-[26vh] bg-inherit flex flex-col justify-center">
          <img className='h-[20vh] w-auto mx-auto' src={cryingPikachu} alt='crying-pikachu' />
          <h1 className="text-[6vh] text-center h-full w-auto">Sorry we cannot load the content so here is a crying Pikachu</h1>
        </div>
        )
      }
    </div>
  );
};

export default LoadingPage;
