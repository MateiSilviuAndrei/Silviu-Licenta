import {Box, HStack, Text, VStack} from 'native-base';
import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {onGetAllTicketsByUserId} from '../../actions/userActions';
import {getKeyFromStorage} from '../../utils/utils';

class TicketsItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      areOpenDetails: false,
    };
  }

  _showDetails = () => {
    this.setState(prevState => {
      return {
        areOpenDetails: !prevState.areOpenDetails,
      };
    });
  };

  render() {
    const {
      title,
      description,
      category,
      status,
      contactType,
      id,
      incidentType,
      assignerName,
      severity,
    } = this.props;
    const {areOpenDetails} = this.state;

    const trimmedDecription =
      description.length > 100
        ? description.slice(0, 100) + '...'
        : description;

    return (
      <TouchableWithoutFeedback onPress={this._showDetails}>
        <Box
          bgColor={
            severity === 'low'
              ? 'yellow.500'
              : severity === 'medium'
              ? 'orange.500'
              : severity === 'high'
              ? 'red.500'
              : severity === 'critical'
              ? 'purple.500'
              : 'gray.500'
          }
          mb="10px"
          p="10px"
          mx="20px"
          borderRadius="15px"
          shadow="5">
          <Text fontSize="16px" bold>
            {title}
          </Text>
          <VStack space="10px" display={areOpenDetails ? 'flex' : 'none'}>
            <Text>{trimmedDecription}</Text>
            <HStack>
              <Text w="50%">Category: {category}</Text>
              <Text w="50%">Status: {status}</Text>
            </HStack>
            <HStack>
              <Text w="50%">Contact: {contactType}</Text>
              <Text w="50%">Incident: {incidentType}</Text>
            </HStack>
            <HStack>
              <Text w="50%">Severity: {severity}</Text>
              <Text w="50%">Assigner: {assignerName}</Text>
            </HStack>
          </VStack>
        </Box>
      </TouchableWithoutFeedback>
    );
  }
}

export default TicketsItem;
