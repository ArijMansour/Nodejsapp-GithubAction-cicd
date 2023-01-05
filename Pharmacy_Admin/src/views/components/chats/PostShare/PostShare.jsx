import React, { useState, useRef } from "react";
import "./PostShare.css";
import {
  UilScenery,
  UilSchedule,
  UilTimes,
  UilLocationPoint,
  UilPlayCircle,
} from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadImage,
  uploadPost,
} from "../../../../app/redux/actions/UploadAction";

import ProfileImage from "../../../../views/img/profileImg.jpg";
// const PostShare = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.authReducer.authData);
//   const [image, setImage] = useState(null);
//   const desc = useRef();
//   const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

//   // handle Image Change
//   const onImageChange = (event) => {
//     if (event.target.files && event.target.files[0]) {
//       let img = event.target.files[0];
//       setImage(img);
//     }
//   };

//   const imageRef = useRef();

//   // handle post upload
//   const handleUpload = async (e) => {
//     e.preventDefault();

//     //post data
//     const newPost = {
//       userId: user._id,
//       desc: desc.current.value,
//     };

//     // Reset Post Share
//     const resetShare = () => {
//       setImage(null);
//       desc.current.value = "";
//     };
//     // if there is an image with post
//     if (image) {
//       const data = new FormData();
//       const fileName = Date.now() + image.name;
//       data.append("name", fileName);
//       data.append("file", image);
//       newPost.image = fileName;
//       console.log(newPost);
//       try {
//         dispatch(uploadImage(data));
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     dispatch(uploadPost(newPost));
//     resetShare();
//   };

//   return (
//     <div className="PostShare">
//       <img
//         src={
//           user.profilePicture
//             ? serverPublic + user.profilePicture
//             : serverPublic + "defaultProfile.png"
//         }
//         alt="Profile"
//       />
//       <div>
//         <input
//           type="text"
//           placeholder="What's happening?"
//           required
//           ref={desc}
//         />
//         <div className="postOptions">
//           <div
//             className="option"
//             style={{ color: "var(--photo)" }}
//             onClick={() => imageRef.current.click()}
//           >
//             <UilScenery />
//             Photo
//           </div>

//           <div className="option" style={{ color: "var(--video)" }}>
//             <UilPlayCircle />
//             Video
//           </div>
//           <div className="option" style={{ color: "var(--location)" }}>
//             <UilLocationPoint />
//             Location
//           </div>
//           <div className="option" style={{ color: "var(--shedule)" }}>
//             <UilSchedule />
//             Shedule
//           </div>
//           <button
//             className="button ps-button"
//             onClick={handleUpload}
//             disabled={loading}
//           >
//             {loading ? "uploading" : "Share"}
//           </button>

//           <div style={{ display: "none" }}>
//             <input type="file" ref={imageRef} onChange={onImageChange} />
//           </div>
//         </div>

//         {image && (
//           <div className="previewImage">
//             <UilTimes onClick={() => setImage(null)} />
//             <img src={URL.createObjectURL(image)} alt="preview" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PostShare;

function PostShare() {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const loading = useSelector((state) => state.postReducer.uploading);

  const desc = useRef();

  const { user } = useSelector((state) => state.auth);

  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      userId: user.id,
      desc: desc.current.value,
    };

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;
      console.log(newPost);
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    alert(JSON.stringify(newPost));

    dispatch(uploadPost(newPost));
    reset();
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
  return (
    <div className="PostShare">
      <img src={ProfileImage} />

      <div>
        <input ref={desc} required type="text" alt="what's happening" />

        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>{" "}
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>{" "}
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>
          <button
            onClick={handleSubmit}
            className="button ps-button"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default PostShare;
