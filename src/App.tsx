import { useEffect, useState } from "react";

import Modal from "./components/Modal/Modal";

import { CouponType } from "./types/couponType";
import big from "./assets/big-coupon.png";
import small from "./assets/small-coupon.png";
import css from "./App.module.scss";

function App() {
  const [loading, setLoading] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);
  const [couponList, setCouponList] = useState([]);
  const [selectCoupon, setSelectCoupon] = useState({ id: 0, title: "", desc: "", expirationDate: "" });

  const handleModal = () => {
    setIsShowModal((prev) => !prev);
  };

  const onClickCoupon = (coupon: CouponType) => {
    if (coupon.isUsed) return;
    setSelectCoupon(coupon);
    handleModal();
  };

  useEffect(() => {
    try {
      fetch("/data/couponList.json")
        .then((res) => res.json())
        .then((data) => {
          const usedList = JSON.parse(localStorage.getItem("useCouponList") || "[]");

          const newList = data.list.map((el: CouponType) => {
            if (usedList.includes(String(el.id))) {
              return { ...el, isUsed: true };
            } else {
              return el;
            }
          });

          setCouponList(newList);
        });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [isShowModal]);

  useEffect(() => {
    if (isShowModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isShowModal]);

  if (loading) return null;

  return (
    <section className={css.container}>
      <h1 className={css.headerTitle}>
        24/25 BIRTHDAY COUPON
        {isShowModal && <Modal handleModal={handleModal} {...selectCoupon} />}
      </h1>
      <ul className={css.couponContainer}>
        {couponList.map((list: CouponType) => {
          return (
            <li className={css.couponBox} key={list.id} onClick={() => onClickCoupon(list)}>
              <div className={`${css.couponBg} ${list.isUsed ? css.isUsed : ""}`}>
                <div className={css.bigCouponBox}>
                  <img src={big} className={css.couponImage} />
                  <div className={css.couponTextBox}>
                    <span className={css.couponTitle}>{list.title}</span>
                  </div>
                </div>
                <img src={small} className={css.couponImage} />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default App;
