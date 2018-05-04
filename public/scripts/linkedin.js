var Linkedin = require('node-linkedin')('app-id', 'secret', 'callback');
var linkedin = Linkedin.init('my_access_token');

// Again, `res` is optional, you could pass `code` as the first parameter
let linkedIn = () => {
  app.get('/oauth/linkedin/callback', function(req, res) {
    Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function(err, results) {
      if (err)
        return console.error(err);

      /**
       * Results have something like:
       * {"expires_in":5184000,"access_token":". . . ."}
       */

      console.log("results", results);
      return res.redirect('/');
    });
  });

  let companySearch = () => {
    linkedin.companies_search.name('facebook', 1, function(err, company) {
      name = company.companies.values[0].name;
      desc = company.companies.values[0].description;
      industry = company.companies.values[0].industries.values[0].name;
      city = company.companies.values[0].locations.values[0].address.city;
      websiteUrl = company.companies.values[0].websiteUrl;
      console.log(name);
    });
  }
}

module.exports = {
  linkedIn,
  companySearch
}