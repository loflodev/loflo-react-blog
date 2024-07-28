import { ReactNode, useMemo } from "react";

type ModalProps = {
  isModalOpen: boolean;
  onClick: () => void;
  children: ReactNode;
}

const Modal = ({ isModalOpen, onClick, children }: ModalProps) => {
  const showModal = useMemo(() => {
    return isModalOpen ? "modal-open" : "";
  }, [isModalOpen]);

  return (
    <>
      <dialog id="my_modal_3" className={`modal ${showModal}`}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onClick}
            >
              ✕
            </button>
          </form>
          {children}

          {/* <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
        </div>
      </dialog>
    </>
  );
};

export default Modal;
