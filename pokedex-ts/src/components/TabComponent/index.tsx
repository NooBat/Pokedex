import { useState } from 'react';

import Moves from './Moves';
import Statistics from './Statistics';
import TabLists from './TabLists';

interface Move {
  id: number,
  name: string,
  level: number,
}

interface Stats {
  hp: number,
  attack: number,
  defense: number,
  special_attack: number,
  special_defense: number,
  speed: number,
}

interface TabComponentProps {
  stats: Stats
  moves: Move[],
}

export default function TabComponent({ stats, moves }: TabComponentProps) {
  const [tabKey, setTabKey] = useState<number>(1);

  return (
    <div className='flex flex-wrap absolute bottom-0 w-full'>
      <div className='w-full'>
        <TabLists
          tabNames={['Stats', 'Moves']}
          tabKey={tabKey}
          handleClick={(newTabKey: number) => {
            setTabKey(newTabKey);
          }}
        />
        <div className='flex flex-col min-w-0 mx-0 w-full h-[30vh]'>
          <div className='flex-auto bg-blue-600 border-x-4 border-t-8 border-b-4 border-solid border-blue-600 h-full w-full rounded-xl max-h-[300px] min-h-[180px]'>
            <Statistics stats={stats} tabKey={tabKey} />
            <Moves moves={moves} tabKey={tabKey} />
          </div>
        </div>
      </div>
    </div>
  );
}
