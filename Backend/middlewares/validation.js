exports.validation = (schema) => {
    return (req, res, next) => {
      let x = schema.validate({ ...req.body, ...req.params }, { abortEarly: false });
      
      if (x.error) {
        return res.status(422).json({ status: "fail", message: x.error.details });
      } else {
        next();
      }
    };
  };