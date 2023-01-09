const Cloth = require("../Models/ClothModel");
const {
  multipleMongooseToObject,
  MongooseToObject,
} = require("../../utils/mongoose");

class SiteController {
  //[GET] clothes/upload
  upload(req, res) {
    res.render("clothes/upload");
  }

  //[GET] clothes/show
  show(req, res) {
    Promise.all([Cloth.find({}), Cloth.countDocumentsDeleted()]).then(
      ([clothes, deletedCount]) => {
        res.render("clothes/show", {
          deletedCount,
          clothes: multipleMongooseToObject(clothes),
        });
      }
    );
  }

  //[GET] /clothes/:id/edit
  edit(req, res) {
    Cloth.findById({ _id: req.params.id }).then((cloth) =>
      res.render("clothes/edit", {
        cloth: MongooseToObject(cloth),
      })
    );
  }

  //[POST] /clothes/handle-form-actions
  handleForm(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Cloth.delete({ _id: { $in: req.body.clothIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      case "restore":
        Cloth.restore({ _id: { $in: req.body.clothIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      case "delete-forever":
        Cloth.deleteOne({ _id: { $in: req.body.clothIds } }, req.body)
          .then(() => res.redirect("back"))
          .catch(next);
    }
  }

  //[GET /clothes/trash
  trash(req, res, next) {
    Cloth.findDeleted()
      .then((clothes) =>
        res.render("clothes/trash", {
          clothes: multipleMongooseToObject(clothes),
        })
      )
      .catch(next);
  }

  //[DELETE] /clothes/:id/force
  force(req, res, next) {
    Cloth.deleteOne({ _id: { $in: req.body.clothIds } }, req.body)
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new SiteController();
