"use client"

import { updateUserInfo } from "@api"
import { Button, ModalOverlay } from "@components"
import { User } from "@interfaces"
import { useUserStore } from "@stores"
import { customFetch } from "@utils"
import React, { useState } from "react"
import Cropper, { Area } from "react-easy-crop"
import "./avatarUpdate.scss"
import { getCroppedImg } from "./cropUtils"

const AvatarUpdate = () => {
  const fetchUserData = useUserStore((state) => state.fetchUserData)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | { width: number; height: number; x: number; y: number }>(null)
  const [isCropping, setIsCropping] = useState(false)
  const [userMsg, setUserMsg] = useState<string>()
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const user = useUserStore((state) => state.user)
  const { username } = (user as User) ?? {}
  const msgShowDuration = 2000

  const closeModal = () => {
    // reset cropper
    setImageSrc(null)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setCroppedAreaPixels(null)
    setUserMsg(undefined)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = () => setImageSrc(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const showErrorMsg = () => {
    setUserMsg("Failed to update avatar. Please try again.")

    setTimeout(() => {
      setUserMsg(undefined)
    }, msgShowDuration)
  }

  const handleCloudinaryUploadSuccess = async (url: string) => {
    try {
      setUserMsg("Avatar updated successfully in the cloud! Updating Nexus dawn...")

      await updateUserInfo("image", url)
      await fetchUserData("image")

      setUserMsg("All updates complete! Enjoy your new avatar!")

      setTimeout(() => {
        closeModal()
        setUserMsg(undefined)
      }, msgShowDuration)
    } catch (error) {
      showErrorMsg()
    }
  }

  const handleCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return

    setIsCropping(true)

    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, username)
      const formData = new FormData()

      formData.append("file", croppedImage)

      const response = await customFetch(
        "/api/profiles/upload/avatar",
        {
          method: "PUT",
          body: formData,
        },
        true
      )

      if (response.new_url) {
        handleCloudinaryUploadSuccess(response.new_url)
      } else {
        throw new Error()
      }
    } catch (error) {
      showErrorMsg()
    } finally {
      setIsCropping(false)
    }
  }

  const handleChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleCancel = () => {
    closeModal()
  }

  return (
    <div className="image-input center controls">
      <Button
        label="Choose avatar image"
        onClick={handleChooseFileClick}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {imageSrc ? (
        <ModalOverlay>
          <div className="box center-column">
            {userMsg ? (
              <span>{userMsg}</span>
            ) : (
              <div className="image-cropper">
                <div className="crop-container">
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={handleCropComplete}
                  />
                </div>
                <div className="controls">
                  <Button
                    label={isCropping ? "Cropping..." : "Crop & Upload"}
                    onClick={handleCrop}
                    disabled={isCropping}
                  />
                  <Button
                    label="Cancel"
                    onClick={handleCancel}
                  />
                </div>
              </div>
            )}
          </div>
        </ModalOverlay>
      ) : null}
    </div>
  )
}

export default AvatarUpdate
