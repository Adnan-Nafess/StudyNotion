import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";

const Upload = ({ name, label, register, setValue, errors, video = false }) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({
    accept: video
      ? { "video/*": [".mp4"] }
      : { "image/*": [".jpeg", ".jpg", ".png"] },
    onDrop: (acceptedFiles) => {
      setValue(name, acceptedFiles[0]);
    },
  });

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  return (
    <div className="flex flex-col space-y-2 w-full">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div
        {...getRootProps()}
        className="flex items-center justify-center h-32 w-full rounded-md cursor-pointer border border-dashed border-richblack-500 bg-richblack-700"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-yellow-50">Drop the file here ...</p>
        ) : (
          <p className="text-richblack-200">Drag & drop or click to browse</p>
        )}
      </div>

      {acceptedFiles.length > 0 && (
        <span className="mt-2 text-richblack-300">
          Selected file: {acceptedFiles[0].name}
        </span>
      )}

      {errors[name] && (
        <span className="text-xs text-pink-200">{label} is required</span>
      )}
    </div>
  );
};

export default Upload;
