const Cloth = require("../Models/ClothModel");

class ApiController {
  //[POST] /api/upload
  upload(req, res, next) {
    const payload = req.body;
    const cloth = new Cloth(payload);

    cloth.save();
    res.send("upload success");
  }

  //[GET] /api/find
  find(req, res, next) {
    Cloth.find({}).then((clothes) => res.send(clothes));
  }

  
}

module.exports = new ApiController();
