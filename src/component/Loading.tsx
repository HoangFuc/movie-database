import { ActivityIndicator, StyleProp, View, ViewStyle } from 'react-native'

const Loading = ({ style = {} as StyleProp<ViewStyle> }) => {
  return (
    <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, style]}>
      <ActivityIndicator size="small" color='white' />
    </View>
  )
}

export default Loading
