// customResponse.js

const customResponse = (req, res, next) => {
    // Fungsi untuk mengirim respon jika ada kegagalan
    res.failed = (message, status = 500) => {
      res.status(status).json({ success: false, message });
    };
  
    // Fungsi untuk mengirim respon jika berhasil
    res.success = (data, message = "Success", meta = {}) => {
      res.status(200).json({ success: true, message, data, meta });
    };
  
    next();
  };
  
  module.exports = customResponse;