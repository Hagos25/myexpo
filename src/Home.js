import { View, Text } from 'react-native';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
function HomeScreen() {
    const navigation=useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
      title="go back to contactScreen"
      onPress={()=>navigation.navigate('Contact')}
      />
    </View>
  );
}
export default HomeScreen;