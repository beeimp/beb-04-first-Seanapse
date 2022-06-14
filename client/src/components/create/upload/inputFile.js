import styled from 'styled-components';
import { useRef, useState } from 'react';

const UploadInput = styled.input`
  display: none;
`;

const UploadImage = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  border: 1px solid black;
  ${(props) => props.imageUrl === '' ? undefined : `background-image: url(${props.imageUrl});`
  }
  background-size: contain;
  background-repeat: no-repeat;

  > button {
    display: none;
  }
  
  :hover {
    > button {
      display: block;
    }
  }
`;

const LoadButton = styled.button`
  position: absolute;
  font-size: 30px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(200, 200, 200, 0.5);
  color: rgba(0, 0, 0, 0.5);
`

const fileToDataURL = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    resolve(event.target.result)
  };
  reader.readAsDataURL(file);
})

const CreateUploadInputFile = ({ onChange = (e) => { } }) => {
  const uploadRef = useRef(null);
  const [dataURL, setDataURL] = useState('')

  const imagePreview = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setDataURL('');
      return;
    }

    fileToDataURL(file)
      .then(dataUri => {
        setDataURL(dataUri);
      })

  }

  const uploadHandler = (event) => {
    onChange(event);
    imagePreview(event);
  }

  return (
    <>
      <UploadImage imageUrl={dataURL} >
        <LoadButton onClick={() => { uploadRef.current.click() }}>이미지 불러오기</LoadButton>
      </UploadImage>
      <UploadInput ref={uploadRef} type={'file'} accept="image/*,video/*,audio/*,.glb,.gltf" onChange={uploadHandler}></UploadInput>
    </>
  );
}

export default CreateUploadInputFile;