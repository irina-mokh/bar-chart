import { useEffect, useRef, useState } from 'react';
import { SelectProps } from '../../types';

export const Select = ({ options, selected, handler }: SelectProps) => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const optionsEl = options.map((opt) => (
    <li
      className={'select__option ' + (opt.value === selected ? 'select__option_active' : '')}
      onClick={() => {
        handler(opt.value);
        toggleDropdown();
      }}
    >
      {opt.title}
    </li>
  ));
  const active = options.find((opt) => opt.value === selected);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
			// eslint-disable-next-line prettier/prettier
			const target = e.target as HTMLElement;
      if (ref.current instanceof HTMLElement && !ref.current.contains(target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="select" ref={ref}>
      <p className="select__input" onClick={toggleDropdown}>
        {active?.title}
        <span className={'select__arrow ' + (open ? 'select__arrow_open' : '')}></span>
      </p>
      {open && <ul className="select__list">{optionsEl}</ul>}
    </div>
  );
};
