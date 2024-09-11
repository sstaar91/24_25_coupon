export interface CouponType {
  id: number;
  title: string;
  desc: string;
  expirationDate: string;
  isUsed?: boolean;
}
