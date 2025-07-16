import { useDispatch } from "react-redux";
import { addReaction } from "./postSlice";
import react from "react";

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
};

const ReactionButton = ({ post }) => {
    const dispatch = useDispatch();
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() => {
                    dispatch(addReaction({postId: post.id, reaction: name}));
                }}
            >
                {emoji} {post.reactions[name]}
            </button>
        );
    });
    return (
        <div>
            {reactionButtons}
        </div>
    );
}   

export default ReactionButton;