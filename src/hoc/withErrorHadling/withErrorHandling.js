import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandling = (WrapperComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        constructor() {
            super();
            this.intreceptorsReq = axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                })            
                
                return req;
            })

            this.interseptorsRes = axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error: error
                })
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.intreceptorsReq);
            axios.interceptors.response.eject(this.intreceptorsRes);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render() {
            return (
                <>
                    <Modal show={this.state.error} hideModal={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapperComponent {...this.props} />
                </>
            )
        }
    }
}

export default withErrorHandling;