import { React, useState } from 'react';

import Moves from './Moves';
import Stats from './Stats';
import TabLists from './TabLists';

export default function TabComponent({ stats, moves }) {
  const [tabKey, setTabKey] = useState(1);

  return (
    <div className='flex flex-wrap absolute bottom-0 w-full'>
      <div className='w-full'>
        <TabLists
          tabNames={['Stats', 'Moves']}
          tabKey={tabKey}
          handleClick={(newTabKey) => {
            setTabKey(newTabKey);
          }}
        />
        <div className='flex flex-col min-w-0 mx-0 break-words w-full shadow-lg h-[30vh]'>
          <div className='px-2 py-2 flex-auto bg-blue-600 h-full w-full rounded-t-xl max-h-[300px] min-h-[180px]'>
            <Stats stats={stats} tabKey={tabKey} />
            <Moves moves={moves} tabKey={tabKey} />
          </div>
        </div>
      </div>
    </div>
  );
}
