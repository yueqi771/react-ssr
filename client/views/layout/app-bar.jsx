import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles'

import { AppBar } from 'material-ui';
import ToolBar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui-icons/Home'
import Typography from 'material-ui/Typography'

const styles = {
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
}


class MainAppBar extends React.Component {
    constructor() {
        super();
        this.onHomeIconClick = this.onHomeIconClick.bind(this)
        this.createButtonClick = this.createButtonClick.bind(this)
        this.loginButtonClick = this.loginButtonClick.bind(this)
    }

    /* es-lint disable */
    onHomeIconClick = () => {

    }

    createButtonClick = () => {

    }

    loginButtonClick = () => {

    }
    /* es-lint enable */


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar positon="fixed">
                    <ToolBar>
                        <IconButton color="primary" onClick={this.onHomeIconClick}>
                            <HomeIcon />
                        </IconButton>
                        <Typography type="title" color="inherit" className={classes.flex}>
                            越祈： 这里是标题
                        </Typography>
                        <Button color="default" onClick={this.createButtonClick}>
                            新建话题
                        </Button>
                        <Button color="default" onClick={this.loginButtonClick}>
                            登录
                        </Button>
                    </ToolBar>
                </AppBar>
            </div>
        )
    }
}

MainAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainAppBar);
