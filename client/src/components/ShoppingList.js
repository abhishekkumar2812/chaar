import React, { Component } from 'react';
import {
	ListGroup,
	Container,
	ListGroupItem,
	Button
} from 'reactstrap';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
//import {v1 as uuid} from 'uuid';
import { connect } from 'react-redux';
import { getItems, deleteItem} from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component{

	componentDidMount(){
		this.props.getItems();
	};

	onDeleteClick = (id) => {
	//	console.log("1");
		this.props.deleteItem(id);
	//	console.log("2");
	};

	render() {
		//this.props.item.items;
		const {items} = this.props.item;
		return(
			<Container>
				<ListGroup>
					<TransitionGroup className="shopping-list">
						{items.map(({_id, name}) => (
							<CSSTransition key={_id} timeout={500} classNames="fade">
								<ListGroupItem>
								<Button
									className="remove-btn"
									color="danger"
									size="sm"
									onClick = {this.onDeleteClick.bind(this, _id)}
									>&times;</Button>
									{name}
								</ListGroupItem>
							</CSSTransition>
						))}
					</TransitionGroup>
				</ListGroup>
			</Container>
		);
	}
}

ShoppingList.propTypes = {
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
  //isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {getItems, deleteItem})(ShoppingList);