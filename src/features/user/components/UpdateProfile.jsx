import React from 'react';

const countries = [
  { value: 'AFG', label: 'Afghanistan' },
  { value: 'ALA', label: 'Ƭand Islands' },
  { value: 'ALB', label: 'Albania' },
  { value: 'DZA', label: 'Algeria' },
  // ... các nước khác
];

const UpdateProfile = () => {
  return (
    <div className="tab-pane fade m-auto w-[60%] py-20" id="edit-profile">
      <div className="set-title mb-6">
        <h5 className="mb-1 text-4xl font-semibold">Update Profile</h5>
        <span className="text-lg text-gray-500">
          People on Social will get to know you with the info below
        </span>
      </div>

      <div className="stg-form-area">
        <form method="post" className="c-form space-y-4">
          <div className="flex space-x-2.5">
            <div>
              <label className="mb-1 block"> Firt Name</label>
              <input
                type="text"
                placeholder="Jack Carter"
                className="w-full rounded-md border border-gray-300 bg-slate-200 p-2 focus:border-transparent focus:outline-none"
              />
            </div>

            <div className="uzer-nam">
              <label className="mb-1 block">Last Name</label>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="jackcarter4023"
                  className="w-full rounded-md border border-gray-300 bg-slate-200 p-2 focus:border-transparent focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1 block">Email Address</label>
            <input
              type="text"
              placeholder="abc@gmail.com"
              className="w-full rounded-md border border-gray-300 bg-slate-200 p-2 focus:border-transparent focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block">Gender</label>
            <div className="flex space-x-4">
              {['Male', 'Female', 'Custom'].map((gender, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    defaultChecked={gender === 'Male'}
                    className="mr-2"
                  />
                  <label>{gender}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block">Your Birthday</label>
            <input
              type="date"
              className="w-full rounded-md border border-gray-300 bg-slate-200 p-2 focus:border-transparent focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block">About your profile</label>
            <textarea
              rows="3"
              placeholder="write something about yourself"
              className="w-full rounded-md border border-gray-300 bg-slate-200 p-2 focus:border-transparent focus:outline-none"
            ></textarea>
          </div>

          <div>
            <label className="mb-1 block">Address</label>
            <input
              type="text"
              placeholder="Your address"
              className="w-full rounded-md border border-gray-300 bg-slate-200 p-2 focus:border-transparent focus:outline-none"
            />
          </div>
          <div className="float-right flex space-x-4 pt-4">
            <button
              className="rounded-full bg-orange-600 px-4 py-2 text-white transition duration-300 hover:bg-orange-500"
              type="submit"
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
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
