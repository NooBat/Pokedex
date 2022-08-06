import { React } from 'react';
import { ReactComponent as FacebookIcon } from '../assets/logos/facebook.svg';
import { ReactComponent as LinkedInIcon } from '../assets/logos/linkedin.svg';
import { ReactComponent as GithubIcon } from '../assets/logos/github.svg';

const Footer = () => (
  <>
    <p className='text-[3vh] text-center leading-relaxed mt-[10vh] pb-[2vh] drop-shadow-sm shadow-dark'>
      <span className='font-extrabold text-[4vh]'>Pokédex App</span> by{' '}
      <span className='decoration-orange-400 text-[4vh] font-extrabold'>
        Daniel Nguyen
      </span>
    </p>
    <div className='w-fit h-fit bg-white mx-auto rounded-full flex gap-x-[50px] min-w-[270px] p-[10px]'>
      <a
        href='https://www.facebook.com/profile.php?id=100013314911153'
        target='_blank'
        rel='noreferrer noopener'
      >
        <FacebookIcon
          className='rounded-full w-fit h-fit shadow-xl shadow-dark hover:shadow-black 
          hover:scale-[1.1] transition-all ease-in-out delay-100'
          id='facebook-icon'
        />
      </a>
      <a
        href='https://www.linkedin.com/in/kh%C3%B4i-nguy%E1%BB%85n-tr%E1%BA%A7n-249741226/'
        target='_blank'
        rel='noreferrer noopener'
      >
        <LinkedInIcon
          className='rounded-full w-fit h-fit shadow-xl shadow-dark hover:shadow-black 
                    hover:scale-[1.1] transition-all ease-in-out delay-100'
          id='linkedin-icon'
        />
      </a>
      <a
        href='https://github.com/NooBat'
        target='_blank'
        rel='noreferrer noopener'
      >
        <GithubIcon
          className='rounded-full w-fit h-fit shadow-xl shadow-dark hover:shadow-black 
          hover:scale-[1.1] transition-all ease-in-out'
          id='github-icon'
        />
      </a>
    </div>
    <div className='h-[5vh]' />
  </>
);

export default Footer;
