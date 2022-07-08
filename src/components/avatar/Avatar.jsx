import './Avatar.scss';

const Avatar = ({ src }) => {
  return (
    <div className="avatar">
      <img src={src} alt="user avatar" />
    </div>
  );
};

export default Avatar;
