const Payments = require("../models/paymentModel");
const Users = require("../models/userModel");
const Products = require("../models/productModel");


const paymentCtrl = {
  getPayments: async (req, res) => {
    try {
      const payments = await Payments.find();
      res.json(payments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createPayment: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("name email");
      if (!user) return res.status(400).json({ msg: "Пользователь не существует" });

      const { cart, paymentID, address } = req.body;

      const { _id, name, email } = user;
      const newPayment = new Payments({
        user_id: _id,
        name,
        email,
        cart,
        paymentID,
        address,
      });

      cart.filter((item) => {
        return sold(item._id, item.quantity, item.sold);
      });
      
      await newPayment.save();
      res.json({ msg: "Платёж успешен!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};



const sold = async (id, quant, oldSold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      sold: quant + oldSold,
    },
  
  );
  const oldQuantity = await Products.findOne({ _id: id });
  //const newQuantity = oldQuantity -1;
  console.log(oldQuantity.quantity);
  await Products.findOneAndUpdate(
    { _id: id },
    {
      quantity: oldQuantity.quantity -1
    }
  );
};

module.exports = paymentCtrl;
