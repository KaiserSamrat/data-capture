import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
import dropfile from '../../assests/images/OBJECTS.svg';
import { formatBytes } from '../Helpers/Custom/formatBytes';
import {
  acceptStyle,
  activeStyle,
  baseStyle,
  rejectStyle,
} from '../Helpers/Custom/styleHelper';
import CardComponent from '../Layout/CardComponent';
// const maxSize = 104857600;

const AddUserUpload = ({ setSelectedFiles, acceptFile, handleFile }) => {
  //   console.log(`AddUser ~ selectedFiles`, selectedFiles)
  const onDropAccepted = useCallback((acceptedFiles, fileRejections) => {
    acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    handleFile(acceptedFiles?.[0]);
    setSelectedFiles(acceptedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const singleFile = 1048576;
  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    console.log(` fileRejections`, fileRejections);
    acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setSelectedFiles(acceptedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    accept: acceptFile || 'image/png, image/jpg, image/jpeg',
    noClick: true,
    noKeyboard: true,
    onDropAccepted,
    onDrop,
    minSize: 0,
    // maxSize: singleFile,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );
  return (
    <React.Fragment>
      <CardComponent className="mt-3">
        <div className="">
          <div className="dz-message needsclick" {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <div className="mb-3 pointer_event" onClick={open}>
              {/* <i className="display-4 text-muted bx bxs-cloud-upload" /> */}
              <img style={{ maxWidth: '80px' }} src={dropfile} alt="" />
            </div>
            <h4>Drop files here</h4>
            <span>
              <span className="text-muted">or </span>{' '}
              <Link to="#" onClick={open}>
                {' '}
                Browse
              </Link>
            </span>
          </div>
        </div>
      </CardComponent>
    </React.Fragment>
  );
};

AddUserUpload.propTypes = {
  setSelectedFiles: PropTypes.func,
};

export default AddUserUpload;
