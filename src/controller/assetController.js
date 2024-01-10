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
      id_Facility,
      price,
      quantity,
      type_asset,
      importDate,
      image,
    } = req.body;

    if (
      !id_Facility ||
      !price ||
      !quantity ||
      !type_asset ||
      !importDate ||
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

    const import_datetime = new Date(importDate);

    await pool.execute("INSERT INTO assets values (?, ?, ?, ?, ?, ?, ?)", [
      id,
      id_Facility,
      price,
      quantity,
      type_asset,
      import_datetime,
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
      image,
      id,
    } = req.body;
    console.log(req.body);

    if (
      !id_facitites ||
      !price ||
      !quantity ||
      !type_asset ||
      !manufacturerDate ||
      !image
    ) {
      return res.status(404).json({
        message: "Update asset failed",
      });
    } else {
      const manufacturer_datetime = new Date(manufacturerDate);

      await pool.execute(
        "UPDATE assets SET id_facitites = ?, price = ?, quantity = ?, type_asset = ?, manufacturerDate= ?, image = ? where id = ? ",
        [
          id_facitites,
          price,
          quantity,
          type_asset,
          manufacturerDate,
          image,
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

let handleUploadFileAsset = async (req, res) => {
  console.log("file up: ", req.file);
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.file) {
    return res.send("Please select an image to upload");
  }

  // Display uploaded image for user validation
  // res.send(
  //   `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/system/user-manage/users">Upload another image</a>`
  // );
  // });
};

module.exports = {
  getALLAssets,
  createAsset,
  deleteAsset,
  updateAsset,
  handleUploadFileAsset
};
