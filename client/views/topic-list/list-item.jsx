import React from 'react';
import ListItem from 'material-ui/List/ListItem'
import ListItemAvatar from 'material-ui/List/ListItemAvatar'
import ListItemText from 'material-ui/List/ListItemText'
import Avatar from 'material-ui/Avatar'
import propTypes from 'prop-types'

const Primary = ({ topic }) => {
    return (
        <div>
            <span> { topic.tab } </span>
            <span> { topic.title } </span>
        </div>
    )
}

const Secondary = ({ topic }) => (
    <div>
        <span>{ topic.author.loginname }</span>

        <span>
            <span>{ topic.reply_count }</span>
            <span>/</span>
            <span>{ topic.visit_count }</span>

            <span>创建时间：{ topic.create_at }</span>
        </span>
    </div>
)

const TopicListItem = ({ onClick, topic }) => (
    <ListItem button onclick={onClick}>
        <ListItemAvatar>
            <Avatar src={topic.author.avatar_url} />
        </ListItemAvatar>

        <ListItemText
          primary={<Primary topic={topic} />}
          secondary={<Secondary topic={topic} />}
        />

    </ListItem>
)

Primary.propTypes = {
    topic: propTypes.object.isRequired,
}

Secondary.propTypes = {
    topic: propTypes.object.isRequired,
}

TopicListItem.propTypes = {
    onClick: propTypes.func.isRequired,
    topic: propTypes.object.isRequired,
}

export default TopicListItem;
