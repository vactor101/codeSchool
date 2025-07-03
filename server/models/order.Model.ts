import mongoose, {Document,Model,Schema} from "mongoose";

interface IPaymentInfo {
    [key: string]: any;  // This allows any field to be part of the object
  }
export interface IOrder extends Document{
    courseId: string;
    userId?:string;
    payment_info: IPaymentInfo;
}

const orderSchema = new Schema<IOrder>({
    courseId: {
     type: String,
     required: true
    },
    userId:{
        type: String,
        required: true
    },
    payment_info:{
        type: Object,
        // required: true
    },
},{timestamps: true});

const OrderModel: Model<IOrder> = mongoose.model('Order',orderSchema);

export default OrderModel;