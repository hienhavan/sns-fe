const PostForm = () => {
  return (
    <div className="bg-white">
      <span className="create-post">Create post</span>
      <div className="new-postbox">
        <figure>
          <img src="#" alt="user profile" />
        </figure>
        <div className="newpst-input">
          <form method="post">
            <textarea
              rows="2"
              placeholder="Share some what you are thinking?"
            ></textarea>
          </form>
        </div>
        <div className="attachments">
          <ul>
            <li>
              <span className="add-loc">
                <i className="fa fa-map-marker"></i>
              </span>
            </li>
            <li>
              <i className="fa fa-music"></i>
              <label className="fileContainer">
                <input type="file" />
              </label>
            </li>
            <li>
              <i className="fa fa-image"></i>
              <label className="fileContainer">
                <input type="file" />
              </label>
            </li>
            <li>
              <i className="fa fa-video-camera"></i>
              <label className="fileContainer">
                <input type="file" />
              </label>
            </li>
            <li>
              <i className="fa fa-camera"></i>
              <label className="fileContainer">
                <input type="file" />
              </label>
            </li>
            <li className="preview-btn">
              <button className="post-btn-preview" type="submit" data-ripple="">
                Preview
              </button>
            </li>
          </ul>
          <button className="post-btn" type="submit" data-ripple="">
            Post
          </button>
        </div>
        <div className="add-location-post">
          <span>Drag map point to selected area</span>
          <div className="row">
            <div className="col-lg-6">
              <label className="control-label">Lat :</label>
              <input type="text" className="" id="us3-lat" />
            </div>
            <div className="col-lg-6">
              <label>Long :</label>
              <input type="text" className="" id="us3-lon" />
            </div>
          </div>
          <div id="us3"></div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
