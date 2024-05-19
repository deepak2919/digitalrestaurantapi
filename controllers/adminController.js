var db = require("../config/database");
const path = require("path");
var fs = require("fs");
const multer = require("multer");

// Create a directory for storing uploaded files
const uploadDir = path.join(__dirname, "../uploads/items");
// Set up Multer for handling file uploads
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

const createManager = async (req, res) => {
  const { userName, loginId, pass } = req.body;
  const sqlQuery =
    "exec  [dbo].[sp_admin] @paramid=2,@login_id='" +
    loginId +
    "',@login_pass='" +
    pass +
    "',@user_name='" +
    userName +
    "'";
  db.addRecord(sqlQuery)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      res.status(500).json({ msg: "Failed to reset password", success: false });
    });
};

const removeManager = async (req, res) => {
  const { id } = req.query;
  const sqlQuery = "exec  [dbo].[sp_admin] @paramid=4,@user_id='" + id + "'";
  db.getRecordSet(sqlQuery)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      res.status(500).json({ msg: "Failed to reset password", success: false });
    });
};

const getManagers = async (req, res) => {
  const sqlQuery = "exec [dbo].[sp_admin] @paramid=3";
  db.getRecordSet(sqlQuery)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to reset password" });
    });
};

const addItem = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const { name, desc } = req.body;
    const uploadedFilePath = path.join("uploads/items", req.file.filename);
    const sqlQuery =
      "exec [dbo].[sp_admin] @paramid=5,@item_name='" +
      name +
      "',@item_desc='" +
      desc +
      "',@item_image='" +
      uploadedFilePath +
      "'";
    db.addRecord(sqlQuery)
      .then((results) => {
        res.send(results);
      })
      .catch((error) => {
        res.status(500).json({ error: "Failed to reset password" });
      });
  });
};

const getItems = async (req, res) => {
  const sqlQuery = "exec [dbo].[sp_admin] @paramid=6";
  db.getRecordSet(sqlQuery)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to reset password" });
    });
};

const removeItem = async (req, res) => {
  const { id } = req.query;
  const sqlQuery = "exec  [dbo].[sp_admin] @paramid=7,@item_id='" + id + "'";
  db.addRecord(sqlQuery)
    .then((results) => {
      fs.unlink(results[0].item_image, (err) => {
        if (err) {
          console.error(`Error deleting file`);
        } else {
          console.log(`File deleted successfully`);
        }
      });
      res.send(results[0]);
    })
    .catch((error) => {
      res.status(500).json({ msg: "Failed to reset password", success: false });
    });
};

const addTable = async (req, res) => {
  const { tableTitle, userId } = req.body;
  const sqlQuery =
    "exec [dbo].[sp_admin] @paramid=8,@table_title='" +
    tableTitle +
    "',@user_id='" +
    userId +
    "'";
  db.addRecord(sqlQuery)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to reset password" });
    });
};
const getOutletUsers = async (req, res) => {
  const sqlQuery = "exec [dbo].[sp_admin] @paramid=9";
  db.getRecordSet(sqlQuery)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to reset password" });
    });
};

const getOutletTables = async (req, res) => {
  const { userId } = req.query;
  const sqlQuery =
    "exec [dbo].[sp_admin] @paramid=10,@user_id='" + userId + "'";
  db.getRecordSet(sqlQuery)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to reset password" });
    });
};

const removeTable = async (req, res) => {
  const { tableId } = req.body;
  const sqlQuery =
    "exec [dbo].[sp_admin] @paramid=11,@table_id='" + tableId + "'";
  db.addRecord(sqlQuery)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to reset password" });
    });
};

module.exports = {
  createManager,
  getManagers,
  removeManager,
  addItem,
  getItems,
  removeItem,
  addTable,
  getOutletUsers,
  getOutletTables,
  removeTable,
};
