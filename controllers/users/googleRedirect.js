const queryString = require("query-string");
const axios = require("axios");
const { Users } = require("../../models/modelUser");
const jwt = require("jsonwebtoken");
const { JWT_CODE } = process.env;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL, FRONTEND_URL } =
  process.env;

async function googleRedirect(req, res, next) {
  try {
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const urlObj = new URL(fullUrl);
    const urlParams = queryString.parse(urlObj.search);
    const code = urlParams.code;
    const tokenData = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: "post",
      data: {
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: `${BASE_URL}/auth/google-redirect`,
        grant_type: "authorization_code",
        code,
      },
    });
    const userData = await axios({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
      method: "get",
      headers: {
        Authorization: `Bearer ${tokenData.data.access_token}`,
      },
    });

    const { email, name, picture, id } = userData.data;

    const user = await Users.findByEmail(email);

    if (!user) {
      const newUser = await Users.create({ email, name, password: id });
      const idUser = newUser.id;
      await Users.updateGoogleUser(idUser, picture);

      const accessToken = jwt.sign({ id: user.id }, JWT_CODE, {
        expiresIn: "1d",
      });
      const refreshToken = jwt.sign({ id: user.id }, JWT_CODE, {
        expiresIn: "30d",
      });
      await Users.findByIdAndUpdate(
        { _id: user._id },
        { accessToken: accessToken, refreshToken: refreshToken }
      );

      return res.redirect(
        `${FRONTEND_URL}?token=${accessToken}&refreshToken=${refreshToken}`
      );
    }
    const idUser = user.id;
    const accessToken = jwt.sign({ id: user.id }, JWT_CODE, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ id: user.id }, JWT_CODE, {
      expiresIn: "30d",
    });
    await Users.updateToken(idUser, accessToken, refreshToken);

    return res.redirect(
      `${FRONTEND_URL}?token=${accessToken}&refreshToken=${refreshToken}`
    );
  } catch (error) {
    next(error);
  }
}

module.exports = { googleRedirect };
