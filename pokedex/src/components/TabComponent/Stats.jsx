import { React } from 'react';

const Stats = ({ stats, tabKey }) => {
  const allStats = Object.keys(stats);

  return (
    <div
      className={
        tabKey === 1
          ? 'h-[100%] overflow-y-scroll justify-center flex rounded-xl bg-blue-200 gap-x-[2%]'
          : 'hidden'
      }
    >
      <div className='flex flex-col my-auto content-center gap-y-[4px]'>
        <p className='text-right font-bold'>HP</p>
        <p className='text-right font-bold'>Attack</p>
        <p className='text-right font-bold'>Defense</p>
        <p className='text-right font-bold'>Special Attack</p>
        <p className='text-right font-bold'>Special Defense</p>
        <p className='text-right font-bold'>Speed</p>
      </div>
      <div className='flex flex-col my-auto content-center gap-y-[4px]'>
        {allStats.map((stat) => (
          <p className='text-left font-bold' key={`${stat}-${stats[stat]}`}>
            {stats[stat]}
          </p>
        ))}
      </div>
      <div className='flex flex-col my-auto content-center gap-y-[4px] w-[60%] h-fit'>
        {allStats.map((stat) => (
          <div
            className='flex border-solid border-2 bg-white border-black h-[24px]'
            key={`${stat}-line-${stats[stat]}`}
          >
            <div
              className=' bg-green-500 border-r-2 border-solid border-black'
              style={{ width: `${(stats[stat] / 255) * 100}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
