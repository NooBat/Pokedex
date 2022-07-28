import { React } from 'react';

const OptionsList = ({ ref, optionsList, handleClick }) => (
  <ul ref={ref} className="w-2/5 absolute top-10 block mx-auto border-solid border-1 border-black">
  {optionsList.map((option) => (
      <li
        key={option.id}
        className='m-0 bg-white h-20 border-solid border-4 border-black shadow hover:shadow-lg'
      >
        <button type='button' className="block mx-auto w-2/2" onClick={() => handleClick(option)}>
          <img className='inline-block w-20 h-20 ' src={option.form} alt={`${option.name}`} />
          <h3 className='inline-block mx-auto'>{option.name.charAt(0).toUpperCase() + option.name.slice(1)}</h3>
        </button>
      </li>
    ))
  }
  </ul>
);

export default OptionsList;
