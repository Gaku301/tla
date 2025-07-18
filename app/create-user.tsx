import TextInputAccessory from '@/components/ui/TextIputAccesory';
import { Colors } from '@/constants/Colors';
import { User } from '@/lib/realmSchema';
import { useTheme } from '@react-navigation/native';
import { useRealm } from '@realm/react';
import { router, Stack } from 'expo-router';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const CreateUser = () => {
  const realm = useRealm(); // Realmのインスタンスを取得
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    realm.write(() => {
      realm.create(
        'User',
        User.generate({
          name,
          email,
        }),
      );
    });
    // ユーザー作成のための処理をここに実装できます
    router.navigate('/(tabs)'); // ユーザー作成後にホーム画面に戻る
  };

  return (
    <>
      <Stack.Screen options={{ title: 'ユーザー作成' }} />
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        behavior="padding"
        keyboardVerticalOffset={100} // Adjust this value based on your layout
      >
        <Image
          source={require('../assets/images/icon.png')}
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />
        <View style={{ marginBottom: 30, width: '80%' }}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 16, paddingBottom: 5 }}>ユーザー名</Text>
            <TextInput
              defaultValue={name}
              style={{
                width: '100%',
                borderColor: 'lightgray',
                borderWidth: 1,
                borderRadius: 10,
                padding: 8,
                fontSize: 16,
                color: colors.text,
              }}
              inputAccessoryViewID={'userNameInput'}
              onChangeText={value => setName(value)}
            />
            <TextInputAccessory accessoryId={'userNameInput'} />
          </View>
          <View style={{}}>
            <Text style={{ fontSize: 16, paddingBottom: 5 }}>メールアドレス</Text>
            <TextInput
              defaultValue={email}
              style={{
                width: '100%',
                borderColor: 'lightgray',
                borderWidth: 1,
                borderRadius: 10,
                padding: 8,
                fontSize: 16,
                color: colors.text,
              }}
              inputAccessoryViewID={'userEmailInput'}
              keyboardType="email-address"
              onChangeText={value => setEmail(value)}
            />
            <TextInputAccessory accessoryId={'userEmailInput'} />
            <Text style={{ fontSize: 12, color: 'gray', paddingTop: 5 }}>
              メールアドレスは後から変更できます
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 5,
              backgroundColor: Colors.light.tint,
              marginTop: 30,
            }}
          >
            <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
              ユーザー作成
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default CreateUser;
