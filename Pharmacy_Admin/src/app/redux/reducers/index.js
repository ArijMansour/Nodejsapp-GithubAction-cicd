import { combineReducers } from "redux";
import auth from "./Auth";
import message from "./Message";
import UserReducer from "./UserReducer";
import postReducer from "./PostReducer";
import chatReducer from "./ChatUserReducer";
import {
  MedicineListReducer,
  medicineDetailsReducer,
  medicinereviewCreateReducer,
} from "./MedicineReducer";
import { CartReducer } from "./CartReducer";
import { saveAddressshipping, savepaymentmethod } from "../actions/CartAction";
import {
  prescriptionCreateReducer,
  prescriptionDeleteReducer,
  PrescriptionListMyreducer,
} from "./PrescriptionReducer";
import notifications from "../slices/NotificationSlice";
import { addressUpdateReducer } from "./AddressReducer";
import {
  stockCreateReducer,
  stockDeleteReducer,
  stockUpdateReducer,
} from "./StockReducer";
import {
  CreateOrderReducers,
  OrderDeliverreducer,
  OrderDetailsreducer,
  OrderListMyreducer,
  OrderListreducer,
  OrderPayreducer,
} from "./OrderReducer";
import { userDetailsReducer } from "./PatientReducer";
import {
  SHIPPERCreateReducer,
  SHIPPERDeleteReducer,
  SHIPPERDetailsReducer,
  SHIPPERListReducer,
  SHIPPERLoginReducer,
  SHIPPERUpdateProfileReducer,
  SHIPPERUpdateReducer,
} from "./ShipperReducer";

export default combineReducers({
  auth,
  message,
  UserReducer,
  postReducer,
  chatReducer,
  CartReducer,
  MedicineListReducer,
  medicineDetailsReducer: medicineDetailsReducer,
  medicinereviewCreateReducer: medicinereviewCreateReducer,
  saveAddressshipping: saveAddressshipping,
  savepaymentmethod: savepaymentmethod,
  prescriptionCreateReducer: prescriptionCreateReducer,
  notifications,
  myprescription: PrescriptionListMyreducer,
  userUpdate: addressUpdateReducer,
  userDetails: userDetailsReducer,
  prescriptionDelete: prescriptionDeleteReducer,
  stockCreate: stockCreateReducer,
  stockDelete: stockDeleteReducer,
  stockUpdate: stockUpdateReducer,
  orderCreate: CreateOrderReducers,
  orderDetails: OrderDetailsreducer,
  orderPay: OrderPayreducer,
  orderMylist: OrderListMyreducer,
  orderList: OrderListreducer,
  orderDeliver: OrderDeliverreducer,
  shipperLogin: SHIPPERLoginReducer,
  shipperDetails: SHIPPERDetailsReducer,
  shipperList: SHIPPERListReducer,
  shipperDelete: SHIPPERDeleteReducer,
  shipperUpdate: SHIPPERUpdateReducer,
  shipperCreate: SHIPPERCreateReducer,
});
