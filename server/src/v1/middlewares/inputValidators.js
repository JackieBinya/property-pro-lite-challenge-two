const emailRE = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
const priceRE = /^(([$])?((([0-9]{1,3},)+[0-9]{3})|[0-9]+)(\.[0-9]{2})?)$/;

const signUpValidator = (req, res, next) => {
  const {
    firstName, lastName, email, password,
  } = req.body;

  // Check that all input fields have been filled in
  if (!firstName || firstName.trim() === '') {
    return res.status(400).json({
      status: 'error',
      msg: 'Please enter your first name.',
    });
  }

  if (!lastName || lastName.trim() === '') {
    return res.status(400).json({
      status: 'error',
      msg: 'Please enter your last name.',
    });
  }

  if (!email || email.trim() === '') {
    return res.status(400).json({
      status: 'error',
      msg: 'Please enter your email.',
    });
  }

  if (!password || password.trim() === '') {
    return res.status(400).json({
      status: 'error',
      msg: 'Please enter your password.',
    });
  }

  // Validate input
  if (!emailRE.test(email)) {
    return res.status(400).json({
      status: 'error',
      msg: 'Email invalid!',
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      status: 'error',
      msg: 'Password should be no less than 6 characters long.',
    });
  }
  next();
};

const loginValidator = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || email.trim() === '') {
    return res.status(400).json({
      status: 'error',
      msg: 'Please enter your email.',
    });
  }

  if (!password || password.trim() === '') {
    return res.status(400).json({
      status: 'error',
      msg: 'Please enter your password.',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      status: 'error',
      msg: 'Password should be no less than 6 characters long.',
    });
  }

  if (!emailRE.test(email)) {
    return res.status(400).json({
      status: 'error',
      msg: 'Email invalid!',
    });
  }
  next();
};

const postPropertyAdValiadator = (req, res, next) => {
  const {
    title, address, state, city, type, price, description,
  } = req.body;


  if (!title || title.trim() === '') {
    return res.status(400).json({
      status: 'error',
      msg: 'Please provide a title for your property ad.',
    });
  }

  if (!address || address.trim() === '') {
    return res.status(400).json({
      status: 'error',
      msg: 'Please provide the address of your property.',
    });
  }

  if (!state || state.trim() === '') {
    return res.status(400).json({
      status: 'error',
      msg: 'Please provide the state in which your property is located.',
    });
  }

  if (!city || city.trim() === '') {
    return res.status(400).json({
      status: 'error',
      msg: 'Please provide the city where your property is located.',
    });
  }

  if (!description || description.trim() === '') {
    return res.status(400).json({
      status: 'error',
      msg: 'Please provide a description of your property.',
    });
  }


  if (!priceRE.test(price)) {
    return res.status(400).json({
      status: 'error',
      msg: 'Please provide a valid price of your property.',
    });
  }

  if (!type || type.trim() === '') {
    return res.status(400).json({
      status: 'error',
      msg: 'Please select a type that matches your property.',
    });
  }

  if (title.length > 40) {
    return res.status(400).json({
      status: 'error',
      msg: 'The title is too long, make sure its no more than 45 characters long!',
    });
  }

  if (description.length > 200) {
    return res.status(400).json({
      status: 'error',
      msg: 'The description is too long, make sure its no more than 150 characters long!',
    });
  }
  next();
};

const editAdValidator = (req, res, next) => {
  const obj = Object.assign({}, req.body);


  if (obj.title) {
    if (obj.title.trim() === '' || obj.title.length > 40) {
      return res.status(400).json({
        status: 'error',
        msg: 'Please enter a valid title and ensure its no more than 45 characters long!',
      });
    }
  }

  if (obj.description) {
    if (obj.description.trim() === '' || obj.description.length > 40) {
      return res.status(400).json({
        status: 'error',
        msg: 'Please enter a valid description and ensure its no more than 45 characters long!',
      });
    }
  }

  if (obj.price) {
    if (!priceRE.test(obj.price)) {
      return res.status(400).json({
        status: 'error',
        msg: 'Please provide a valid price of your property.',
      });
    }
  }
  next();
};

export {
  signUpValidator,
  loginValidator,
  postPropertyAdValiadator,
  editAdValidator,
};
