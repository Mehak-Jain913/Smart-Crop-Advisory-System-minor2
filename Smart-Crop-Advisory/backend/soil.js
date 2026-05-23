import axios from "axios";

async function getToken() {
  try {
    const res = await axios.post(
      "https://api.soilhive.ag/oauth/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        audience: "https://api.soilhive.ag/"
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        auth: {
          username: "019d4e8e214a7610bc4fe95524045ade",
          password: "NbRw7ct0h5B7ORhYoYva3vGr9F0DyPaO"
        }
      }
    );

    return res.data.access_token;

  } catch (err) {
    console.error("TOKEN ERROR:", err.response?.data || err.message);
    return null; // ✅ important
  }
}

async function getSoilData() {
  const token = await getToken();

  if (!token) {
    console.log("❌ Token not received");
    return;
  }

  try {
    const res = await axios.get(
      "https://api.soilhive.ag/soil-data?lat=23.2&lon=77.4",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("✅ SOIL DATA:", res.data);

  } catch (err) {
    console.error("SOIL ERROR:", err.response?.data || err.message);
  }
}

getSoilData();