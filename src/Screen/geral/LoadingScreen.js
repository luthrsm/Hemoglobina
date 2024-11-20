import { StatusBar, View, ActivityIndicator } from 'react-native';



const LoadingScreen = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#af2b2b" />
    </View>
);


export default LoadingScreen