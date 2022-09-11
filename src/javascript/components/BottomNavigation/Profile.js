import React from 'react';
import store from '../../store';
import {removeKeyFromStorage} from '../../utils/utils';
import {Box, Button, HStack, Input, Text, Modal, VStack} from 'native-base';
import {connect} from 'react-redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native';

class Profile extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      isOpenModal: false,
    };
  }
  _logout = async () => {
    const dispatch = store.dispatch;

    dispatch({type: 'LOGOUT'});

    removeKeyFromStorage('token');
    removeKeyFromStorage('user');
    dispatch({type: 'LOGOUT_FULFILLED'});
  };

  _openModal = () => {
    this.setState({isOpenModal: true});
  };

  _closeModal = () => {
    this.setState({isOpenModal: false});
  };

  render() {
    const {user} = this.props;
    const {isOpenModal} = this.state;
    return (
      <Box px="20px" bgColor="white" flex="1">
        <Modal isOpen={isOpenModal} onClose={this._closeModal} size="lg">
          <Modal.Content width="full" height="full">
            <Modal.CloseButton />
            <Modal.Header>Notifications</Modal.Header>
            <Modal.Body>
              <HStack alignItems="center" space={5}>
                <Text fontWeight="medium">test 2222</Text>
                <Text color="blueGray.400">has been modified</Text>
              </HStack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
        <HStack
          mt="50px"
          alignItems="center"
          justifyContent="center"
          position="relative">
          <Text fontSize="24px">Profile Page</Text>
          <Box position="absolute" right="5">
            <TouchableOpacity onPress={this._openModal}>
              <FontAwesome5Icon name="bell" size={20} solid />
            </TouchableOpacity>
          </Box>
        </HStack>
        <Input
          defaultValue={user.user.email}
          height="48px"
          py="12px"
          px="16px"
          my="20px"
          borderColor="gray.600"
          fontSize="16px"
          isDisabled
        />
        <Button
          onPress={this._logout}
          height="48px"
          bgColor="blue.700"
          _pressed={{
            opacity: 0.6,
          }}>
          <Text fontSize="16px" color="white" bold>
            Logout
          </Text>
        </Button>
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Profile);
