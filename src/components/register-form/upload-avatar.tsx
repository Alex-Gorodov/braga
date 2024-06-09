import { ReactComponent as UploadIcon } from "../../img/icons/upload-icon.svg";
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
          <img src={fileUrl} alt="Uploaded file" width={60} height={60} className="upload__preview" />
          :
          <div className="upload__inputs">
            <UploadIcon />
            <button className="button button--dark upload__button" onClick={handleButtonClick}>
              Upload
            </button>
            {/* <p className="upload__description">PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.</p> */}
            <input {...getInputProps} className="visually-hidden" onChange={handleChange}/>
            <ul>
              {uploadedFiles.map((file) => (
                <li key={file.name}>
                  <img src={fileUrl ? fileUrl : ''} alt="Uploaded file" width={60} height={60} className="upload__preview" />
                </li>
              ))}
            </ul>
          </div>
        }
      </div>
      {
        isMobile && fileUrl
        ?
        <img src={fileUrl} alt="Uploaded file" width={60} height={60} className="upload__preview" />
        :
        ''
      }
      <input ref={fileInputRef} type="file" className="visually-hidden" onChange={handleChange}/>
    </div>
  );
}
