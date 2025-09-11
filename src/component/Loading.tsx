import { ActivityIndicator, StyleProp, View, ViewStyle } from 'react-native'

type LoadingProps = { style?: StyleProp<ViewStyle>, color?: string }

const Loading = ({ style = {} as StyleProp<ViewStyle>, color = 'white' }: LoadingProps) => {
  return (
    <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, style]}>
      <ActivityIndicator size="small" color={color} />
    </View>
  )
}

export default Loading
