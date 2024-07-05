import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import 'bootstrap/dist/css/bootstrap.min.css';
//remove
const ManyImagesPage = () => {
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files).map(file => ({
            id: file.name,
            image: URL.createObjectURL(file)
        }));

        const newFiles = [...files, ...selectedFiles];
        if (newFiles.length > 7) {
            alert('You can only upload up to 7 images.');
            setFiles(newFiles.slice(0, 7));
        } else {
            setFiles(newFiles);
        }
    };

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedFiles = Array.from(files);
        const [removed] = reorderedFiles.splice(result.source.index, 1);
        reorderedFiles.splice(result.destination.index, 0, removed);

        setFiles(reorderedFiles);
    };

    const handleDeleteImage = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: 'none',
        padding: 8,
        margin: `0 8px 0 0`,
        background: isDragging ? 'lightgreen' : 'white',
        ...draggableStyle,
    });

    return (
        <div className="container mt-4">
            <div className="mb-3">
                <label htmlFor="formFileMultiple" className="form-label">Multiple files input example</label>
                <input
                    className="form-control"
                    type="file"
                    id="formFileMultiple"
                    multiple
                    onChange={handleFileChange}
                />
            </div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="files" direction="horizontal">
                    {(provided) => (
                        <div
                            className="d-flex flex-wrap"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {files.map(({ id, image }, index) => (
                                <Draggable key={id} draggableId={id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            <div className="position-relative" style={{ width: "150px", height: "150px", overflow: "hidden" }}>
                                                <img src={image} alt={id} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                <button
                                                    className="btn btn-outline-danger btn-sm position-absolute top-0 end-0 m-1"
                                                    onClick={() => handleDeleteImage(index)}
                                                >
                                                    DEL
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default ManyImagesPage;
