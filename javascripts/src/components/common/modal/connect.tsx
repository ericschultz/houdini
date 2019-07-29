//License: LGPL-3.0-or-later
//https://github.com/jaredpalmer/formik/blob/master/src/connect.tsx
import React = require("react");
import hoistNonReactStatics = require('hoist-non-react-statics');
import { ModalContext } from "./Modal";

export const {
    Provider: ModalProvider,
    Consumer: ModalConsumer,
  } = React.createContext<ModalContext>({} as any);

export interface ModalContextProps {
  modal: ModalContext
}

/**
 * Connect any component to Modal context from a parent and inject as a prop called `modal`;
 * @param Comp React Component
 */
export function connectModal<OuterProps>(
    Comp: React.ComponentType<OuterProps & ModalContextProps>
  ) {
    const C: React.SFC<OuterProps> = (props: OuterProps) => (
      <ModalConsumer>
        {modal => <Comp {...props} modal={modal} />}
      </ModalConsumer>
    );
    const componentDisplayName =
      Comp.displayName ||
      'Component';
  
    // Assign Comp to C.WrappedComponent so we can access the inner component in tests
    // For example, <Field.WrappedComponent /> gets us <FieldInner/>
    (C as React.SFC<OuterProps> & {
      WrappedComponent: React.ReactNode;
    }).WrappedComponent = Comp;
  
    C.displayName = `ModalConnect(${componentDisplayName})`;
  
    return hoistNonReactStatics(
      C,
      Comp as React.ComponentClass<OuterProps & ModalContextProps> // cast type to ComponentClass (even if SFC)
    );
  }