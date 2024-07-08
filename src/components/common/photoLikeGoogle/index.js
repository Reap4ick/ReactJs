import React, { useState, useRef } from 'react';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const PhotoModal = ({ show, handleClose, handleSave }) => {
    const [image, setImage] = useState(null);
    const cropperRef = useRef(null);

    const onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    const rotateImage = () => {
        const cropper = cropperRef.current.cropper;
        cropper.rotate(90);
    };

    const cropImage = () => {
        if (typeof cropperRef.current.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas({
            width: 500,
            height: 500,
        });
        handleSave(croppedCanvas.toDataURL());
        handleClose();
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`} tabIndex="-1" style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Редагувати фото</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Виберіть файл</label>
                            <input className="form-control" type="file" id="formFile" accept="image/*" onChange={onChange} />
                        </div>
                        {image && (
                            <>
                                <Cropper
                                    src={image}
                                    style={{ height: 400, width: '100%' }}
                                    initialAspectRatio={1}
                                    aspectRatio={1}
                                    guides={false}
                                    ref={cropperRef}
                                />
                                <button type="button" className="btn btn-secondary mt-2" onClick={rotateImage}>Rotate</button>
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Закрити</button>
                        <button type="button" className="btn btn-primary" onClick={cropImage}>Зберегти</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoModal;
