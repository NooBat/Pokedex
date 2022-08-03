import { React } from 'react';

const Moves = ({ moves, tabKey }) => (
  <div
    className={
      tabKey === 2
        ? 'h-[100%] overflow-y-scroll grid grid-cols-3 px-[5%] py-[0.5%] gap-[5%] bg-white'
        : 'hidden'
    }
  >
    {moves.map((move) => (
      <div
        key={move.id}
        className='border-solid border-4 border-blue-400 rounded-xl'
      >
        <p className='font-bold pl-3'>
          {move.name
            .split('-')
            .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
            .join(' ')}
        </p>
        <p className='pl-3'>{`Level ${move.level}`}</p>
      </div>
    ))}
  </div>
);

export default Moves;
