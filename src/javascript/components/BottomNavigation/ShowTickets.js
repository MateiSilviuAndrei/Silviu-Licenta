import {Box, Text, FlatList} from 'native-base';
import React from 'react';
import {connect} from 'react-redux';
import {onGetAllTicketsByUserId} from '../../actions/userActions';
import {getKeyFromStorage} from '../../utils/utils';
import TicketsItem from './TicketsIem';

class ShowTickets extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      tickets: [],
      error: '',
    };
  }

  async componentDidMount() {
    const {user} = this.props;
    const token = await getKeyFromStorage('token');
    onGetAllTicketsByUserId(token, user.user.id)
      .then(res => {
        const tickets = res?.data?.map(ticket => ({
          id: ticket._id,
          title: ticket.title,
          description: ticket.description,
          status: ticket.status,
          contactType: ticket.contactType,
          category: ticket.category,
          incidentType: ticket.incidentType,
          severity: ticket.severity,
          assignerName:
            ticket.assignerId === undefined ? 'none' : ticket.assignerId.name,
        }));
        this.setState({tickets});
      })
      .catch(err => {
        this.setState({error: err.response.data.message});
      });
  }

  _renderTickets = data => {
    const {
      id,
      title,
      description,
      category,
      contactType,
      severity,
      incidentType,
      assignerName,
      status,
    } = data.item;

    return (
      <TicketsItem
        key={id}
        id={id}
        title={title}
        description={description}
        contactType={contactType}
        category={category}
        status={status}
        severity={severity}
        incidentType={incidentType}
        assignerName={assignerName}
      />
    );
  };

  render() {
    const {tickets, error} = this.state;

    return (
      <Box bgColor="white" flex="1" w="100%">
        <Text mt="50px" mb="20px" fontSize="24px" textAlign="center">
          Tickets Page
        </Text>
        <FlatList
          data={tickets}
          ListEmptyComponent={
            <Text fontSize="24px" textAlign="center" mt="50px" color="red.500">
              {error ? error : 'There is no ticket!'}
            </Text>
          }
          renderItem={this._renderTickets}
        />
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(ShowTickets);
