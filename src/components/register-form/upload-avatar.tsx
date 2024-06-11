import { ReactComponent as UploadIcon } from "../../img/icons/upload-icon.svg";
import { ReactComponent as Cross } from "../../img/icons/cross.svg";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { setUploadedPath } from "../../store/actions";
import { useIsMobile } from "../../hooks/useSizes";

export function Upload(): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const url = reader.result as string;
          dispatch(setUploadedPath({ path: url }));
          setUploadedFiles(acceptedFiles);
          setFileUrl(url);
        };
        reader.readAsDataURL(file);
      });
    },
  });

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = () => {
        const url = reader.result as string;
        setFileUrl(url);
        dispatch(setUploadedPath({ path: url }));
        setUploadedFiles([selectedFile]);
      };
      reader.readAsDataURL(selectedFile);

    }
  };

  return (
    <div className="upload">
      <div className="upload__wrapper" {...getRootProps()}>
        {
          fileUrl
          ?
          <div className="upload__image-wrapper" key={'uploaded-avatar'}>
            <img src={fileUrl} alt="Uploaded file" width={60} height={60} className="upload__preview" />
          </div>

          :
          <div className="upload__inputs">
            <button className="button button--no-shadow upload__button" onClick={handleButtonClick}>
              <UploadIcon />
            </button>
            {
              !isMobile &&
              <p className="upload__description">Drop image here or click above to upload.</p>
            }
            <input {...getInputProps} className="visually-hidden" onChange={handleChange}/>
            {uploadedFiles.map((file) => (
              <div className="upload__image-wrapper" key={file.name}>

                <img src={fileUrl ? fileUrl : ''} alt="Uploaded file" width={60} height={60} className="upload__preview" />
              </div>
            ))}
          </div>
        }
        {
          fileUrl !== null ? <button className="upload__remove-btn" onClick={() => {
            setUploadedFiles([]);
            dispatch(setUploadedPath({ path: null }));
            setFileUrl(null);
          }}><Cross/></button> : ''
        }
      </div>
      <input ref={fileInputRef} type="file" className="visually-hidden" onChange={handleChange}/>
    </div>
  );
}
