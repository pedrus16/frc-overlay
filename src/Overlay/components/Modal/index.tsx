import React, { ReactNode } from 'react';
import { animated, config, useTransition } from 'react-spring';

import style from './style.module.css';

interface Props {
  show: boolean;
  children: ReactNode;
}

const Modal = ({ show = false, children }: Props) => {
  const transitions = useTransition(show, null, {
    from: { opacity: 0, transform: 'translateY(-50%) scale(0.1)' },
    enter: { opacity: 1, transform: 'translateY(0%)  scale(1)' },
    leave: { opacity: 0, transform: 'translateY(-50%)  scale(0.1)' },
    config: config.default,
  });

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <div key={key} className={style.modal}>
              <animated.div style={props} className={style.content}>
                {children}
              </animated.div>
            </div>
          )
      )}
    </>
  );
};

export default Modal;
