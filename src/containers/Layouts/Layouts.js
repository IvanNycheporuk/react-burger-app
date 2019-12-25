import React, {Component} from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/Toolbar/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

class Layout extends Component{
    state = {
        showSideDrawer: true
    }

    sideDrawerCloseHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    sideDraweShowHandler = () => {
        this.setState({
            showSideDrawer: true
        })
    }

    render() {
        return (
            <>        
            <Toolbar showDrawer={this.sideDraweShowHandler}/>
            <SideDrawer open={this.state.showSideDrawer} close={this.sideDrawerCloseHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </>
        )
    }
}

export default Layout;