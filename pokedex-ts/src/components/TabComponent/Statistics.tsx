interface Stats {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

interface StatsProps {
  stats: Stats;
  tabKey: number;
}

type StatKeys = keyof Stats;

const Statistics = ({ stats, tabKey }: StatsProps) => {
  const allStats = Object.keys(stats) as StatKeys[];

  return (
    <div
      className={
        tabKey === 1
          ? 'h-[100%] min-h-[200px] min-w-[800px] overflow-y-scroll rounded-xl bg-blue-200 flex justify-center'
          : 'hidden'
      }
    >
      <table className='w-fit my-auto'>
        {allStats.map((stat: StatKeys) => (
          <tbody key={stat}>
            <tr>
              <th className='text-right pr-[3vw] w-fit'>
                {stat === 'hp'
                  ? 'HP'
                  : stat
                    .split('_')
                    .map(
                      (token: string) => token.charAt(0).toUpperCase() + token.slice(1)
                    )
                    .join(' ')}
              </th>
              <td className='text-center pr-[3vw]'>{stats[stat]}</td>
              <td className='box-content w-[50vw] min-w-[400px] p-0 h-fit'>
                <div
                  className='flex border-solid border-2 bg-white border-black h-[24px]'
                  key={`${stat}-line-${stats[stat]}`}
                >
                  <div
                    className=' bg-green-500 border-r-2 border-solid border-black'
                    style={{ width: `${(stats[stat] / 255) * 100}%` }}
                  />
                </div>
              </td>
            </tr>
            <tr className='h-[5px]'>
              <td />
              <td />
              <td />
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Statistics;
