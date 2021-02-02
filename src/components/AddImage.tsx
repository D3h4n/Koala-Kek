import React, { useState } from "react";
import axios from "axios";

interface Props {
  handleAddImageCancel: () => void;
  handleImgPost: (imgUrl: string) => void;
}

export default function AddImage({
  handleAddImageCancel,
  handleImgPost,
}: Props) {
  const [fileInputState, setFileInputState] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [filePreview, setFilePreview] = useState<string>("");

  const fileSizeLimit = 100e3;

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFileInputState(event.target.value);
    if (file) {
      setFileSize(file.size);
      previewFiles(file);
    }
  };

  const previewFiles = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFilePreview(reader.result as string);
    };
  };

  const handleSubmitFile = (event: React.FormEvent) => {
    event.preventDefault();
    if (filePreview && fileSize < fileSizeLimit) {
      uploadImage(filePreview)
        .then((res) => handleImgPost(res))
        .catch((err) => console.error(err));
    }
  };

  const uploadImage = (base64EncodedImage: string) => {
    return new Promise<string>((resolve, reject) => {
      axios
        .post(`${process.env.REACT_APP_API_URI}/image/`, {
          data: base64EncodedImage,
        })
        .then((res) => JSON.parse(res.data))
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  };

  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    setFileInputState("");
    setFilePreview("");
    setFileSize(0);
  };

  return (
    <>
      <div className="add-image-background"></div>
      <div className="add-image-form">
        <form onSubmit={handleSubmitFile} onReset={handleReset}>
          <div className="add-image-form-preview">
            {filePreview && (
              <>
                <img
                  src={filePreview}
                  alt="chosen"
                  className="add-image-form-preview-image"
                />
                <p
                  className="add-image-form-preview-size"
                  style={{ color: fileSize > fileSizeLimit ? "red" : "white" }}
                >
                  {(fileSize / 1000).toFixed(2)} kb /{" "}
                  {(fileSizeLimit / 1000).toFixed(2)} kb
                </p>
              </>
            )}
          </div>
          <input
            className="add-image-form-input"
            type="file"
            name="file"
            value={fileInputState}
            onChange={handleFileInputChange}
          />
          <button type="submit" className="add-image-form-btn add-btn">
            Add
          </button>
          <button type="reset" className="add-image-form-btn reset-btn">
            Reset
          </button>
          <button
            type="button"
            className="add-image-form-btn cancel-btn"
            onClick={() => handleAddImageCancel()}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}
