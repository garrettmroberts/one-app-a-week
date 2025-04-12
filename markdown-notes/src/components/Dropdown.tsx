import { useState, FC, useRef, useEffect } from 'react';
import { LuNotebook, LuNotebookPen } from 'react-icons/lu';

interface DropdownProps {
  elements: string[];
  activeElement: string;
  onSelect: (element: string) => void;
  label: string;
}

const Dropdown: FC<DropdownProps> = ({
  elements,
  activeElement,
  onSelect,
  label
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0
  });
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node) &&
        contextMenuVisible
      ) {
        setContextMenuVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contextMenuVisible]);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setContextMenuVisible(true);
  };

  const handleContextMenuAction = (action: string) => {
    console.log(`${action} action triggered for ${activeElement}`);
    setContextMenuVisible(false);
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div
        className="dropdown"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(!isOpen);
          }
        }}
      >
        <div className="dropdown__header" onContextMenu={handleContextMenu}>
          <p className="dropdown__header__label">{label}</p>
          <div className="dropdown__header__title">
            <LuNotebookPen aria-hidden="true" />
            <span>{activeElement}</span>
          </div>
        </div>
        <div
          className={`dropdown__chevron ${isOpen ? 'dropdown__chevron--open' : ''}`}
          aria-hidden="true"
        />
      </div>

      <div
        className={`dropdown__dropdown ${isOpen ? 'dropdown__dropdown--visible' : ''}`}
        role="listbox"
        aria-hidden={!isOpen}
      >
        {elements
          .filter((ele) => ele !== activeElement)
          .map((ele) => (
            <div
              className="dropdown__dropdown__notebook"
              key={ele}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(ele);
                setIsOpen(false);
              }}
              role="option"
              tabIndex={isOpen ? 0 : -1}
              aria-selected={false}
            >
              <LuNotebook aria-hidden="true" />
              <span>{ele}</span>
            </div>
          ))}
      </div>

      <div
        className={`context-menu ${contextMenuVisible ? 'context-menu--visible' : ''}`}
        style={{
          position: 'fixed',
          top: contextMenuPosition.y,
          left: contextMenuPosition.x
        }}
        ref={contextMenuRef}
      >
        <ul className="context-menu__list">
          <li
            className="context-menu__item"
            onClick={() => handleContextMenuAction('rename')}
          >
            Rename
          </li>
          <li
            className="context-menu__item"
            onClick={() => handleContextMenuAction('duplicate')}
          >
            Duplicate
          </li>
          <li
            className="context-menu__item context-menu__item--danger"
            onClick={() => handleContextMenuAction('delete')}
          >
            Delete
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
