import * as React from 'react';
import * as classNames from 'classnames';
import * as styles from './style.less';

type Props = {
  className?:string
  getRef?:React.Ref<HTMLInputElement>
}

export default ({ getRef, className, ...props}:Props) =>
  <input ref={getRef} className={classNames(styles.input, className)} { ...props } />;
