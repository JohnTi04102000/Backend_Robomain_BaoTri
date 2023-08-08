import pool from "../configs/connectDB";

let getALLAssets = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM assets");
  
    return res.status(200).json({
      message: "Get all assets successful",
      data: rows,
    });
  };

let createAsset = async (req, res) => {
  console.log('check body: ', req.body);
  let { id_facitites, price, quantity, type_asset, manufacturerDate, id_manufacturer } = req.body;

  if (!id_facitites || !price || !quantity || !type_asset || !manufacturerDate || !id_manufacturer) {
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

  await pool.execute("INSERT INTO assets values (?, ?, ?, ?, ?, ?, ?)", [
    id,
    id_facitites,
    price,
    quantity,
    type_asset,
    manufacturer_datetime,
    id_manufacturer
  ]);

  return res.status(200).json({
    message: "Insert to assets successful",
  });

}


let deleteAsset = async (req, res) => {
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
}

let updateAsset = async (req, res) => {
  let { id_facitites, price, quantity, type_asset, manufacturerDate, id_manufacturer, id } = req.body;
  console.log(req.body);

  if (!id_facitites || !price || !quantity || !type_asset || !manufacturerDate || !id_manufacturer) {
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
        id
      ]
    );
    return res.status(200).json({
      message: "Success",
    });
  }
}

module.exports = {
    getALLAssets,
    createAsset,
    deleteAsset,
    updateAsset
}