export const validateForm = (formData) => {
  const errors = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  };

  let isValid = true;

  if (!formData.name) {
    errors.name = "Name is required";
    isValid = false;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!formData.email) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Please enter a valid email address";
    isValid = false;
  }

  if (!formData.password) {
    errors.password = "Password is required";
    isValid = false;
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
    isValid = false;
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
    isValid = false;
  }

  if (!formData.role) {
    errors.role = "Please select a role (Student or Instructor)";
    isValid = false;
  }

  return { isValid, errors };
};
