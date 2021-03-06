exports.send404 = (req, res, next) => {
  res.status(404).send({
    message: "Resource not found.",
  });
};

exports.handle405s = (req, res, next) => {
  res.status(405).send({ message: "method not allowed" });
};

exports.handleFirebase_Error = (err, req, res, next) => {
  const { code } = err;
  const codes = {
    "auth/wrong-password": {
      status: 400,
      message: "Please provide the correct email and password to log in.",
    },
    "auth/weak-password": {
      status: 400,
      message: "The password must be 6 characters long or more.",
    },
    "auth/user-not-found": {
      status: 404,
      message:
        "There is no user record corresponding to this identifier. The user may have been deleted.",
    },
    "auth/email-already-in-use": {
      status: 400,
      message: "The email address is already in use by another account.",
    },
    "auth/invalid-email": {
      status: 400,
      message: "The email address is badly formatted.",
    },
    "auth/invalid-api-key": {
      status: 500,
      message:
        "Your API key is invalid, please check you have copied it correctly.",
    },
    "auth/quota-exceeded": {
      status: 400,
      message: "Exceeded quota for verifying passwords.",
    },
    "auth/argument-error": {
      status: 400,
      message:
        'createUserWithEmailAndPassword failed: Second argument "password" must be a valid string.',
    },
    "auth/too-many-requests": {
      status: 400,
      message: "Too many unsuccessful login attempts. Please try again later.",
    },
  };
  if (code in codes) {
    //console.log("handled firebase error");
    const { status, message } = codes[err.code];
    res.status(status).send({ message });
  } else {
    //console.log("passed next firebase error");
    next(err);
  }
};

exports.handleTranslateError = (err, req, res, next) => {
  if (err.type === "translate") {
    const codes = {
      403: { status: 400, message: "Must have valid word and langpair." },
    };
    const { status, message } = codes[err.status];

    res.status(status).send({ message: message });
  } else {
    next(err);
  }
};

exports.handleCustomError = (err, req, res, next) => {
  const { status, message } = err; // destrcutered status and message off err...
  if (status) {
    res.status(status).send({ message: message });
  } else {
    console.log("passed next custom error");
    next(err);
  }
};

exports.handleInternalError = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
};
