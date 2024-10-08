import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import userService from '../services/user';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const { updateUser, getUser } = userService;

const validationSchema = Yup.object({
  firstname: Yup.string().required('First name is required'),
  lastname: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  gender: Yup.string().required('Gender is required'),
  birthday: Yup.date().required('Birthday is required'),
  biography: Yup.string().max(500, 'Biography must be at most 500 characters'),
  address: Yup.string().required('Address is required'),
});

const UpdateProfile = () => {
  const [user, setUser] = React.useState({
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
    birthday: '',
    biography: '',
    address: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser(1);
        setUser(response);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateUser(values);
      alert('Profile updated successfully');
      navigate('/me');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tab-pane fade m-auto w-[60%] py-20" id="edit-profile">
      <div className="set-title mb-6">
        <h5 className="mb-1 text-4xl font-semibold">Update Profile</h5>
        <span className="text-lg text-gray-500">
          People on Social will get to know you with the info below
        </span>
      </div>

      <div className="stg-form-area">
        <Formik
          enableReinitialize
          initialValues={user}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="c-form space-y-4">
              <div className="flex space-x-2.5">
                <div>
                  <label className="mb-1 block">First Name</label>
                  <Field
                    name="firstname"
                    type="text"
                    placeholder="First Name"
                    className="w-full rounded-md border border-gray-300 bg-slate-200 p-2 focus:border-transparent focus:outline-none"
                  />
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div>
                  <label className="mb-1 block">Last Name</label>
                  <Field
                    name="lastname"
                    type="text"
                    placeholder="Last Name"
                    className="w-full rounded-md border border-gray-300 bg-slate-200 p-2 focus:border-transparent focus:outline-none"
                  />
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="text-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block">Email Address</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-md border border-gray-300 bg-slate-200 p-2 focus:border-transparent focus:outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div>
                <label className="mb-1 block">Gender</label>
                <div className="flex space-x-4">
                  {['Male', 'Female', 'Custom'].map((gender, index) => (
                    <div key={index} className="flex items-center">
                      <Field
                        type="radio"
                        name="gender"
                        value={gender}
                        className="mr-2"
                      />
                      <label>{gender}</label>
                    </div>
                  ))}
                </div>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div>
                <label className="mb-1 block">Your Birthday</label>
                <Field
                  name="birthday"
                  type="date"
                  className="w-full rounded-md border border-gray-300 bg-slate-200 p-2 focus:border-transparent focus:outline-none"
                />
                <ErrorMessage
                  name="birthday"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div>
                <label className="mb-1 block">About your profile</label>
                <Field
                  name="biography"
                  as="textarea"
                  rows="3"
                  placeholder="Write something about yourself"
                  className="w-full rounded-md border border-gray-300 bg-slate-200 p-2 focus:border-transparent focus:outline-none"
                />
                <ErrorMessage
                  name="biography"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div>
                <label className="mb-1 block">Address</label>
                <Field
                  name="address"
                  type="text"
                  placeholder="Your address"
                  className="w-full rounded-md border border-gray-300 bg-slate-200 p-2 focus:border-transparent focus:outline-none"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div className="float-right flex space-x-4 pt-4">
                <button
                  className="rounded-full bg-orange-600 px-4 py-2 text-white transition duration-300 hover:bg-orange-500"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save
                </button>
                <button
                  className="rounded-full bg-gray-300 px-4 py-2 text-gray-700 transition duration-300 hover:bg-gray-400"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateProfile;
