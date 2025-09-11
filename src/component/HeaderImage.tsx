import { Image } from "react-native"

export const HeaderImage = () => {
  return (
    <Image
      source={require('../assets/headerImage.jpg')}
      style={{
        height: 57,
        width: 80,
        alignSelf: "center",
        marginBottom: 20,
      }}
      resizeMode="contain"
    />
  )
}

