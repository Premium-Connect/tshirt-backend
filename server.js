const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const INTEGRATION_ID = "24141";
const INTEGRATION_KEY = "faca91bb-394b-448e-bbaf-d20a8a981825";

app.post("/pay", async (req, res) => {
  const { amount } = req.body;

  const params = new URLSearchParams();
  params.append("id", INTEGRATION_ID);
  params.append("reference", "TSH-" + Date.now());
  params.append("amount", amount);
  params.append("additionalinfo", "T-Shirt Order");
  params.append("returnurl", "https://tshirt-haven.vercel.app");
  params.append("resulturl", "https://tshirt-haven.vercel.app");

  try {
    const response = await fetch("https://www.paynow.co.zw/interface/initiatetransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    });

    const data = await response.text();

    console.log(data); // 👈 IMPORTANT (for debugging)

    res.send(data);

  } catch (error) {
    res.status(500).send("Error connecting to Paynow");
  }
});

app.listen(5000, () => console.log("Server running"));
