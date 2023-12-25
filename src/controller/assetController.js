import pool from "../configs/connectDB";

let getALLAssets = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM assets");

  return res.status(200).json({
    message: "Get all assets successful",
    data: rows,
  });
};

let createAsset = async (req, res) => {
  try {
    console.log("check body: ", req.body);
    let {
      id_facitites,
      price,
      quantity,
      type_asset,
      manufacturerDate,
      id_manufacturer,
      image,
    } = req.body;

    if (
      !id_facitites ||
      !price ||
      !quantity ||
      !type_asset ||
      !manufacturerDate ||
      !id_manufacturer ||
      !image
    ) {
      return res.status(404).json({
        message: "Insert to assets failed",
      });
    }

    function generateRandomId() {
      const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";

      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }
      return result;
    }

    let id = "asset" + generateRandomId();

    const manufacturer_datetime = new Date(manufacturerDate);

    await pool.execute("INSERT INTO assets values (?, ?, ?, ?, ?, ?, ?, ?)", [
      id,
      id_facitites,
      price,
      quantity,
      type_asset,
      manufacturer_datetime,
      id_manufacturer,
      image,
    ]);

    return res.status(200).json({
      message: "Insert to assets successful",
    });
  } catch (err) {
    console.log(err);
  }
};

let deleteAsset = async (req, res) => {
  try {
    let idAsset = req.params.id;
    console.log("id: " + idAsset);
    if (!idAsset) {
      return res.status(404).json({
        message: "Delete asset failed",
      });
    } else {
      await pool.execute("DELETE FROM assets WHERE id = ?", [idAsset]);
      return res.status(200).json({
        message: "Delete asset success",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

let updateAsset = async (req, res) => {
  try {
    let {
      id_facitites,
      price,
      quantity,
      type_asset,
      manufacturerDate,
      id_manufacturer,
      id,
    } = req.body;
    console.log(req.body);

    if (
      !id_facitites ||
      !price ||
      !quantity ||
      !type_asset ||
      !manufacturerDate ||
      !id_manufacturer
    ) {
      return res.status(404).json({
        message: "Update asset failed",
      });
    } else {
      const manufacturer_datetime = new Date(manufacturerDate);

      await pool.execute(
        "UPDATE assets SET id_facitites = ?, price = ?, quantity = ?, type_asset = ?, manufacturerDate= ?, id_manufacturer = ? where id = ? ",
        [
          id_facitites,
          price,
          quantity,
          type_asset,
          manufacturerDate,
          id_manufacturer,
          id,
        ]
      );
      return res.status(200).json({
        message: "Success",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getALLAssets,
  createAsset,
  deleteAsset,
  updateAsset,
};
