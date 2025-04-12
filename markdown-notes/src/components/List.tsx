import { LuFolderClosed, LuFolderOpen } from 'react-icons/lu';
import { FC, useRef } from 'react';

interface ListProps {
  elements: string[];
  activeElement: string;
  onSelect: (element: string) => void;
  label: string;
}

const List: FC<ListProps> = ({ elements, activeElement, onSelect, label }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="list-container">
      <div className="list" role="button" tabIndex={0}>
        <p className="list__header">{label}</p>
      </div>
      <div className="list__content" role="listbox" ref={contentRef}>
        {elements.map((ele) => (
          <div
            className={
              `list__content__element` +
              (activeElement === ele ? ' active' : '')
            }
            key={ele}
            onClick={() => onSelect(ele)}
            role="option"
            aria-selected={false}
          >
            {activeElement === ele ? (
              <LuFolderOpen aria-hidden="true" />
            ) : (
              <LuFolderClosed aria-hidden="true" />
            )}
            <span>{ele}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
