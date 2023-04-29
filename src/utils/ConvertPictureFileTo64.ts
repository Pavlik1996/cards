export const convertPictureFileTo64 = (file: File, callBack: (value: string) => void) => {
  const reader = new FileReader()

  reader.readAsDataURL(file)

  reader.onloadend = () => {
    const file64 = reader.result as string

    callBack(file64)
  }
}
