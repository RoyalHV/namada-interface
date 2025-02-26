import { default as ReactModal } from "react-modal";
import { ThemeProvider } from "styled-components";
import { loadColorMode, getTheme } from "@namada/utils";
import {
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from "./Modal.components";

type Props = {
  children: JSX.Element;
  isOpen: boolean;
  title?: string;
  onBackdropClick?: () => void;
};

export const Modal = (props: Props): JSX.Element => {
  const { children, isOpen, title, onBackdropClick } = props;

  const theme = getTheme(loadColorMode());

  return (
    <ReactModal
      shouldCloseOnOverlayClick={onBackdropClick !== undefined}
      onRequestClose={() => {
        onBackdropClick && onBackdropClick();
      }}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "1100",
        },
        content: {
          top: "undefined",
          left: "undefined",
          right: "undefined",
          bottom: "undefined",
          zIndex: "1100",
          display: "flex",
          justifyContent: "center",
          width: "80%",
          maxWidth: "640px",
          height: "80%",
          padding: 0,
        },
      }}
      isOpen={isOpen}
      ariaHideApp={false}
    >
      <ThemeProvider theme={theme}>
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>
          <ModalContent>{children}</ModalContent>
        </ModalContainer>
      </ThemeProvider>
    </ReactModal>
  );
};
