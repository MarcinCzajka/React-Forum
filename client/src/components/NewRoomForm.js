import React from 'react';
import { Message, Button, Form, Modal, Menu } from 'semantic-ui-react';
import basePath from '../api/basePath';
import UserContext from '../contexts/UserContext';

class NewRoomForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            title: '',
            description: '',
            shortDescription: '',
            category: 'General',
            image: '',
            colorScheme: 'Standard',
            error: ''
        }
    }

    static contextType = UserContext;

   createNewRoom(authorId) {
        basePath({
            method: "post",
            url: `/api/rooms/`,
            data: {
                authorId: authorId,
                title: this.state.title,
                description: this.state.description,
                shortDescription: this.state.shortDescription,
                category: this.state.category,
                image: this.state.image,
                colorScheme: this.state.colorScheme
            },
            withCredentials: true
        })
        .then((res) => {
            if (res.status === 200) {
                this.setState({
                    'open': false,
                    description: '',
                    shortDescription: '',
                    category: 'General',
                    image: '',
                    colorScheme: 'Standard'
                });
            };
        })
        .catch(err => {
            console.log(err);
            this.setState({ error: err.response.data });
        })
    }

    error = () => {
        if (this.state.error) {
            return (
                <Message error
                header = 'Error'
                content = {this.state.error} />
            )
        }
    }

    render() {
        return (
            <div>
                {this.context.loggedIn ? (
                    <Modal size='tiny' trigger={<Button onClick={this.open} >New Thread</Button>}
                        open={this.state.open}
                        onClose={this.close}
                    >
                        <Modal.Header>{this.state.title || 'New thread'}</Modal.Header>
                        <Modal.Content>
                            <Form size='large' onSubmit={() => {this.createNewRoom(this.context.userId)}} error >
                                <div>{this.error()}</div>
                                <br></br>
                                <Form.Field required>
                                    <label>Title</label>
                                    <input placeholder='Title' value={this.state.title} onChange={ (e) => this.setState({ title: e.target.value })} />
                                </Form.Field>
                                <Form.Field required>
                                    <label>Short description</label>
                                    <input placeholder='This will be seen by users on main page' value={this.state.shortDescription} onChange={ (e) => this.setState({ shortDescription: e.target.value })} />
                                </Form.Field>
                                <Form.Field required>
                                    <label>Description</label>
                                    <input placeholder='Description' value={this.state.description} onChange={ (e) => this.setState({ description: e.target.value })} />
                                </Form.Field>
                                <Form.Field>
                                    <label>category</label>
                                    <input placeholder='Category of post: motorisation, animals etc.' value={this.state.category} onChange={ (e) => this.setState({ category: e.target.value })} />
                                </Form.Field>
                                <Form.Field>
                                    <label>image</label>
                                    <input placeholder='Link to an image... for now' value={this.state.image} onChange={ (e) => this.setState({ image: e.target.value })} />
                                </Form.Field>
                                <Form.Field disabled>
                                    <label>colorScheme</label>
                                    <input placeholder='Unsupported yet.' value={this.state.colorScheme} onChange={ (e) => this.setState({ colorScheme: e.target.value })} />
                                </Form.Field>
                                
                                <Button type='submit' fluid size='large'>Release</Button>
                            </Form>
                        </Modal.Content>
                    </Modal>
                ) : ''}
            </div>
        )
    }

    close = () => {
        this.setState({open: false});
    }
    open = () => {
        this.setState({open: true});
    }

}

export default NewRoomForm;