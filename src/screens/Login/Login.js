import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import MainButton from '../../components/Button/MainButton';
import InputText from '../../components/Inputs/InputText';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import {GoogleSvg} from '../../constants/Icons';
import {useDispatch, useSelector} from 'react-redux';
// import {onChangeLoginInput, onLoginHandler} from '../../store/Login/Login';
import Spinner from '../../components/Spinner/Spinner';

function Login(props) {
  const dispatch = useDispatch();
  // const {loginForm, loading} = useSelector(state => state.login);
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/1.png')} />
      <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 30}}>
        Welcome Back!
      </Text>
      <Text style={{fontSize: 15, marginBottom: 20}}>
        Login To Your Account
      </Text>

      <InputText
        styleProp={styles.TxtInput}
        placeholder={'user name'}
        imageSource={require('../../../assets/images/user.png')}
        name={'userName'}
        borderColor={'#48B8AC'}
        // onChange={e => dispatch(onChangeLoginInput(e, 'email'))}
        // value={loginForm.email.value}
      />
      <InputText
        styleProp={styles.TxtInput}
        placeholder={'password'}
        imageSource={require('../../../assets/images/padlock.png')}
        secureTextEntry={true}
        name={'pass'}
        borderColor={'#48B8AC'}
        // onChange={e => dispatch(onChangeLoginInput(e, 'password'))}
        // value={loginForm.password.value}
      />

      <MainButton
        title={'Log in'}
        // loading={loading}
        btnBackgroundColor={'#222D58'}
        txtColor={'#fff'}
        props={props}
        onPress={() => {
          props.navigation.navigate('home');
        }}
        // onPress={() => {
        //   dispatch(
        //     onLoginHandler(
        //       loginForm.email.value,
        //       loginForm.password.value,
        //       props,
        //     ),
        //   );
        //   // props.navigation.navigate('home');
        // }}
      />
      {/* <Text style={{color: '#48B8AC'}}>or connect using</Text> */}
      {/* <MainButton
        title={'Google'}
        btnBackgroundColor={'#F14336'}
        txtColor={'#fff'}
        btnIcon={
          <AntDesign
            name="google"
            size={20}
            color={'#fff'}
            style={styles.googleIcon}
          />
        }
      /> */}
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TxtInput: {
    borderColor: '#707070',
    width: '80%',
    borderWidth: 1,
    padding: 10,
    paddingVertical: 13,
    borderRadius: 4,
    marginTop: 9,
    paddingLeft: 25,
  },
  googleIcon: {
    marginRight: 15,
  },
});
