import React from 'react';
import { Message, Button, Form, Modal, Menu } from 'semantic-ui-react';
import basePath from '../api/basePath';

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
            colorScheme: '',
            error: ''
        }
    }

    createNewRoom() {
        handleReplyToPost = async () => {
            await basePath({
                    method: "post",
                    url: `/api/rooms/`,
                    data: {
                        authorId: '',
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
                            colorScheme: ''
                        });
                    };
                })
                .catch(err => {
                    console.log(error);
                    this.setState({ error: error.response.data });
                })
        }
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
            <UserConsumer>
                {context => (
                    <div>
                        {!context.loggedIn ? (
                            <Modal size='tiny' trigger={<Menu.Item onClick={this.open} name='New thread' />}
                                open={this.state.open}
                                onClose={this.close}
                            >
                                <Modal.Header>{this.state.title || 'New thread'}</Modal.Header>
                                <Modal.Content>
                                    <Form size='large' onSubmit={this.createNewRoom} error >
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
                                            <label>Password</label>
                                            <input 
                                                type='password'
                                                placeholder='Password'
                                                spellcheck = "false"
                                                autocapitalize = "off"
                                                autocorrect = "off"
                                                value={this.state.password} 
                                                onChange={(e) => this.setState({ password: e.target.value })} 
                                            />
                                            <input 
                                                type='password'
                                                placeholder='Repeat'
                                                spellcheck = "false"
                                                autocapitalize = "off"
                                                autocorrect = "off"
                                                value={this.state.passwordRepeat} 
                                                onChange={(e) => this.setState({ passwordRepeat: e.target.value })} 
                                            />
                                        </Form.Field>
                                        <Button type='submit' fluid size='large'>Sign up</Button>
                                    </Form>
                                </Modal.Content>
                            </Modal>
                        ) : ''}
                    </div>
                )}
            </UserConsumer>
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