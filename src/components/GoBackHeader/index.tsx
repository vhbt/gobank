import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const GoBackHeader: React.FC = () => {
  const { goBack } = useNavigation();

  return (
    <View style={{ marginTop: 50, marginLeft: 30 }}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={goBack}
      >
        <Ionicons name="ios-arrow-back" color="#fff" size={18} />
        <Text
          style={{
            color: '#Fff',
            fontSize: 18,
            fontFamily: 'Roboto_500Medium',
            marginLeft: 20,
          }}
        >
          Go Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoBackHeader;
