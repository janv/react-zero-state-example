import * as React from 'react';
import * as PropTypes from 'prop-types';
import Modal, {Props as ModalProps} from '../../components/Modal';

type Props = Exclude<ModalProps, 'children'> & {
  renderModalContent: (actions:Actions) => React.ReactNode
  children: (actions:Actions) => React.ReactNode
}

interface State {
  isOpen: boolean
}

interface Actions {
  openModal():void
  closeModal():void
}

/**
 * Component that manages open/closed state for a modal
 *
 * ```
 * <WithModal
 *     {...modalProps}
 *     onClose={handleClose}
 *     renderModalContent={({openModal, closeModal})=><ModalContent onCancel={closeModal} />}
 * >
 *   { ({closeModal, openModal}) => <ModalTriggerComponent onClick={openModal}/> }
 * </WithModal>
 * ```
 */
export class WithModal extends React.Component<Props, State> {
  state:State = {
    isOpen: false,
  };

  actions:Actions = {
    openModal: () => {
      this.setState({ isOpen: true });
    },
    closeModal: () => {
      this.setState({ isOpen: false });
      if (this.props.onClose) {
        this.props.onClose();
      }
    },
  };

  render() {
    const { onClose, renderModalContent, children: render, ...props } = this.props; // eslint-disable-line no-unused-vars
    return (
      <>
        <Modal
          {...props}
          isOpen={this.state.isOpen}
          onClose={this.actions.closeModal}
          >
          {renderModalContent(this.actions)}
        </Modal>
        {render(this.actions)}
      </>
    );
  }
}

const propTypes = {
  modalProps: PropTypes.shape({
    body: PropTypes.any.isRequired, // needs to be a component
  }),
  requireExplicitClose: PropTypes.bool,
};


/**
 * The Props the decorator adds to the decorated function
 */
interface DecoratorProps {
  modalProps: Props & {
    body: React.ComponentClass<any>
  },
  onClose?: () => void
}

/**
 * Decorator that wraps a component in a WithModal component.
 *
 * Usage:
 *
 * ```
 * const MyComponentWithModal = withModal(MyComponent)
 *
 * <MyComponentWithModal
 *      modalProps={{body: ModalBodyComponent, ...otherModalProps}}
 *      requireExplicitClose={boolean}
 *      {...propsForMyComponent}
 * />
 * ```
 *
 * It passes an `onClick` handler to MyComponent that opens the modal.
 * It doesn't forward any props to the Modalbody except for a `closeModal` callback
 */
export function withModal<P extends {onClick?():void}>(WrappedComponent:React.ComponentClass<P>) {
  function ComponentWithModal(allProps:P&DecoratorProps) {
    // @ts-ignore
    const { modalProps: { body: ModalBody, ...modalProps }, onClose, ...props } = allProps;
    return (
      <WithModal
        {...modalProps}
        onClose={onClose}
        renderModalContent={({ closeModal }) => <ModalBody closeModal={closeModal} />}
        >
        {({ openModal }) => <WrappedComponent {...props} onClick={openModal} />}
      </WithModal>
    );
  }

  (ComponentWithModal as React.SFC).propTypes = propTypes;
  return ComponentWithModal;
}

