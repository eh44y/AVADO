import React, { useState } from "react";
import * as galleryAction from "./Gallery-action";

const GalleryContext = React.createContext({
  gallery: undefined,
  attachment: undefined,
  page: [],
  isSuccess: false,
  isGetUpdateSuccess: false,
  totalPages: 0,
  getGalleryPageList: () => {},

  getGalleryWithImg: () => {},
  createGalleryWithFiles: () => {},

  getUpdateGalleryWithFiles: () => {},

  updateGalleryWithFiles: () => {},
  deleteGallery: () => {},
});

export const GalleryContextProvider = (props) => {
  const [gallery, setGallery] = useState();
  const [page, setPage] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isSuccess, SetIsSuccess] = useState(false);
  const [isGetUpdateSuccess, setIsGetUpdateSuccess] = useState(false);

  // 갤러리 리스트 목록
  const getGalleryPageHandler = async (clubId, pageId) => {
    SetIsSuccess(false);
    const data = await galleryAction.getGalleryPageList(clubId, pageId);
    const page = data?.data.content;
    const pages = data?.data.totalPages;
    setPage(page);
    setTotalPages(pages);
    SetIsSuccess(true);
  }; // getGalleryPageHandler

  // 특정 갤러리 조회
  const getGalleryHandler = (clubId, param, token) => {
    SetIsSuccess(false);
    const data = token
      ? galleryAction.getOneGalleryWithImg(clubId, param, token)
      : galleryAction.getOneGalleryWithImg(clubId, param);
    data.then((result) => {
      if (result !== null) {
        const gallery = result.data;
        setGallery(gallery);
      }
    });
    SetIsSuccess(true);
  }; // getGalleryHandler

  // 갤러리 생성
  const createGalleryHandler = (gallery, token, files) => {
    SetIsSuccess(false);
    const formData = new FormData();
    formData.append("clubId", gallery.clubId);
    formData.append("content", gallery.content);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    } // for end

    const data = galleryAction.createGalleryWithFiles(
      gallery.clubId,
      token,
      formData
    );

    console.log(data);

    data.then((result) => {
      if (result !== null) {
        console.log(isSuccess);
      } // if end
    });
    SetIsSuccess(true);
  }; // createGalleryHandler

  // 갤러리 수정(불러오기)
  const getUpdateGalleryHandler = async (token, param) => {
    setIsGetUpdateSuccess(false);
    const updateData = await galleryAction.getChangeGalleryWithFile(
      token,
      param
    );

    console.log(updateData);

    const gallery = updateData?.data;

    console.log(gallery);

    setGallery(gallery);
    setIsGetUpdateSuccess(true);
  }; // getUpdateGalleryHandler

  // 갤러리 수정
  const updateGalleryHandler = (gallery, token, files) => {
    SetIsSuccess(false);

    const formData = new FormData();
    formData.append("content", gallery.content);
    formData.append("id", gallery.id);
    formData.append("clubId", gallery.clubId);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    } // for end

    const data = galleryAction.changeGalleryWithFiles(
      gallery.clubId,
      token,
      formData
    );

    data.then((result) => {
      if (result !== null) {
        console.log(isSuccess);
      }
    });
    SetIsSuccess(true);
  }; // updateGalleryHandler

  // 갤러리 삭제
  const deleteGalleryHandler = (token, param) => {
    SetIsSuccess(false);

    const data = galleryAction.deleteGallery(token, param);
    data.then((result) => {
      if (result !== null) {
      } // if end
    });
    SetIsSuccess(true);
  }; // deleteGalleryHandler

  const contextValue = {
    gallery,
    page,
    isSuccess,
    isGetUpdateSuccess,
    totalPages,
    getGalleryPageList: getGalleryPageHandler,
    getGalleryWithImg: getGalleryHandler,
    createGalleryWithFiles: createGalleryHandler,
    getUpdateGalleryWithFiles: getUpdateGalleryHandler,
    updateGalleryWithFiles: updateGalleryHandler,
    deleteGallery: deleteGalleryHandler,
  };

  return (
    <GalleryContext.Provider value={contextValue}>
      {props.children}
    </GalleryContext.Provider>
  );
}; // GalleryContextProvider

export default GalleryContext;
