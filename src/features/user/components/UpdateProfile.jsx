import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import userService from '../services/user';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCamera } from 'react-icons/ai';

const { updateUser, getUser } = userService;

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  gender: Yup.string().required('Gender is required'),
  birthday: Yup.date().required('Birthday is required'),
  biography: Yup.string()
    .max(500, 'Biography must be at most 500 characters'),
  address: Yup.string().required('Address is required'),
});

const getUserFromLocalStorage = () => {
  try {
    const user = window.localStorage.getItem('sns-user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
    return null;
  }
};

const UpdateProfile = () => {
  const [user, setUser] = React.useState({
    profile_picture: '',
    userName: '',
    email: '',
    gender: '',
    birthday: '',
    biography: '',
    address: '',
  });
  const navigate = useNavigate();
  const storedUser = getUserFromLocalStorage();
  const id = storedUser ? storedUser.id : null;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await getUser(id);
          setUser(response);
        } catch (err) {
          console.error('Error fetching user:', err);
        }
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log('Submitting form with values:', values);
    try {
      await updateUser(id, values);
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
              <div className="relative">
                <img
                  src={'../../../../public/login_img.jpg'}
                  className="h-32 w-32 rounded-full"
                  alt="profile_picture"
                  name="profile_picture"
                />
                <label className="absolute bottom-[0.25rem] right-[47.25rem] h-8 w-8 cursor-pointer rounded-full border-2 border-white bg-slate-200 fill-blue-600 stroke-0 p-1 text-2xl hover:bg-slate-300">
                  <input className="hidden" type="file" accept="image/*" />
                  <AiOutlineCamera className="size-5" />
                </label>
              </div>

              <div>
                <label className="mb-1 block">Name</label>
                <Field
                  name="username"
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-md border border-gray-300 bg-slate-200 p-2 focus:border-transparent focus:outline-none"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-600"
                />
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
                  {['Male', 'Female'].map((gender, index) => (
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
                <label className="mb-1 block">Hobby</label>
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
                  onClick={() => navigate('/me')}
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
