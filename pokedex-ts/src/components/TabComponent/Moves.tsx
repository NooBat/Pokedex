interface MovesProps {
  moves: Move[],
  tabKey: number,
}

const Moves = ({ moves, tabKey }: MovesProps) => (
  <div
    className={
      tabKey === 2
        ? 'h-[100%] overflow-y-scroll grid grid-cols-3 px-[5%] py-[0.5%] gap-y-[9%] gap-x-[2%] rounded-xl bg-blue-200'
        : 'hidden'
    }
  >
    {moves.map((move: Move) => (
      <div
        key={move.id}
        className='border-solid border-t-4 border-x-2 bg-white border-blue-400 shadow-2xl rounded-xl hover:scale-[1.1] transition-all ease-in-out'
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
