import React from 'react'
import { ModalWrapper } from '@/components/Modals'
import { SiteData } from '@/data';
import { ImageCrop } from '.'

const ImageCropModal = () => {

    return (
        <ModalWrapper
            modalID={SiteData.modalIDs.imageUploadCrop}
            modalTitle="Image Transform"
        >
            <ImageCrop />
        </ModalWrapper>
    )
}

export default ImageCropModal
