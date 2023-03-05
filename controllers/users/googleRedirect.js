const queryString = require("query-string");
const axios = require("axios");
const { Users } = require("../../models/modelUser");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const { JWT_CODE } = process.env;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL, FRONTEND_URL } =
  process.env;

async function googleRedirect(req, res, next) {
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

  const { email } = userData.data.email;
  const { balance } = userData.data.balance;

  let user = await Users.findOne({ email });

  if (!user) {
    const createdPassword = nanoid();

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createdPassword, salt);

    await Users.create({
      email,
      password: hashedPassword,
      balance: null,
      verify: true,
      verificationToken: null,
    });
  }
  const token = jwt.sign({ id: storedUser._id }, JWT_CODE, {
    expiresIn: "10h",
  });

  await Users.findByIdAndUpdate(user._id, { token }, { new: true });

  return res.redirect(
    `${FRONTEND_URL}?email=${email}&token=${token}&balance=${balance}`
  );
}

module.exports = { googleRedirect };
