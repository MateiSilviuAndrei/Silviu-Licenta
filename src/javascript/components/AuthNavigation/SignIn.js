import React, {PureComponent} from 'react';
import {Box, VStack, Button, Input, Text} from 'native-base';
import {TouchableOpacity} from 'react-native';
import * as yup from 'yup';
import store from '../../store';
import {setKeyInStorage} from '../../utils/utils';
import {onSignIn} from '../../actions/userActions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {GeneralStyles} from '../../../styles/GeneralStyles.style';

class SignIn extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        value: '',
        error: 'This field is required',
        touched: false,
      },
      password: {
        value: '',
        error: 'This field is required',
        touched: false,
      },
      showPassword: false,
      emailSchema: yup
        .string()
        .email('Email is not valid')
        .required('This field is required'),
      passwordSchema: yup
        .string()
        .required('This field is required')
        .min(8, 'Password must have at least 8 characters'),
    };
  }

  _signIn = () => {
    const {email, password} = this.state;
    const dispatch = store.dispatch;

    const data = {
      email: email.value,
      password: password.value,
    };

    dispatch({type: 'ON_LOGIN'});
    onSignIn(data)
      .then(res => {
        const user = {
          email: res?.data?.user?.email,
          id: res?.data?.user?._id,
          role: res?.data?.user?.role,
        };
        setKeyInStorage('user', JSON.stringify(user));

        dispatch({
          type: 'ON_LOGIN_FULFILLED',
          payload: {
            user: user,
          },
        });
      })
      .catch(err => {
        dispatch({
          type: 'ON_LOGIN_REJECTED',
          payload: {error: err},
        });
        console.log(err);
      });
  };

  _updateInput = field => async value => {
    const {emailSchema, passwordSchema} = this.state;

    if (field === 'email') {
      let emailError = '';

      try {
        await emailSchema.validate(value);
      } catch (err) {
        emailError = err?.message;
      }

      this.setState(prevState => ({
        email: {
          ...prevState.email,
          value: value,
          error: emailError,
        },
      }));
    } else if (field === 'password') {
      let passwordError = '';

      try {
        await passwordSchema.validate(value);
      } catch (err) {
        passwordError = err?.message;
      }

      this.setState(prevState => ({
        password: {
          ...prevState.password,
          value: value,
          error: passwordError,
        },
      }));
    }
  };

  _handleBlur = field => () => {
    if (field === 'email') {
      this.setState(prevState => ({
        email: {
          ...prevState.email,
          touched: true,
        },
      }));
    } else if (field === 'password') {
      this.setState(prevState => ({
        password: {
          ...prevState.password,
          touched: true,
        },
      }));
    }
  };

  setPasswordVisibility = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}));
  };

  render() {
    const {email, password, showPassword} = this.state;

    const isNotValidForm =
      email.error || !email.value || password.error || !password.value;
    return (
      <VStack px="20px" space="20px" background="white">
        <Text mt="50px" fontSize="24px" textAlign="center">
          Login Page
        </Text>
        <Box>
          <Text mb="12px">Email</Text>
          <Input
            keyboardType="email-address"
            type="text"
            autoCapitalize="none"
            height="48px"
            py="12px"
            px="16px"
            placeholder="Enter Email"
            _focus={{
              bgColor: 'white',
              borderColor: 'black',
            }}
            fontSize="14px"
            defaultValue={email.value}
            onChangeText={this._updateInput('email')}
            onEndEditing={this._handleBlur('email')}
            error={email.error}
            touched={email.touched}
          />
          {!!email.error && email.touched && <Text>{email.error}</Text>}
        </Box>
        <Box>
          <Text mb="12px">Password</Text>
          <Input
            type={showPassword ? '' : 'password'}
            height="48px"
            py="12px"
            px="16px"
            _focus={{
              bgColor: 'white',
              borderColor: 'black',
            }}
            fontSize="14px"
            placeholder="Enter password"
            defaultValue={password.value}
            onChangeText={this._updateInput('password')}
            onEndEditing={this._handleBlur('password')}
            error={password.error}
            touched={password.touched}
            InputRightElement={
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={this.setPasswordVisibility}>
                <FontAwesome5
                  size={20}
                  color="gray"
                  name={!showPassword ? 'eye-slash' : 'eye'}
                  style={GeneralStyles.marginRight20}
                />
              </TouchableOpacity>
            }
          />
          {!!password.error && password.touched && (
            <Text>{password.error}</Text>
          )}
        </Box>
        <Button
          onPress={this._signIn}
          bgColor={isNotValidForm ? 'gray.400' : 'blue.700'}
          disabled={isNotValidForm ? true : false}
          _pressed={{
            opacity: 0.6,
          }}
          height="48px">
          <Text fontSize="16px" color="white" bold>
            Sign in
          </Text>
        </Button>
      </VStack>
    );
  }
}

export default SignIn;
