import LoadingPage from '../../pages/LoadingPage';

interface TabListsProps {
  tabNames: string[];
  tabKey: number;
  handleClick: (newTabKey: number) => void;
}

const TabLists = ({ tabNames, tabKey, handleClick }: TabListsProps) =>
  tabNames.length > 0 ? (
    <ul
      className='flex mb-0 list-none ml-[10vw] flex-wrap w-[40vw]'
      role='tablist'
    >
      {tabNames.map((tabName: string, index: number) => (
        <li
          className='-mb-px last:mr-0 flex-auto text-center'
          key={`link${index + 1}}`}
        >
          <button
            type='button'
            className={`text-xs w-full font-bold uppercase px-5 py-3 shadow-lg rounded-t-lg block leading-normal
              ${
                tabKey === index + 1
                  ? 'text-white bg-blue-600'
                  : 'text-blue-600 bg-white'
              }`}
            onClick={() => handleClick(index + 1)}
            role='tablist'
          >
            <p className='text-[15px] font-bold'>{tabName}</p>
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <LoadingPage />
  );

export default TabLists;
