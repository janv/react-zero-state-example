import classNames from 'classnames';
import { IconChevronDown } from 'featherico';
import { withModal } from '../../hocs/withModal';
import { ButtonInline } from '../Button';
import { createDropdown, createBaseOption, composeOption } from './factory';
import styles from './style.less';

export const BaseOption = createBaseOption({ activeClassName: styles.activeOption })(({ className, ...props }) => (
  <ButtonInline className={classNames(styles.option, className)} {...props} />
));

export const Option = composeOption()(BaseOption);
export const OptionWithModal = composeOption(withModal)(BaseOption);

export const Dropdown = createDropdown({
  wrapperClassName: styles.dropdown,
  wrapperOpenClassName: styles.dropdownOpen,
  menuComponent: ({ children }) => (
    <div className={styles.drop}>
      <ul>{children}</ul>
    </div>
  ),
  triggerComponent: ({ style, buttonClass, label, onClick, onFocus, tabIndex }) => {
    return (
      <ButtonInline
        onFocus={onFocus}
        className={classNames(styles.trigger, buttonClass)}
        style={style}
        onMouseDown={onClick}
        onTouchEnd={onClick}
        tabIndex={tabIndex}
        >
        {label} <IconChevronDown />
      </ButtonInline>
    );
  },
});

