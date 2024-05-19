var db = require("../config/database");
const jwt = require("../config/jwt");
const path = require("path");
var fs = require("fs");
const multer = require("multer");

// Create a directory for storing uploaded files BANNERS
const uploadDir = path.join(__dirname, "../uploads/banners");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + fileExtension);
  },
});
const upload = multer({ storage: storage }).single("image");

// Create a directory for storing uploaded files BANNERS
const uploadDirItem = path.join(__dirname, "../uploads/items");
const storageItem = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirItem);
  },
  filename: (req, file, cb) => {
    const fileExtensionItem = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + fileExtensionItem);
  },
});
const uploadItem = multer({ storage: storageItem }).single("image");

const getItems = async (req, res) => {
  const id = jwt.getManagerTokenDecoded(req).user_id;
  const sqlQuery = "exec [dbo].[sp_manager] @paramid=2,@user_id='" + id + "'";
  db.getRecordSet(sqlQuery)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to reset password" });
    });
};

const addUpdateItem = async (req, res) => {
  const id = jwt.getManagerTokenDecoded(req).user_id;
  const { itemId, price } = req.body;
  const sqlQuery =
    "exec [dbo].[sp_manager] @paramid=3,@user_id='" +
    id +
    "',@item_id='" +
    itemId +
    "',@price='" +
    price +
    "'";
  db.addRecord(sqlQuery)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to reset password" });
    });
};

const viewOrder = async (req, res) => {
  const id = jwt.getManagerTokenDecoded(req).user_id;
  const sqlQuery = "exec [dbo].[sp_manager] @paramid=3,@user_id='" + id + "'";
  db.getRecordSet(sqlQuery)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to reset password" });
    });
};

const getOrderDetails = async (req, res) => {
  try {
    const id = jwt.getManagerTokenDecoded(req).user_id;
    const sqlQuery = "exec [dbo].[sp_manager] @paramid=4,@user_id='" + id + "'";
    db.getRecordSet(sqlQuery)
      .then((results) => {
        res.send(results);
      })
      .catch((error) => {
        res.status(500).json({ error: sqlQuery });
      });
  } catch (error) {
    res.send("error");
  }
};

const getAccountInfo = async (req, res) => {
  const id = jwt.getManagerTokenDecoded(req).user_id;
  const sqlQuery = "exec [dbo].[sp_manager] @paramid=8,@user_id='" + id + "'";
  db.getRecordSet(sqlQuery)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to reset password" });
    });
};

const saveAccountInfo = async (req, res) => {
  const id = jwt.getManagerTokenDecoded(req).user_id;
  const { title, tag, email, contact, city, state, address } = req.body;
  const sqlQuery =
    "exec [dbo].[sp_manager] @paramid=5,@user_id='" +
    id +
    "',@title='" +
    title +
    "',@tag='" +
    tag +
    "',@email='" +
    email +
    "',@contact='" +
    contact +
    "',@city='" +
    city +
    "',@state='" +
    state +
    "',@address='" +
    address +
    "'";
  db.addRecord(sqlQuery)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to reset password" });
    });
};

const changePassword = async (req, res) => {
  const id = jwt.getManagerTokenDecoded(req).user_id;
  const { newPass, oldPass, confPass } = req.body;
  const sqlQuery =
    "exec [dbo].[sp_manager] @paramid=9,@user_id='" +
    id +
    "',@login_pass='" +
    newPass +
    "',@old_pass='" +
    oldPass +
    "'";
  db.addRecord(sqlQuery)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to reset password" });
    });
};

const addBanner = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const id = jwt.getManagerTokenDecoded(req).user_id;
    const uploadedFilePath = path.join("uploads/banners", req.file.filename);
    const sqlQuery =
      "exec [dbo].[sp_manager] @paramid=10,@banner_url='" +
      uploadedFilePath +
      "',@user_id='" +
      id +
      "'";
    db.addRecord(sqlQuery)
      .then((results) => {
        res.send(results[0]);
      })
      .catch((error) => {
        res.status(500).json({ error: "Failed to reset password" });
      });
  });
};

const getBanners = async (req, res) => {
  const id = jwt.getManagerTokenDecoded(req).user_id;
  const sqlQuery = "exec [dbo].[sp_manager] @paramid=11,@user_id='" + id + "'";
  db.getRecordSet(sqlQuery)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to reset password" });
    });
};
const removeBanner = async (req, res) => {
  const id = jwt.getManagerTokenDecoded(req).user_id;
  const { srno } = req.query;
  const sqlQuery =
    "exec [dbo].[sp_manager] @paramid=12,@srno='" +
    srno +
    "',@user_id='" +
    id +
    "'";
  db.addRecord(sqlQuery)
    .then((results) => {
      console.log(results[0].banner_url);
      fs.unlink(results[0].banner_url, (err) => {
        if (err) {
          console.error(`Error deleting file`);
        } else {
          console.log(`File deleted successfully`);
        }
      });
      res.send(results[0]);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to reset password" });
    });
};
const getDashboard = async (req, res) => {
  const id = jwt.getManagerTokenDecoded(req).user_id;
  const sqlQuery = "exec [dbo].[sp_manager] @paramid=13,@user_id='" + id + "'";
  db.getRecordSet(sqlQuery)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to reset password" });
    });
};

const addItem = async (req, res) => {
    uploadItem(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const id = jwt.getManagerTokenDecoded(req).user_id;
    const { name, desc, price } = req.body;
    const itemImagePath = path.join("uploads/items", req.file.filename);
    const sqlQuery =
      "exec [dbo].[sp_manager] @paramid=14,@item_name='" +
      name +
      "',@item_price='" +
      price +
      "',@item_desc='" +
      desc +
      "',@item_image='" +
      itemImagePath +
      "',@user_id='" +
      id +
      "'";
    db.addRecord(sqlQuery)
      .then((results) => {
        res.send(results[0]);
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  });
};

const getAddedItems = async (req, res) => {
  const id = jwt.getManagerTokenDecoded(req).user_id;
  const sqlQuery = "exec [dbo].[sp_manager] @paramid=15,@user_id='" + id + "'";
  db.getRecordSet(sqlQuery)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to reset password" });
    });
};

module.exports = {
  viewOrder,
  getItems,
  addUpdateItem,
  getOrderDetails,
  saveAccountInfo,
  getAccountInfo,
  changePassword,
  addBanner,
  getBanners,
  removeBanner,
  getDashboard,
  addItem,
  getAddedItems,
};
