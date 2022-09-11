import React, {PureComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigateTo, navigationRef} from '../../utils/navigation';
import {connect} from 'react-redux';
import {
  getKeyFromStorage,
  removeKeyFromStorage,
  setKeyInStorage,
} from '../../utils/utils';
import {onValidateToken} from '../../actions/userActions';
import store from '../../store';
import SignIn from '../AuthNavigation/SignIn';
import MainBottomNavigator from '../BottomNavigation/MainBottomNavigator';

const {Navigator: StackNavigator, Screen: StackScreen} =
  createNativeStackNavigator();

class RootNavigator extends PureComponent {
  routeNameRef;
  constructor(props) {
    super(props);
    this.routeNameRef = React.createRef();
    this.state = {
      screenOptions: {
        headerShown: false,
      },
    };
  }

  async componentDidMount() {
    await this._validateToken();
    await this._handleNavigationQueue();
  }

  _handleNavigationQueue = async () => {
    const res = await getKeyFromStorage('navigation-queue');
    const navigationQueue = JSON.parse(res || '{}');
    if (res?.length) {
      const {url, props} = navigationQueue;
      await removeKeyFromStorage('navigation-queue');
      navigateTo(url, props);
    }
  };

  _validateToken = async () => {
    const dispatch = store.dispatch;
    const value = await getKeyFromStorage('token');

    dispatch({type: 'ON_TOKEN_VALIDATE'});
    onValidateToken(value)
      .then(res => {
        const user = {
          email: res?.data?.user?.email,
          id: res?.data?.user?._id,
          role: res?.data?.user?.role,
        };
        setKeyInStorage('user', JSON.stringify(user));
        dispatch({
          type: 'ON_TOKEN_VALIDATE_FULFILLED',
          payload: {
            user: user,
          },
        });
      })
      .catch(err => {
        dispatch({
          type: 'ON_TOKEN_VALIDATE_REJECTED',
          payload: {
            err: err,
          },
        });
        removeKeyFromStorage('token');
      });
  };

  componentDidUpdate(prevProps) {
    const {user} = this.props;
    const {loggedIn} = user;
    if (prevProps.user.loggedIn !== loggedIn && loggedIn === true) {
      navigateTo('MainBottomNavigator', {screen: 'Tickets'});
    }
  }
  _assignCurrentRouteNameToRef = () => {
    this.routeNameRef.current = navigationRef?.getCurrentRoute()?.name || null;
  };

  _getComponent = () => {
    const {user} = this.props;
    return user.loggedIn ? (
      <StackScreen name="MainBottomNavigator" component={MainBottomNavigator} />
    ) : (
      <StackScreen name="Logare" component={SignIn} />
    );
  };

  render() {
    const {screenOptions} = this.state;
    return (
      <NavigationContainer
        ref={navigationRef}
        onReady={this._assignCurrentRouteNameToRef}>
        <StackNavigator screenOptions={screenOptions}>
          {this._getComponent()}
        </StackNavigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const connector = connect(mapStateToProps);

export default connector(RootNavigator);
