import { CouponType } from "../../types/couponType";
import css from "./Modal.module.scss";

interface Props extends CouponType {
  handleModal: () => void;
}

const Modal = ({ handleModal, id, title, desc, expirationDate }: Props) => {
  const onClickOutSide = () => {
    handleModal();
  };

  const onClickConfirmBtn = (id: number) => {
    const list = JSON.parse(localStorage.getItem("useCouponList") || "[]");
    list.push(String(id));
    localStorage.setItem("useCouponList", JSON.stringify(list));
    handleModal();
  };

  return (
    <div className={css.dimmedBg} onClick={onClickOutSide}>
      <div className={css.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={css.title}>{title}</div>
        <div className={css.description}>{desc}</div>
        <div className={css.date}>유효기간 : {expirationDate}</div>
        <div className={css.divideLine} />
        <div className={css.noticeBox}>
          <span>해당 쿠폰을 사용하시겠습니까?</span>
          <span>* 한 번 사용한 쿠폰은 취소할 수 없습니다 *</span>
        </div>
        <div className={css.btnBox}>
          <button className={css.confirm} onClick={() => onClickConfirmBtn(id)}>
            네
          </button>
          <button className={css.cancle} onClick={handleModal}>
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
