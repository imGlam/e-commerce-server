class SiteController {
  //[GET] /api/upload
  home(req, res) {
    res.render("home");
  }
}

module.exports = new SiteController();
