import React, { useRef, useState } from "react";
import "./style.css";
const Modal = ({
  title = "Tiêu đề",
  content = "Nội dung",
  onAccept = () => {},
  onCancel = () => {},
  isShowAccept = true,
  isShowCancel = true,
}) => {
  const [isShow, setIsShow] = useState(true);
  const modal = useRef();

  const closeModal = () => {
    if (modal.current) modal.current.classList.toggle("rightTo", false);
    if (modal.current) modal.current.classList.toggle("toLeft");
    setTimeout(() => {
      setIsShow(false);
    }, 500);
  };

  const handleAcc = () => {
    closeModal();
    setTimeout(() => {
      onAccept();
    }, 500);
  };

  const handleCancel = () => {
    closeModal();
    setTimeout(() => {
      onCancel();
    }, 500);
  };

  if (!isShow) return <></>;

  return (
    <div className="overlay">
      <div className="modal rightTo" ref={modal}>
        <p className="modal__title">{title}</p>
        <p className="modal__content">{content}</p>
        <div className="modal__option">
          {isShowAccept && (
            <div
              className="modal__option-btn modal__option-accept"
              onClick={() => {
                handleAcc();
              }}
            >
              <p>Đồng ý</p>
            </div>
          )}

          {isShowCancel && (
            <div
              className="modal__option-btn modal__option-cancel"
              onClick={() => {
                handleCancel();
              }}
            >
              <p>Hủy</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
