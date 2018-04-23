import * as React from 'react';
import * as ReactModal from 'react-modal';
import * as classNames from 'classnames';
import { noop } from 'lodash/fp';

import * as styles from './style.less';

const TRANSITION_DURATION = 150;

const SIZES = {
  XS_WIDTH: 400,
  SM_WIDTH: 430,
  MD_WIDTH: 530,
  LG_WIDTH: 600,
  XL_WIDTH: 830,
  XXL_WIDTH: 990,
  AUTO: 'auto',
};

const parseMinHeight = (minHeight?:number|string) =>
  typeof minHeight === 'number' ? `${minHeight}px` : minHeight || 'auto';

const asSizeValue = (v:number|string) => (typeof v === 'number' ? `${v}px` : v);

const ModalTitle:React.SFC<{className?:string}> = ({ children, className }) => (
  <h1 className={classNames(styles.title, className)}>
    {children}
  </h1>
);

export interface Props {
  title?: string
  size: keyof typeof SIZES
  width?: string | number
  minHeight?: string | number
  isOpen: boolean
  onClose?():void
  children?: React.ReactNode
}

const Modal:React.SFC<Props> = ({ title, size, width, minHeight, isOpen, onClose, children }) => {
  const style = {
    overlay: {
      transitionDuration: TRANSITION_DURATION + 'ms',
    },
    content: {
      width: width || asSizeValue(SIZES[size]),
      minHeight: parseMinHeight(minHeight),
    },
  };

  const props = {
    isOpen,
    onRequestClose: onClose || noop,
    closeTimeoutMS: TRANSITION_DURATION,
    style,
    className: styles.content,
    overlayClassName: styles.overlay
  };

  return (
    <ReactModal {...props} ariaHideApp={false}>
      <>
        {title && <ModalTitle>{title}</ModalTitle>}
        {children}
      </>
    </ReactModal>
  );
}

export default Modal
