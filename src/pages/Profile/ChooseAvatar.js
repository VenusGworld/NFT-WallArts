/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
// import {XIcon} from "@heroicons/react/outline";
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';

import axios from "axios";

const TO_RADIANS = Math.PI / 180

async function canvasPreview(
  image,
  canvas,
  crop,
  scale = 1,
  rotate = 0,
) {
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalWidth / image.width
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio
  // const pixelRatio = 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

  ctx.scale(pixelRatio, pixelRatio)
  ctx.imageSmoothingQuality = 'high'

  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY

  const rotateRads = rotate * TO_RADIANS
  const centerX = image.naturalWidth / 2
  const centerY = image.naturalHeight / 2

  ctx.save()

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY)
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY)
  // 3) Rotate around the origin
  ctx.rotate(rotateRads)
  // 2) Scale the image
  ctx.scale(scale, scale)
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY)
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalWidth,
    0,
    0,
    image.naturalWidth,
    image.naturalWidth,
  )

  ctx.restore()
}

export function useDebounceEffect(
  fn,
  waitTime,
  deps,
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps)
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, [deps])
}

function centerAspectCrop(
  mediaWidth,
  mediaHeight,
  aspect,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}



const UploadPhoto = ({ is_Connected, user, onChanged, availableChange }) => {
  const createButtonRef = useRef(null)
  // const dispatch = useAppDispatch();
  // const setOpen = () => {
  //   dispatch(close({ id: 2 }));
  // }
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef(null)
  const imgRef = useRef(null)
  const [crop, setCrop] = useState(centerAspectCrop(100, 100, 1))
  const [completedCrop, setCompletedCrop] = useState();
  const [profileImage, setProfileImage] = useState("");
  const [openPreview, setOpenPreview] = useState(false)

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e) {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, 1))
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          1,
          0,
        )
      }
    },
    100,
    [completedCrop, 1, 0],
  )

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataUrl = previewCanvasRef.current.toDataURL("image/jpg");
      const imageBlob = dataURItoBlob(dataUrl);

      const imageName = 'profile.jpg';
      const imageFile = new File([imageBlob], imageName, { type: 'image/jpg' });
      const formData = new FormData();
      formData.append('image', imageFile);
      await setProfileImage(imageFile);
      await axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/avatar/${user?._id}`,
          formData
        )
        .then((res) => {
          if (res.status === 201) {
            onChanged()
          }
        })
        .catch((err) => { });
      setOpenPreview(false)
    } catch (e) {
      console.log("crop the image");
    }
  }
  const imgButton = useRef(null);

  return (
    <div className="flex justify-center relative">
      <div
        className={` rounded-full sm:-mt-36 -mt-20 brightness-100 border-[10px] border-[#363f54]  ${availableChange?" hover:brightness-50 cursor-pointer":" "} transition-all md:w-40 md:h-40 sm:w-28 sm:h-28 w-20 h-20`}
        onClick={() => {
          if (is_Connected && availableChange) {
            imgButton.current.click();
            setOpenPreview(true);
          }
        }}
      >
        {/* <input
            className=" hidden"
            type="file"
            accept=".png, .jpg, .jpeg"
            name="image"
            onChange={handleImage}
            ref={imgButton}
          /> */}
        {profileImage !== "" && profileImage ? (
          <img
            src={URL.createObjectURL(profileImage)}
            alt=""
            className="  object-contain rounded-full"
          />
        ) : is_Connected && user?.avatar ? (
          <img
            loading="lazy"
            src={
              process.env.REACT_APP_BACKEND_URL +
              `/images/avatars/${user?.avatar}`
            }
            alt=""
            className=" w-full h-full rounded-full"
          />
        ) : (
          <img
            loading="lazy"
            src={
              process.env.PUBLIC_URL + "/img/user.png"
            }
            alt=""
            className="  rounded-full"
          />
        )}
        {availableChange?<div className=" absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 z-[200]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </div>:null}
      </div>
      <form onSubmit={onSubmit} className={`border-4 border-gray-400 absolute w-96 z-[1001] top-8 rounded-lg ${openPreview ? 'block' : 'hidden'}`}>
        <div className="relative">
          <span width="20" className='text-white absolute right-4 hover:-rotate-90 transition-all cursor-pointer text-gray text-2xl' onClick={() => setOpenPreview(false)} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

          </span>
        </div>

        <div className="bg-[#363f54] px-4 pb-4 sm:px-6 sm:pb-4 py-5">
          <div>
            <div className="Crop-Controls mt-6 mb-4">
              <input type="file" accept="image/*" onChange={onSelectFile} ref={imgButton} className='hidden' />
            </div>
            {Boolean(imgSrc) && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1}
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  style={{ transform: `scale(1) rotate(0deg)` }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            )}
            <div className=" text-gray-100 flex items-center justify-center">
              <p className=" mr-3 text-lg">Preview</p>
              {Boolean(completedCrop) && (
                <canvas
                  ref={previewCanvasRef}
                  className=" w-32 h-32 rounded-full"
                  style={{
                    border: '1px solid black',
                    objectFit: 'contain',
                    // width: completedCrop.width,
                    // height: completedCrop.height,
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="bg-[#363f54] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            className="w-full justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-opacity-70 transition-all   cursor-pointer inline-block  bg-[#D3B789] text-[#313949]  sm:ml-3 sm:text-sm"
            ref={createButtonRef}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

function dataURItoBlob(croppedImage) {
  const byteString = window.atob(croppedImage.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
  ;
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }
  return new Blob([int8Array], { type: 'image/png' });
}

export default UploadPhoto;